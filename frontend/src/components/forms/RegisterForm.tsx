"use client";

import React, { useState } from "react";
import {
  Form,
  Button,
  Steps,
  Card,
  Typography,
  message,
  Row,
  Col,
  Space,
  Progress,
  Checkbox,
  Divider,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import PersonalInfoForm from "./PersonalInfoForm";
import DocumentUploadForm from "./DocumentUploadForm";
import "../../styles/forms/register-form.css";

const { Title, Text } = Typography;

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
  learningObjectives: string;

  // Documents
  idCardFile?: File[];
  educationFile?: File[];
  photoFile?: File[];
  medicalFile?: File[];

  // Agreement
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

const steps = [
  {
    title: "ข้อมูลส่วนตัว",
    description: "ข้อมูลพื้นฐานและที่อยู่",
    icon: <UserOutlined />,
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

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSubmit, 
  isLoading = false 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleNext = async () => {
    try {
      // Validate current step fields
      const fieldsToValidate = getFieldsForStep(currentStep);
      await form.validateFields(fieldsToValidate);
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      console.error('Validation error:', error);
      message.error('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      
      // Check agreement
      if (!values.agreeTerms || !values.agreePrivacy) {
        throw new Error('กรุณายอมรับข้อตกลงและนโยบายความเป็นส่วนตัว');
      }

      if (onSubmit) {
        await onSubmit(values as RegisterFormData);
      } else {
        // Default behavior - simulate registration
        setTimeout(() => {
          message.success('สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี');
          form.resetFields();
          setCurrentStep(0);
          setSubmitting(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
      setSubmitting(false);
    }
  };

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 0:
        return [
          'titleName', 'firstName', 'lastName', 'idCard', 'dateOfBirth', 
          'gender', 'phone', 'email', 'address', 'province', 'district', 
          'subdistrict', 'postalCode', 'education', 'occupation', 'learningObjectives'
        ];
      case 1:
        return ['idCardFile', 'educationFile'];
      default:
        return [];
    }
  };

  const stepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <UserOutlined style={{ marginRight: '8px', color: '#5d4037' }} />
                ข้อมูลส่วนตัวและที่อยู่
              </div>
            }
          >
            <PersonalInfoForm />
          </Card>
        );

      case 1:
        return (
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FileTextOutlined style={{ marginRight: '8px', color: '#5d4037' }} />
                เอกสารประกอบ
              </div>
            }
          >
            <DocumentUploadForm />
          </Card>
        );

      case 2:
        return (
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                ตรวจสอบและยืนยันข้อมูล
              </div>
            }
          >
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#52c41a15',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: '#52c41a',
                fontSize: '24px'
              }}>
                <CheckCircleOutlined />
              </div>
              
              <Title level={3} style={{ color: '#1f2937', marginBottom: '16px' }}>
                ตรวจสอบข้อมูลการสมัครสมาชิก
              </Title>
              
              <Text type="secondary" style={{ fontSize: '16px', lineHeight: '1.6', display: 'block', marginBottom: '32px' }}>
                กรุณาตรวจสอบข้อมูลทั้งหมดให้ถูกต้องก่อนกดยืนยันการสมัครสมาชิก<br />
                หลังจากสมัครแล้วจะต้องยืนยันอีเมลก่อนใช้งาน
              </Text>

              <Divider />

              <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                <Form.Item
                  name="agreeTerms"
                  valuePropName="checked"
                  rules={[
                    { required: true, message: 'กรุณายอมรับข้อตกลงการใช้งาน' }
                  ]}
                >
                  <Checkbox>
                    ฉันยอมรับ{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      ข้อตกลงการใช้งาน
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  name="agreePrivacy"
                  valuePropName="checked"
                  rules={[
                    { required: true, message: 'กรุณายอมรับนโยบายความเป็นส่วนตัว' }
                  ]}
                >
                  <Checkbox>
                    ฉันยอมรับ{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      นโยบายความเป็นส่วนตัว
                    </a>
                  </Checkbox>
                </Form.Item>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="register-form-container">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
        <Card style={{ marginBottom: 24 }}>
          <Steps
            current={currentStep}
            items={steps}
            size="default"
          />
        </Card>
        
        <Form form={form} layout="vertical">
          {stepContent()}
        </Form>

        <Card 
          style={{ 
            marginTop: 24, 
            borderTop: '2px solid #f0f0f0',
            backgroundColor: '#fafafa'
          }}
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div style={{ textAlign: 'left' }}>
                <Text type="secondary">
                  ขั้นตอนที่ {currentStep + 1} จาก {steps.length} ขั้นตอน
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Progress 
                    percent={Math.round(((currentStep + 1) / steps.length) * 100)} 
                    size="small" 
                    style={{ width: '200px', maxWidth: '100%' }}
                    strokeColor={{
                      '0%': '#5d4037',
                      '100%': '#8d6e63',
                    }}
                  />
                </div>
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div style={{ textAlign: 'right' }}>
                <Space.Compact size="large">
                  {currentStep > 0 && (
                    <Button 
                      icon={<ArrowLeftOutlined />}
                      onClick={handlePrev}
                      style={{ minWidth: '120px' }}
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
                      style={{ minWidth: '120px' }}
                    >
                      ถัดไป
                    </Button>
                  )}
                  {currentStep === steps.length - 1 && (
                    <Button 
                      type="primary" 
                      loading={submitting || isLoading} 
                      onClick={handleSubmit}
                      icon={!submitting && !isLoading ? <CheckCircleOutlined /> : undefined}
                      size="large"
                      style={{ 
                        minWidth: '160px',
                        backgroundColor: '#52c41a',
                        borderColor: '#52c41a',
                        boxShadow: '0 2px 8px rgba(82, 196, 26, 0.3)'
                      }}
                    >
                      {submitting || isLoading ? 'กำลังสมัครสมาชิก...' : 'ยืนยันการสมัครสมาชิก'}
                    </Button>
                  )}
                </Space.Compact>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
