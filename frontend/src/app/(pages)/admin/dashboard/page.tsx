// src/app/(pages)/(admin)/dashboard/page.tsx
"use client";
import React from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  List,
  Avatar,
  Tag,
  Button,
  Space,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  FileTextOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import "./dashboard.css";

export default function AdminDashboard() {
  // Mock data
  const statsData = [
    {
      title: "นักเรียนทั้งหมด",
      value: 1128,
      prefix: <UserOutlined />,
      color: "#5d4037",
      suffix: "คน",
      trend: { value: 12, isUp: true },
    },
    {
      title: "หลักสูตรที่เปิดสอน",
      value: 24,
      prefix: <BookOutlined />,
      color: "#8d6e63",
      suffix: "หลักสูตร",
      trend: { value: 3, isUp: true },
    },
    {
      title: "การสอบที่จัดแล้ว",
      value: 156,
      prefix: <FileTextOutlined />,
      color: "#a1887f",
      suffix: "ครั้ง",
      trend: { value: 8, isUp: false },
    },
    {
      title: "รายได้รวม",
      value: 2485000,
      prefix: <DollarOutlined />,
      color: "#6d4c41",
      suffix: "บาท",
      trend: { value: 15, isUp: true },
    },
  ];

  const courseProgress = [
    {
      name: "การนวดแผนไทยเพื่อสุขภาพ",
      progress: 85,
      students: 45,
      color: "#8bc34a",
      ministry: "สาธารณสุข",
    },
    {
      name: "การนวดสปาและอโรมาเธอราปี",
      progress: 67,
      students: 32,
      color: "#2196f3",
      ministry: "ศึกษาธิการ",
    },
    {
      name: "การนวดเท้าเพื่อสุขภาพ",
      progress: 42,
      students: 28,
      color: "#ff9800",
      ministry: "สาธารณสุข",
    },
    {
      name: "การนวดประคบสมุนไพร",
      progress: 78,
      students: 38,
      color: "#9c27b0",
      ministry: "สาธารณสุข",
    },
  ];

  const recentActivities = [
    {
      title: "นักเรียนใหม่สมัครเข้าเรียน",
      description: "สมศรี ใจดี สมัครเรียนหลักสูตรการนวดแผนไทย",
      time: "5 นาทีที่แล้ว",
      avatar: "S",
      type: "success",
      color: "#8bc34a",
    },
    {
      title: "การสอบเสร็จสิ้น",
      description: "การสอบหลักสูตรการนวดสปา รุ่นที่ 15 เสร็จสิ้นแล้ว",
      time: "1 ชั่วโมงที่แล้ว",
      avatar: "E",
      type: "info",
      color: "#2196f3",
    },
    {
      title: "ออกใบประกาศนียบัตร",
      description: "ออกใบประกาศนียบัตรให้กับนักเรียน 15 คน",
      time: "3 ชั่วโมงที่แล้ว",
      avatar: "C",
      type: "warning",
      color: "#ff9800",
    },
    {
      title: "ชำระเงินเสร็จสิ้น",
      description: "รับชำระค่าหลักสูตรจากนักเรียน 8 คน รวม 24,000 บาท",
      time: "5 ชั่วโมงที่แล้ว",
      avatar: "P",
      type: "success",
      color: "#4caf50",
    },
  ];

  const upcomingExams = [
    {
      course: "การนวดแผนไทยเพื่อสุขภาพ",
      date: "2024-07-01",
      time: "09:00",
      students: 25,
      status: "scheduled",
      ministry: "สาธารณสุข",
    },
    {
      course: "การนวดสปาและอโรมาเธอราปี",
      date: "2024-07-02",
      time: "14:00",
      students: 18,
      status: "scheduled",
      ministry: "ศึกษาธิการ",
    },
    {
      course: "การนวดเท้าเพื่อสุขภาพ",
      date: "2024-07-03",
      time: "10:30",
      students: 22,
      status: "preparing",
      ministry: "สาธารณสุข",
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(value);
  };

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
              {courseProgress.map((course, index) => (
                <div key={index} className="course-progress-item">
                  <div className="course-header">
                    <div className="course-info">
                      <div className="course-name">{course.name}</div>
                      <div className="course-meta">
                        <span className="course-students">
                          {course.students} นักเรียน
                        </span>
                        <Tag
                          color={
                            course.ministry === "สาธารณสุข" ? "green" : "blue"
                          }
                          size="small"
                        >
                          {course.ministry}
                        </Tag>
                      </div>
                    </div>
                    <span
                      className="course-percentage"
                      style={{ color: course.color }}
                    >
                      {course.progress}%
                    </span>
                  </div>
                  <Progress
                    percent={course.progress}
                    strokeColor={course.color}
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
                        {item.avatar}
                      </Avatar>
                    }
                    title={<span className="activity-title">{item.title}</span>}
                    description={
                      <div className="activity-description">
                        <div className="activity-text">{item.description}</div>
                        <div className="activity-time">
                          <ClockCircleOutlined className="time-icon" />
                          {item.time}
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
                    <Button key="edit" type="link" className="exam-action-btn">
                      แก้ไข
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<FileTextOutlined className="exam-icon" />}
                    title={
                      <div className="exam-header">
                        <span className="exam-course-name">{item.course}</span>
                        <div className="exam-tags">
                          <Tag
                            color={
                              item.ministry === "สาธารณสุข" ? "green" : "blue"
                            }
                          >
                            {item.ministry}
                          </Tag>
                          <Tag
                            color={
                              item.status === "scheduled" ? "blue" : "orange"
                            }
                          >
                            {item.status === "scheduled"
                              ? "กำหนดการแน่นอน"
                              : "กำลังเตรียม"}
                          </Tag>
                        </div>
                      </div>
                    }
                    description={
                      <div className="exam-details">
                        <span className="exam-date">
                          วันที่:{" "}
                          {new Date(item.date).toLocaleDateString("th-TH")}
                        </span>
                        <span className="exam-time">เวลา: {item.time} น.</span>
                        <span className="exam-students">
                          นักเรียน: {item.students} คน
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
