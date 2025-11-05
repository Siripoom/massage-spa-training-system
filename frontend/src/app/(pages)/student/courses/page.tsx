// src/app/(pages)/student/courses/page.tsx
"use client";

import "@ant-design/v5-patch-for-react-19";
import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Progress,
  Input,
  Select,
  Tabs,
  message,
  Tag,
} from "antd";
import Image from "next/image";
import "./courses.css";
import {
  BookOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  StarOutlined,
  UserOutlined,
  TrophyOutlined,
  MedicineBoxOutlined,
  BankOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "../dashboard/dashboard.css";
import { useRouter } from "next/navigation";

const { Search } = Input;
const { Option } = Select;

// ข้อมูลประเภทหลักสูตร (สอดคล้องกับหน้า application)
const courseTypes = [
  {
    id: "ministry-health",
    name: "หลักสูตรกระทรวงสาธารณสุข",
    description: "หลักสูตรมาตรฐานด้านการแพทย์แผนไทย",
    icon: <MedicineBoxOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
    features: ["ปริญญาตรี 4 ปี", "ใบอนุญาตประกอบวิชาชีพ", "ทำงานได้ทันที"],
  },
  {
    id: "ministry-education",
    name: "หลักสูตรกระทรวงศึกษาธิการ",
    description: "หลักสูตรวิชาการและการวิจัย",
    icon: <BankOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
    features: ["วิชาการครบถ้วน", "สามารถศึกษาต่อ", "เข้าราชการได้"],
  },
];

// Interface สำหรับหลักสูตร
interface Course {
  id: number;
  title: string;
  type: string;
  instructor: string;
  duration: string;
  price: number;
  level: string;
  students: number;
  rating: number;
  image: string;
  description: string;
  skills: string[];
  progress?: number;
  enrolledDate?: string;
  lastAccessed?: string;
  modules?: Array<{
    id: number;
    title: string;
    completed: boolean;
  }>;
}

// ข้อมูลหลักสูตร (สอดคล้องกับหน้า application)
const availableCourses: Course[] = [
  // หลักสูตรกระทรวงสาธารณสุข
  {
    id: 1,
    title: "นวดแผนไทย ระดับเบื้องต้น",
    type: "ministry-health",
    instructor: "อาจารย์สมศรี นวดดี",
    duration: "80 ชั่วโมง",
    price: 15000,
    level: "เริ่มต้น",
    students: 156,
    rating: 4.8,
    image: "/api/placeholder/300/200",
    description: "เรียนรู้เทคนิคการนวดแผนไทยพื้นฐาน",
    skills: ["เส้นลมปราณ", "ท่านวดเบื้องต้น", "การปฏิบัติตัว"],
  },
  {
    id: 2,
    title: "นวดแผนไทย ระดับกลาง",
    type: "ministry-health",
    instructor: "อาจารย์วิชัย นวดเก่ง",
    duration: "120 ชั่วโมง",
    price: 25000,
    level: "กลาง",
    students: 89,
    rating: 4.9,
    image: "/api/placeholder/300/200",
    description: "เทคนิคการนวดขั้นสูงและการรักษา",
    skills: ["การวินิจฉัย", "นวดรักษา", "สมุนไพร"],
  },
  {
    id: 3,
    title: "การฝังเข็มแผนไทย",
    type: "ministry-health",
    instructor: "อาจารย์หญิงสุดา เข็มทอง",
    duration: "160 ชั่วโมง",
    price: 35000,
    level: "สูง",
    students: 45,
    rating: 4.7,
    image: "/api/placeholder/300/200",
    description: "การฝังเข็มเพื่อการรักษาและบำบัด",
    skills: ["จุดฝังเข็ม", "การรักษา", "ความปลอดภัย"],
  },
  // หลักสูตรกระทรวงศึกษาธิการ
  {
    id: 4,
    title: "วิทยาศาสตร์การนวด",
    type: "ministry-education",
    instructor: "ดร.สมชาย วิทยา",
    duration: "100 ชั่วโมง",
    price: 28000,
    level: "กลาง",
    students: 67,
    rating: 4.6,
    image: "/api/placeholder/300/200",
    description: "หลักวิทยาศาสตร์เบื้องหลังการนวด",
    skills: ["กายวิภาคศาสตร์", "สรีรวิทยา", "การวิจัย"],
  },
  {
    id: 5,
    title: "การจัดการสปาและเวลเนส",
    type: "ministry-education",
    instructor: "ผศ.ดร.วิมล บริหาร",
    duration: "90 ชั่วโมง",
    price: 22000,
    level: "กลาง",
    students: 134,
    rating: 4.5,
    image: "/api/placeholder/300/200",
    description: "การบริหารจัดการธุรกิจสปาและเวลเนส",
    skills: ["การบริหาร", "การตลาด", "การเงิน"],
  },
  {
    id: 6,
    title: "อโรมาเธอราปี",
    type: "ministry-health",
    instructor: "อาจารย์สุดา หอมหวาน",
    duration: "60 ชั่วโมง",
    price: 18000,
    level: "เริ่มต้น",
    students: 112,
    rating: 4.7,
    image: "/api/placeholder/300/200",
    description: "การบำบัดด้วยน้ำมันหอมระเหย",
    skills: ["น้ำมันหอมระเหย", "การนวดอโรม่า", "การผสมกลิ่น"],
  },
];

const StudentCoursesPage: React.FC = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("available");

  // จำลองข้อมูลหลักสูตรที่ลงทะเบียนแล้ว
  const [enrolledCourses] = useState<Course[]>([
    {
      ...availableCourses[0],
      progress: 65,
      enrolledDate: "2024-01-15",
      lastAccessed: "2024-01-20",
      modules: [
        { id: 1, title: "บทนำสู่การนวดแผนไทย", completed: true },
        { id: 2, title: "เส้นลมปราณหลัก", completed: true },
        { id: 3, title: "ท่านวดพื้นฐาน", completed: false },
        { id: 4, title: "การปฏิบัติจริง", completed: false },
      ],
    },
    {
      ...availableCourses[3],
      progress: 30,
      enrolledDate: "2024-01-10",
      lastAccessed: "2024-01-18",
      modules: [
        { id: 1, title: "หลักกายวิภาคศาสตร์", completed: true },
        { id: 2, title: "สรีรวิทยาระบบกล้ามเนื้อ", completed: false },
        { id: 3, title: "หลักการนวดทางวิทยาศาสตร์", completed: false },
      ],
    },
  ]);

  // กรองหลักสูตรตามประเภทและคำค้นหา
  const filteredCourses = availableCourses.filter((course) => {
    const matchesType = selectedType === "all" || course.type === selectedType;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // ไปยังหน้าสมัครเรียน
  const handleEnroll = (courseId: number) => {
    // เก็บ course id ใน localStorage หรือ state management
    localStorage.setItem("selectedCourseId", courseId.toString());
    router.push("/student/application");
  };

  const handleContinueLearning = (courseId: number) => {
    console.log("Continuing course:", courseId);
    message.success("กำลังเข้าสู่บทเรียน...");
    // Navigate to course content
  };

  const CourseCard: React.FC<{ course: Course; isEnrolled?: boolean }> = ({
    course,
    isEnrolled = false,
  }) => (
    <Card
      hoverable
      className="course-card"
      cover={
        <div className="course-image-container">
          <Image
            alt={course.title}
            src={course.image}
            className="course-image"
            width={300}
            height={200}
            style={{ objectFit: "cover" }}
          />
          <div className="course-overlay">
            <Tag color={course.type === "ministry-health" ? "green" : "blue"}>
              {courseTypes.find((type) => type.id === course.type)?.name}
            </Tag>
          </div>
        </div>
      }
      actions={
        isEnrolled
          ? [
              <Button
                key="continue"
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={() => handleContinueLearning(course.id)}
              >
                เรียนต่อ
              </Button>,
            ]
          : [
              <Button
                key="enroll"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleEnroll(course.id)}
              >
                สมัครเรียน
              </Button>,
            ]
      }
    >
      <Card.Meta
        title={
          <div className="course-title">
            {course.title}
            <div className="course-price">฿{course.price.toLocaleString()}</div>
          </div>
        }
        description={
          <div className="course-details">
            <p className="course-description">{course.description}</p>

            <div className="course-info">
              <div className="info-item">
                <UserOutlined />
                <span>{course.instructor}</span>
              </div>
              <div className="info-item">
                <ClockCircleOutlined />
                <span>{course.duration}</span>
              </div>
              <div className="info-item">
                <StarOutlined />
                <span>
                  {course.rating}/5 ({course.students} คน)
                </span>
              </div>
            </div>

            {isEnrolled && course.progress !== undefined && (
              <div className="progress-section">
                <div className="progress-label">
                  ความคืบหน้า: {course.progress}%
                </div>
                <Progress
                  percent={course.progress}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                  size="small"
                />
                <div className="modules-status">
                  เรียนแล้ว{" "}
                  {course.modules?.filter((m) => m.completed).length || 0} จาก{" "}
                  {course.modules?.length || 0} บท
                </div>
              </div>
            )}

            <div className="course-skills">
              <span className="skills-label">สิ่งที่จะได้เรียนรู้:</span>
              <div className="skills-list">
                {course.skills.map((skill: string, index: number) => (
                  <Tag key={index} className="skill-tag">
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </Card>
  );

  // สถิติหลักสูตร
  const stats = {
    total: availableCourses.length,
    enrolled: enrolledCourses.length,
    ministryHealth: availableCourses.filter((c) => c.type === "ministry-health")
      .length,
    ministryEducation: availableCourses.filter(
      (c) => c.type === "ministry-education"
    ).length,
  };

  const tabItems = [
    {
      key: "enrolled",
      label: `หลักสูตรที่ลงทะเบียน (${enrolledCourses.length})`,
      children: (
        <div>
          {enrolledCourses.length === 0 ? (
            <Card className="empty-state">
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <BookOutlined
                  style={{
                    fontSize: "48px",
                    color: "#d9d9d9",
                    marginBottom: "16px",
                  }}
                />
                <h3>ยังไม่มีหลักสูตรที่ลงทะเบียน</h3>
                <p>เริ่มต้นการเรียนรู้ด้วยการเลือกหลักสูตรที่เหมาะกับคุณ</p>
                <Button
                  type="primary"
                  onClick={() => setActiveTab("available")}
                >
                  ดูหลักสูตรทั้งหมด
                </Button>
              </div>
            </Card>
          ) : (
            <Row gutter={[24, 24]}>
              {enrolledCourses.map((course) => (
                <Col xs={24} sm={12} lg={8} key={course.id}>
                  <CourseCard course={course} isEnrolled={true} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      ),
    },
    {
      key: "available",
      label: `หลักสูตรทั้งหมด (${availableCourses.length})`,
      children: (
        <div>
          {/* สถิติและตัวกรอง */}
          <Row
            gutter={[16, 16]}
            className="stats-row"
            style={{ marginBottom: "24px" }}
          >
            <Col xs={24} sm={12} md={6}>
              <Card className="stat-card">
                <div className="stat-content">
                  <div className="stat-number">{stats.total}</div>
                  <div className="stat-label">หลักสูตรทั้งหมด</div>
                </div>
                <BookOutlined className="stat-icon" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="stat-card">
                <div className="stat-content">
                  <div className="stat-number">{stats.ministryHealth}</div>
                  <div className="stat-label">กระทรวงสาธารณสุข</div>
                </div>
                <MedicineBoxOutlined className="stat-icon" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="stat-card">
                <div className="stat-content">
                  <div className="stat-number">{stats.ministryEducation}</div>
                  <div className="stat-label">กระทรวงศึกษาธิการ</div>
                </div>
                <BankOutlined className="stat-icon" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="stat-card">
                <div className="stat-content">
                  <div className="stat-number">{enrolledCourses.length}</div>
                  <div className="stat-label">ลงทะเบียนแล้ว</div>
                </div>
                <TrophyOutlined className="stat-icon" />
              </Card>
            </Col>
          </Row>

          {/* ตัวกรองและค้นหา */}
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="ค้นหาหลักสูตร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                value={selectedType}
                onChange={setSelectedType}
                style={{ width: "100%" }}
                placeholder="เลือกประเภทหลักสูตร"
              >
                <Option value="all">หลักสูตรทั้งหมด</Option>
                <Option value="ministry-health">กระทรวงสาธารณสุข</Option>
                <Option value="ministry-education">กระทรวงศึกษาธิการ</Option>
              </Select>
            </Col>
          </Row>

          {/* รายการหลักสูตร */}
          <Row gutter={[24, 24]}>
            {filteredCourses.map((course) => (
              <Col xs={24} sm={12} lg={8} key={course.id}>
                <CourseCard course={course} isEnrolled={false} />
              </Col>
            ))}
          </Row>

          {filteredCourses.length === 0 && (
            <Card className="empty-state">
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <SearchOutlined
                  style={{
                    fontSize: "48px",
                    color: "#d9d9d9",
                    marginBottom: "16px",
                  }}
                />
                <h3>ไม่พบหลักสูตรที่ค้นหา</h3>
                <p>ลองเปลี่ยนคำค้นหาหรือตัวกรองใหม่</p>
                <Button
                  type="primary"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("all");
                  }}
                >
                  ล้างตัวกรอง
                </Button>
              </div>
            </Card>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="student-courses-page">
      <div className="page-header">
        <h1>หลักสูตรเรียน</h1>
        <p>เลือกหลักสูตรที่เหมาะกับคุณ เริ่มต้นการเรียนรู้และพัฒนาทักษะใหม่ๆ</p>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        className="courses-tabs"
      />
    </div>
  );
};

export default StudentCoursesPage;
