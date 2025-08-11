'use client';

import '@ant-design/v5-patch-for-react-19';
import { useState, useEffect, useCallback } from 'react';
import { Card, Table, Button, Space, Tag, Select, DatePicker, Form, Row, Col, message, Modal, Input, TimePicker } from 'antd';
import { CheckOutlined, CloseOutlined, ClockCircleOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Batch {
  id: number;
  batchNumber: number;
  name: string;
  status: string;
}

interface AttendanceRecord {
  id: number;
  userId: number;
  batchId: number;
  date: string;
  timeIn?: string;
  timeOut?: string;
  totalHours: number;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  notes?: string;
  student: Student;
}

// Mock data - moved outside component to prevent re-creation
const mockBatches: Batch[] = [
  {
    id: 3,
    batchNumber: 32,
    name: 'หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 32',
    status: 'ACTIVE'
  }
];

const mockStudents: Student[] = [
  { id: 1, firstName: 'สมชาย', lastName: 'ใจดี', email: 'somchai@email.com' },
  { id: 2, firstName: 'สุชาดา', lastName: 'สวยงาม', email: 'suchada@email.com' },
  { id: 3, firstName: 'นิรันดร์', lastName: 'เก่งกาจ', email: 'niran@email.com' },
  { id: 4, firstName: 'วรรณา', lastName: 'มั่นใจ', email: 'wanna@email.com' },
  { id: 5, firstName: 'ประยุทธ์', lastName: 'หนักแน่น', email: 'prayuth@email.com' }
];

export default function AttendanceManagePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [form] = Form.useForm();

  const generateMockRecords = useCallback((date: dayjs.Dayjs) => {
    return mockStudents.map((student, index) => {
      const statuses: AttendanceRecord['status'][] = ['PRESENT', 'PRESENT', 'LATE', 'PRESENT', 'ABSENT'];
      const status = statuses[index];
      
      return {
        id: index + 1,
        userId: student.id,
        batchId: 3,
        date: date.format('YYYY-MM-DD'),
        timeIn: status === 'ABSENT' ? undefined : (status === 'LATE' ? '09:15:00' : '09:00:00'),
        timeOut: status === 'ABSENT' ? undefined : '17:00:00',
        totalHours: status === 'ABSENT' ? 0 : 8,
        status,
        notes: status === 'LATE' ? 'เข้าเรียนสาย 15 นาที' : (status === 'ABSENT' ? 'ขาดเรียน' : ''),
        student
      };
    });
  }, []);

  const loadData = useCallback(async () => {
    if (!selectedBatch) return;
    
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockRecords = generateMockRecords(selectedDate);
        setAttendanceRecords(mockRecords);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading data:', error);
      message.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      setLoading(false);
    }
  }, [selectedBatch, selectedDate, generateMockRecords]);

  useEffect(() => {
    // Only load data if a batch is selected
    if (selectedBatch) {
      loadData();
    }
  }, [loadData, selectedBatch]);

  const handleStatusChange = (recordId: number, newStatus: AttendanceRecord['status']) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.id === recordId 
          ? { ...record, status: newStatus }
          : record
      )
    );
  };

  const handleEditRecord = (record: AttendanceRecord) => {
    setEditingRecord(record);
    form.setFieldsValue({
      timeIn: record.timeIn ? dayjs(record.timeIn, 'HH:mm:ss') : null,
      timeOut: record.timeOut ? dayjs(record.timeOut, 'HH:mm:ss') : null,
      notes: record.notes || ''
    });
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        setAttendanceRecords(prev =>
          prev.map(record =>
            record.id === editingRecord.id
              ? {
                  ...record,
                  timeIn: values.timeIn ? values.timeIn.format('HH:mm:ss') : undefined,
                  timeOut: values.timeOut ? values.timeOut.format('HH:mm:ss') : undefined,
                  notes: values.notes || ''
                }
              : record
          )
        );
        setEditModalVisible(false);
        setEditingRecord(null);
        form.resetFields();
        message.success('บันทึกข้อมูลเรียบร้อยแล้ว');
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getStatusTag = (status: AttendanceRecord['status']) => {
    const statusConfig = {
      PRESENT: { color: 'green', text: 'เข้าเรียน' },
      ABSENT: { color: 'red', text: 'ขาดเรียน' },
      LATE: { color: 'orange', text: 'เข้าสาย' },
      EXCUSED: { color: 'blue', text: 'ลาป่วย' }
    };
    
    const config = statusConfig[status];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center' as const,
    },
    {
      title: 'ชื่อ-นามสกุล',
      key: 'studentName',
      render: (record: AttendanceRecord) => (
        `${record.student.firstName} ${record.student.lastName}`
      ),
    },
    {
      title: 'เวลาเข้า',
      dataIndex: 'timeIn',
      key: 'timeIn',
      width: 120,
      align: 'center' as const,
      render: (timeIn: string) => timeIn || '-',
    },
    {
      title: 'เวลาออก',
      dataIndex: 'timeOut',
      key: 'timeOut',
      width: 120,
      align: 'center' as const,
      render: (timeOut: string) => timeOut || '-',
    },
    {
      title: 'ชั่วโมงเรียน',
      dataIndex: 'totalHours',
      key: 'totalHours',
      width: 120,
      align: 'center' as const,
      render: (hours: number) => `${hours} ชม.`,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center' as const,
      render: (status: AttendanceRecord['status']) => getStatusTag(status),
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'notes',
      key: 'notes',
      render: (notes: string) => notes || '-',
    },
    {
      title: 'จัดการ',
      key: 'actions',
      width: 200,
      align: 'center' as const,
      render: (record: AttendanceRecord) => (
        <Space>
          <Button
            size="small"
            type={record.status === 'PRESENT' ? 'primary' : 'default'}
            icon={<CheckOutlined />}
            onClick={() => handleStatusChange(record.id, 'PRESENT')}
          >
            เข้าเรียน
          </Button>
          <Button
            size="small"
            type={record.status === 'ABSENT' ? 'primary' : 'default'}
            danger={record.status === 'ABSENT'}
            icon={<CloseOutlined />}
            onClick={() => handleStatusChange(record.id, 'ABSENT')}
          >
            ขาดเรียน
          </Button>
          <Button
            size="small"
            type={record.status === 'LATE' ? 'primary' : 'default'}
            icon={<ClockCircleOutlined />}
            onClick={() => handleStatusChange(record.id, 'LATE')}
          >
            เข้าสาย
          </Button>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditRecord(record)}
          >
            แก้ไข
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, #5d4037 0%, #8d6e63 50%, #a1887f 100%)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        color: 'white'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '28px', 
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          จัดการการเข้าเรียน
        </h1>
      </div>
      
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="เลือกรุ่นเรียน">
              <Select
                placeholder="เลือกรุ่นเรียน"
                value={selectedBatch}
                onChange={setSelectedBatch}
                style={{ width: '100%' }}
              >
                {mockBatches.map(batch => (
                  <Option key={batch.id} value={batch.id}>
                    {batch.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="เลือกวันที่">
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date || dayjs())}
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label=" ">
              <Button type="primary" onClick={loadData} loading={loading}>
                ค้นหา
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={attendanceRecords}
          rowKey="id"
          loading={loading}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </Card>

      <Modal
        title="แก้ไขข้อมูลการเข้าเรียน"
        open={editModalVisible}
        onOk={handleSaveEdit}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingRecord(null);
          form.resetFields();
        }}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="เวลาเข้า" name="timeIn">
                <TimePicker 
                  style={{ width: '100%' }}
                  format="HH:mm"
                  placeholder="เลือกเวลาเข้า"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="เวลาออก" name="timeOut">
                <TimePicker 
                  style={{ width: '100%' }}
                  format="HH:mm"
                  placeholder="เลือกเวลาออก"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="หมายเหตุ" name="notes">
            <TextArea rows={3} placeholder="หมายเหตุเพิ่มเติม" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );

  // Rest of the component code...
}

