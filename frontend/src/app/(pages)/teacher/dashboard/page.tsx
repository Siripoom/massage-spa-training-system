// src/app/(pages)/teacher/dashboard/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Button, Badge, Progress, List, Avatar, Tag, message, Spin } from 'antd';
import './dashboard.css';
import { 
  BookOutlined, 
  UserOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  EyeOutlined,
  FileTextOutlined,
  MessageOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import '@ant-design/v5-patch-for-react-19';
dayjs.extend(relativeTime);

const { Text } = Typography;

// Interfaces
interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile_image_url?: string;
  specializations: string[];
  experience: number;
}

interface Course {
  id: string;
  courseName: string;
  enrolledStudents: number;
  totalHours: number;
  status: 'active' | 'draft' | 'completed';
  category: string;
  startDate: string;
  endDate?: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  courseId: string;
  progress: number;
  lastActivity: string;
  status: 'active' | 'completed' | 'inactive';
  avatar?: string;
}

interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  submitted: number;
  total: number;
  status: 'pending' | 'grading' | 'completed';
}

interface RecentActivity {
  id: string;
  type: 'enrollment' | 'completion' | 'question' | 'assignment';
  title: string;
  description: string;
  time: string;
  studentName?: string;
  courseName?: string;
}

// Mock data
const mockTeacher: Teacher = {
  id: 'teacher-001',
  firstName: 'อาจารย์สมศรี',
  lastName: 'ใจดี',
  email: 'teacher@example.com',
  profile_image_url: 'https://placehold.co/100x100/5d4037/ffffff?text=T',
  specializations: ['การนวดแผนไทย', 'การนวดบำบัด', 'อโรมาเธอราปี'],
  experience: 15
};

const mockCourses: Course[] = [
  {
    id: 'course-1',
    courseName: 'หลักสูตรการนวดแผนไทยพื้นฐาน',
    enrolledStudents: 25,
    totalHours: 30,
    status: 'active',
    category: 'การนวดแผนไทย',
    startDate: '2024-06-01',
    endDate: '2024-08-31'
  },
  {
    id: 'course-2',
    courseName: 'หลักสูตรการนวดอโรม่า',
    enrolledStudents: 18,
    totalHours: 25,
    status: 'active',
    category: 'สปาเธอราปี',
    startDate: '2024-07-01',
    endDate: '2024-09-30'
  },
  {
    id: 'course-3',
    courseName: 'หลักสูตรการนวดบำบัดขั้นสูง',
    enrolledStudents: 12,
    totalHours: 40,
    status: 'draft',
    category: 'การนวดบำบัด',
    startDate: '2024-09-01'
  }
];

// Mock data with static dates to prevent hydration mismatches
const generateMockData = () => {
  // Use fixed timestamps for consistency
  const baseTime = new Date('2024-08-09T10:00:00Z').getTime();
  
  return {
    students: [
      {
        id: 'std-001',
        firstName: 'สมชาย',
        lastName: 'ดีใจ',
        courseId: 'course-1',
        progress: 85,
        lastActivity: new Date(baseTime - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        status: 'active' as const,
        avatar: 'https://placehold.co/40x40/1890ff/ffffff?text=ส'
      },
      {
        id: 'std-002',
        firstName: 'สมหญิง',
        lastName: 'สวยงาม',
        courseId: 'course-1',
        progress: 92,
        lastActivity: new Date(baseTime - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        status: 'active' as const,
        avatar: 'https://placehold.co/40x40/52c41a/ffffff?text=ส'
      },
      {
        id: 'std-003',
        firstName: 'วิทย์',
        lastName: 'เก่งมาก',
        courseId: 'course-2',
        progress: 100,
        lastActivity: new Date(baseTime - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        status: 'completed' as const,
        avatar: 'https://placehold.co/40x40/faad14/ffffff?text=ว'
      }
    ],
    assignments: [
      {
        id: 'assign-001',
        title: 'แบบทดสอบท้ายบทที่ 1',
        courseId: 'course-1',
        courseName: 'หลักสูตรการนวดแผนไทยพื้นฐาน',
        dueDate: new Date(baseTime + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from base
        submitted: 18,
        total: 25,
        status: 'pending' as const
      },
      {
        id: 'assign-002',
        title: 'การปฏิบัติการนวดอโรม่า',
        courseId: 'course-2',
        courseName: 'หลักสูตรการนวดอโรม่า',
        dueDate: new Date(baseTime + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from base
        submitted: 12,
        total: 18,
        status: 'grading' as const
      }
    ],
    recentActivities: [
      {
        id: 'act-001',
        type: 'completion' as const,
        title: 'นักเรียนเรียนจบบทเรียน',
        description: 'วิทย์ เก่งมาก เรียนจบบทเรียน "การผสมน้ำมันหอมระเหย"',
        time: new Date(baseTime - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        studentName: 'วิทย์ เก่งมาก',
        courseName: 'หลักสูตรการนวดอโรม่า'
      },
      {
        id: 'act-002',
        type: 'question' as const,
        title: 'คำถามจากนักเรียน',
        description: 'สมชาย ดีใจ ถามเกี่ยวกับเทคนิคการกดจุดสำคัญ',
        time: new Date(baseTime - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        studentName: 'สมชาย ดีใจ',
        courseName: 'หลักสูตรการนวดแผนไทยพื้นฐาน'
      },
      {
        id: 'act-003',
        type: 'assignment' as const,
        title: 'งานที่ต้องตรวจ',
        description: 'มีงานการปฏิบัติการนวดอโรม่า 5 ชิ้น รอการตรวจสอบ',
        time: new Date(baseTime - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        courseName: 'หลักสูตรการนวดอโรม่า'
      }
    ]
  };
};

export default function TeacherDashboardPage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use client-side data generation to prevent hydration mismatch
    const mockData = generateMockData();
    
    // Simulate loading data
    setTeacher(mockTeacher);
    setCourses(mockCourses);
    setStudents(mockData.students);
    setAssignments(mockData.assignments);
    setRecentActivities(mockData.recentActivities);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completion': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'question': return <MessageOutlined style={{ color: '#1890ff' }} />;
      case 'assignment': return <FileTextOutlined style={{ color: '#faad14' }} />;
      case 'enrollment': return <UserOutlined style={{ color: '#722ed1' }} />;
      default: return <ClockCircleOutlined />;
    }
  };

  const handleViewCourse = (courseId: string) => {
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
      
      message.info(`ดูรายละเอียดหลักสูตร: ${course.courseName}`);
      console.log('View course:', courseId);
      // TODO: Navigate to course details page
      // router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      console.error('Error viewing course:', error);
      message.error('เกิดข้อผิดพลาดในการดูรายละเอียดหลักสูตร');
    }
  };

  const handleViewStudent = (studentId: string) => {
    try {
      if (!studentId || studentId.trim() === '') {
        message.error('รหัสนักเรียนไม่ถูกต้อง');
        return;
      }
      
      const student = students.find(s => s.id === studentId);
      if (!student) {
        message.error('ไม่พบนักเรียนที่เลือก');
        return;
      }
      
      message.info(`ดูข้อมูลนักเรียน: ${student.firstName} ${student.lastName}`);
      console.log('View student:', studentId);
      // TODO: Navigate to student details page
      // router.push(`/teacher/students/${studentId}`);
    } catch (error) {
      console.error('Error viewing student:', error);
      message.error('เกิดข้อผิดพลาดในการดูข้อมูลนักเรียน');
    }
  };

  const handleGradeAssignment = (assignmentId: string) => {
    try {
      if (!assignmentId || assignmentId.trim() === '') {
        message.error('รหัสงานไม่ถูกต้อง');
        return;
      }
      
      const assignment = assignments.find(a => a.id === assignmentId);
      if (!assignment) {
        message.error('ไม่พบงานที่เลือก');
        return;
      }
      
      message.info(`ตรวจงาน: ${assignment.title}`);
      console.log('Grade assignment:', assignmentId);
      // TODO: Navigate to grading page
      // router.push(`/teacher/assignments/${assignmentId}/grade`);
    } catch (error) {
      console.error('Error grading assignment:', error);
      message.error('เกิดข้อผิดพลาดในการตรวจงาน');
    }
  };

  const handleViewAllCourses = () => {
    try {
      message.info('กำลังไปยังหน้าหลักสูตรทั้งหมด...');
      // TODO: Navigate to all courses page
      // router.push('/teacher/courses');
    } catch (error) {
      console.error('Error navigating to courses:', error);
      message.error('เกิดข้อผิดพลาดในการเปิดหน้าหลักสูตร');
    }
  };

  const handleViewAllActivities = () => {
    try {
      message.info('กำลังไปยังหน้ากิจกรรมทั้งหมด...');
      // TODO: Navigate to all activities page
      // router.push('/teacher/activities');
    } catch (error) {
      console.error('Error navigating to activities:', error);
      message.error('เกิดข้อผิดพลาดในการเปิดหน้ากิจกรรม');
    }
  };

  const handleViewAllStudents = () => {
    try {
      message.info('กำลังไปยังหน้านักเรียนทั้งหมด...');
      // TODO: Navigate to all students page
      // router.push('/teacher/students');
    } catch (error) {
      console.error('Error navigating to students:', error);
      message.error('เกิดข้อผิดพลาดในการเปิดหน้านักเรียน');
    }
  };

  const handleViewAllAssignments = () => {
    try {
      message.info('กำลังไปยังหน้างานทั้งหมด...');
      // TODO: Navigate to all assignments page
      // router.push('/teacher/assignments');
    } catch (error) {
      console.error('Error navigating to assignments:', error);
      message.error('เกิดข้อผิดพลาดในการเปิดหน้างาน');
    }
  };

  const activeCourses = courses.filter(c => c.status === 'active').length;
  const completedStudents = students.filter(s => s.status === 'completed').length;
  const pendingAssignments = assignments.filter(a => a.status === 'pending' || a.status === 'grading').length;
  
  // Fix division by zero and improve calculation
  const successRate = students.length > 0 ? ((completedStudents / students.length) * 100) : 0;
  const totalStudentsEnrolled = courses.reduce((sum, course) => sum + course.enrolledStudents, 0);

  return (
    <div className="dashboard-container fade-in-up">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">สวัสดี, {teacher?.firstName}</h1>
          <p className="dashboard-subtitle">
            ยินดีต้อนรับสู่แดชบอร์ดอาจารย์ - จัดการหลักสูตรและนักเรียนของคุณ
          </p>
        </div>
        <Button type="primary" className="dashboard-action-btn" onClick={handleViewAllCourses}>
          ดูหลักสูตรทั้งหมด
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="stats-row">
        {[
          {
            title: "หลักสูตรที่สอน",
            value: activeCourses,
            prefix: <BookOutlined />,
            color: "#5d4037",
          },
          {
            title: "นักเรียนทั้งหมด",
            value: totalStudentsEnrolled,
            prefix: <UserOutlined />,
            color: "#8d6e63",
          },
          {
            title: "งานที่ต้องตรวจ",
            value: pendingAssignments,
            prefix: <FileTextOutlined />,
            color: "#a1887f",
          },
          {
            title: "อัตราความสำเร็จ",
            value: `${successRate.toFixed(0)}%`,
            prefix: <TrophyOutlined />,
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

      <Row gutter={[24, 24]} className="content-row">
        {/* My Courses */}
        <Col xs={24} lg={12}>
          <Card
            title="หลักสูตรที่สอน"
            className="content-card"
            extra={
              <Button type="link" className="card-action-btn" onClick={handleViewAllCourses}>
                ดูทั้งหมด
              </Button>
            }
          >
            <div className="course-progress-list">
              {courses.slice(0, 3).map(course => (
                <div key={course.id} className="course-progress-item">
                  <div className="course-header">
                    <div className="course-info">
                      <div className="course-name">{course.courseName}</div>
                      <div className="course-meta">
                        <Tag color={course.status === 'active' ? 'green' : course.status === 'draft' ? 'orange' : 'blue'}>
                          {course.status === 'active' ? 'กำลังสอน' : course.status === 'draft' ? 'แก้ไข' : 'เสร็จสิ้น'}
                        </Tag>
                        <span className="course-students">{course.enrolledStudents} คน</span>
                      </div>
                    </div>
                    <Button 
                      type="primary" 
                      size="small"
                      className="dashboard-action-btn"
                      style={{ fontSize: '12px', height: '28px', padding: '0 12px' }}
                      icon={<EyeOutlined />}
                      onClick={() => handleViewCourse(course.id)}
                    >
                      ดูรายละเอียด
                    </Button>
                  </div>
                  <Progress 
                    percent={Math.min(Math.round((course.enrolledStudents / Math.max(course.enrolledStudents, 30)) * 100), 100)} 
                    strokeColor="#5d4037"
                    trailColor="#f5f5f5"
                    size={8}
                    className="course-progress-bar"
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card
            title="กิจกรรมล่าสุด"
            className="content-card"
            extra={
              <Button type="link" className="card-action-btn" onClick={handleViewAllActivities}>
                ดูทั้งหมด
              </Button>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities.slice(0, 4)}
              className="activity-list"
              renderItem={(item) => (
                <List.Item className="activity-item">
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: '#f5f5f5', color: '#5d4037' }}>
                        {getActivityIcon(item.type)}
                      </Avatar>
                    }
                    title={<span className="activity-title">{item.title}</span>}
                    description={
                      <div className="activity-description">
                        <div className="activity-text">{item.description}</div>
                        <div className="activity-time">
                          <ClockCircleOutlined className="time-icon" />
                          {dayjs(item.time).fromNow()}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Student Progress */}
        <Col xs={24} lg={12}>
          <Card
            title="ความก้าวหน้าของนักเรียน"
            className="content-card"
            extra={
              <Button type="link" className="card-action-btn" onClick={handleViewAllStudents}>
                ดูทั้งหมด
              </Button>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={students.slice(0, 4)}
              renderItem={(student) => (
                <List.Item
                  className="activity-item"
                  actions={[
                    <Button 
                      key="view" 
                      type="link" 
                      size="small"
                      onClick={() => handleViewStudent(student.id)}
                    >
                      ดูรายละเอียด
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={student.avatar}>{student.firstName[0]}</Avatar>}
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{student.firstName} {student.lastName}</span>
                        <Badge 
                          status={student.status === 'active' ? 'processing' : student.status === 'completed' ? 'success' : 'default'}
                          text={student.status === 'active' ? 'กำลังเรียน' : student.status === 'completed' ? 'เรียนจบ' : 'ไม่ได้ใช้งาน'}
                        />
                      </div>
                    }
                    description={
                      <div>
                        <Progress percent={student.progress} size="small" />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          ออนไลน์: {dayjs(student.lastActivity).fromNow()}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Assignments to Grade */}
        <Col xs={24} lg={12}>
          <Card
            title="งานที่ต้องตรวจสอบ"
            className="content-card"
            extra={
              <Button type="link" className="card-action-btn" onClick={handleViewAllAssignments}>
                ดูทั้งหมด
              </Button>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={assignments}
              renderItem={(assignment) => (
                <List.Item
                  className="activity-item"
                  actions={[
                    <Button 
                      key="grade" 
                      type="primary" 
                      size="small"
                      className="dashboard-action-btn"
                      onClick={() => handleGradeAssignment(assignment.id)}
                    >
                      ตรวจงาน
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<FileTextOutlined style={{ fontSize: 20, color: '#5d4037' }} />}
                    title={assignment.title}
                    description={
                      <div>
                        <div>{assignment.courseName}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                          <Text type="secondary">
                            ส่งแล้ว: {assignment.submitted}/{assignment.total}
                          </Text>
                          <Text type="secondary">
                            กำหนดส่ง: {dayjs(assignment.dueDate).format('DD MMM')}
                          </Text>
                        </div>
                        <Progress 
                          percent={Math.round((assignment.submitted / assignment.total) * 100)} 
                          size="small" 
                          strokeColor={assignment.submitted === assignment.total ? '#52c41a' : '#5d4037'}
                        />
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
