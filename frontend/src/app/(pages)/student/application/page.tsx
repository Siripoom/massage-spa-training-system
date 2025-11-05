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
  CheckOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MedicineBoxOutlined,
  BankOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import PageHeader from "@/components/common/PageHeader";
import CourseTypeSelector, {
  CourseType,
} from "@/components/forms/CourseTypeSelector";
import SimpleCourseSelector, {
  Course,
} from "@/components/forms/SimpleCourseSelector";
import PaymentSelector from "@/components/forms/PaymentSelector";

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

export default function StudentApplicationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [selectedCourseType, setSelectedCourseType] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);

  useEffect(() => {
    if (selectedCourseType) {
      setCourses(mockCourses[selectedCourseType] || []);
    } else {
      setCourses([]);
    }
  }, [selectedCourseType]);

  const handleCourseTypeSelect = useCallback(
    (courseTypeId: string) => {
      setSelectedCourseType(courseTypeId);
      setSelectedCourse(null);
      form.setFieldValue("courseId", undefined);
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
      }
    },
    [courses, form]
  );

  const handlePaymentTypeSelect = useCallback(
    (paymentType: string) => {
      setSelectedPaymentType(paymentType);
      form.setFieldValue("paymentType", paymentType);
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
      } else if (currentStep === 1) {
        if (!selectedPaymentType) {
          message.error("กรุณาเลือกวิธีการชำระเงิน");
          return;
        }
        // Validate payment proof if payment type is selected
        const paymentProof = form.getFieldValue("paymentProof");
        if (!paymentProof || paymentProof.length === 0) {
          message.error("กรุณาอัปโหลดหลักฐานการชำระเงิน");
          return;
        }
        // After payment validation, submit the application
        await handleSubmit();
        return;
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
      await form.validateFields();

      // Validate required data
      if (!selectedCourseType || !selectedCourse) {
        throw new Error("กรุณาเลือกหลักสูตร");
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
        setSelectedPaymentType("");
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
      title: "การชำระเงิน",
      icon: <DollarOutlined />,
      description: "เลือกวิธีการชำระเงิน",
    },
    {
      title: "เสร็จสิ้น",
      icon: <CheckOutlined />,
      description: "ลงทะเบียนเสร็จสิ้น",
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
                เลือกประเภทและหลักสูตร
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
              <SimpleCourseSelector
                courses={courses}
                selectedCourse={selectedCourse}
                courseModalOpen={courseModalOpen}
                onCourseSelect={handleCourseSelect}
                onOpenCourseModal={() => setCourseModalOpen(true)}
                onCloseCourseModal={() => setCourseModalOpen(false)}
              />
            )}
          </Card>
        );

      case 1:
        return (
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <DollarOutlined
                  style={{ marginRight: "8px", color: "#5d4037" }}
                />
                การชำระเงิน
              </div>
            }
          >
            <PaymentSelector
              course={selectedCourse || undefined}
              selectedPaymentType={selectedPaymentType}
              onPaymentTypeSelect={handlePaymentTypeSelect}
            />
          </Card>
        );

      case 2:
        return (
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <CheckOutlined
                  style={{ marginRight: "8px", color: "#52c41a" }}
                />
                ลงทะเบียนเสร็จสิ้น
              </div>
            }
          >
            {/* Success content */}
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#52c41a15",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  color: "#52c41a",
                  fontSize: "32px",
                }}
              >
                <CheckOutlined />
              </div>

              <h2 style={{ color: "#52c41a", marginBottom: "16px" }}>
                🎉 ลงทะเบียนเสร็จสิ้น!
              </h2>

              <Text
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  color: "#1f2937",
                  display: "block",
                  marginBottom: "24px",
                }}
              >
                ขอบคุณที่สมัครเรียนกับเรา!
                <br />
                เจ้าหน้าที่จะติดต่อกลับภายใน 3 วันทำการ
              </Text>

              {selectedCourse && (
                <>
                  <div
                    style={{
                      marginTop: "32px",
                      padding: "24px",
                      backgroundColor: "#f8fafc",
                      borderRadius: "12px",
                      textAlign: "left",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <h4
                      style={{
                        color: "#5d4037",
                        marginBottom: "16px",
                        textAlign: "center",
                      }}
                    >
                      📚 สรุปการลงทะเบียน
                    </h4>

                    <div style={{ marginBottom: "16px" }}>
                      <Text strong style={{ color: "#374151" }}>
                        หลักสูตร:
                      </Text>
                      <br />
                      <Text style={{ fontSize: "16px", color: "#1f2937" }}>
                        {selectedCourse.title}
                      </Text>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <Text strong style={{ color: "#374151" }}>
                        ระยะเวลา:
                      </Text>
                      <Text style={{ marginLeft: "8px", color: "#6b7280" }}>
                        {selectedCourse.duration} ชั่วโมง
                      </Text>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <Text strong style={{ color: "#374151" }}>
                        ค่าลงทะเบียน:
                      </Text>
                      <Text style={{ marginLeft: "8px", color: "#6b7280" }}>
                        {selectedCourse.price.toLocaleString()} บาท
                      </Text>
                    </div>

                    {selectedPaymentType && (
                      <div>
                        <Text strong style={{ color: "#374151" }}>
                          วิธีการชำระเงิน:
                        </Text>
                        <br />
                        <Text style={{ color: "#1890ff" }}>
                          {selectedPaymentType === "full" &&
                            "💰 จ่ายเต็มจำนวน (ได้รับส่วนลด 5%)"}
                          {selectedPaymentType === "partial" &&
                            "💳 จ่ายบางส่วน 20% (ค่าธรรมเนียม 2%)"}
                          {selectedPaymentType === "installment" &&
                            "📅 แบ่งจ่ายเป็นงวด (ค่าธรรมเนียม 3%)"}
                        </Text>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: "24px",
                      padding: "20px",
                      backgroundColor: "#f0f8ff",
                      borderRadius: "12px",
                      border: "1px solid #bae7ff",
                    }}
                  >
                    <h4
                      style={{
                        color: "#1890ff",
                        marginBottom: "12px",
                        textAlign: "center",
                      }}
                    >
                      📞 ขั้นตอนถัดไป
                    </h4>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "20px",
                        color: "#374151",
                      }}
                    >
                      <li>เจ้าหน้าที่จะตรวจสอบการชำระเงิน</li>
                      <li>จะมีการติดต่อเพื่อยืนยันการลงทะเบียน</li>
                      <li>แจ้งรายละเอียดเพิ่มเติมเกี่ยวกับการเรียน</li>
                      <li>ส่งข้อมูลเกี่ยวกับวันเริ่มเรียนและสถานที่</li>
                    </ul>
                  </div>
                </>
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
