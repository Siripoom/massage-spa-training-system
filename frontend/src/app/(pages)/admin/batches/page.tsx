'use client';

import '@ant-design/v5-patch-for-react-19';
import { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Tag, Drawer, Form, Input, Select, DatePicker, InputNumber, message, Modal, Descriptions, Row, Col, Statistic, Progress, Tooltip, Typography } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, UserOutlined, CalendarOutlined, TeamOutlined, BookOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import PageHeader from '@/components/common/PageHeader';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

interface Course {
  id: number;
  title: string;
  duration: number;
}

interface Batch {
  id: number;
  courseId: number;
  batchNumber: number;
  name: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  status: string;
  totalHours: number;
  description: string;
  location: string;
  course: {
    title: string;
  };
}

export default function BatchManagePage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [form] = Form.useForm();

  // Mock data based on old system
  const mockBatches = [
    {
      id: 1,
      courseId: 1,
      batchNumber: 32,
      name: 'หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 32',
      startDate: '2024-09-01',
      endDate: '2024-12-01',
      maxStudents: 30,
      currentStudents: 15,
      status: 'ACTIVE',
      totalHours: 150,
      description: 'รุ่นปัจจุบันที่กำลังเรียน เริ่มเดือนกันยายน',
      location: 'อาคาร A ชั้น 2',
      course: { title: 'หลักสูตรนวดไทยเพื่อสุขภาพ' }
    },
    {
      id: 2,
      courseId: 1,
      batchNumber: 31,
      name: 'หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 31',
      startDate: '2024-05-01',
      endDate: '2024-08-01',
      maxStudents: 30,
      currentStudents: 28,
      status: 'COMPLETED',
      totalHours: 150,
      description: 'รุ่นที่สองของปี 2567 เรียนในช่วงเดือนพฤษภาคม-สิงหาคม',
      location: 'อาคาร A ชั้น 2',
      course: { title: 'หลักสูตรนวดไทยเพื่อสุขภาพ' }
    },
    {
      id: 3,
      courseId: 1,
      batchNumber: 30,
      name: 'หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 30',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      maxStudents: 25,
      currentStudents: 23,
      status: 'COMPLETED',
      totalHours: 150,
      description: 'รุ่นแรกของปี 2567 เรียนในช่วงเดือนมกราคม-เมษายน',
      location: 'อาคาร A ชั้น 2',
      course: { title: 'หลักสูตรนวดไทยเพื่อสุขภาพ' }
    }
  ];

  const mockCourses = [
    { id: 1, title: 'หลักสูตรนวดไทยเพื่อสุขภาพ', duration: 150 },
    { id: 2, title: 'หลักสูตรการนวดอโรม่าเทอราปี', duration: 120 },
    { id: 3, title: 'หลักสูตรนวดบำบัดและฟื้นฟู', duration: 180 }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setBatches(mockBatches);
          setCourses(mockCourses);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading data:', error);
        message.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
        setLoading(false);
      }
    };
    
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = () => {
    setEditingBatch(null);
    form.resetFields();
    setDrawerVisible(true);
  };

  const handleEdit = (batch: Batch) => {
    setEditingBatch(batch);
    form.setFieldsValue({
      ...batch,
      startDate: dayjs(batch.startDate),
      endDate: dayjs(batch.endDate),
    });
    setDrawerVisible(true);
  };

  const handleView = (batch: Batch) => {
    setSelectedBatch(batch);
    setDetailModalVisible(true);
  };

  const handleSubmit = async (values: {
    courseId: number;
    batchNumber: number;
    name: string;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    maxStudents: number;
    totalHours: number;
    location?: string;
    status: string;
    description?: string;
  }) => {
    try {
      setLoading(true);
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _payload = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
      };

      // Simulate API call
      setTimeout(() => {
        if (editingBatch) {
          message.success('บันทึกข้อมูลรุ่นเรียนสำเร็จ');
        } else {
          message.success('เพิ่มรุ่นเรียนใหม่สำเร็จ');
        }
        setDrawerVisible(false);
        loadData();
      }, 1000);
    } catch (error) {
      console.error('Error saving batch:', error);
      message.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  const loadData = () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setBatches(mockBatches);
        setCourses(mockCourses);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading data:', error);
      message.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'green';
      case 'COMPLETED': return 'blue';
      case 'CANCELLED': return 'red';
      case 'PLANNING': return 'orange';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'กำลังเรียน';
      case 'COMPLETED': return 'จบการเรียน';
      case 'CANCELLED': return 'ยกเลิก';
      case 'PLANNING': return 'วางแผน';
      default: return status;
    }
  };

  const columns = [
    {
      title: 'รุ่นที่',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      width: 100,
      fixed: 'left' as const,
      render: (text: number) => (
        <div style={{ textAlign: 'center' }}>
          <Tag color="blue" style={{ fontSize: '14px', fontWeight: 'bold' }}>
            รุ่น {text}
          </Tag>
        </div>
      )
    },
    {
      title: 'ข้อมูลรุ่นเรียน',
      key: 'batchInfo',
      width: 350,
      render: (_: unknown, record: Batch) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
            {record.name}
          </div>
          <div style={{ color: '#666', fontSize: '13px', marginBottom: '4px' }}>
            <BookOutlined style={{ marginRight: '4px' }} />
            {record.course?.title}
          </div>
          <div style={{ color: '#999', fontSize: '12px' }}>
            <EnvironmentOutlined style={{ marginRight: '4px' }} />
            {record.location || 'ไม่ระบุสถานที่'}
          </div>
        </div>
      )
    },
    {
      title: 'ระยะเวลาเรียน',
      key: 'duration',
      width: 200,
      render: (_: unknown, record: Batch) => (
        <div>
          <div style={{ marginBottom: '4px' }}>
            <CalendarOutlined style={{ marginRight: '4px', color: '#52c41a' }} />
            <strong>เริ่ม:</strong> {dayjs(record.startDate).format('DD/MM/YYYY')}
          </div>
          <div style={{ marginBottom: '4px' }}>
            <CalendarOutlined style={{ marginRight: '4px', color: '#ff4d4f' }} />
            <strong>สิ้นสุด:</strong> {dayjs(record.endDate).format('DD/MM/YYYY')}
          </div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            <ClockCircleOutlined style={{ marginRight: '4px' }} />
            {record.totalHours} ชั่วโมง
          </div>
        </div>
      )
    },
    {
      title: 'นักเรียน',
      key: 'students',
      width: 150,
      render: (_: unknown, record: Batch) => {
        const percentage = Math.round((record.currentStudents / record.maxStudents) * 100);
        const color = percentage >= 90 ? '#ff4d4f' : percentage >= 70 ? '#faad14' : '#52c41a';
        
        return (
          <div>
            <div style={{ marginBottom: '8px' }}>
              <TeamOutlined style={{ marginRight: '8px', color: color }} />
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {record.currentStudents}/{record.maxStudents}
              </span>
            </div>
            <Progress 
              percent={percentage} 
              size="small" 
              strokeColor={color}
              showInfo={false}
            />
            <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
              {percentage}% เต็ม
            </div>
          </div>
        );
      }
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const statusConfig = {
          'ACTIVE': { color: 'green', text: 'กำลังเรียน', icon: '🟢' },
          'COMPLETED': { color: 'blue', text: 'จบการเรียน', icon: '✅' },
          'CANCELLED': { color: 'red', text: 'ยกเลิก', icon: '❌' },
          'PLANNING': { color: 'orange', text: 'วางแผน', icon: '📋' }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default', text: status, icon: '⚪' };
        
        return (
          <Tag color={config.color} style={{ fontSize: '13px', padding: '4px 8px' }}>
            {config.icon} {config.text}
          </Tag>
        );
      }
    },
    {
      title: 'การจัดการ',
      key: 'actions',
      width: 160,
      fixed: 'right' as const,
      render: (_: unknown, record: Batch) => (
        <Space size="small">
          <Tooltip title="ดูรายละเอียด">
            <Button 
              icon={<EyeOutlined />} 
              size="small"
              type="default"
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="แก้ไขข้อมูล">
            <Button 
              icon={<EditOutlined />} 
              size="small"
              type="primary"
              ghost
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '0 24px' }}>
      <PageHeader 
        title="จัดการรุ่นเรียน"
      />
      
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="รุ่นที่กำลังเรียน"
              value={batches.filter(b => b.status === 'ACTIVE').length}
              valueStyle={{ color: '#3f8600' }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="รุ่นที่จบแล้ว"
              value={batches.filter(b => b.status === 'COMPLETED').length}
              valueStyle={{ color: '#1890ff' }}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="นักเรียนทั้งหมด"
              value={batches.reduce((total, batch) => total + batch.currentStudents, 0)}
              valueStyle={{ color: '#722ed1' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="ชั่วโมงเรียนรวม"
              value={batches.reduce((total, batch) => total + (batch.totalHours * batch.currentStudents), 0)}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<ClockCircleOutlined />}
              suffix="ชม."
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Title level={4} style={{ margin: 0 }}>
              รายการรุ่นเรียนทั้งหมด
            </Title>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAdd}
              size="large"
            >
              เพิ่มรุ่นเรียนใหม่
            </Button>
          </div>
        }
        styles={{ body: { padding: '16px' } }}
      >
        <Table
          columns={columns}
          dataSource={batches}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `แสดง ${range[0]}-${range[1]} จาก ${total} รายการ`,
          }}
          locale={{ 
            emptyText: (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <TeamOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px', display: 'block' }} />
                <Text type="secondary">ยังไม่มีข้อมูลรุ่นเรียน</Text>
              </div>
            )
          }}
        />
      </Card>

      {/* Add/Edit Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TeamOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            {editingBatch ? 'แก้ไขข้อมูลรุ่นเรียน' : 'เพิ่มรุ่นเรียนใหม่'}
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={window.innerWidth < 768 ? '100%' : 600}
        styles={{ body: { paddingBottom: 80 } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
        >
          <Card size="small" title="ข้อมูลหลักสูตร" style={{ marginBottom: 16 }}>
            <Form.Item
              name="courseId"
              label="หลักสูตร"
              rules={[{ required: true, message: 'กรุณาเลือกหลักสูตร' }]}
            >
              <Select 
                placeholder="เลือกหลักสูตร"
                size="large"
                showSearch
                optionFilterProp="children"
              >
                {courses.map(course => (
                  <Option key={course.id} value={course.id}>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{course.title}</div>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {course.duration} ชั่วโมง
                      </Text>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="batchNumber"
                  label="หมายเลขรุ่น"
                  rules={[
                    { required: true, message: 'กรุณาใส่หมายเลขรุ่น' },
                    { type: 'number', min: 1, max: 999, message: 'หมายเลขรุ่นต้องอยู่ระหว่าง 1-999' }
                  ]}
                >
                  <InputNumber 
                    min={1} 
                    max={999}
                    placeholder="เช่น 33" 
                    style={{ width: '100%' }}
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="totalHours"
                  label="จำนวนชั่วโมงรวม"
                  rules={[
                    { required: true, message: 'กรุณาใส่จำนวนชั่วโมงรวม' },
                    { type: 'number', min: 1, max: 1000, message: 'จำนวนชั่วโมงต้องอยู่ระหว่าง 1-1000' }
                  ]}
                >
                  <InputNumber 
                    min={1} 
                    max={1000}
                    placeholder="เช่น 150" 
                    style={{ width: '100%' }}
                    size="large"
                    addonAfter="ชั่วโมง"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card size="small" title="ข้อมูลรุ่นเรียน" style={{ marginBottom: 16 }}>
            <Form.Item
              name="name"
              label="ชื่อรุ่นเรียน"
              rules={[
                { required: true, message: 'กรุณาใส่ชื่อรุ่นเรียน' },
                { min: 10, message: 'ชื่อรุ่นเรียนต้องมีความยาวอย่างน้อย 10 ตัวอักษร' }
              ]}
            >
              <Input 
                placeholder="เช่น หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 33" 
                size="large"
                maxLength={100}
                showCount
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="startDate"
                  label="วันเริ่มเรียน"
                  rules={[{ required: true, message: 'กรุณาเลือกวันเริ่มเรียน' }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }}
                    size="large"
                    format="DD/MM/YYYY"
                    placeholder="เลือกวันเริ่มเรียน"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="endDate"
                  label="วันสิ้นสุดการเรียน"
                  rules={[{ required: true, message: 'กรุณาเลือกวันสิ้นสุดการเรียน' }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }}
                    size="large"
                    format="DD/MM/YYYY"
                    placeholder="เลือกวันสิ้นสุด"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="maxStudents"
                  label="จำนวนนักเรียนสูงสุด"
                  rules={[
                    { required: true, message: 'กรุณาใส่จำนวนนักเรียนสูงสุด' },
                    { type: 'number', min: 1, max: 100, message: 'จำนวนนักเรียนต้องอยู่ระหว่าง 1-100' }
                  ]}
                >
                  <InputNumber 
                    min={1} 
                    max={100} 
                    placeholder="เช่น 30" 
                    style={{ width: '100%' }}
                    size="large"
                    addonAfter="คน"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="สถานะ"
                  rules={[{ required: true, message: 'กรุณาเลือกสถานะ' }]}
                >
                  <Select placeholder="เลือกสถานะ" size="large">
                    <Option value="PLANNING">📋 วางแผน</Option>
                    <Option value="ACTIVE">🟢 กำลังเรียน</Option>
                    <Option value="COMPLETED">✅ จบการเรียน</Option>
                    <Option value="CANCELLED">❌ ยกเลิก</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="location"
              label="สถานที่เรียน"
              rules={[{ min: 3, message: 'ชื่อสถานที่ต้องมีความยาวอย่างน้อย 3 ตัวอักษร' }]}
            >
              <Input 
                placeholder="เช่น อาคาร A ชั้น 2" 
                size="large"
                prefix={<EnvironmentOutlined />}
                maxLength={50}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="รายละเอียดเพิ่มเติม"
            >
              <TextArea 
                rows={4} 
                placeholder="รายละเอียดเกี่ยวกับรุ่นเรียนนี้..."
                maxLength={500}
                showCount
              />
            </Form.Item>
          </Card>

          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '16px 24px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Space>
              <Button onClick={() => setDrawerVisible(false)} size="large">
                ยกเลิก
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} size="large">
                {editingBatch ? '💾 บันทึกการแก้ไข' : '➕ เพิ่มรุ่นเรียน'}
              </Button>
            </Space>
          </div>
        </Form>
      </Drawer>

      {/* Detail Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TeamOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            รายละเอียดรุ่นเรียน
          </div>
        }
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="edit" type="primary" icon={<EditOutlined />} onClick={() => {
            if (selectedBatch) {
              setDetailModalVisible(false);
              handleEdit(selectedBatch);
            }
          }}>
            แก้ไขข้อมูล
          </Button>,
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            ปิด
          </Button>
        ]}
        width={900}
      >
        {selectedBatch && (
          <div>
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: 24, padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                {selectedBatch.name}
              </Title>
              <Tag color={getStatusColor(selectedBatch.status)} style={{ marginTop: 8, fontSize: '14px', padding: '4px 12px' }}>
                {getStatusText(selectedBatch.status)}
              </Tag>
            </div>

            {/* Statistics Row */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="รุ่นที่"
                    value={selectedBatch.batchNumber}
                    prefix={<TeamOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="นักเรียน"
                    value={`${selectedBatch.currentStudents}/${selectedBatch.maxStudents}`}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="ชั่วโมงเรียน"
                    value={selectedBatch.totalHours}
                    suffix="ชม."
                    prefix={<ClockCircleOutlined />}
                    valueStyle={{ color: '#fa8c16' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="เปอร์เซ็นต์เต็ม"
                    value={Math.round((selectedBatch.currentStudents / selectedBatch.maxStudents) * 100)}
                    suffix="%"
                    prefix={<Progress type="circle" percent={Math.round((selectedBatch.currentStudents / selectedBatch.maxStudents) * 100)} size="small" style={{ display: 'none' }} />}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Detailed Information */}
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label={<><BookOutlined /> หลักสูตร</>} span={2}>
                <Text strong>{selectedBatch.course?.title}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={<><CalendarOutlined /> วันเริ่มเรียน</>}>
                <Text>{dayjs(selectedBatch.startDate).format('DD/MM/YYYY')}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={<><CalendarOutlined /> วันสิ้นสุด</>}>
                <Text>{dayjs(selectedBatch.endDate).format('DD/MM/YYYY')}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={<><EnvironmentOutlined /> สถานที่เรียน</>} span={2}>
                <Text>{selectedBatch.location || 'ไม่ระบุ'}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="รายละเอียด" span={2}>
                <Text>{selectedBatch.description || 'ไม่มีรายละเอียดเพิ่มเติม'}</Text>
              </Descriptions.Item>
            </Descriptions>

            {/* Progress Bar */}
            <div style={{ marginTop: 24 }}>
              <Title level={5}>ความคืบหน้าการรับสมัคร</Title>
              <Progress 
                percent={Math.round((selectedBatch.currentStudents / selectedBatch.maxStudents) * 100)}
                status={selectedBatch.currentStudents >= selectedBatch.maxStudents ? 'success' : 'active'}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                style={{ marginBottom: 8 }}
              />
              <Text type="secondary">
                {selectedBatch.currentStudents} จาก {selectedBatch.maxStudents} คน 
                ({selectedBatch.maxStudents - selectedBatch.currentStudents} คน ที่เหลือ)
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
