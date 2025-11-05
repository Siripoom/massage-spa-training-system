"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Steps,
  Row,
  Col,
  Select,
  DatePicker,
  Upload,
  Card,
  Typography,
  Radio,
  Checkbox,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BookOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import dayjs from "dayjs";
import "../../styles/forms/register-form.css";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface RegisterFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  idCard: string;

  // Address Information
  address: string;
  province: string;
  district: string;
  subdistrict: string;
  postalCode: string;

  // Education & Background
  education: string;
  occupation: string;
  experience: string;

  // Course Selection
  selectedCourse: string;
  learningObjectives: string;

  // Documents
  profilePhoto?: UploadFile[];
  idCardPhoto?: UploadFile[];
  educationCertificate?: UploadFile[];

  // Agreement
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

const steps = [
  {
    title: "ข้อมูลส่วนตัว",
    description: "ข้อมูลพื้นฐานของผู้สมัคร",
    icon: <UserOutlined />,
  },
  {
    title: "ที่อยู่ติดต่อ",
    description: "ข้อมูลที่อยู่และการติดต่อ",
    icon: <HomeOutlined />,
  },
  {
    title: "ข้อมูลการศึกษา",
    description: "ประวัติการศึกษาและประสบการณ์",
    icon: <BookOutlined />,
  },
  {
    title: "เลือกหลักสูตร",
    description: "เลือกหลักสูตรที่ต้องการเรียน",
    icon: <BookOutlined />,
  },
  {
    title: "เอกสารประกอบ",
    description: "อัพโหลดเอกสารที่จำเป็น",
    icon: <FileTextOutlined />,
  },
  {
    title: "ยืนยันข้อมูล",
    description: "ตรวจสอบและยืนยันข้อมูล",
    icon: <CheckCircleOutlined />,
  },
];

const courses = [
  {
    id: "traditional-massage",
    title: "หลักสูตรการนวดแผนไทย",
    description: "เรียนรู้การนวดแผนไทยแบบดั้งเดิม เน้นเส้นลมปราณและการบำบัด",
    duration: "120 ชั่วโมง",
    price: "15,000",
    features: [
      "ทฤษฎีการนวดแผนไทย",
      "การกดจุดและเส้นลมปราณ",
      "การปฏิบัติจริง",
      "ใบประกาศนียบัตร",
    ],
  },
  {
    id: "aromatherapy-massage",
    title: "หลักสูตรการนวดอโรมาเธอราปี",
    description: "การนวดผสมผสานกับน้ำมันหอมระเหย เพื่อการผ่อนคลายและบำบัด",
    duration: "80 ชั่วโมง",
    price: "12,000",
    features: [
      "ความรู้เรื่องน้ำมันหอมระเหย",
      "เทคนิคการนวดเพื่อผ่อนคลาย",
      "การผสมน้ำมันหอมระเหย",
      "ใบประกาศนียบัตร",
    ],
  },
  {
    id: "spa-therapy",
    title: "หลักสูตรสปาเธอราปี",
    description: "การดูแลผิวพรรณและร่างกายแบบครcomprehensive ในสปา",
    duration: "160 ชั่วโมง",
    price: "25,000",
    features: [
      "การดูแลผิวหน้า",
      "บอดี้เทรทเม้นท์",
      "การใช้เครื่องมือสปา",
      "การบริการลูกค้า",
      "ใบประกาศนียบัตร",
    ],
  },
];

const provinces = [
  "กรุงเทพมหานคร",
  "กระบี่",
  "กาญจนบุรี",
  "กาฬสินธุ์",
  "กำแพงเพชร",
  "ขอนแก่น",
  "จันทบุรี",
  "ฉะเชิงเทรา",
  "ชลบุรี",
  "ชัยนาท",
  "ชัยภูมิ",
  "ชุมพร",
  "เชียงราย",
  "เชียงใหม่",
  "ตรัง",
  // เพิ่มจังหวัดอื่นๆ ตามต้องการ
];

export default function RegisterForm() {
  const [form] = Form.useForm<RegisterFormData>();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<UploadFile[]>([]);
  const [idCardPhoto, setIdCardPhoto] = useState<UploadFile[]>([]);
  const [educationCertificate, setEducationCertificate] = useState<
    UploadFile[]
  >([]);

  const handleNext = async () => {
    try {
      // Validate current step fields
      const values = await form.validateFields(getFieldsForStep(currentStep));
      console.log("Step", currentStep, "values:", values);

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.log("Validation failed:", error);
      message.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log("Complete form values:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      message.success("ลงทะเบียนสำเร็จ! ระบบจะติดต่อกลับภายใน 24 ชั่วโมง");

      // Reset form and go to success step
      setCurrentStep(steps.length);
    } catch (error) {
      console.log("Submit failed:", error);
      message.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 0:
        return [
          "firstName",
          "lastName",
          "email",
          "phone",
          "dateOfBirth",
          "gender",
          "idCard",
        ];
      case 1:
        return ["address", "province", "district", "subdistrict", "postalCode"];
      case 2:
        return ["education", "occupation"];
      case 3:
        return ["selectedCourse", "learningObjectives"];
      case 4:
        return []; // File uploads are optional
      case 5:
        return ["agreeTerms", "agreePrivacy"];
      default:
        return [];
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      const isPDF = file.type === "application/pdf";

      if (!isImage && !isPDF) {
        message.error("สามารถอัพโหลดได้เฉพาะไฟล์รูปภาพและ PDF เท่านั้น");
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("ไฟล์ต้องมีขนาดไม่เกิน 2MB");
        return false;
      }

      return false; // Prevent auto upload
    },
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderAddressInfo();
      case 2:
        return renderEducationInfo();
      case 3:
        return renderCourseSelection();
      case 4:
        return renderDocuments();
      case 5:
        return renderConfirmation();
      default:
        return renderSuccess();
    }
  };

  const renderPersonalInfo = () => (
    <div className="step-content fade-in">
      <div className="form-section">
        <Title level={4} className="form-section-title">
          <UserOutlined />
          ข้อมูลส่วนตัว
        </Title>

        <div className="personal-info-grid">
          <Form.Item
            name="firstName"
            label="ชื่อ"
            rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="ชื่อ" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="นามสกุล"
            rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="นามสกุล" />
          </Form.Item>

          <Form.Item
            name="email"
            label="อีเมล"
            rules={[
              { required: true, message: "กรุณากรอกอีเมล" },
              { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="เบอร์โทรศัพท์"
            rules={[
              { required: true, message: "กรุณากรอกเบอร์โทรศัพท์" },
              {
                pattern: /^[0-9]{10}$/,
                message: "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="0812345678" />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="วันเกิด"
            rules={[{ required: true, message: "กรุณาเลือกวันเกิด" }]}
          >
            <DatePicker
              className="w-full"
              placeholder="เลือกวันเกิด"
              format="DD/MM/YYYY"
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="เพศ"
            rules={[{ required: true, message: "กรุณาเลือกเพศ" }]}
          >
            <Select placeholder="เลือกเพศ">
              <Option value="male">ชาย</Option>
              <Option value="female">หญิง</Option>
              <Option value="other">อื่นๆ</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="idCard"
            label="เลขบัตรประชาชน"
            rules={[
              { required: true, message: "กรุณากรอกเลขบัตรประชาชน" },
              {
                pattern: /^[0-9]{13}$/,
                message: "เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก",
              },
            ]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="1234567890123" />
          </Form.Item>
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="step-content fade-in">
      <div className="form-section">
        <Title level={4} className="form-section-title">
          <HomeOutlined />
          ที่อยู่ติดต่อ
        </Title>

        <div className="contact-info-grid">
          <Form.Item
            name="address"
            label="ที่อยู่"
            rules={[{ required: true, message: "กรุณากรอกที่อยู่" }]}
            className="col-span-2"
          >
            <TextArea rows={3} placeholder="บ้านเลขที่ หมู่ ซอย ถนน" />
          </Form.Item>

          <Form.Item
            name="province"
            label="จังหวัด"
            rules={[{ required: true, message: "กรุณาเลือกจังหวัด" }]}
          >
            <Select placeholder="เลือกจังหวัด" showSearch>
              {provinces.map((province) => (
                <Option key={province} value={province}>
                  {province}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="district"
            label="อำเภอ/เขต"
            rules={[{ required: true, message: "กรุณากรอกอำเภอ/เขต" }]}
          >
            <Input placeholder="อำเภอ/เขต" />
          </Form.Item>

          <Form.Item
            name="subdistrict"
            label="ตำบล/แขวง"
            rules={[{ required: true, message: "กรุณากรอกตำบล/แขวง" }]}
          >
            <Input placeholder="ตำบล/แขวง" />
          </Form.Item>

          <Form.Item
            name="postalCode"
            label="รหัสไปรษณีย์"
            rules={[
              { required: true, message: "กรุณากรอกรหัสไปรษณีย์" },
              {
                pattern: /^[0-9]{5}$/,
                message: "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก",
              },
            ]}
          >
            <Input placeholder="12345" />
          </Form.Item>
        </div>
      </div>
    </div>
  );

  const renderEducationInfo = () => (
    <div className="step-content fade-in">
      <div className="form-section">
        <Title level={4} className="form-section-title">
          <BookOutlined />
          ข้อมูลการศึกษาและประสบการณ์
        </Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="education"
              label="ระดับการศึกษา"
              rules={[{ required: true, message: "กรุณาเลือกระดับการศึกษา" }]}
            >
              <Select placeholder="เลือกระดับการศึกษา">
                <Option value="primary">ประถมศึกษา</Option>
                <Option value="secondary">มัธยมศึกษา</Option>
                <Option value="vocational">ปวช./ปวส.</Option>
                <Option value="bachelor">ปริญญาตรี</Option>
                <Option value="master">ปริญญาโท</Option>
                <Option value="doctorate">ปริญญาเอก</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="occupation"
              label="อาชีพปัจจุบัน"
              rules={[{ required: true, message: "กรุณากรอกอาชีพปัจจุบัน" }]}
            >
              <Input placeholder="อาชีพปัจจุบัน" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name="experience"
              label="ประสบการณ์ที่เกี่ยวข้อง (ถ้ามี)"
            >
              <TextArea
                rows={4}
                placeholder="อธิบายประสบการณ์ที่เกี่ยวข้องกับการนวดหรือสปา หากไม่มีให้เว้นว่างไว้"
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  );

  const renderCourseSelection = () => (
    <div className="step-content fade-in">
      <div className="form-section">
        <Title level={4} className="form-section-title">
          <BookOutlined />
          เลือกหลักสูตรที่ต้องการเรียน
        </Title>

        <Form.Item
          name="selectedCourse"
          rules={[{ required: true, message: "กรุณาเลือกหลักสูตร" }]}
        >
          <Radio.Group className="w-full">
            <div className="course-cards">
              {courses.map((course) => (
                <div key={course.id} className="course-card">
                  <Radio value={course.id} className="w-full">
                    <div className="course-card-content">
                      <div className="course-card-header">
                        <h3 className="course-card-title">{course.title}</h3>
                        <span className="course-card-price">
                          ฿{course.price}
                        </span>
                      </div>

                      <p className="course-card-description">
                        {course.description}
                      </p>

                      <div className="mb-3">
                        <Text strong>ระยะเวลา: </Text>
                        <Text>{course.duration}</Text>
                      </div>

                      <ul className="course-card-features">
                        {course.features.map((feature, index) => (
                          <li key={index}>
                            <CheckCircleOutlined />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Radio>
                </div>
              ))}
            </div>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="learningObjectives"
          label="วัตถุประสงค์ในการเรียน"
          rules={[
            { required: true, message: "กรุณาระบุวัตถุประสงค์ในการเรียน" },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="โปรดระบุวัตถุประสงค์และเป้าหมายในการเรียนหลักสูตรนี้"
          />
        </Form.Item>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="step-content fade-in">
      <div className="form-section">
        <Title level={4} className="form-section-title">
          <FileTextOutlined />
          เอกสารประกอบการสมัคร
        </Title>

        <Text className="text-gray-600 block mb-6">
          อัพโหลดเอกสารที่จำเป็น (ไฟล์รูปภาพหรือ PDF ขนาดไม่เกิน 2MB)
        </Text>

        <Row gutter={[16, 24]}>
          <Col xs={24} md={8}>
            <Form.Item
              label="รูปถ่าย (ไม่บังคับ)"
              help="รูปถ่ายหน้าตรงขนาด 1x1.5 นิ้ว"
            >
              <Upload
                {...uploadProps}
                fileList={profilePhoto}
                onChange={({ fileList }) => setProfilePhoto(fileList)}
                listType="picture-card"
                maxCount={1}
              >
                {profilePhoto.length < 1 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>รูปถ่าย</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="สำเนาบัตรประชาชน"
              help="สำเนาบัตรประชาชนที่ชัดเจน"
              rules={[
                { required: true, message: "กรุณาอัพโหลดสำเนาบัตรประชาชน" },
              ]}
            >
              <Upload
                {...uploadProps}
                fileList={idCardPhoto}
                onChange={({ fileList }) => setIdCardPhoto(fileList)}
                listType="picture-card"
                maxCount={1}
              >
                {idCardPhoto.length < 1 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>บัตรประชาชน</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="ประกาศนียบัตร (ไม่บังคับ)"
              help="สำเนาประกาศนียบัตรการศึกษา"
            >
              <Upload
                {...uploadProps}
                fileList={educationCertificate}
                onChange={({ fileList }) => setEducationCertificate(fileList)}
                listType="picture-card"
                maxCount={1}
              >
                {educationCertificate.length < 1 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>ประกาศนียบัตร</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="step-content fade-in">
      <div className="form-section">
        <Title level={4} className="form-section-title">
          <CheckCircleOutlined />
          ยืนยันข้อมูลและข้อตกลง
        </Title>

        <Card className="mb-6 bg-blue-50 border-blue-200">
          <Title level={5}>สรุปข้อมูลการสมัคร</Title>
          <div className="space-y-2">
            <div>
              <strong>ชื่อ-นามสกุล:</strong> {form.getFieldValue("firstName")}{" "}
              {form.getFieldValue("lastName")}
            </div>
            <div>
              <strong>อีเมล:</strong> {form.getFieldValue("email")}
            </div>
            <div>
              <strong>เบอร์โทร:</strong> {form.getFieldValue("phone")}
            </div>
            <div>
              <strong>หลักสูตร:</strong>{" "}
              {
                courses.find(
                  (c) => c.id === form.getFieldValue("selectedCourse")
                )?.title
              }
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Form.Item
            name="agreeTerms"
            valuePropName="checked"
            rules={[
              { required: true, message: "กรุณายอมรับเงื่อนไขการใช้บริการ" },
            ]}
          >
            <Checkbox>
              ฉันได้อ่านและยอมรับ{" "}
              <a href="#" className="text-blue-600 hover:underline">
                เงื่อนไขการใช้บริการ
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item
            name="agreePrivacy"
            valuePropName="checked"
            rules={[
              { required: true, message: "กรุณายอมรับนโยบายความเป็นส่วนตัว" },
            ]}
          >
            <Checkbox>
              ฉันยอมรับ{" "}
              <a href="#" className="text-blue-600 hover:underline">
                นโยบายความเป็นส่วนตัว
              </a>{" "}
              และการใช้ข้อมูลส่วนบุคคล
            </Checkbox>
          </Form.Item>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="form-success fade-in">
      <CheckCircleOutlined className="success-icon" />
      <Title level={2} className="success-title">
        ลงทะเบียนสำเร็จ!
      </Title>
      <Text className="success-message">
        ขอบคุณที่สมัครเรียนกับเรา ระบบได้บันทึกข้อมูลของท่านเรียบร้อยแล้ว
        <br />
        เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมง เพื่อยืนยันการสมัครและชำระเงิน
      </Text>
      <div className="success-actions">
        <Button
          type="primary"
          size="large"
          onClick={() => (window.location.href = "/login")}
        >
          เข้าสู่ระบบ
        </Button>
        <Button size="large" onClick={() => (window.location.href = "/")}>
          กลับหน้าหลัก
        </Button>
      </div>
    </div>
  );

  if (currentStep >= steps.length) {
    return renderSuccess();
  }

  return (
    <div className="register-form-container">
      <Form form={form} layout="vertical" size="large">
        {/* Progress Steps */}
        <div className="register-form-steps">
          <Steps
            current={currentStep}
            size="small"
            items={steps}
            className="mb-8"
          />
        </div>

        {/* Progress Bar */}
        <div className="form-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="progress-text">
            <span>
              ขั้นตอนที่ {currentStep + 1} จาก {steps.length}
            </span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="register-form-step">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="form-navigation">
          <Button
            className="nav-button nav-button-default"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            ย้อนกลับ
          </Button>

          <div className="flex gap-4">
            {currentStep === steps.length - 1 ? (
              <Button
                type="primary"
                className="nav-button nav-button-primary"
                onClick={handleSubmit}
                loading={loading}
              >
                ส่งใบสมัคร
              </Button>
            ) : (
              <Button
                type="primary"
                className="nav-button nav-button-primary"
                onClick={handleNext}
              >
                ถัดไป
              </Button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
}
