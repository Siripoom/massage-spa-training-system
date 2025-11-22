'use client';

import '@ant-design/v5-patch-for-react-19';
import { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Tag, Select, DatePicker, Form, Row, Col, message, Modal, Input, TimePicker } from 'antd';
import { CheckOutlined, CloseOutlined, ClockCircleOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useBatches } from '@/hooks/useBatches';
import enrollmentService from '@/services/enrollment.service';
import { useBulkMarkAttendance, useAttendance } from '@/hooks/useAttendance';

const { Option } = Select;
const { TextArea } = Input;

interface StudentEnrollment {
  id: string;
  userId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface AttendanceRecord {
  enrollmentId: string;
  userId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  timeIn?: string;
  timeOut?: string;
  totalHours?: number;
  notes?: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

export default function AttendanceManagePage() {
  const [students, setStudents] = useState<StudentEnrollment[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form] = Form.useForm();

  // Fetch batches
  const { data: batchesData, loading: batchesLoading } = useBatches({
    page: 1,
    limit: 100,
  });

  // Fetch existing attendance for selected date and batch
  const { data: existingAttendance, refetch: refetchAttendance } = useAttendance({
    batchId: selectedBatch,
    date: selectedDate.format('YYYY-MM-DD'),
    limit: 100,
  });

  // Bulk mark attendance mutation
  const bulkMarkMutation = useBulkMarkAttendance();

  // Load students when batch is selected
  useEffect(() => {
    const loadStudents = async () => {
      if (!selectedBatch) {
        setStudents([]);
        setAttendanceRecords([]);
        return;
      }

      setLoading(true);
      try {
        const response = await enrollmentService.getStudentsByBatchId(selectedBatch, {
          page: 1,
          limit: 100,
        });

        const enrollments = response.data;
        setStudents(enrollments);

        // Initialize attendance records from existing data or create new ones
        const records: AttendanceRecord[] = enrollments.map((enrollment: any) => {
          // Find existing attendance for this enrollment and date
          const existing = existingAttendance?.data?.find(
            (att: any) => att.enrollmentId === enrollment.id
          );

          if (existing) {
            return {
              enrollmentId: enrollment.id,
              userId: enrollment.userId,
              status: existing.status,
              timeIn: existing.timeIn ? dayjs(existing.timeIn).format('HH:mm:ss') : undefined,
              timeOut: existing.timeOut ? dayjs(existing.timeOut).format('HH:mm:ss') : undefined,
              totalHours: existing.totalHours || 0,
              notes: existing.notes || '',
              user: enrollment.user,
            };
          }

          // Create new record with default status
          return {
            enrollmentId: enrollment.id,
            userId: enrollment.userId,
            status: 'PRESENT',
            timeIn: '09:00:00',
            timeOut: '17:00:00',
            totalHours: 8,
            notes: '',
            user: enrollment.user,
          };
        });

        setAttendanceRecords(records);
      } catch (error) {
        console.error('Error loading students:', error);
        message.error('เกิดข้อผิดพลาดในการโหลดข้อมูลนักเรียน');
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [selectedBatch, selectedDate, existingAttendance]);

  const handleStatusChange = (index: number, newStatus: AttendanceRecord['status']) => {
    setAttendanceRecords(prev =>
      prev.map((record, i) => {
        if (i === index) {
          // Update status and adjust time based on status
          const updates: Partial<AttendanceRecord> = { status: newStatus };

          if (newStatus === 'ABSENT') {
            updates.timeIn = undefined;
            updates.timeOut = undefined;
            updates.totalHours = 0;
          } else if (newStatus === 'LATE') {
            updates.timeIn = '09:15:00';
            updates.timeOut = record.timeOut || '17:00:00';
          } else if (newStatus === 'PRESENT') {
            updates.timeIn = '09:00:00';
            updates.timeOut = record.timeOut || '17:00:00';
          }

          return { ...record, ...updates };
        }
        return record;
      })
    );
  };

  const handleEditRecord = (index: number) => {
    const record = attendanceRecords[index];
    setEditingIndex(index);
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
      if (editingIndex !== null) {
        setAttendanceRecords(prev =>
          prev.map((record, i) =>
            i === editingIndex
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
        setEditingIndex(null);
        form.resetFields();
        message.success('บันทึกข้อมูลเรียบร้อยแล้ว');
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleSaveAll = async () => {
    if (!selectedBatch) {
      message.error('กรุณาเลือกรุ่นเรียน');
      return;
    }

    try {
      await bulkMarkMutation.mutateAsync({
        batchId: selectedBatch,
        date: selectedDate.format('YYYY-MM-DD'),
        attendanceData: attendanceRecords.map(record => ({
          enrollmentId: record.enrollmentId,
          userId: record.userId,
          status: record.status,
          timeIn: record.timeIn,
          timeOut: record.timeOut,
          notes: record.notes,
        })),
      });

      // Refetch attendance data after save
      refetchAttendance();
    } catch (error) {
      console.error('Error saving attendance:', error);
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
      key: 'index',
      width: 80,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'ชื่อ-นามสกุล',
      key: 'studentName',
      render: (record: AttendanceRecord) => (
        `${record.user.firstName} ${record.user.lastName}`
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
      render: (hours: number) => `${hours || 0} ชม.`,
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
      width: 250,
      align: 'center' as const,
      render: (_: any, record: AttendanceRecord, index: number) => (
        <Space wrap>
          <Button
            size="small"
            type={record.status === 'PRESENT' ? 'primary' : 'default'}
            icon={<CheckOutlined />}
            onClick={() => handleStatusChange(index, 'PRESENT')}
          >
            เข้าเรียน
          </Button>
          <Button
            size="small"
            type={record.status === 'ABSENT' ? 'primary' : 'default'}
            danger={record.status === 'ABSENT'}
            icon={<CloseOutlined />}
            onClick={() => handleStatusChange(index, 'ABSENT')}
          >
            ขาดเรียน
          </Button>
          <Button
            size="small"
            type={record.status === 'LATE' ? 'primary' : 'default'}
            icon={<ClockCircleOutlined />}
            onClick={() => handleStatusChange(index, 'LATE')}
          >
            เข้าสาย
          </Button>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditRecord(index)}
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
          <Col span={10}>
            <Form.Item label="เลือกรุ่นเรียน">
              <Select
                placeholder="เลือกรุ่นเรียน"
                value={selectedBatch}
                onChange={setSelectedBatch}
                style={{ width: '100%' }}
                loading={batchesLoading}
                showSearch
                optionFilterProp="children"
              >
                {batchesData
                  ?.filter((batch: any) => batch.status === 'ACTIVE' || batch.status === 'PLANNING')
                  .map((batch: any) => (
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
          <Col span={6}>
            <Form.Item label=" ">
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveAll}
                  loading={bulkMarkMutation.isPending}
                  disabled={!selectedBatch || attendanceRecords.length === 0}
                >
                  บันทึกทั้งหมด
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={attendanceRecords}
          rowKey="enrollmentId"
          loading={loading}
          pagination={false}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title="แก้ไขข้อมูลการเข้าเรียน"
        open={editModalVisible}
        onOk={handleSaveEdit}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingIndex(null);
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
}

