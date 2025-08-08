// src/app/(pages)/student/courses/page.tsx
"use client";


import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Button, Progress, Badge, Empty, Input, Select, Tabs, Space, Tag, message } from 'antd';
import { 
  BookOutlined, 
  PlayCircleOutlined, 
  ClockCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  StarOutlined
} from '@ant-design/icons';
// import { useRouter } from 'next/navigation'; // Will be used for navigation later
import '../dashboard/dashboard.css';

const { Title, Text, Paragraph } = Typography;
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
  // const router = useRouter(); // Commented out until navigation is implemented
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
    let filtered = courses;
    
    if (activeTab === 'enrolled') {
      const enrolledCourseIds = enrollments.map(e => e.course_id);
      filtered = courses.filter(course => enrolledCourseIds.includes(course.id));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all' && activeTab === 'enrolled') {
      filtered = filtered.filter(course => {
        const enrollment = enrollments.find(e => e.course_id === course.id);
        return enrollment?.status === statusFilter;
      });
    }
    
    setFilteredCourses(filtered);
  }, [courses, enrollments, searchTerm, statusFilter, activeTab]);

  const getEnrollmentInfo = (courseId: string) => {
    return enrollments.find(e => e.course_id === courseId);
  };

  const calculateProgress = (course: Course, enrollment?: Enrollment) => {
    if (!enrollment) return 0;
    
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = course.modules.reduce((acc, module) => 
      acc + module.lessons.filter(lesson => lesson.completed).length, 0
    );
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const handleContinueCourse = (courseId: string) => {
    message.info('กำลังเปิดบทเรียน...');
    console.log('Continue course:', courseId);
    // Navigate to course content
    // router.push(`/student/courses/${courseId}`);
  };

  const handleStartCourse = (courseId: string) => {
    message.info('เริ่มเรียนหลักสูตร!');
    console.log('Start course:', courseId);
    // Logic to start course
  };

  const renderCourseCard = (course: Course, enrollment?: Enrollment) => {
    const progress = calculateProgress(course, enrollment);
    
    return (
      <Card
        key={course.id}
        className="content-card"
        cover={
          <div style={{ height: 200, background: `url(${course.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        }
        actions={[
          enrollment ? (
            <Button 
              type="primary" 
              className="dashboard-action-btn"
              icon={<PlayCircleOutlined />}
              onClick={() => handleContinueCourse(course.id)}
              disabled={enrollment.status === 'pending'}
            >
              {enrollment.status === 'completed' ? 'ทบทวน' : 'เรียนต่อ'}
            </Button>
          ) : (
            <Button 
              type="primary" 
              className="dashboard-action-btn"
              onClick={() => handleStartCourse(course.id)}
            >
              เริ่มเรียน
            </Button>
          )
        ]}
      >
        <Card.Meta
          title={
            <div>
              <Title level={4} style={{ margin: 0, color: '#5d4037' }}>
                {course.courseName}
              </Title>
              <Space style={{ marginTop: 8 }}>
                <Tag color="blue">{course.category}</Tag>
                <Tag color={course.level === 'beginner' ? 'green' : course.level === 'intermediate' ? 'orange' : 'red'}>
                  {course.level === 'beginner' ? 'เริ่มต้น' : course.level === 'intermediate' ? 'กลาง' : 'สูง'}
                </Tag>
              </Space>
            </div>
          }
          description={
            <div>
              <Paragraph ellipsis={{ rows: 2 }} style={{ color: '#666', marginBottom: 12 }}>
                {course.description}
              </Paragraph>
              
              <div style={{ marginBottom: 12 }}>
                <Text strong style={{ color: '#5d4037' }}>ผู้สอน: </Text>
                <Text>{course.instructor}</Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <ClockCircleOutlined style={{ color: '#666', marginRight: 4 }} />
                  <Text type="secondary">{course.durationHours} ชั่วโมง</Text>
                </div>
                <Text strong style={{ color: '#5d4037', fontSize: 16 }}>
                  ฟรี
                </Text>
              </div>

              {enrollment && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Badge 
                      status={enrollment.status === 'completed' ? 'success' : enrollment.status === 'inprogress' ? 'processing' : 'warning'}
                      text={enrollment.status === 'completed' ? 'เรียนจบแล้ว' : enrollment.status === 'inprogress' ? 'กำลังเรียน' : 'รอการอนุมัติ'}
                    />
                    <Text strong style={{ color: enrollment.status === 'completed' ? '#52c41a' : '#1890ff' }}>
                      {progress}%
                    </Text>
                  </div>
                  {enrollment.status !== 'pending' && (
                    <Progress 
                      percent={progress} 
                      strokeColor={enrollment.status === 'completed' ? '#52c41a' : '#1890ff'}
                      size="small"
                    />
                  )}
                </div>
              )}
            </div>
          }
        />
      </Card>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">หลักสูตรของฉัน</h1>
          <p className="dashboard-subtitle">
            จัดการและติดตามความก้าวหน้าในการเรียนรู้ของคุณ
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="content-card" style={{ marginBottom: 24 }}>
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
          <Col xs={24} md={6}>
            <Select
              placeholder="สถานะ"
              size="large"
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={setStatusFilter}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">ทั้งหมด</Option>
              <Option value="inprogress">กำลังเรียน</Option>
              <Option value="completed">เรียนจบแล้ว</Option>
              <Option value="pending">รอการอนุมัติ</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Course Tabs */}
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        size="large"
        items={[
          {
            key: 'enrolled',
            label: (
              <span>
                <BookOutlined />
                หลักสูตรที่ลงทะเบียน ({enrollments.length})
              </span>
            ),
            children: (
              filteredCourses.length > 0 ? (
                <Row gutter={[24, 24]}>
                  {filteredCourses.map(course => {
                    const enrollment = getEnrollmentInfo(course.id);
                    return (
                      <Col xs={24} sm={12} lg={8} xl={6} key={course.id}>
                        {renderCourseCard(course, enrollment)}
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <Empty
                  image={<BookOutlined className="text-6xl text-gray-300" />}
                  description={
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        {searchTerm ? 'ไม่พบหลักสูตรที่ค้นหา' : 'ยังไม่มีหลักสูตรที่ลงทะเบียน'}
                      </p>
                      <Button 
                        type="primary" 
                        className="dashboard-action-btn"
                        onClick={() => setActiveTab('available')}
                      >
                        เลือกหลักสูตร
                      </Button>
                    </div>
                  }
                />
              )
            )
          },
          {
            key: 'available',
            label: (
              <span>
                <StarOutlined />
                หลักสูตรทั้งหมด ({courses.length})
              </span>
            ),
            children: (
              <Row gutter={[24, 24]}>
                {courses.map(course => {
                  const enrollment = getEnrollmentInfo(course.id);
                  return (
                    <Col xs={24} sm={12} lg={8} xl={6} key={course.id}>
                      {renderCourseCard(course, enrollment)}
                    </Col>
                  );
                })}
              </Row>
            )
          }
        ]}
      />
    </div>
  );
}
