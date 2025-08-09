'use client';

import '@ant-design/v5-patch-for-react-19';
import { useState, useEffect } from 'react';
import { Card, Form, Input, Select, DatePicker, Upload, Button, Steps, Row, Col, message, Divider, Typography, Radio, Checkbox, Tooltip, Alert, Progress, Space, Modal } from 'antd';
import { UploadOutlined, UserOutlined, FileTextOutlined, CheckOutlined, BookOutlined, InfoCircleOutlined, SafetyCertificateOutlined, CalendarOutlined, PhoneOutlined, MailOutlined, BankOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import PageHeader from '@/components/common/PageHeader';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;
const { Step } = Steps;

// Static mock data to prevent hydration mismatches and circular references
const getMockBatches = () => [
  {
    id: 4,
    batchNumber: 33,
    name: 'หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 33',
    startDate: '2025-01-15',
    endDate: '2025-04-15',
    maxStudents: 30,
    currentStudents: 8,
    status: 'PLANNING'
  },
  {
    id: 5,
    batchNumber: 34,
    name: 'หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 34',
    startDate: '2025-05-01',
    endDate: '2025-08-01',
    maxStudents: 30,
    currentStudents: 2,
    status: 'PLANNING'
  }
];

// Mock data based on old system
const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'หลักสูตรนวดไทยเพื่อสุขภาพ',
    duration: 150,
    price: 15000
  },
  {
    id: 'course-2',
    title: 'หลักสูตรการนวดอโรม่าเทอราปี',
    duration: 120,
    price: 18000
  },
  {
    id: 'course-3',
    title: 'หลักสูตรนวดบำบัดและฟื้นฟู',
    duration: 180,
    price: 22000
  }
];



interface Course {
  id: string;
  title: string;
  duration: number;
  price: number;
}

interface Batch {
  id: number;
  batchNumber: number;
  name: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  status: string;
}

export default function StudentApplicationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [courses, setCourses] = useState<Course[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setCourses(mockCourses);
          setBatches(getMockBatches());
        }, 500);
      } catch (error) {
        console.error('Error loading data:', error);
        message.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
    };
    
    loadData();
  }, []);

  const handleCourseChange = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course || null);
    
    // Filter batches for selected course
    const allBatches = getMockBatches();
    const courseBatches = allBatches.filter((b: Batch) => 
      course?.title.includes('นวดไทยเพื่อสุขภาพ') ? b.name.includes('นวดไทยเพื่อสุขภาพ') : false
    );
    setBatches(courseBatches);
    
    // Reset batch selection
    form.setFieldValue('batchId', undefined);
  };

  const openCourseModal = () => {
    setCourseModalOpen(true);
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    form.setFieldValue('courseId', courseId);
    handleCourseChange(courseId);
    setCourseModalOpen(false);
  };

  const closeCourseModal = () => {
    setCourseModalOpen(false);
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch {
      message.error('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _values = await form.validateFields();
      
      // Simulate API call
      setTimeout(() => {
        message.success('ส่งใบสมัครเรียนสำเร็จ! เจ้าหน้าที่จะติดต่อกลับภายใน 3 วันทำการ');
        form.resetFields();
        setCurrentStep(0);
        setSelectedCourse(null);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      message.error('เกิดข้อผิดพลาดในการส่งใบสมัคร');
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'เลือกหลักสูตร',
      icon: <BookOutlined />,
      description: 'เลือกหลักสูตรและรุ่นเรียน'
    },
    {
      title: 'ข้อมูลส่วนตัว',
      icon: <UserOutlined />,
      description: 'กรอกข้อมูลส่วนตัว'
    },
    {
      title: 'เอกสารประกอบ',
      icon: <FileTextOutlined />,
      description: 'อัปโหลดเอกสาร'
    },
    {
      title: 'ยืนยันการสมัคร',
      icon: <CheckOutlined />,
      description: 'ตรวจสอบและยืนยัน'
    }
  ];

  const stepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BookOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                เลือกหลักสูตรและรุ่นเรียน
              </div>
            }
            extra={
              <Tooltip title="เลือกหลักสูตรที่ต้องการสมัครเรียน">
                <InfoCircleOutlined style={{ color: '#1890ff' }} />
              </Tooltip>
            }
          >
            <Alert
              message="ข้อมูลสำคัญ"
              description="กรุณาเลือกหลักสูตรและรุ่นเรียนที่ต้องการ หลังจากส่งใบสมัครแล้วจะไม่สามารถเปลี่ยนแปลงได้"
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />
            
            <Form.Item
              name="courseId"
              label={
                <span style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <BookOutlined style={{ color: '#3b82f6' }} />
                  หลักสูตรที่สนใจ
                </span>
              }
              rules={[{ required: true, message: 'กรุณาเลือกหลักสูตร' }]}
              style={{ marginBottom: '32px' }}
            >
              <Button
                size="large"
                onClick={openCourseModal}
                style={{
                  width: '100%',
                  height: '56px',
                  borderRadius: '12px',
                  border: selectedCourse ? '1px solid #3b82f6' : '1px solid #d9d9d9',
                  backgroundColor: selectedCourse ? '#f0f8ff' : 'white',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {selectedCourse ? (
                    <>
                      <BookOutlined style={{ color: '#3b82f6', fontSize: '18px' }} />
                      <div>
                        <div style={{ 
                          fontSize: '16px', 
                          fontWeight: 'bold',
                          color: '#1f2937',
                          marginBottom: '2px'
                        }}>
                          {selectedCourse.title}
                        </div>
                        <div style={{ 
                          fontSize: '14px', 
                          color: '#6b7280'
                        }}>
                          {selectedCourse.duration} ชั่วโมง • ฿{selectedCourse.price.toLocaleString()}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <BookOutlined style={{ color: '#9ca3af', fontSize: '18px' }} />
                      <span style={{ color: '#9ca3af', fontSize: '16px' }}>
                        🔍 คลิกเพื่อเลือกหลักสูตรที่ต้องการสมัคร...
                      </span>
                    </>
                  )}
                </div>
                <ArrowRightOutlined 
                  style={{ 
                    color: selectedCourse ? '#3b82f6' : '#9ca3af', 
                    fontSize: '16px',
                    transform: courseModalOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }} 
                />
              </Button>
            </Form.Item>

            {/* Course Selection Modal */}
            <Modal
              title={
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937'
                }}>
                  <BookOutlined style={{ color: '#3b82f6', fontSize: '24px' }} />
                  เลือกหลักสูตรที่ต้องการสมัคร
                </div>
              }
              open={courseModalOpen}
              onCancel={closeCourseModal}
              footer={null}
              width={800}
              style={{ top: 20 }}
              styles={{
                body: { 
                  padding: '24px',
                  maxHeight: '70vh',
                  overflowY: 'auto'
                }
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <Alert
                  message="เลือกหลักสูตรที่เหมาะกับคุณ"
                  description="เปรียบเทียบหลักสูตรด้านล่างและเลือกหลักสูตรที่ตรงกับความต้องการของคุณ"
                  type="info"
                  showIcon
                />
              </div>
              
              <Row gutter={[16, 16]}>
                {courses.map(course => (
                  <Col xs={24} lg={12} key={course.id}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: '16px',
                        border: selectedCourseId === course.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                        boxShadow: selectedCourseId === course.id ? '0 8px 30px rgba(59, 130, 246, 0.2)' : '0 2px 8px rgba(0,0,0,0.06)',
                        transition: 'all 0.3s ease',
                        background: selectedCourseId === course.id ? 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)' : 'white'
                      }}
                      styles={{ body: { padding: '24px' } }}
                    >
                      <div 
                        style={{ textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}
                        onClick={() => handleCourseSelect(course.id)}
                      >
                        <div style={{
                          width: '80px',
                          height: '80px',
                          backgroundColor: selectedCourseId === course.id ? '#3b82f6' : '#f8fafc',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px',
                          fontSize: '36px',
                          transition: 'all 0.3s ease'
                        }}>
                          {selectedCourseId === course.id ? '✅' : '📚'}
                        </div>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: selectedCourseId === course.id ? '#1e40af' : '#1f2937',
                          marginBottom: '8px',
                          lineHeight: '1.4'
                        }}>
                          {course.title}
                        </div>
                      </div>

                      <div style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => handleCourseSelect(course.id)}>
                        <Row gutter={[8, 12]}>
                          <Col span={24}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '8px 12px',
                              backgroundColor: selectedCourseId === course.id ? 'rgba(59, 130, 246, 0.1)' : '#f8fafc',
                              borderRadius: '8px'
                            }}>
                              <span style={{ fontSize: '18px' }}>⏰</span>
                              <span style={{ fontWeight: '600', color: '#374151' }}>
                                จำนวนชั่วโมง: {course.duration} ชั่วโมง
                              </span>
                            </div>
                          </Col>
                          <Col span={24}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '8px 12px',
                              backgroundColor: selectedCourseId === course.id ? 'rgba(59, 130, 246, 0.1)' : '#f8fafc',
                              borderRadius: '8px'
                            }}>
                              <span style={{ fontSize: '18px' }}>💰</span>
                              <span style={{ fontWeight: '600', color: '#374151' }}>
                                ค่าธรรมเนียม: ฿{course.price.toLocaleString()}
                              </span>
                            </div>
                          </Col>
                          <Col span={24}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '8px 12px',
                              backgroundColor: selectedCourseId === course.id ? 'rgba(34, 197, 94, 0.1)' : '#f0fdf4',
                              borderRadius: '8px'
                            }}>
                              <span style={{ fontSize: '18px' }}>🎯</span>
                              <span style={{ fontWeight: '600', color: '#059669' }}>
                                หลักสูตรแนะนำ
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <Button
                        type={selectedCourseId === course.id ? "primary" : "default"}
                        size="large"
                        style={{
                          width: '100%',
                          borderRadius: '12px',
                          fontWeight: '600',
                          height: '48px',
                          backgroundColor: selectedCourseId === course.id ? '#3b82f6' : 'white',
                          borderColor: selectedCourseId === course.id ? '#3b82f6' : '#d1d5db',
                          boxShadow: selectedCourseId === course.id ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCourseSelect(course.id);
                        }}
                      >
                        {selectedCourseId === course.id ? '✅ เลือกแล้ว' : 'เลือกหลักสูตรนี้'}
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Modal>

            {selectedCourse && (
              <>
                <Divider orientation="left" style={{ 
                  borderColor: '#3b82f6',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  <span style={{ color: '#3b82f6' }}>📋 รายละเอียดหลักสูตร</span>
                </Divider>
                <Card 
                  size="small" 
                  style={{ 
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    marginBottom: 32,
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)'
                  }}
                  styles={{ body: { padding: '24px' } }}
                >
                  <Row gutter={[24, 24]}>
                    <Col xs={24} sm={8}>
                      <div style={{ 
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: '#3b82f6',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px',
                          color: 'white',
                          fontSize: '20px'
                        }}>
                          📚
                        </div>
                        <div style={{ 
                          fontWeight: 'bold',
                          fontSize: '14px',
                          color: '#6b7280',
                          marginBottom: '8px'
                        }}>
                          ชื่อหลักสูตร
                        </div>
                        <div style={{ 
                          color: '#1f2937',
                          fontSize: '15px',
                          fontWeight: '600',
                          lineHeight: '1.4'
                        }}>
                          {selectedCourse.title}
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div style={{ 
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: '#10b981',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px',
                          color: 'white',
                          fontSize: '20px'
                        }}>
                          ⏰
                        </div>
                        <div style={{ 
                          fontWeight: 'bold',
                          fontSize: '14px',
                          color: '#6b7280',
                          marginBottom: '8px'
                        }}>
                          จำนวนชั่วโมง
                        </div>
                        <div style={{ 
                          color: '#1f2937',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}>
                          {selectedCourse.duration} ชั่วโมง
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div style={{ 
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: '#f59e0b',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px',
                          color: 'white',
                          fontSize: '20px'
                        }}>
                          💰
                        </div>
                        <div style={{ 
                          fontWeight: 'bold',
                          fontSize: '14px',
                          color: '#6b7280',
                          marginBottom: '8px'
                        }}>
                          ค่าธรรมเนียม
                        </div>
                        <div style={{ 
                          color: '#f59e0b', 
                          fontSize: '20px', 
                          fontWeight: 'bold'
                        }}>
                          ฿{selectedCourse.price.toLocaleString()}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </>
            )}

            <Form.Item
              name="batchId"
              label={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>รุ่นที่ต้องการสมัคร</span>}
              rules={[{ required: true, message: 'กรุณาเลือกรุ่นเรียน' }]}
              style={{ marginTop: 24 }}
            >
              <Select 
                placeholder="เลือกรุ่นเรียน"
                size="large"
                disabled={!selectedCourse}
                showSearch
                optionFilterProp="children"
                style={{ 
                  borderRadius: '8px',
                }}
                styles={{
                  popup: {
                    root: {
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }
                  }
                }}
              >
                {batches.map(batch => (
                  <Option key={batch.id} value={batch.id}>
                    <div style={{ 
                      padding: '12px 8px',
                      borderRadius: '6px',
                      transition: 'background-color 0.3s ease'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <div style={{ 
                          fontWeight: 'bold', 
                          fontSize: '16px',
                          color: '#1f2937'
                        }}>
                          รุ่นที่ {batch.batchNumber}
                        </div>
                        <div style={{
                          backgroundColor: '#f0f9ff',
                          color: '#0369a1',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {batch.status === 'PLANNING' ? 'เปิดรับสมัคร' : batch.status}
                        </div>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '8px',
                        fontSize: '14px'
                      }}>
                        <span style={{ color: '#f59e0b' }}>🗓️</span>
                        <Text type="secondary">
                          เริ่ม: {dayjs(batch.startDate).format('DD/MM/YYYY')}
                        </Text>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '14px'
                        }}>
                          <span style={{ color: '#8b5cf6' }}>👥</span>
                          <Text type="secondary">
                            {batch.currentStudents}/{batch.maxStudents} คน
                          </Text>
                        </div>
                        <Progress 
                          percent={Math.round((batch.currentStudents / batch.maxStudents) * 100)}
                          size="small"
                          style={{ width: '80px', minWidth: '80px' }}
                          strokeColor={{
                            '0%': '#10b981',
                            '50%': '#f59e0b', 
                            '100%': '#ef4444'
                          }}
                        />
                      </div>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Card>
        );

      case 1:
        return (
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <UserOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                ข้อมูลส่วนตัว
              </div>
            }
            extra={
              <Tooltip title="กรอกข้อมูลส่วนตัวให้ครบถ้วน">
                <InfoCircleOutlined style={{ color: '#1890ff' }} />
              </Tooltip>
            }
          >
            <Alert
              message="ข้อมูลสำคัญ"
              description="กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วนและถูกต้อง ข้อมูลเหล่านี้จะใช้ในการออกใบประกาศนียบัตร"
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Divider orientation="left">ข้อมูลพื้นฐาน</Divider>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="titleName"
                  label={<span style={{ fontWeight: 'bold' }}>คำนำหน้า</span>}
                  rules={[{ required: true, message: 'กรุณาเลือกคำนำหน้า' }]}
                >
                  <Select placeholder="เลือกคำนำหน้า" size="large">
                    <Option value="นาย">👨 นาย</Option>
                    <Option value="นางสาว">👩 นางสาว</Option>
                    <Option value="นาง">👩 นาง</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="firstName"
                  label={<span style={{ fontWeight: 'bold' }}>ชื่อ</span>}
                  rules={[
                    { required: true, message: 'กรุณากรอกชื่อ' },
                    { min: 2, message: 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร' }
                  ]}
                >
                  <Input 
                    placeholder="กรอกชื่อ" 
                    size="large"
                    prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="lastName"
                  label={<span style={{ fontWeight: 'bold' }}>นามสกุล</span>}
                  rules={[
                    { required: true, message: 'กรุณากรอกนามสกุล' },
                    { min: 2, message: 'นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร' }
                  ]}
                >
                  <Input 
                    placeholder="กรอกนามสกุล" 
                    size="large"
                    prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="birthDate"
                  label={<span style={{ fontWeight: 'bold' }}>วันเกิด</span>}
                  rules={[{ required: true, message: 'กรุณาเลือกวันเกิด' }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }}
                    placeholder="เลือกวันเกิด"
                    format="DD/MM/YYYY"
                    size="large"
                    suffixIcon={<CalendarOutlined style={{ color: '#1890ff' }} />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="gender"
                  label={<span style={{ fontWeight: 'bold' }}>เพศ</span>}
                  rules={[{ required: true, message: 'กรุณาเลือกเพศ' }]}
                >
                  <Radio.Group size="large" style={{ width: '100%' }}>
                    <Radio.Button value="male" style={{ width: '50%', textAlign: 'center' }}>
                      👨 ชาย
                    </Radio.Button>
                    <Radio.Button value="female" style={{ width: '50%', textAlign: 'center' }}>
                      👩 หญิง
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">ข้อมูลติดต่อ</Divider>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phone"
                  label={<span style={{ fontWeight: 'bold' }}>เบอร์โทรศัพท์</span>}
                  rules={[
                    { required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' },
                    { pattern: /^[0-9]{10}$/, message: 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก' }
                  ]}
                >
                  <Input 
                    placeholder="0812345678" 
                    size="large"
                    prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />}
                    maxLength={10}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  label={<span style={{ fontWeight: 'bold' }}>อีเมล</span>}
                  rules={[
                    { required: true, message: 'กรุณากรอกอีเมล' },
                    { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' }
                  ]}
                >
                  <Input 
                    placeholder="example@email.com" 
                    size="large"
                    prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label={<span style={{ fontWeight: 'bold' }}>ที่อยู่</span>}
              rules={[{ required: true, message: 'กรุณากรอกที่อยู่' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="กรอกที่อยู่ปัจจุบันให้ละเอียด เช่น บ้านเลขที่ ซอย ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Divider orientation="left">ข้อมูลการศึกษาและอาชีพ</Divider>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="education"
                  label={<span style={{ fontWeight: 'bold' }}>วุฒิการศึกษา</span>}
                  rules={[{ required: true, message: 'กรุณาระบุวุฒิการศึกษา' }]}
                >
                  <Select placeholder="เลือกวุฒิการศึกษา" size="large">
                    <Option value="ประถมศึกษา">📚 ประถมศึกษา</Option>
                    <Option value="มัธยมศึกษาตอนต้น">📖 มัธยมศึกษาตอนต้น (ม.3)</Option>
                    <Option value="มัธยมศึกษาตอนปลาย">📗 มัธยมศึกษาตอนปลาย (ม.6)</Option>
                    <Option value="ปวช.">📘 ปวช.</Option>
                    <Option value="ปวส.">📙 ปวส.</Option>
                    <Option value="ปริญญาตรี">🎓 ปริญญาตรี</Option>
                    <Option value="สูงกว่าปริญญาตรี">🎓 สูงกว่าปริญญาตรี</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="occupation"
                  label={<span style={{ fontWeight: 'bold' }}>อาชีพปัจจุบัน</span>}
                >
                  <Input 
                    placeholder="กรอกอาชีพปัจจุบัน" 
                    size="large"
                    prefix={<BankOutlined style={{ color: '#bfbfbf' }} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="experience"
              label={<span style={{ fontWeight: 'bold' }}>ประสบการณ์ด้านการนวด</span>}
            >
              <TextArea 
                rows={4} 
                placeholder="กรุณาบอกประสบการณ์ด้านการนวดที่มี (ถ้ามี) เช่น เคยเรียนหลักสูตรใด เคยทำงานด้านนี้หรือไม่ หรือไม่มีประสบการณ์เลยก็ได้"
                showCount
                maxLength={1000}
              />
            </Form.Item>

            <Form.Item
              name="motivation"
              label={<span style={{ fontWeight: 'bold' }}>เหตุผลที่ต้องการเรียนหลักสูตรนี้</span>}
              rules={[{ required: true, message: 'กรุณาระบุเหตุผล' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="กรุณาระบุเหตุผลที่ต้องการเรียนหลักสูตรนี้ เช่น ต้องการประกอบอาชีพ, ใช้ความรู้ดูแลครอบครัว, หรือพัฒนาทักษะ"
                showCount
                maxLength={1000}
              />
            </Form.Item>

            <Divider orientation="left">ข้อมูลสุขภาพ</Divider>
            <Form.Item
              name="healthCondition"
              label={<span style={{ fontWeight: 'bold' }}>สภาพสุขภาพ</span>}
              rules={[{ required: true, message: 'กรุณาระบุสภาพสุขภาพ' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="กรุณาระบุสภาพสุขภาพปัจจุบัน โรคประจำตัว การใช้ยา หรือข้อจำกัดทางร่างกาย (หากไม่มีให้ระบุ 'ไม่มี')"
                showCount
                maxLength={500}
              />
            </Form.Item>
          </Card>
        );

      case 2:
        return (
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FileTextOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                เอกสารประกอบการสมัคร
              </div>
            }
            extra={
              <Tooltip title="อัปโหลดเอกสารที่จำเป็น">
                <InfoCircleOutlined style={{ color: '#1890ff' }} />
              </Tooltip>
            }
          >
            <Alert
              message="เอกสารที่จำเป็น"
              description="กรุณาเตรียมเอกสารให้พร้อมก่อนทำการอัปโหลด ไฟล์ควรมีความละเอียดชัดเจนและอ่านได้"
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Card size="small" style={{ backgroundColor: '#f8f9fa', marginBottom: 24 }}>
              <Title level={5} style={{ marginBottom: 16, color: '#1890ff' }}>📋 รายการเอกสารที่ต้องใช้:</Title>
              <Row gutter={[16, 8]}>
                <Col span={24}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#ff4d4f', marginRight: '8px' }}>*</span>
                    <SafetyCertificateOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    <Text strong>สำเนาบัตรประจำตัวประชาชน</Text>
                    <Text type="secondary" style={{ marginLeft: '8px' }}>(รูปภาพหรือ PDF)</Text>
                  </div>
                </Col>
                <Col span={24}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#ff4d4f', marginRight: '8px' }}>*</span>
                    <BookOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                    <Text strong>สำเนาวุฒิการศึกษา</Text>
                    <Text type="secondary" style={{ marginLeft: '8px' }}>(รูปภาพหรือ PDF)</Text>
                  </div>
                </Col>
                <Col span={24}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <UserOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />
                    <Text>รูปถ่าย 1 นิ้ว</Text>
                    <Text type="secondary" style={{ marginLeft: '8px' }}>(ไม่บังคับ)</Text>
                  </div>
                </Col>
                <Col span={24}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SafetyCertificateOutlined style={{ color: '#13c2c2', marginRight: '8px' }} />
                    <Text>ใบรับรองแพทย์</Text>
                    <Text type="secondary" style={{ marginLeft: '8px' }}>(ไม่บังคับ - กรณีมีประวัติป่วย)</Text>
                  </div>
                </Col>
              </Row>
            </Card>

            <Divider orientation="left">เอกสารบังคับ</Divider>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="idCardFile"
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      <SafetyCertificateOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      สำเนาบัตรประจำตัวประชาชน
                      <span style={{ color: '#ff4d4f' }}> *</span>
                    </span>
                  }
                  rules={[{ required: true, message: 'กรุณาอัปโหลดสำเนาบัตรประชาชน' }]}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                  }}
                >
                  <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    accept="image/*,.pdf"
                    listType="picture-card"
                    style={{ width: '100%' }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <UploadOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                      <div>อัปโหลดสำเนาบัตรประชาชน</div>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        รองรับ: JPG, PNG, PDF
                      </Text>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="educationFile"
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      <BookOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                      สำเนาวุฒิการศึกษา
                      <span style={{ color: '#ff4d4f' }}> *</span>
                    </span>
                  }
                  rules={[{ required: true, message: 'กรุณาอัปโหลดสำเนาวุฒิการศึกษา' }]}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                  }}
                >
                  <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    accept="image/*,.pdf"
                    listType="picture-card"
                    style={{ width: '100%' }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <UploadOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                      <div>อัปโหลดสำเนาวุฒิการศึกษา</div>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        รองรับ: JPG, PNG, PDF
                      </Text>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">เอกสารเพิ่มเติม (ไม่บังคับ)</Divider>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="photoFile"
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      <UserOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />
                      รูปถ่าย 1 นิ้ว
                    </span>
                  }
                  extra={<Text type="secondary">รูปถ่ายจะใช้ในการออกใบประกาศนียบัตร</Text>}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                  }}
                >
                  <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    accept="image/*"
                    listType="picture-card"
                  >
                    <div style={{ textAlign: 'center' }}>
                      <UploadOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                      <div>อัปโหลดรูปถ่าย</div>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        รองรับ: JPG, PNG
                      </Text>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="medicalFile"
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      <SafetyCertificateOutlined style={{ color: '#13c2c2', marginRight: '8px' }} />
                      ใบรับรองแพทย์
                    </span>
                  }
                  extra={<Text type="secondary">กรณีมีประวัติป่วยหรือข้อจำกัดทางร่างกาย</Text>}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                  }}
                >
                  <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    accept="image/*,.pdf"
                    listType="picture-card"
                  >
                    <div style={{ textAlign: 'center' }}>
                      <UploadOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                      <div>อัปโหลดใบรับรองแพทย์</div>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        รองรับ: JPG, PNG, PDF
                      </Text>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Alert
              message="ข้อปฏิบัติ"
              description={
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>ขนาดไฟล์ไม่เกิน 5 MB ต่อไฟล์</li>
                  <li>รูปภาพควรมีความละเอียดชัดเจนและอ่านได้</li>
                  <li>หากอัปโหลด PDF ควรเป็นไฟล์ที่สแกนจากต้นฉบับ</li>
                  <li>สามารถอัปโหลดซ้ำได้หากต้องการแก้ไข</li>
                </ul>
              }
              type="warning"
              showIcon
              style={{ marginTop: 24 }}
            />
          </Card>
        );

      case 3:
        const values = form.getFieldsValue();
        const selectedBatch = batches.find(b => b.id === values.batchId);
        
        return (
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                ยืนยันการสมัครเรียน
              </div>
            }
            extra={
              <Tooltip title="ตรวจสอบข้อมูลก่อนส่งใบสมัคร">
                <InfoCircleOutlined style={{ color: '#1890ff' }} />
              </Tooltip>
            }
          >
            <Alert
              message="ขั้นตอนสุดท้าย"
              description="กรุณาตรวจสอบข้อมูลทั้งหมดให้ถูกต้องก่อนส่งใบสมัคร หลังจากส่งแล้วจะไม่สามารถแก้ไขได้"
              type="success"
              showIcon
              style={{ marginBottom: 24 }}
            />
            
            <Title level={4} style={{ color: '#1890ff', marginBottom: 24 }}>
              📋 สรุปข้อมูลการสมัคร
            </Title>
            
            <Card size="small" style={{ backgroundColor: '#f0f8ff', marginBottom: 24 }}>
              <Title level={5} style={{ color: '#1890ff', marginBottom: 16 }}>
                <BookOutlined style={{ marginRight: '8px' }} />
                หลักสูตรและรุ่นเรียน
              </Title>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>📚 หลักสูตร:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '16px', color: '#1890ff' }}>
                      {selectedCourse?.title}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>🎯 รุ่นที่:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '16px', color: '#52c41a' }}>
                      รุ่นที่ {selectedBatch?.batchNumber}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>📅 วันเริ่มเรียน:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '16px' }}>
                      {selectedBatch ? dayjs(selectedBatch.startDate).format('DD/MM/YYYY') : '-'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>💰 ค่าธรรมเนียม:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '18px', color: '#fa8c16', fontWeight: 'bold' }}>
                      ฿{selectedCourse?.price.toLocaleString()}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>

            <Card size="small" style={{ backgroundColor: '#f6ffed', marginBottom: 24 }}>
              <Title level={5} style={{ color: '#52c41a', marginBottom: 16 }}>
                <UserOutlined style={{ marginRight: '8px' }} />
                ข้อมูลผู้สมัคร
              </Title>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>👤 ชื่อ-นามสกุล:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '16px' }}>
                      {values.titleName} {values.firstName} {values.lastName}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>🎂 วันเกิด:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '16px' }}>
                      {values.birthDate ? dayjs(values.birthDate).format('DD/MM/YYYY') : '-'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>📱 เบอร์โทร:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '16px' }}>
                      {values.phone}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>📧 อีเมล:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '16px' }}>
                      {values.email}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>🎓 วุฒิการศึกษา:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '16px' }}>
                      {values.education}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>👨‍💼 อาชีพ:</Text>
                    <div style={{ marginLeft: '16px', fontSize: '16px' }}>
                      {values.occupation || 'ไม่ระบุ'}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>

            <Card size="small" style={{ backgroundColor: '#fff7e6', marginBottom: 24 }}>
              <Title level={5} style={{ color: '#fa8c16', marginBottom: 16 }}>
                <FileTextOutlined style={{ marginRight: '8px' }} />
                เอกสารที่อัปโหลด
              </Title>
              <Row gutter={[16, 8]}>
                <Col span={24}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>📄 สำเนาบัตรประชาชน:</Text>
                    <Text style={{ marginLeft: '8px', color: values.idCardFile?.length > 0 ? '#52c41a' : '#ff4d4f' }}>
                      {values.idCardFile?.length > 0 ? '✅ อัปโหลดแล้ว' : '❌ ยังไม่อัปโหลด'}
                    </Text>
                  </div>
                </Col>
                <Col span={24}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>📜 สำเนาวุฒิการศึกษา:</Text>
                    <Text style={{ marginLeft: '8px', color: values.educationFile?.length > 0 ? '#52c41a' : '#ff4d4f' }}>
                      {values.educationFile?.length > 0 ? '✅ อัปโหลดแล้ว' : '❌ ยังไม่อัปโหลด'}
                    </Text>
                  </div>
                </Col>
                <Col span={24}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>📷 รูปถ่าย:</Text>
                    <Text style={{ marginLeft: '8px', color: '#52c41a' }}>
                      {values.photoFile ? '✅ อัปโหลดแล้ว' : '⭕ ไม่บังคับ'}
                    </Text>
                  </div>
                </Col>
                <Col span={24}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>🏥 ใบรับรองแพทย์:</Text>
                    <Text style={{ marginLeft: '8px', color: '#52c41a' }}>
                      {values.medicalFile ? '✅ อัปโหลดแล้ว' : '⭕ ไม่บังคับ'}
                    </Text>
                  </div>
                </Col>
              </Row>
            </Card>

            <Divider />

            <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: 24 }}>
              <Title level={5} style={{ color: '#1890ff', marginBottom: 16 }}>
                📋 เงื่อนไขการสมัครเรียน
              </Title>
              <ul style={{ marginBottom: 0, lineHeight: '1.8' }}>
                <li>ผู้สมัครต้องมีอายุ 18 ปีขึ้นไป</li>
                <li>ข้อมูลที่กรอกต้องเป็นความจริงทุกประการ</li>
                <li>หากตรวจพบข้อมูลเท็จ ทางสถาบันขอสงวนสิทธิ์ในการยกเลิกการสมัคร</li>
                <li>ค่าธรรมเนียมที่ชำระแล้วไม่สามารถขอคืนได้</li>
                <li>ผู้เรียนต้องเข้าเรียนไม่น้อยกว่า 80% ของเวลาเรียนทั้งหมด</li>
                <li>การออกใบประกาศนียบัตรจะต้องผ่านการสอบและการประเมินตามเกณฑ์ที่กำหนด</li>
              </ul>
            </div>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[{ required: true, message: 'กรุณายอมรับเงื่อนไขการสมัครเรียน' }]}
            >
              <Checkbox style={{ fontSize: '16px' }}>
                <Text strong style={{ color: '#1890ff' }}>
                  ✅ ข้าพเจ้ายืนยันว่าข้อมูลข้างต้นเป็นความจริงทุกประการ และยอมรับเงื่อนไขการสมัครเรียน
                </Text>
              </Checkbox>
            </Form.Item>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '0 16px', maxWidth: '1200px', margin: '0 auto' }}>
      <PageHeader title="สมัครเรียนหลักสูตร" />
      
      <style jsx global>{`
        .ant-steps-item-description {
          color: #8c8c8c !important;
        }
        
        .ant-modal-content {
          border-radius: 16px !important;
          overflow: hidden;
        }
        
        .ant-modal-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
          border-bottom: 1px solid #e2e8f0 !important;
          padding: 20px 24px !important;
        }
        
        .ant-modal-title {
          font-size: 20px !important;
          font-weight: bold !important;
        }
        
        .ant-modal-close {
          top: 16px !important;
          right: 16px !important;
        }
        
        @media (max-width: 768px) {
          .ant-steps {
            flex-direction: column !important;
          }
          
          .ant-steps-item {
            margin-bottom: 16px !important;
          }
          
          .ant-upload-list-picture-card .ant-upload-list-item {
            width: 100% !important;
            height: auto !important;
          }
          
          .ant-form-item-label {
            text-align: left !important;
          }
          
          .ant-btn-group .ant-btn {
            margin-bottom: 8px !important;
          }
          
          .ant-modal {
            margin: 0 !important;
            padding: 16px !important;
            max-width: 100% !important;
          }
          
          .ant-modal-content {
            border-radius: 12px !important;
          }
        }
        
        @media (max-width: 576px) {
          .ant-card {
            margin: 8px !important;
          }
          
          .ant-col {
            padding: 8px !important;
          }
          
          .ant-progress {
            width: 100% !important;
          }
          
          .ant-modal-body {
            padding: 16px !important;
          }
        }
      `}</style>
      
      <Card style={{ marginBottom: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: '#1890ff', marginBottom: 8 }}>
            🎓 ระบบสมัครเรียนออนไลน์
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            กรอกข้อมูลครบถ้วนตามขั้นตอน เพื่อสมัครเรียนหลักสูตรการนวดแผนไทย
          </Text>
        </div>
        
        <Steps 
          current={currentStep} 
          style={{ marginBottom: 32 }}
          responsive={false}
          size="default"
        >
          {steps.map((step, index) => (
            <Step 
              key={index} 
              title={step.title} 
              icon={step.icon}
              description={
                index === 0 ? "เลือกหลักสูตร" :
                index === 1 ? "กรอกข้อมูล" :
                index === 2 ? "อัปโหลดเอกสาร" :
                "ตรวจสอบและส่ง"
              }
            />
          ))}
        </Steps>
      </Card>
      
      <Card>
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
                      '0%': '#108ee9',
                      '100%': '#87d068',
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
                      loading={loading} 
                      onClick={handleSubmit}
                      icon={!loading ? <CheckOutlined /> : undefined}
                      size="large"
                      style={{ 
                        minWidth: '160px',
                        backgroundColor: '#52c41a',
                        borderColor: '#52c41a',
                        boxShadow: '0 2px 8px rgba(82, 196, 26, 0.3)'
                      }}
                    >
                      {loading ? 'กำלังส่งใบสมัคร...' : 'ส่งใบสมัครเรียน'}
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
