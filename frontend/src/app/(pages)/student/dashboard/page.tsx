// src/app/(pages)/student/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Space, Spin, Empty, Button, message, Progress, Avatar, Badge } from 'antd';
import { 
  TrophyOutlined, 
  BookOutlined, 
  ArrowRightOutlined, 
  CheckCircleOutlined,
  StarOutlined,
  PlayCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import 'dayjs/locale/th';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import './dashboard.css';

dayjs.locale('th');
dayjs.extend(localizedFormat);

const { Title, Text } = Typography;

// Mock interfaces based on the database schema provided
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile_image_url?: string;
}

interface Enrollment {
  id: string;
  course_id: string;
  status: 'pending' | 'inprogress' | 'completed';
}

interface Course {
  id: string;
  title: string;
}

interface Certificate {
  id: string;
  template_id: string;
  enrollment_id: string;
  issued_date: string;
}

const mockStudent: Student = {
  id: 'user-stu-1234',
  firstName: 'นักเรียน',
  lastName: 'ทดสอบ',
  email: 'student.test@example.com',
  profile_image_url: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=ST',
};

const mockEnrollments: Enrollment[] = [
  { id: 'en-1', course_id: 'course-1', status: 'inprogress' },
  { id: 'en-2', course_id: 'course-2', status: 'completed' },
  { id: 'en-3', course_id: 'course-3', status: 'pending' },
];

const mockCourses: Course[] = [
  { id: 'course-1', title: 'หลักสูตรการนวดแผนไทยพื้นฐาน' },
  { id: 'course-2', title: 'หลักสูตรการนวดอโรม่า' },
  { id: 'course-3', title: 'หลักสูตรการนวดบำบัด' },
];

const mockCertificates: Certificate[] = [
  { id: 'cert-1', template_id: 'temp-1', enrollment_id: 'en-2', issued_date: dayjs().subtract(2, 'month').toISOString() },
  { id: 'cert-2', template_id: 'temp-2', enrollment_id: 'en-1', issued_date: dayjs().toISOString() },
];

const getCourseById = (id: string) => mockCourses.find(c => c.id === id);

export default function StudentDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    // Simulate API call to fetch student data
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setStudent(mockStudent);
      setEnrollments(mockEnrollments);
      setCertificates(mockCertificates);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large">
          <div className="min-h-[200px] flex items-center justify-center">
            <span className="text-gray-600 ml-2">กำลังโหลดข้อมูล...</span>
          </div>
        </Spin>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">แดชบอร์ดนักเรียน</h1>
          <p className="dashboard-subtitle">
            ภาพรวมการเรียนรู้และความก้าวหน้าของคุณ - สวัสดี, {student?.firstName}! 👋
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
        <Col xs={24} sm={8}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ color: '#5d4037' }}>
                <BookOutlined />
              </div>
              <div className="stat-details">
                <div className="stat-value" style={{ color: '#5d4037' }}>
                  {enrollments.length}
                </div>
                <div className="stat-title">หลักสูตรทั้งหมด</div>
                <div className="stat-trend">
                  <span className="trend-up">
                    กำลังเรียนอยู่ {enrollments.filter(e => e.status === 'inprogress').length} หลักสูตร
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ color: '#52c41a' }}>
                <CheckCircleOutlined />
              </div>
              <div className="stat-details">
                <div className="stat-value" style={{ color: '#52c41a' }}>
                  {enrollments.filter(e => e.status === 'completed').length}
                </div>
                <div className="stat-title">เรียนจบแล้ว</div>
                <div className="stat-trend">
                  <span className="trend-up">
                    ความสำเร็จในการเรียน
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ color: '#faad14' }}>
                <TrophyOutlined />
              </div>
              <div className="stat-details">
                <div className="stat-value" style={{ color: '#faad14' }}>
                  {certificates.length}
                </div>
                <div className="stat-title">เกียรติบัตร</div>
                <div className="stat-trend">
                  <span className="trend-up">
                    รางวัลที่ได้รับ
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="content-row">
        {/* My Courses Section */}
        <Col xs={24} lg={16}>
          <Card 
            title="หลักสูตรของฉัน"
            className="content-card"
            extra={
              <Button 
                type="link" 
                onClick={() => router.push('/student/courses')}
                className="card-action-btn"
              >
                ดูทั้งหมด <ArrowRightOutlined />
              </Button>
            }
          >
            <div className="course-progress-list">
              {enrollments.length > 0 ? (
                enrollments.slice(0, 3).map(en => {
                  const course = getCourseById(en.course_id);
                  const completionPercentage = en.status === 'completed' ? 100 : 
                                             en.status === 'inprogress' ? 65 : 0;
                  
                  return (
                    <div key={en.id} className="course-progress-item">
                      <div className="course-header">
                        <div className="course-info">
                          <div className="course-name">{course?.title || 'Unknown Course'}</div>
                          <div className="course-meta">
                            <span className="course-students">
                              {en.status === 'completed' && <Badge status="success" text="เรียนจบแล้ว" />}
                              {en.status === 'inprogress' && <Badge status="processing" text="กำลังเรียน" />}
                              {en.status === 'pending' && <Badge status="warning" text="รอการอนุมัติ" />}
                            </span>
                            <Button 
                              type="primary" 
                              size="small"
                              className="dashboard-action-btn"
                              style={{ fontSize: '12px', height: '28px', padding: '0 12px' }}
                              icon={<PlayCircleOutlined />}
                              disabled={en.status === 'pending'}
                            >
                              {en.status === 'completed' ? 'ทบทวน' : 'เรียนต่อ'}
                            </Button>
                          </div>
                        </div>
                        <span 
                          className="course-percentage" 
                          style={{ 
                            color: en.status === 'completed' ? '#52c41a' : '#1890ff' 
                          }}
                        >
                          {completionPercentage}%
                        </span>
                      </div>
                      {en.status !== 'pending' && (
                        <Progress 
                          percent={completionPercentage} 
                          strokeColor={en.status === 'completed' ? '#52c41a' : '#1890ff'}
                          trailColor="#f5f5f5"
                          size={8}
                          className="course-progress-bar"
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <Empty 
                  description={
                    <div className="text-center py-8">
                      <BookOutlined className="text-4xl text-gray-300 mb-4" />
                      <p className="text-gray-500 mb-4">ยังไม่มีหลักสูตรที่ลงทะเบียน</p>
                      <Button 
                        type="primary" 
                        className="dashboard-action-btn"
                        onClick={() => router.push('/student/courses')}
                      >
                        เลือกหลักสูตร
                      </Button>
                    </div>
                  } 
                />
              )}
            </div>
          </Card>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={8}>
          <Space direction="vertical" className="w-full" size="large">
            {/* Profile Card */}
            <Card className="content-card" title="โปรไฟล์ของฉัน">
              <div className="text-center">
                <Avatar 
                  size={80} 
                  src={student?.profile_image_url || 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=ST'}
                  className="mb-4"
                  style={{ border: '4px solid #f0f0f0' }}
                />
                <Title level={4} className="mb-1" style={{ color: '#5d4037' }}>
                  {student?.firstName} {student?.lastName}
                </Title>
                <Text className="text-gray-600 block mb-4">{student?.email}</Text>
                <Button
                  type="default"
                  className="card-action-btn"
                  style={{ borderColor: '#5d4037', color: '#5d4037' }}
                  onClick={() => message.info('ฟังก์ชันแก้ไขโปรไฟล์ยังไม่พร้อมใช้งาน')}
                >
                  แก้ไขโปรไฟล์
                </Button>
              </div>
            </Card>

            {/* Certificates Card */}
            <Card
              title="เกียรติบัตรของฉัน"
              className="content-card"
              extra={
                certificates.length > 0 && (
                  <Button 
                    type="link" 
                    onClick={() => router.push('/student/certificates')}
                    className="card-action-btn"
                  >
                    ดูทั้งหมด
                  </Button>
                )
              }
            >
              {certificates.length > 0 ? (
                <div className="activity-list">
                  {certificates.slice(0, 2).map(cert => {
                    const enrollment = enrollments.find(e => e.id === cert.enrollment_id);
                    const course = enrollment ? getCourseById(enrollment.course_id) : null;
                    return (
                      <div key={cert.id} className="activity-item" style={{ padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                          <Avatar 
                            style={{ backgroundColor: '#faad14', flexShrink: 0 }}
                            icon={<StarOutlined />}
                            size={40}
                          />
                          <div style={{ flex: 1 }}>
                            <div className="activity-title" style={{ fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                              {course?.title || 'Unknown Course'}
                            </div>
                            <div className="activity-text" style={{ color: '#666', fontSize: '12px' }}>
                              ออกเมื่อ: {dayjs(cert.issued_date).format('DD MMM YYYY')}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Empty 
                  image={<TrophyOutlined className="text-4xl text-gray-300" />}
                  description={
                    <div className="text-center">
                      <p className="text-gray-500 mb-2">ยังไม่มีเกียรติบัตร</p>
                      <p className="text-xs text-gray-400">เรียนจบหลักสูตรเพื่อรับเกียรติบัตร</p>
                    </div>
                  }
                />
              )}
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
