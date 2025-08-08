// src/app/(pages)/teacher/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Button, Badge, Progress, List, Avatar, Tag, message } from 'antd';
import { 
  BookOutlined, 
  UserOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  EyeOutlined,
  CalendarOutlined,
  FileTextOutlined,
  RiseOutlined,
  MessageOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '../../admin/dashboard/dashboard.css';

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

const mockStudents: Student[] = [
  {
    id: 'std-001',
    firstName: 'สมชาย',
    lastName: 'ดีใจ',
    courseId: 'course-1',
    progress: 85,
    lastActivity: dayjs().subtract(2, 'hour').toISOString(),
    status: 'active',
    avatar: 'https://placehold.co/40x40/1890ff/ffffff?text=ส'
  },
  {
    id: 'std-002',
    firstName: 'สมหญิง',
    lastName: 'สวยงาม',
    courseId: 'course-1',
    progress: 92,
    lastActivity: dayjs().subtract(4, 'hour').toISOString(),
    status: 'active',
    avatar: 'https://placehold.co/40x40/52c41a/ffffff?text=ส'
  },
  {
    id: 'std-003',
    firstName: 'วิทย์',
    lastName: 'เก่งมาก',
    courseId: 'course-2',
    progress: 100,
    lastActivity: dayjs().subtract(1, 'day').toISOString(),
    status: 'completed',
    avatar: 'https://placehold.co/40x40/faad14/ffffff?text=ว'
  }
];

const mockAssignments: Assignment[] = [
  {
    id: 'assign-001',
    title: 'แบบทดสอบท้ายบทที่ 1',
    courseId: 'course-1',
    courseName: 'หลักสูตรการนวดแผนไทยพื้นฐาน',
    dueDate: dayjs().add(3, 'day').toISOString(),
    submitted: 18,
    total: 25,
    status: 'pending'
  },
  {
    id: 'assign-002',
    title: 'การปฏิบัติการนวดอโรม่า',
    courseId: 'course-2',
    courseName: 'หลักสูตรการนวดอโรม่า',
    dueDate: dayjs().add(1, 'week').toISOString(),
    submitted: 12,
    total: 18,
    status: 'grading'
  }
];

const mockRecentActivities: RecentActivity[] = [
  {
    id: 'act-001',
    type: 'completion',
    title: 'นักเรียนเรียนจบบทเรียน',
    description: 'วิทย์ เก่งมาก เรียนจบบทเรียน "การผสมน้ำมันหอมระเหย"',
    time: dayjs().subtract(30, 'minute').toISOString(),
    studentName: 'วิทย์ เก่งมาก',
    courseName: 'หลักสูตรการนวดอโรม่า'
  },
  {
    id: 'act-002',
    type: 'question',
    title: 'คำถามจากนักเรียน',
    description: 'สมชาย ดีใจ ถามเกี่ยวกับเทคนิคการกดจุดสำคัญ',
    time: dayjs().subtract(2, 'hour').toISOString(),
    studentName: 'สมชาย ดีใจ',
    courseName: 'หลักสูตรการนวดแผนไทยพื้นฐาน'
  },
  {
    id: 'act-003',
    type: 'assignment',
    title: 'งานที่ต้องตรวจ',
    description: 'มีงานการปฏิบัติการนวดอโรม่า 5 ชิ้น รอการตรวจสอบ',
    time: dayjs().subtract(4, 'hour').toISOString(),
    courseName: 'หลักสูตรการนวดอโรม่า'
  }
];

export default function TeacherDashboardPage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    // Simulate loading data
    setTeacher(mockTeacher);
    setCourses(mockCourses);
    setStudents(mockStudents);
    setAssignments(mockAssignments);
    setRecentActivities(mockRecentActivities);
  }, []);

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
    message.info(`ดูรายละเอียดหลักสูตร: ${courseId}`);
    console.log('View course:', courseId);
  };

  const handleViewStudent = (studentId: string) => {
    message.info(`ดูข้อมูลนักเรียน: ${studentId}`);
    console.log('View student:', studentId);
  };

  const handleGradeAssignment = (assignmentId: string) => {
    message.info(`ตรวจงาน: ${assignmentId}`);
    console.log('Grade assignment:', assignmentId);
  };

  const totalStudents = courses.reduce((acc, course) => acc + course.enrolledStudents, 0);
  const activeCourses = courses.filter(c => c.status === 'active').length;
  const completedStudents = students.filter(s => s.status === 'completed').length;
  const pendingAssignments = assignments.filter(a => a.status === 'pending' || a.status === 'grading').length;

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">แดชบอร์ดอาจารย์</h1>
          <p className="dashboard-subtitle">
            ภาพรวมการสอนและการจัดการหลักสูตร - สวัสดี, {teacher?.firstName}! 👨‍🏫
          </p>
        </div>
        <div className="hidden md:block">
          <span className="text-gray-600 text-sm">
            <CalendarOutlined className="text-orange-500 mr-2" />
            {dayjs().format('dddd, LL')}
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="stats-row">
        <Col xs={24} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ color: '#5d4037' }}>
                <BookOutlined />
              </div>
              <div className="stat-details">
                <div className="stat-value" style={{ color: '#5d4037' }}>
                  {activeCourses}
                </div>
                <div className="stat-title">หลักสูตรที่สอน</div>
                <div className="stat-trend">
                  <RiseOutlined className="trend-up" />
                  <span className="trend-up">ทั้งหมด {courses.length} หลักสูตร</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ color: '#1890ff' }}>
                <UserOutlined />
              </div>
              <div className="stat-details">
                <div className="stat-value" style={{ color: '#1890ff' }}>
                  {totalStudents}
                </div>
                <div className="stat-title">นักเรียนทั้งหมด</div>
                <div className="stat-trend">
                  <span className="trend-up">กำลังเรียนอยู่</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ color: '#52c41a' }}>
                <TrophyOutlined />
              </div>
              <div className="stat-details">
                <div className="stat-value" style={{ color: '#52c41a' }}>
                  {completedStudents}
                </div>
                <div className="stat-title">จบการศึกษา</div>
                <div className="stat-trend">
                  <span className="trend-up">สำเร็จการศึกษา</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ color: '#faad14' }}>
                <FileTextOutlined />
              </div>
              <div className="stat-details">
                <div className="stat-value" style={{ color: '#faad14' }}>
                  {pendingAssignments}
                </div>
                <div className="stat-title">งานที่ต้องตรวจ</div>
                <div className="stat-trend">
                  <span className="trend-up">รออนุมัติ</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="content-row">
        {/* My Courses */}
        <Col xs={24} lg={12}>
          <Card
            title="หลักสูตรที่สอน"
            className="content-card"
            extra={
              <Button type="link" className="card-action-btn">
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
                    percent={Math.round((course.enrolledStudents / 30) * 100)} 
                    strokeColor="#1890ff"
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
              <Button type="link" className="card-action-btn">
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
              <Button type="link" className="card-action-btn">
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
              <Button type="link" className="card-action-btn">
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
                          strokeColor={assignment.submitted === assignment.total ? '#52c41a' : '#1890ff'}
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
