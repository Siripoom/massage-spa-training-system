// src/app/(pages)/(admin)/dashboard/page.tsx
"use client";
import React from "react";
import {
  Row,
  Col,
  Card,
  Progress,
  List,
  Avatar,
  Button,
  Spin,
  Tag,
  Space,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  RiseOutlined,
  FallOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useDashboardStats, useDashboardActivities, useDashboardCourseProgress } from "@/hooks";
import "./dashboard.css";
import '@ant-design/v5-patch-for-react-19';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/th';

dayjs.extend(relativeTime);
dayjs.locale('th');

export default function AdminDashboard() {
  // Fetch data from API
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: activities, isLoading: activitiesLoading } = useDashboardActivities(10);
  const { data: courseProgress, isLoading: progressLoading } = useDashboardCourseProgress(4);

  const statsData = stats ? [
    {
      title: "นักเรียนทั้งหมด",
      value: stats.totalStudents,
      prefix: <UserOutlined />,
      color: "#5d4037",
      suffix: "คน",
      trend: stats.trends.students,
    },
    {
      title: "หลักสูตรที่เปิดสอน",
      value: stats.totalCourses,
      prefix: <BookOutlined />,
      color: "#8d6e63",
      suffix: "หลักสูตร",
      trend: { value: 0, isUp: true },
    },
    {
      title: "รุ่นที่กำลังเปิดสอน",
      value: stats.totalActiveBatches,
      prefix: <TeamOutlined />,
      color: "#a1887f",
      suffix: "รุ่น",
      trend: { value: 0, isUp: true },
    },
    {
      title: "รายได้รวม",
      value: stats.totalRevenue,
      prefix: <DollarOutlined />,
      color: "#6d4c41",
      suffix: "บาท",
      trend: { value: 0, isUp: true },
    },
  ] : [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "#8bc34a";
    if (progress >= 50) return "#2196f3";
    if (progress >= 30) return "#ff9800";
    return "#f44336";
  };

  if (statsLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="dashboard-container fade-in-up">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            ภาพรวมการดำเนินงานระบบจัดการหลักสูตรฝึกอบรม RelaxPlus
          </p>
        </div>
        <Button type="primary" className="dashboard-action-btn">
          ดูรายงานแบบเต็ม
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="stats-row">
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card">
              <div className="stat-content">
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.prefix}
                </div>
                <div className="stat-details">
                  <div className="stat-value" style={{ color: stat.color }}>
                    {stat.title.includes("รายได้")
                      ? formatCurrency(stat.value)
                      : stat.value.toLocaleString()}
                  </div>
                  <div className="stat-title">{stat.title}</div>
                  <div className="stat-trend">
                    {stat.trend.isUp ? (
                      <RiseOutlined className="trend-up" />
                    ) : (
                      <FallOutlined className="trend-down" />
                    )}
                    <span
                      className={stat.trend.isUp ? "trend-up" : "trend-down"}
                    >
                      {stat.trend.value}% จากเดือนที่แล้ว
                    </span>
                  </div>
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
              <Button type="link" className="card-action-btn">
                ดูทั้งหมด
              </Button>
            }
          >
            <div className="course-progress-list">
              {progressLoading ? (
                <Spin />
              ) : courseProgress && courseProgress.length > 0 ? (
                courseProgress.map((course, index) => (
                  <div key={index} className="course-progress-item">
                    <div className="course-header">
                      <div className="course-info">
                        <div className="course-name">{course.name}</div>
                        <div className="course-meta">
                          <span className="course-students">
                            {course.students} / {course.maxStudents} นักเรียน
                          </span>
                          <Tag color={course.status === 'ACTIVE' ? 'green' : 'blue'}>
                            {course.status === 'ACTIVE' ? 'กำลังเรียน' : 'วางแผน'}
                          </Tag>
                        </div>
                      </div>
                      <span
                        className="course-percentage"
                        style={{ color: getProgressColor(course.progress) }}
                      >
                        {course.progress}%
                      </span>
                    </div>
                    <Progress
                      percent={course.progress}
                      strokeColor={getProgressColor(course.progress)}
                      trailColor="#f5f5f5"
                      size={8}
                      className="course-progress-bar"
                    />
                  </div>
                ))
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  ไม่มีข้อมูลหลักสูตร
                </div>
              )}
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
              dataSource={activities || []}
              loading={activitiesLoading}
              className="activity-list"
              renderItem={(item: any) => (
                <List.Item className="activity-item">
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ backgroundColor: item.color }}
                        className="activity-avatar"
                      >
                        {item.avatar}
                      </Avatar>
                    }
                    title={<span className="activity-title">{item.title}</span>}
                    description={
                      <div className="activity-description">
                        <div className="activity-text">{item.description}</div>
                        <div className="activity-time">
                          <ClockCircleOutlined />
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

        {/* Upcoming Exams - Hidden for now, will be implemented when quiz/exam API is ready */}
        {false && (
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
              <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                ระบบจัดการสอบยังไม่พร้อมใช้งาน
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}
