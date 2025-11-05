"use client";

import "@ant-design/v5-patch-for-react-19";
import { useState, useEffect, useCallback } from "react";
import {
  Card,
  Form,
  Button,
  Steps,
  Row,
  Col,
  message,
  Typography,
  Space,
  Progress,
} from "antd";
import {
  BookOutlined,
  UserOutlined,
  FileTextOutlined,
  CheckOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MedicineBoxOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import PageHeader from "@/components/common/PageHeader";
import CourseTypeSelector, {
  CourseType,
} from "@/components/forms/CourseTypeSelector";
import CourseSelector, {
  Course,
  Batch,
} from "@/components/forms/CourseSelector";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import DocumentUploadForm from "@/components/forms/DocumentUploadForm";

const { Text } = Typography;

// Mock data for course types
const courseTypes: CourseType[] = [
  {
    id: "moph",
    name: "หลักสูตรกระทรวงสาธารณสุข",
    ministry: "กระทรวงสาธารณสุข",
    description:
      "หลักสูตรที่ได้รับการรับรองจากกระทรวงสาธารณสุข เน้นการนวดเพื่อการรักษาและฟื้นฟูสุขภาพ",
    features: [
      "ได้รับใบประกาศนียบัตรรับรองจากกระทรวงสาธารณสุข",
      "สามารถประกอบอาชีพนวดเพื่อสุขภาพได้อย่างถูกกฎหมาย",
      "มีเนื้อหาเชิงการแพทย์และกายวิภาค",
      "เรียนรู้เทคนิคการนวดเพื่อบำบัดอาการปวด",
    ],
    icon: <MedicineBoxOutlined />,
    color: "#1890ff",
  },
  {
    id: "moe",
    name: "หลักสูตรกระทรวงศึกษาธิการ",
    ministry: "กระทรวงศึกษาธิการ",
    description:
      "หลักสูตรที่เน้นการเรียนรู้ทักษะและศิลปะการนวดไทย เพื่อการพัฒนาตนเองและอาชีพ",
    features: [
      "ได้รับใบประกาศนียบัตรจากสถาบันการศึกษา",
      "เน้นศิลปะและวัฒนธรรมการนวดไทย",
      "เหมาะสำหรับผู้ที่ต้องการพัฒนาทักษะส่วนตัว",
      "เรียนรู้หลักการและปรัชญาการนวดไทย",
    ],
    icon: <BankOutlined />,
    color: "#52c41a",
  },
];

// Mock data for courses based on course type
const mockCourses: { [key: string]: Course[] } = {
  moph: [
    {
      id: "moph-course-1",
      title: "หลักสูตรนวดไทยเพื่อสุขภาพ (กระทรวงสาธารณสุข)",
      duration: 150,
      price: 15000,
      courseTypeId: "moph",
    },
    {
      id: "moph-course-2",
      title: "หลักสูตรการนวดบำบัดและฟื้นฟู (กระทรวงสาธารณสุข)",
      duration: 180,
      price: 22000,
      courseTypeId: "moph",
    },
  ],
  moe: [
    {
      id: "moe-course-1",
      title: "หลักสูตรนวดไทยเพื่อสุขภาพ (กระทรวงศึกษาธิการ)",
      duration: 120,
      price: 12000,
      courseTypeId: "moe",
    },
    {
      id: "moe-course-2",
      title: "หลักสูตรการนวดอโรม่าเทอราปี (กระทรวงศึกษาธิการ)",
      duration: 100,
      price: 18000,
      courseTypeId: "moe",
    },
  ],
};

// Mock batches - same batches available for both course types
const STATIC_BATCHES: Batch[] = [
  {
    id: 4,
    batchNumber: 33,
    name: "หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 33",
    startDate: "2025-01-15",
    endDate: "2025-04-15",
    maxStudents: 30,
    currentStudents: 8,
    status: "PLANNING",
  },
  {
    id: 5,
    batchNumber: 34,
    name: "หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 34",
    startDate: "2025-05-01",
    endDate: "2025-08-01",
    maxStudents: 30,
    currentStudents: 2,
    status: "PLANNING",
  },
  {
    id: 6,
    batchNumber: 35,
    name: "หลักสูตรการนวดอโรม่าเทอราปี รุ่นที่ 35",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    maxStudents: 25,
    currentStudents: 5,
    status: "PLANNING",
  },
];

export default function StudentApplicationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [selectedCourseType, setSelectedCourseType] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [batchModalOpen, setBatchModalOpen] = useState(false);

  useEffect(() => {
    if (selectedCourseType) {
      setCourses(mockCourses[selectedCourseType] || []);
      setBatches(STATIC_BATCHES);
    } else {
      setCourses([]);
      setBatches([]);
    }
  }, [selectedCourseType]);

  const handleCourseTypeSelect = useCallback(
    (courseTypeId: string) => {
      setSelectedCourseType(courseTypeId);
      setSelectedCourse(null);
      setSelectedBatchId(null);
      form.setFieldValue("courseId", undefined);
      form.setFieldValue("batchId", undefined);
    },
    [form]
  );

  const handleCourseSelect = useCallback(
    (courseId: string) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        setSelectedCourse(course);
        setCourseModalOpen(false);
        form.setFieldValue("courseId", courseId);
        // Reset batch selection when course changes
        setSelectedBatchId(null);
        form.setFieldValue("batchId", undefined);
      }
    },
    [courses, form]
  );

  const handleBatchSelect = useCallback(
    (batchId: number) => {
      setSelectedBatchId(batchId);
      setBatchModalOpen(false);
      form.setFieldValue("batchId", batchId);
    },
    [form]
  );

  const handleNext = async () => {
    try {
      // Validate current step
      if (currentStep === 0) {
        if (!selectedCourseType) {
          message.error("กรุณาเลือกประเภทหลักสูตร");
          return;
        }
        if (!selectedCourse) {
          message.error("กรุณาเลือกหลักสูตร");
          return;
        }
        if (!selectedBatchId) {
          message.error("กรุณาเลือกรุ่นเรียน");
          return;
        }
      } else {
        await form.validateFields();
      }
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error("Validation error:", error);
      message.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Validate required data
      if (!selectedCourseType || !selectedCourse || !selectedBatchId) {
        throw new Error("กรุณาเลือกหลักสูตรและรุ่นเรียน");
      }

      // Simulate API call
      setTimeout(() => {
        message.success(
          "ส่งใบสมัครเรียนสำเร็จ! เจ้าหน้าที่จะติดต่อกลับภายใน 3 วันทำการ"
        );
        form.resetFields();
        setCurrentStep(0);
        setSelectedCourseType("");
        setSelectedCourse(null);
        setSelectedBatchId(null);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      message.error(
        error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการส่งใบสมัคร"
      );
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "เลือกหลักสูตร",
      icon: <BookOutlined />,
      description: "เลือกประเภทและหลักสูตร",
    },
    {
      title: "ข้อมูลส่วนตัว",
      icon: <UserOutlined />,
      description: "กรอกข้อมูลส่วนตัว",
    },
    {
      title: "เอกสารประกอบ",
      icon: <FileTextOutlined />,
      description: "อัปโหลดเอกสาร",
    },
    {
      title: "ยืนยันการสมัคร",
      icon: <CheckOutlined />,
      description: "ตรวจสอบและยืนยัน",
    },
  ];

  const stepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <BookOutlined
                  style={{ marginRight: "8px", color: "#5d4037" }}
                />
                เลือกประเภทหลักสูตรและรุ่นเรียน
              </div>
            }
          >
            <div style={{ marginBottom: selectedCourseType ? 32 : 0 }}>
              <CourseTypeSelector
                courseTypes={courseTypes}
                selectedType={selectedCourseType}
                onSelect={handleCourseTypeSelect}
              />
            </div>

            {selectedCourseType && (
              <CourseSelector
                courses={courses}
                batches={batches}
                selectedCourse={selectedCourse}
                selectedBatchId={selectedBatchId}
                courseModalOpen={courseModalOpen}
                batchModalOpen={batchModalOpen}
                onCourseSelect={handleCourseSelect}
                onBatchSelect={handleBatchSelect}
                onOpenCourseModal={() => setCourseModalOpen(true)}
                onCloseCourseModal={() => setCourseModalOpen(false)}
                onOpenBatchModal={() => setBatchModalOpen(true)}
                onCloseBatchModal={() => setBatchModalOpen(false)}
              />
            )}
          </Card>
        );

      case 1:
        return (
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <UserOutlined
                  style={{ marginRight: "8px", color: "#5d4037" }}
                />
                ข้อมูลส่วนตัว
              </div>
            }
          >
            <PersonalInfoForm />
          </Card>
        );

      case 2:
        return (
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <FileTextOutlined
                  style={{ marginRight: "8px", color: "#5d4037" }}
                />
                เอกสารประกอบ
              </div>
            }
          >
            <DocumentUploadForm />
          </Card>
        );

      case 3:
        return (
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <CheckOutlined
                  style={{ marginRight: "8px", color: "#52c41a" }}
                />
                ตรวจสอบและยืนยันการสมัคร
              </div>
            }
          >
            {/* Summary content */}
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#52c41a15",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  color: "#52c41a",
                  fontSize: "24px",
                }}
              >
                <SafetyCertificateOutlined />
              </div>

              <h3 style={{ color: "#1f2937", marginBottom: "16px" }}>
                ตรวจสอบข้อมูลการสมัครเรียน
              </h3>

              <Text
                type="secondary"
                style={{ fontSize: "16px", lineHeight: "1.6" }}
              >
                กรุณาตรวจสอบข้อมูลทั้งหมดให้ถูกต้องก่อนกดยืนยันการส่งใบสมัคร
                <br />
                หลังจากส่งแล้วจะไม่สามารถแก้ไขได้
              </Text>

              {selectedCourse && (
                <div
                  style={{
                    marginTop: "32px",
                    padding: "20px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    textAlign: "left",
                  }}
                >
                  <h4 style={{ color: "#5d4037", marginBottom: "16px" }}>
                    หลักสูตรที่เลือก:
                  </h4>
                  <p style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
                    {selectedCourse.title}
                  </p>
                  <p style={{ margin: "8px 0 0 0", color: "#6b7280" }}>
                    ระยะเวลา: {selectedCourse.duration} ชั่วโมง | ค่าลงทะเบียน:{" "}
                    {selectedCourse.price.toLocaleString()} บาท
                  </p>
                  {selectedBatchId && (
                    <p style={{ margin: "8px 0 0 0", color: "#6b7280" }}>
                      รุ่นเรียน:{" "}
                      {batches.find((b) => b.id === selectedBatchId)?.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      <PageHeader
        title="สมัครเรียนหลักสูตร"
        description="กรอกข้อมูลเพื่อสมัครเรียนหลักสูตรนวดไทยเพื่อสุขภาพ"
      />

      <Card style={{ marginBottom: 24 }}>
        <Steps current={currentStep} items={steps} size="default" />
      </Card>

      <Card>
        <Form form={form} layout="vertical">
          {stepContent()}
        </Form>

        <Card
          style={{
            marginTop: 24,
            borderTop: "2px solid #f0f0f0",
            backgroundColor: "#fafafa",
          }}
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div style={{ textAlign: "left" }}>
                <Text type="secondary">
                  ขั้นตอนที่ {currentStep + 1} จาก {steps.length} ขั้นตอน
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Progress
                    percent={Math.round(
                      ((currentStep + 1) / steps.length) * 100
                    )}
                    size="small"
                    style={{ width: "200px", maxWidth: "100%" }}
                    strokeColor={{
                      "0%": "#5d4037",
                      "100%": "#8d6e63",
                    }}
                  />
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12}>
              <div style={{ textAlign: "right" }}>
                <Space.Compact size="large">
                  {currentStep > 0 && (
                    <Button
                      icon={<ArrowLeftOutlined />}
                      onClick={handlePrev}
                      style={{ minWidth: "120px" }}
                    >
                      ย้อนกลับ
                    </Button>
                  )}
                  {currentStep < steps.length - 1 && (
                    <Button
                      type="primary"
                      icon={<ArrowRightOutlined />}
                      iconPosition="end"
                      onClick={handleNext}
                      style={{ minWidth: "120px" }}
                    >
                      ถัดไป
                    </Button>
                  )}
                  {currentStep === steps.length - 1 && (
                    <Button
                      type="primary"
                      loading={loading}
                      onClick={handleSubmit}
                      icon={!loading ? <CheckOutlined /> : undefined}
                      size="large"
                      style={{
                        minWidth: "160px",
                        backgroundColor: "#52c41a",
                        borderColor: "#52c41a",
                        boxShadow: "0 2px 8px rgba(82, 196, 26, 0.3)",
                      }}
                    >
                      {loading ? "กำลังส่งใบสมัคร..." : "ส่งใบสมัครเรียน"}
                    </Button>
                  )}
                </Space.Compact>
              </div>
            </Col>
          </Row>
        </Card>
      </Card>
    </div>
  );
}
