// src/app/(pages)/student/courses/page.tsx
"use client";


import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Progress, Input, Select, Tabs, message } from 'antd';
import './courses.css';
import { 
  BookOutlined, 
  PlayCircleOutlined, 
  ClockCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  StarOutlined,
  UserOutlined,
  TrophyOutlined,
  RocketOutlined
} from '@ant-design/icons';
import '../dashboard/dashboard.css';
import '@ant-design/v5-patch-for-react-19';

const { Search } = Input;
const { Option } = Select;

// Interfaces matching the admin course structure
interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

interface CourseLesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration?: number;
  completed?: boolean;
}

interface Course {
  id: string;
  courseName: string;
  description: string;
  price: number;
  durationHours: number;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  modules: CourseModule[];
}

interface Enrollment {
  id: string;
  course_id: string;
  status: 'pending' | 'inprogress' | 'completed';
  progress: number;
  enrolled_date: string;
  completed_date?: string;
}

// Mock data
const mockCourses: Course[] = [
  {
    id: 'course-1',
    courseName: 'หลักสูตรการนวดแผนไทยพื้นฐาน',
    description: 'เรียนรู้เทคนิคการนวดแผนไทยแบบดั้งเดิม เพื่อการผ่อนคลายและการรักษา',
    price: 3500,
    durationHours: 30,
    instructor: 'อาจารย์สมศรี ใจดี',
    level: 'beginner',
    category: 'การนวดแผนไทย',
    thumbnail: 'https://placehold.co/300x200/8bc34a/ffffff?text=Thai+Massage',
    modules: [
      {
        id: 'mod-1',
        title: 'บทนำสู่การนวดแผนไทย',
        lessons: [
          { id: 'lesson-1', title: 'ประวัติการนวดแผนไทย', type: 'video', duration: 15, completed: true },
          { id: 'lesson-2', title: 'หลักการและปรัชญา', type: 'text', duration: 10, completed: true },
          { id: 'lesson-3', title: 'แบบทดสอบท้ายบท', type: 'quiz', duration: 5, completed: false }
        ]
      },
      {
        id: 'mod-2', 
        title: 'เทคนิคพื้นฐาน',
        lessons: [
          { id: 'lesson-4', title: 'ท่านวดพื้นฐาน', type: 'video', duration: 25, completed: false },
          { id: 'lesson-5', title: 'การใช้แรงกดอย่างถูกต้อง', type: 'video', duration: 20, completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    courseName: 'หลักสูตรการนวดอโรม่า',
    description: 'ศิลปะการนวดผสมผสานกับน้ำมันหอมระเหย เพื่อการผ่อนคลายสุดพิเศษ',
    price: 4200,
    durationHours: 25,
    instructor: 'อาจารย์วิไล สวยงาม',
    level: 'intermediate',
    category: 'การนวดสปา',
    thumbnail: 'https://placehold.co/300x200/2196f3/ffffff?text=Aroma+Massage',
    modules: [
      {
        id: 'mod-3',
        title: 'พื้นฐานอโรม่าเธอราปี',
        lessons: [
          { id: 'lesson-6', title: 'รู้จักน้ำมันหอมระเหย', type: 'video', duration: 20, completed: true },
          { id: 'lesson-7', title: 'การผสมน้ำมัน', type: 'video', duration: 15, completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    courseName: 'หลักสูตรการนวดบำบัด',
    description: 'เทคนิคการนวดเพื่อการรักษาและบรรเทาอาการปวดเมื่อย',
    price: 5000,
    durationHours: 40,
    instructor: 'อาจารย์ดร.สุธี เก่งมาก',
    level: 'advanced',
    category: 'การนวดบำบัด',
    thumbnail: 'https://placehold.co/300x200/ff9800/ffffff?text=Therapeutic',
    modules: []
  }
];

const mockEnrollments: Enrollment[] = [
  { id: 'en-1', course_id: 'course-1', status: 'inprogress', progress: 65, enrolled_date: '2024-06-01' },
  { id: 'en-2', course_id: 'course-2', status: 'completed', progress: 100, enrolled_date: '2024-05-15', completed_date: '2024-07-15' },
  { id: 'en-3', course_id: 'course-3', status: 'pending', progress: 0, enrolled_date: '2024-07-20' }
];

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('enrolled');

  useEffect(() => {
    // Simulate loading data
    setCourses(mockCourses);
    setEnrollments(mockEnrollments);
  }, []);

  useEffect(() => {
    // Filter courses based on enrollment status and search term
    try {
      let filtered = [...courses]; // Create a copy to avoid mutation
      
      if (activeTab === 'enrolled') {
        const enrolledCourseIds = enrollments.map(e => e.course_id).filter(Boolean);
        filtered = courses.filter(course => course && enrolledCourseIds.includes(course.id));
      }
      
      if (searchTerm && searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(course => 
          course && (
            (course.courseName && course.courseName.toLowerCase().includes(searchLower)) ||
            (course.description && course.description.toLowerCase().includes(searchLower)) ||
            (course.instructor && course.instructor.toLowerCase().includes(searchLower))
          )
        );
      }
      
      if (statusFilter !== 'all' && activeTab === 'enrolled') {
        filtered = filtered.filter(course => {
          if (!course) return false;
          const enrollment = enrollments.find(e => e && e.course_id === course.id);
          return enrollment && enrollment.status === statusFilter;
        });
      }
      
      setFilteredCourses(filtered);
    } catch (error) {
      console.error('Error filtering courses:', error);
      setFilteredCourses([]);
      message.error('เกิดข้อผิดพลาดในการกรองหลักสูตร');
    }
  }, [courses, enrollments, searchTerm, statusFilter, activeTab]);

  const getEnrollmentInfo = (courseId: string) => {
    try {
      if (!courseId || !Array.isArray(enrollments)) return undefined;
      return enrollments.find(e => e && e.course_id === courseId);
    } catch (error) {
      console.error('Error getting enrollment info:', error);
      return undefined;
    }
  };

  const calculateProgress = (course: Course, enrollment?: Enrollment) => {
    if (!enrollment || !course) return 0;
    
    try {
      const totalLessons = course.modules.reduce((acc, module) => {
        if (!module || !Array.isArray(module.lessons)) return acc;
        return acc + module.lessons.length;
      }, 0);
      
      const completedLessons = course.modules.reduce((acc, module) => {
        if (!module || !Array.isArray(module.lessons)) return acc;
        return acc + module.lessons.filter(lesson => lesson && lesson.completed === true).length;
      }, 0);
      
      if (totalLessons === 0) return 0;
      
      const progress = Math.round((completedLessons / totalLessons) * 100);
      return Math.min(Math.max(progress, 0), 100); // Ensure progress is between 0-100
    } catch (error) {
      console.error('Error calculating progress:', error);
      return 0;
    }
  };

  const handleContinueCourse = (courseId: string) => {
    try {
      if (!courseId || courseId.trim() === '') {
        message.error('รหัสหลักสูตรไม่ถูกต้อง');
        return;
      }
      
      const course = courses.find(c => c.id === courseId);
      if (!course) {
        message.error('ไม่พบหลักสูตรที่เลือก');
        return;
      }
      
      const enrollment = getEnrollmentInfo(courseId);
      if (!enrollment) {
        message.error('คุณยังไม่ได้ลงทะเบียนหลักสูตรนี้');
        return;
      }
      
      if (enrollment.status === 'pending') {
        message.warning('หลักสูตรนี้รอการอนุมัติ');
        return;
      }
      
      message.success(`เปิดหลักสูตร: ${course.courseName}`);
      console.log('Continue course:', courseId);
      // TODO: Navigate to course content
      // router.push(`/student/courses/${courseId}/learn`);
    } catch (error) {
      console.error('Error continuing course:', error);
      message.error('เกิดข้อผิดพลาดในการเปิดหลักสูตร');
    }
  };

  const handleStartCourse = (courseId: string) => {
    try {
      if (!courseId || courseId.trim() === '') {
        message.error('รหัสหลักสูตรไม่ถูกต้อง');
        return;
      }
      
      const course = courses.find(c => c.id === courseId);
      if (!course) {
        message.error('ไม่พบหลักสูตรที่เลือก');
        return;
      }
      
      // Check if already enrolled
      const enrollment = getEnrollmentInfo(courseId);
      if (enrollment) {
        message.info('คุณได้ลงทะเบียนหลักสูตรนี้แล้ว');
        return;
      }
      
      message.success(`เริ่มลงทะเบียนหลักสูตร: ${course.courseName}`);
      console.log('Start course:', courseId);
      // TODO: Implement course enrollment
      // router.push(`/student/courses/${courseId}/enroll`);
    } catch (error) {
      console.error('Error starting course:', error);
      message.error('เกิดข้อผิดพลาดในการลงทะเบียนหลักสูตร');
    }
  };

  const renderCourseCard = (course: Course, enrollment?: Enrollment) => {
    const progress = calculateProgress(course, enrollment);
    
    return (
      <Card
        key={course.id}
        className="content-card"
        hoverable
      >
        <div className="course-header">
          <div className="course-info">
            <h3 className="course-title">{course.courseName}</h3>
            <p className="course-description">{course.description}</p>
            <div className="course-meta">
              <span className="course-instructor">
                <UserOutlined /> {course.instructor}
              </span>
              <span className="course-duration">
                <ClockCircleOutlined /> {course.durationHours} ชั่วโมง
              </span>
            </div>
          </div>
        </div>
        
        {enrollment && (
          <div className="course-progress-section">
            <div className="progress-header">
              <span>ความคืบหน้า</span>
              <span>{progress}%</span>
            </div>
            <Progress 
              percent={progress} 
              strokeColor="#5d4037"
              trailColor="#f5f5f5"
              size={8}
            />
          </div>
        )}

        <div className="course-actions">
          <Button 
            type="primary" 
            className="dashboard-action-btn"
            disabled={enrollment?.status === 'pending'}
            onClick={() => enrollment ? handleContinueCourse(course.id) : handleStartCourse(course.id)}
            icon={enrollment ? <PlayCircleOutlined /> : <RocketOutlined />}
          >
            {enrollment?.status === 'pending' ? 'รอการอนุมัติ' :
             enrollment?.status === 'completed' ? 'ทบทวนเนื้อหา' :
             enrollment ? 'เรียนต่อ' : 'เริ่มเรียน'}
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="dashboard-container fade-in-up">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">หลักสูตรของฉัน</h1>
          <p className="dashboard-subtitle">
            จัดการและติดตามความคืบหน้าในการเรียนรู้ของคุณ
          </p>
        </div>
        <Button type="primary" className="dashboard-action-btn">
          เลือกหลักสูตรใหม่
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="stats-row">
        {[
          {
            title: "หลักสูตรที่ลงทะเบียน",
            value: enrollments.length,
            prefix: <BookOutlined />,
            color: "#5d4037",
          },
          {
            title: "กำลังเรียน",
            value: enrollments.filter(e => e.status === 'inprogress').length,
            prefix: <PlayCircleOutlined />,
            color: "#8d6e63",
          },
          {
            title: "เรียนจบแล้ว",
            value: enrollments.filter(e => e.status === 'completed').length,
            prefix: <TrophyOutlined />,
            color: "#a1887f",
          },
          {
            title: "หลักสูตรทั้งหมด",
            value: courses.length,
            prefix: <StarOutlined />,
            color: "#6d4c41",
          },
        ].map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card">
              <div className="stat-content">
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.prefix}
                </div>
                <div className="stat-details">
                  <div className="stat-value" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="stat-title">{stat.title}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Search and Filter */}
      <Row gutter={[24, 24]} className="content-row">
        <Col span={24}>
          <Card className="content-card">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={12}>
                <Search
                  placeholder="ค้นหาหลักสูตร..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="large"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col xs={24} md={8}>
                <Select
                  placeholder="กรองตามสถานะ"
                  size="large"
                  style={{ width: '100%' }}
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <Option value="all">ทั้งหมด</Option>
                  <Option value="inprogress">กำลังเรียน</Option>
                  <Option value="completed">เรียนจบแล้ว</Option>
                  <Option value="pending">รอการอนุมัติ</Option>
                </Select>
              </Col>
              <Col xs={24} md={4}>
                <Button
                  size="large"
                  style={{ width: '100%' }}
                  className="dashboard-action-btn"
                  icon={<FilterOutlined />}
                >
                  ตัวกรอง
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Course Tabs */}
      <Row gutter={[24, 24]} className="content-row">
        <Col span={24}>
          <Card className="content-card">
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              items={[
                {
                  key: 'enrolled',
                  label: `หลักสูตรที่ลงทะเบียน (${enrollments.length})`,
                  children: (
                    filteredCourses.length > 0 ? (
                      <Row gutter={[24, 24]} style={{ marginTop: 16 }}>
                        {filteredCourses.map(course => {
                          const enrollment = getEnrollmentInfo(course.id);
                          return (
                            <Col xs={24} md={12} lg={8} key={course.id}>
                              {renderCourseCard(course, enrollment)}
                            </Col>
                          );
                        })}
                      </Row>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <BookOutlined style={{ fontSize: 48, color: '#5d4037', marginBottom: 16 }} />
                        <h3 style={{ color: '#5d4037', marginBottom: 8 }}>
                          {searchTerm ? 'ไม่พบหลักสูตรที่ค้นหา' : 'ยังไม่มีหลักสูตรที่ลงทะเบียน'}
                        </h3>
                        <p style={{ color: '#666', marginBottom: 24 }}>
                          เริ่มต้นการเรียนรู้ด้วยการเลือกหลักสูตรที่เหมาะกับคุณ
                        </p>
                        <Button 
                          type="primary" 
                          className="dashboard-action-btn"
                          onClick={() => setActiveTab('available')}
                          icon={<RocketOutlined />}
                        >
                          เลือกหลักสูตร
                        </Button>
                      </div>
                    )
                  )
                },
                {
                  key: 'available',
                  label: `หลักสูตรทั้งหมด (${courses.length})`,
                  children: (
                    <Row gutter={[24, 24]} style={{ marginTop: 16 }}>
                      {courses.map(course => {
                        const enrollment = getEnrollmentInfo(course.id);
                        return (
                          <Col xs={24} md={12} lg={8} key={course.id}>
                            {renderCourseCard(course, enrollment)}
                          </Col>
                        );
                      })}
                    </Row>
                  )
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
