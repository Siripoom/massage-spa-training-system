// src/app/(pages)/student/dashboard/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Space, 
  Spin, 
  Button, 
  message, 
  Progress, 
  Avatar, 
  List,
  Tag
} from 'antd';
import { 
  TrophyOutlined, 
  BookOutlined, 
  CheckCircleOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import 'dayjs/locale/th';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import './dashboard.css';

dayjs.locale('th');
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const { Text } = Typography;

// Types for the new dashboard
interface StudentData {
  id: string;
  name: string;
  email: string;
  level: string;
  joinDate: string;
  avatar?: string;
}

interface EnrolledCourse {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  instructor: string;
  thumbnail: string;
  category: string;
  duration: string;
  lastAccessed: string;
  nextLesson?: string;
}

interface StudentStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalLearningTime: number;
  achievedCertificates: number;
  averageScore: number;
}

interface Activity {
  id: string;
  type: string;
  title: string;
  course: string;
  timestamp: string;
  iconName: string;
  color: string;
  score?: number;
}

interface UpcomingExam {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  duration: string;
  type: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [studentStats, setStudentStats] = useState<StudentStats>({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalLearningTime: 0,
    achievedCertificates: 0,
    averageScore: 0
  });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<UpcomingExam[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock student data
        setStudentData({
          id: '1',
          name: 'นางสาวสมหญิง ใจดี',
          email: 'student@example.com',
          level: 'ระดับกลาง',
          joinDate: '2024-01-15'
        });

        // Mock enrolled courses
        setEnrolledCourses([
          {
            id: '1',
            title: 'หลักสูตรนวดแผนไทยพื้นฐาน',
            description: 'เรียนรู้เทคนิคการนวดแผนไทยแบบดั้งเดิม',
            progress: 75,
            totalLessons: 12,
            completedLessons: 9,
            instructor: 'อาจารย์สมชาย',
            thumbnail: '/api/placeholder/300/200',
            category: 'นวดแผนไทย',
            duration: '6 สัปดาห์',
            lastAccessed: '2024-01-20',
            nextLesson: 'บทที่ 10: เทคนิคการนวดเท้า'
          },
          {
            id: '2',
            title: 'หลักสูตรนวดน้ำมันอโรมา',
            description: 'ศิลปะการนวดด้วยน้ำมันหอมระเหย',
            progress: 40,
            totalLessons: 10,
            completedLessons: 4,
            instructor: 'อาจารย์สมหญิง',
            thumbnail: '/api/placeholder/300/200',
            category: 'อโรมาเธราปี',
            duration: '4 สัปดาห์',
            lastAccessed: '2024-01-18',
            nextLesson: 'บทที่ 5: การเลือกใช้น้ำมันหอมระเหย'
          },
          {
            id: '3',
            title: 'หลักสูตรนวดหิน ร้อน',
            description: 'เทคนิคการนวดด้วยหินร้อนเพื่อคลายกล้ามเนื้อ',
            progress: 90,
            totalLessons: 8,
            completedLessons: 7,
            instructor: 'อาจารย์สมศักดิ์',
            thumbnail: '/api/placeholder/300/200',
            category: 'สปาเธราปี',
            duration: '3 สัปดาห์',
            lastAccessed: '2024-01-19',
            nextLesson: 'บทที่ 8: การดูแลและบำรุงรักษาหิน'
          }
        ]);

        // Calculate stats
        const totalCourses = 3;
        const completedCourses = 1;
        const inProgressCourses = 2;
        const averageProgress = (75 + 40 + 90) / 3;
        
        setStudentStats({
          totalCourses,
          completedCourses,
          inProgressCourses,
          totalLearningTime: 45,
          achievedCertificates: 1,
          averageScore: Math.round(averageProgress)
        });

        // Mock recent activities
        setRecentActivities([
          {
            id: '1',
            type: 'lesson_completed',
            title: 'เสร็จสิ้นบทเรียน: เทคนิคการนวดไหล่และคอ',
            course: 'หลักสูตรนวดแผนไทยพื้นฐาน',
            timestamp: '2024-01-20T10:30:00',
            iconName: 'CheckCircleOutlined',
            color: '#52c41a'
          },
          {
            id: '2',
            type: 'exam_passed',
            title: 'สอบผ่านแบบทดสอบท้ายบท',
            course: 'หลักสูตรนวดหินร้อน',
            score: 85,
            timestamp: '2024-01-19T14:20:00',
            iconName: 'TrophyOutlined',
            color: '#faad14'
          },
          {
            id: '3',
            type: 'certificate_earned',
            title: 'ได้รับใบประกาศนียบัตร',
            course: 'หลักสูตรนวดแผนไทยขั้นพื้นฐาน',
            timestamp: '2024-01-18T16:45:00',
            iconName: 'StarOutlined',
            color: '#722ed1'
          },
          {
            id: '4',
            type: 'course_enrolled',
            title: 'ลงทะเบียนเรียนหลักสูตรใหม่',
            course: 'หลักสูตรนวดน้ำมันอโรมา',
            timestamp: '2024-01-17T09:15:00',
            iconName: 'BookOutlined',
            color: '#1890ff'
          }
        ]);

        // Mock upcoming exams
        setUpcomingExams([
          {
            id: '1',
            title: 'แบบทดสอบท้ายหลักสูตร: นวดแผนไทยพื้นฐาน',
            course: 'หลักสูตรนวดแผนไทยพื้นฐาน',
            date: '2024-01-25',
            time: '14:00',
            duration: '90 นาที',
            type: 'final_exam'
          },
          {
            id: '2',
            title: 'แบบทดสอบกลางหลักสูตร: นวดน้ำมันอโรมา',
            course: 'หลักสูตรนวดน้ำมันอโรมา',
            date: '2024-01-28',
            time: '10:00',
            duration: '60 นาที',
            type: 'mid_exam'
          }
        ]);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        message.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleViewAllCourses = () => {
    router.push('/student/courses');
  };

  const formatTimeAgo = (timestamp: string) => {
    return dayjs(timestamp).fromNow();
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" />
        <Text style={{ marginTop: 16, display: 'block', textAlign: 'center' }}>
          กำลังโหลดข้อมูล...
        </Text>
      </div>
    );
  }

  return (
    <div className="dashboard-container fade-in-up">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">สวัสดี, {studentData?.name}</h1>
          <p className="dashboard-subtitle">
            ยินดีต้อนรับสู่แดชบอร์ดนักเรียน - เริ่มต้นการเรียนรู้ของคุณวันนี้
          </p>
        </div>
        <Button type="primary" className="dashboard-action-btn">
          ดูหลักสูตรทั้งหมด
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="stats-row">
        {[
          {
            title: "หลักสูตรทั้งหมด",
            value: studentStats.totalCourses,
            prefix: <BookOutlined />,
            color: "#5d4037",
          },
          {
            title: "หลักสูตรที่จบแล้ว",
            value: studentStats.completedCourses,
            prefix: <CheckCircleOutlined />,
            color: "#8d6e63",
          },
          {
            title: "กำลังเรียน",
            value: studentStats.inProgressCourses,
            prefix: <PlayCircleOutlined />,
            color: "#a1887f",
          },
          {
            title: "ใบประกาศนียบัตร",
            value: studentStats.achievedCertificates,
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
        {/* Course Progress */}
        <Col xs={24} lg={12}>
          <Card
            title="ความคืบหน้าหลักสูตร"
            className="content-card"
            extra={
              <Button 
                type="link" 
                onClick={handleViewAllCourses}
                className="card-action-btn"
              >
                ดูทั้งหมด
              </Button>
            }
          >
            <div className="course-progress-list">
              {enrolledCourses.map((course, index) => (
                <div key={index} className="course-progress-item">
                  <div className="course-header">
                    <div className="course-info">
                      <div className="course-name">{course.title}</div>
                      <div className="course-meta">
                        <span className="course-students">
                          {course.completedLessons}/{course.totalLessons} บท
                        </span>
                        <Tag color="blue">
                          {course.category}
                        </Tag>
                      </div>
                    </div>
                    <span
                      className="course-percentage"
                      style={{ color: course.progress > 70 ? "#8bc34a" : course.progress > 40 ? "#2196f3" : "#ff9800" }}
                    >
                      {course.progress}%
                    </span>
                  </div>
                  <Progress
                    percent={course.progress}
                    strokeColor={course.progress > 70 ? "#8bc34a" : course.progress > 40 ? "#2196f3" : "#ff9800"}
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
              dataSource={recentActivities}
              className="activity-list"
              renderItem={(item) => (
                <List.Item className="activity-item">
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ backgroundColor: item.color }}
                        className="activity-avatar"
                      >
                        {item.title.charAt(0)}
                      </Avatar>
                    }
                    title={<span className="activity-title">{item.title}</span>}
                    description={
                      <div className="activity-description">
                        <div className="activity-text">{item.course}</div>
                        <div className="activity-time">
                          <ClockCircleOutlined className="time-icon" />
                          {formatTimeAgo(item.timestamp)}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Upcoming Exams */}
        <Col xs={24}>
          <Card
            title="การสอบที่กำลังจะมาถึง"
            className="content-card"
            extra={
              <Space>
                <Button type="link" className="card-action-btn">
                  ดูตารางเต็ม
                </Button>
                <Button type="primary" className="dashboard-action-btn">
                  จัดการตารางสอบ
                </Button>
              </Space>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={upcomingExams}
              className="exam-list"
              renderItem={(item) => (
                <List.Item
                  className="exam-item"
                  actions={[
                    <Button key="view" type="link" className="exam-action-btn">
                      ดูรายละเอียด
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<FileTextOutlined className="exam-icon" />}
                    title={
                      <div className="exam-header">
                        <span className="exam-course-name">{item.title}</span>
                        <div className="exam-tags">
                          <Tag color="blue">
                            {item.type === 'final_exam' ? 'Final' : 'Mid'}
                          </Tag>
                        </div>
                      </div>
                    }
                    description={
                      <div className="exam-details">
                        <span className="exam-date">
                          วันที่: {dayjs(item.date).format('DD MMM YYYY')}
                        </span>
                        <span className="exam-time">เวลา: {item.time} น.</span>
                        <span className="exam-students">
                          ระยะเวลา: {item.duration}
                        </span>
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
