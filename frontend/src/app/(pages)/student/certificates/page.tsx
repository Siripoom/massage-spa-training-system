// src/app/(pages)/student/certificates/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Button, Empty, Input, Select, Badge, Space, Tag, message, Modal, Divider } from 'antd';
import { 
  TrophyOutlined, 
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  CalendarOutlined,
  StarOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import '../dashboard/dashboard.css';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

// Interfaces
interface Certificate {
  id: string;
  courseName: string;
  courseId: string;
  studentName: string;
  instructorName: string;
  issueDate: string;
  completionDate: string;
  certificateNumber: string;
  grade?: string;
  hours: number;
  skills: string[];
  status: 'active' | 'expired' | 'revoked';
  template: 'traditional' | 'modern' | 'spa';
  verificationCode: string;
}

// Mock data
const mockCertificates: Certificate[] = [
  {
    id: 'cert-001',
    courseName: 'หลักสูตรการนวดแผนไทยพื้นฐาน',
    courseId: 'course-1',
    studentName: 'นักเรียน ทดสอบ',
    instructorName: 'อาจารย์สมศรี ใจดี',
    issueDate: dayjs().subtract(1, 'month').toISOString(),
    completionDate: dayjs().subtract(1, 'month').subtract(3, 'day').toISOString(),
    certificateNumber: 'MT-2024-001',
    grade: 'ดีเยี่ยม',
    hours: 30,
    skills: ['การนวดแผนไทย', 'การใช้แรงกด', 'การดูแลสุขภาพ'],
    status: 'active',
    template: 'traditional',
    verificationCode: 'VER-2024-001'
  },
  {
    id: 'cert-002',
    courseName: 'หลักสูตรการนวดอโรม่า',
    courseId: 'course-2',
    studentName: 'นักเรียน ทดสอบ',
    instructorName: 'อาจารย์วิไล สวยงาม',
    issueDate: dayjs().subtract(2, 'week').toISOString(),
    completionDate: dayjs().subtract(2, 'week').subtract(2, 'day').toISOString(),
    certificateNumber: 'AR-2024-002',
    grade: 'ดี',
    hours: 25,
    skills: ['การนวดอโรม่า', 'การผสมน้ำมันหอมระเหย', 'การบำบัดด้วยกลิ่น'],
    status: 'active',
    template: 'spa',
    verificationCode: 'VER-2024-002'
  },
  {
    id: 'cert-003',
    courseName: 'หลักสูตรการนวดเพื่อสุขภาพ',
    courseId: 'course-3',
    studentName: 'นักเรียน ทดสอบ',
    instructorName: 'อาจารย์ดร.สุธี เก่งมาก',
    issueDate: dayjs().subtract(6, 'month').toISOString(),
    completionDate: dayjs().subtract(6, 'month').subtract(5, 'day').toISOString(),
    certificateNumber: 'HM-2023-045',
    grade: 'ดีมาก',
    hours: 40,
    skills: ['การนวดบำบัด', 'การดูแลผู้ป่วย', 'การประเมินอาการ'],
    status: 'active',
    template: 'modern',
    verificationCode: 'VER-2023-045'
  }
];

export default function StudentCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setCertificates(mockCertificates);
  }, []);

  useEffect(() => {
    // Filter certificates based on search term and status
    let filtered = certificates;
    
    if (searchTerm) {
      filtered = filtered.filter(cert => 
        cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(cert => cert.status === statusFilter);
    }
    
    setFilteredCertificates(filtered);
  }, [certificates, searchTerm, statusFilter]);

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalVisible(true);
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    message.success(`กำลังดาวน์โหลดเกียรติบัตร: ${certificate.courseName}`);
    console.log('Download certificate:', certificate.id);
  };

  const handleShareCertificate = (certificate: Certificate) => {
    // Copy verification link to clipboard
    const verificationLink = `https://lms.example.com/verify/${certificate.verificationCode}`;
    navigator.clipboard.writeText(verificationLink);
    message.success('คัดลอกลิงก์สำหรับยืนยันเกียรติบัตรแล้ว');
  };

  const handlePrintCertificate = (certificate: Certificate) => {
    message.info(`กำลังเตรียมพิมพ์เกียรติบัตร: ${certificate.courseName}`);
    console.log('Print certificate:', certificate.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'expired': return 'warning';
      case 'revoked': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ใช้งานได้';
      case 'expired': return 'หมดอายุ';
      case 'revoked': return 'ยกเลิก';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const getGradeColor = (grade?: string) => {
    switch (grade) {
      case 'ดีเยี่ยม': return '#52c41a';
      case 'ดีมาก': return '#1890ff';
      case 'ดี': return '#faad14';
      case 'พอใช้': return '#fa8c16';
      default: return '#666';
    }
  };

  const renderCertificateCard = (certificate: Certificate) => (
    <Card
      key={certificate.id}
      className="content-card"
      style={{ height: '100%' }}
      cover={
        <div 
          style={{ 
            height: 180, 
            background: `linear-gradient(135deg, ${certificate.template === 'traditional' ? '#8bc34a, #4caf50' : certificate.template === 'spa' ? '#2196f3, #03a9f4' : '#ff9800, #ffc107'})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            position: 'relative',
            borderRadius: '8px 8px 0 0'
          }}
        >
          <TrophyOutlined style={{ fontSize: 48, opacity: 0.8 }} />
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <Badge 
              status={getStatusColor(certificate.status)} 
              text={getStatusText(certificate.status)}
              style={{ 
                background: 'rgba(255,255,255,0.95)', 
                padding: '4px 8px', 
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500 
              }}
            />
          </div>
        </div>
      }
      actions={[
        <Button 
          key="view"
          type="text" 
          icon={<EyeOutlined />}
          onClick={() => handleViewCertificate(certificate)}
          style={{ width: '100%' }}
        >
          ดูรายละเอียด
        </Button>,
        <Button 
          key="download"
          type="text" 
          icon={<DownloadOutlined />}
          onClick={() => handleDownloadCertificate(certificate)}
          style={{ width: '100%' }}
        >
          ดาวน์โหลด
        </Button>,
        <Button 
          key="share"
          type="text" 
          icon={<ShareAltOutlined />}
          onClick={() => handleShareCertificate(certificate)}
          style={{ width: '100%' }}
        >
          แชร์
        </Button>
      ]}
    >
      <Card.Meta
        title={
          <div style={{ marginBottom: 8 }}>
            <Title level={5} style={{ margin: 0, color: '#5d4037', lineHeight: 1.3 }}>
              {certificate.courseName}
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              เลขที่: {certificate.certificateNumber}
            </Text>
          </div>
        }
        description={
          <div>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong style={{ color: '#5d4037' }}>ผู้สอน: </Text>
                <Text>{certificate.instructorName}</Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <CalendarOutlined style={{ marginRight: 6, color: '#666' }} />
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {dayjs(certificate.issueDate).format('DD MMM YYYY')}
                  </Text>
                </div>
                <Tag color={getGradeColor(certificate.grade)} style={{ margin: 0 }}>
                  {certificate.grade || 'ผ่าน'}
                </Tag>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  <ClockCircleOutlined style={{ marginRight: 4 }} />
                  {certificate.hours} ชั่วโมง
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {certificate.template === 'traditional' ? '🏛️ แบบดั้งเดิม' : 
                   certificate.template === 'spa' ? '🌸 แบบสปา' : '✨ แบบโมเดิร์น'}
                </Text>
              </div>

              <div>
                <Text strong style={{ fontSize: 12, color: '#5d4037' }}>ทักษะที่ได้รับ:</Text>
                <div style={{ marginTop: 6 }}>
                  {certificate.skills.slice(0, 2).map((skill, index) => (
                    <Tag key={index} style={{ fontSize: 11, marginBottom: 4, marginRight: 4 }}>
                      {skill}
                    </Tag>
                  ))}
                  {certificate.skills.length > 2 && (
                    <Tag style={{ fontSize: 11, background: '#f0f0f0', border: 'dashed 1px #d9d9d9' }}>
                      +{certificate.skills.length - 2} เพิ่มเติม
                    </Tag>
                  )}
                </div>
              </div>
            </Space>
          </div>
        }
      />
    </Card>
  );

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">เกียรติบัตรของฉัน</h1>
          <p className="dashboard-subtitle">
            จัดการและดาวน์โหลดเกียรติบัตรที่ได้รับจากการเรียนหลักสูตร
          </p>
        </div>
        <div>
          <Badge count={certificates.filter(c => c.status === 'active').length} showZero>
            <TrophyOutlined style={{ fontSize: 24, color: '#5d4037' }} />
          </Badge>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="content-card" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Search
              placeholder="ค้นหาเกียรติบัตรจากชื่อหลักสูตรหรือเลขที่..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              placeholder="สถานะ"
              size="large"
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={setStatusFilter}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">ทั้งหมด</Option>
              <Option value="active">ใช้งานได้</Option>
              <Option value="expired">หมดอายุ</Option>
              <Option value="revoked">ยกเลิก</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Certificates Grid */}
      {filteredCertificates.length > 0 ? (
        <Row gutter={[24, 24]}>
          {filteredCertificates.map(certificate => (
            <Col xs={24} sm={12} lg={8} xl={6} key={certificate.id}>
              {renderCertificateCard(certificate)}
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="content-card">
          <Empty
            image={<TrophyOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
            description={
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <Title level={4} style={{ color: '#999', marginBottom: 8 }}>
                  {searchTerm ? 'ไม่พบเกียรติบัตรที่ค้นหา' : 'ยังไม่มีเกียรติบัตร'}
                </Title>
                {!searchTerm && (
                  <Text type="secondary">
                    เรียนจบหลักสูตรเพื่อรับเกียรติบัตร
                  </Text>
                )}
              </div>
            }
          />
        </Card>
      )}

      {/* Certificate Detail Modal */}
      <Modal
        title={
          <Space>
            <TrophyOutlined style={{ color: '#faad14', fontSize: 20 }} />
            <span style={{ fontSize: 18, fontWeight: 600 }}>รายละเอียดเกียรติบัตร</span>
          </Space>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        footer={[
          <Button 
            key="print" 
            icon={<PrinterOutlined />} 
            onClick={() => selectedCertificate && handlePrintCertificate(selectedCertificate)}
            size="large"
          >
            พิมพ์
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />} 
            onClick={() => selectedCertificate && handleDownloadCertificate(selectedCertificate)}
            size="large"
          >
            ดาวน์โหลด
          </Button>
        ]}
      >
        {selectedCertificate && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div 
                style={{ 
                  height: 140, 
                  background: `linear-gradient(135deg, ${selectedCertificate.template === 'traditional' ? '#8bc34a, #4caf50' : selectedCertificate.template === 'spa' ? '#2196f3, #03a9f4' : '#ff9800, #ffc107'})`,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginBottom: 20,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <TrophyOutlined style={{ fontSize: 48 }} />
              </div>
              <Title level={3} style={{ color: '#5d4037', marginBottom: 8 }}>
                {selectedCertificate.courseName}
              </Title>
              <Text strong style={{ fontSize: 16, color: '#666' }}>
                เลขที่: {selectedCertificate.certificateNumber}
              </Text>
            </div>

            <Divider style={{ margin: '24px 0' }} />

            <Row gutter={[24, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Text strong style={{ color: '#5d4037', display: 'block', marginBottom: 4 }}>
                    ชื่อผู้รับ:
                  </Text>
                  <Text style={{ fontSize: 15 }}>{selectedCertificate.studentName}</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Text strong style={{ color: '#5d4037', display: 'block', marginBottom: 4 }}>
                    ผู้สอน:
                  </Text>
                  <Text style={{ fontSize: 15 }}>{selectedCertificate.instructorName}</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Text strong style={{ color: '#5d4037', display: 'block', marginBottom: 4 }}>
                    วันที่เรียนจบ:
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    {dayjs(selectedCertificate.completionDate).format('DD MMMM YYYY')}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Text strong style={{ color: '#5d4037', display: 'block', marginBottom: 4 }}>
                    วันที่ออกเกียรติบัตร:
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    {dayjs(selectedCertificate.issueDate).format('DD MMMM YYYY')}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Text strong style={{ color: '#5d4037', display: 'block', marginBottom: 4 }}>
                    ระยะเวลาเรียน:
                  </Text>
                  <Text style={{ fontSize: 15 }}>{selectedCertificate.hours} ชั่วโมง</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Text strong style={{ color: '#5d4037', display: 'block', marginBottom: 4 }}>
                    เกรด:
                  </Text>
                  <Tag color={getGradeColor(selectedCertificate.grade)} style={{ fontSize: 14, padding: '4px 12px' }}>
                    {selectedCertificate.grade}
                  </Tag>
                </div>
              </Col>
            </Row>

            <Divider style={{ margin: '24px 0' }} />

            <div style={{ marginBottom: 24 }}>
              <Text strong style={{ color: '#5d4037', display: 'block', marginBottom: 12, fontSize: 16 }}>
                ทักษะที่ได้รับ:
              </Text>
              <div>
                {selectedCertificate.skills.map((skill, index) => (
                  <Tag 
                    key={index} 
                    icon={<StarOutlined />} 
                    style={{ 
                      marginBottom: 8, 
                      marginRight: 8,
                      fontSize: 13,
                      padding: '4px 12px',
                      borderRadius: 6
                    }}
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>

            <Divider style={{ margin: '24px 0' }} />

            <div style={{ 
              textAlign: 'center', 
              background: 'linear-gradient(135deg, #f5f5f5, #fafafa)', 
              padding: 20, 
              borderRadius: 12,
              border: '1px solid #e8e8e8'
            }}>
              <Text strong style={{ fontSize: 14, color: '#5d4037', display: 'block', marginBottom: 8 }}>
                รหัสยืนยันความถูกต้อง
              </Text>
              <Text 
                style={{ 
                  fontSize: 16, 
                  fontFamily: 'monospace', 
                  background: '#fff',
                  padding: '8px 16px',
                  borderRadius: 6,
                  border: '1px solid #d9d9d9',
                  display: 'inline-block',
                  marginBottom: 8
                }}
              >
                {selectedCertificate.verificationCode}
              </Text>
              <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                สามารถใช้รหัสนี้ในการยืนยันความถูกต้องของเกียรติบัตร
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
