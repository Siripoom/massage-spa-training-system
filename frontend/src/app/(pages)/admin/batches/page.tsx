"use client";

import React, { useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, Tag, Typography, Breadcrumb, Select, DatePicker, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useBatches, useCreateBatch, useUpdateBatch, useDeleteBatch, useNextBatchNumber } from '@/hooks/useBatches';
import { useCourses } from '@/hooks/useCourses';
import { handleError, showSuccess } from '@/lib/errorHandler';
import type { Batch, CreateBatchDto, UpdateBatchDto, BatchStatus } from '@/types/api';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface BatchFormValues {
  courseId: string;
  batchNumber: number;
  name: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  maxStudents: number;
  totalHours: number;
  description?: string;
  location?: string;
  status: BatchStatus;
}

export default function BatchesPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [form] = Form.useForm<BatchFormValues>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingBatch, setViewingBatch] = useState<Batch | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Use custom hooks - pass filters to API
  const { data, loading, pagination, goToPage, refetch } = useBatches({
    page: currentPage,
    limit: 10,
    status: filterStatus !== 'all' ? (filterStatus as any) : undefined,
    courseId: filterCourse !== 'all' ? filterCourse : undefined,
  });
  const { data: courses } = useCourses({ page: 1, limit: 100 });
  const { mutate: createBatch, loading: creating } = useCreateBatch();
  const { mutate: updateBatch, loading: updating } = useUpdateBatch();
  const { mutate: deleteBatch, loading: deleting } = useDeleteBatch();
  const { data: nextBatchNumber } = useNextBatchNumber(selectedCourseId);

  // Client-side filter only for search (backend doesn't have search yet)
  const filteredBatches = data.filter(batch => {
    if (!searchTerm) return true;
    return batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (batch.description && batch.description.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterCourse]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    goToPage(page);
  };

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_: any, __: any, index: number) => (pagination.page - 1) * pagination.limit + index + 1,
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'ชื่อรุ่น',
      dataIndex: 'name',
      key: 'name',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'รุ่นที่',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      className: 'text-center',
      render: (num: number) => <Tag color="blue">รุ่น {num}</Tag>,
    },
    {
      title: 'วันที่เริ่ม - สิ้นสุด',
      key: 'dateRange',
      render: (record: Batch) => (
        <div>
          <div>{dayjs(record.startDate).format('DD/MM/YYYY')}</div>
          <div className="text-gray-500 text-sm">ถึง {dayjs(record.endDate).format('DD/MM/YYYY')}</div>
        </div>
      ),
      className: 'text-gray-700',
    },
    {
      title: 'จำนวนนักเรียน',
      key: 'students',
      render: (record: Batch) => (
        <div className="text-center">
          <span className={record.currentStudents >= record.maxStudents ? 'text-red-500 font-bold' : ''}>
            {record.currentStudents || 0}
          </span>
          <span className="text-gray-400"> / {record.maxStudents}</span>
        </div>
      ),
      className: 'text-center',
    },
    {
      title: 'ชั่วโมงทั้งหมด',
      dataIndex: 'totalHours',
      key: 'totalHours',
      className: 'text-center',
      render: (hours: number) => `${hours} ชม.`,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status: BatchStatus) => {
        const colors: Record<BatchStatus, string> = {
          PLANNING: 'orange',
          ACTIVE: 'green',
          COMPLETED: 'blue',
          CANCELLED: 'red',
        };
        const labels: Record<BatchStatus, string> = {
          PLANNING: 'กำลังวางแผน',
          ACTIVE: 'เปิดสอน',
          COMPLETED: 'จบหลักสูตร',
          CANCELLED: 'ยกเลิก',
        };
        return (
          <Tag color={colors[status]} className="rounded-full px-3 py-1 text-xs font-semibold">
            {labels[status]}
          </Tag>
        );
      },
      className: 'text-center',
    },
    {
      title: 'การดำเนินการ',
      key: 'actions',
      render: (_: unknown, record: Batch) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="text-blue-500 border-none shadow-none hover:bg-blue-50"
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
            className="text-red-500 border-none shadow-none hover:bg-red-50"
            loading={deleting}
          />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingBatch(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Batch) => {
    setEditingBatch(record);
    setSelectedCourseId(record.courseId);
    form.setFieldsValue({
      courseId: record.courseId,
      batchNumber: record.batchNumber,
      name: record.name,
      startDate: dayjs(record.startDate),
      endDate: dayjs(record.endDate),
      maxStudents: record.maxStudents,
      totalHours: record.totalHours,
      description: record.description || '',
      location: record.location || '',
      status: record.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบรุ่นนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      async onOk() {
        try {
          await deleteBatch(id);
          showSuccess('ลบรุ่นสำเร็จ!');
          refetch();
        } catch (error) {
          handleError(error);
        }
      },
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const batchData: CreateBatchDto | UpdateBatchDto = {
        courseId: values.courseId,
        batchNumber: values.batchNumber,
        name: values.name,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
        maxStudents: values.maxStudents,
        totalHours: values.totalHours,
        description: values.description,
        location: values.location,
        status: values.status,
      };

      if (editingBatch) {
        await updateBatch({ id: editingBatch.id, data: batchData });
        showSuccess('อัปเดตรุ่นสำเร็จ!');
      } else {
        await createBatch(batchData as CreateBatchDto);
        showSuccess('เพิ่มรุ่นสำเร็จ!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setSelectedCourseId('');
      refetch();
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingBatch(null);
    setSelectedCourseId('');
    form.resetFields();
  };

  const handleView = (record: Batch) => {
    setViewingBatch(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false);
    setViewingBatch(null);
  };

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    // Auto-fill next batch number when course is selected
    if (nextBatchNumber) {
      form.setFieldValue('batchNumber', nextBatchNumber);
    }
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-6"
        items={[
          {
            href: '/admin/dashboard',
            title: (
              <>
                <HomeOutlined />
                <span>หน้าหลัก</span>
              </>
            ),
          },
          {
            title: (
              <>
                <TeamOutlined />
                <span>จัดการรุ่นเรียน</span>
              </>
            ),
          },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">จัดการรุ่นเรียน</h1>
          <Text type="secondary">จัดการข้อมูลรุ่นเรียนต่างๆ ของหลักสูตร</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
          className="shadow-sm"
        >
          เพิ่มรุ่นเรียน
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="ค้นหาด้วยชื่อรุ่นหรือคำอธิบาย"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          size="large"
        />
        <Select
          value={filterCourse}
          onChange={(value) => setFilterCourse(value)}
          className="w-60"
          size="large"
          placeholder="เลือกหลักสูตร"
        >
          <Option value="all">หลักสูตรทั้งหมด</Option>
          {courses.map(course => (
            <Option key={course.id} value={course.id}>{course.title}</Option>
          ))}
        </Select>
        <Select
          value={filterStatus}
          onChange={(value) => setFilterStatus(value)}
          className="w-48"
          size="large"
        >
          <Option value="all">สถานะทั้งหมด</Option>
          <Option value="PLANNING">กำลังวางแผน</Option>
          <Option value="ACTIVE">เปิดสอน</Option>
          <Option value="COMPLETED">จบหลักสูตร</Option>
          <Option value="CANCELLED">ยกเลิก</Option>
        </Select>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredBatches}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pagination.limit,
          total: pagination.total,
          onChange: handlePageChange,
          showSizeChanger: false,
          showTotal: (total) => `ทั้งหมด ${total} รายการ`,
        }}
        className="bg-white rounded-lg shadow-sm"
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingBatch ? 'แก้ไขรุ่นเรียน' : 'เพิ่มรุ่นเรียน'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingBatch ? 'อัปเดต' : 'เพิ่ม'}
        cancelText="ยกเลิก"
        confirmLoading={creating || updating}
        width={800}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="courseId"
            label="หลักสูตร"
            rules={[{ required: true, message: 'กรุณาเลือกหลักสูตร' }]}
          >
            <Select
              placeholder="เลือกหลักสูตร"
              onChange={handleCourseChange}
              showSearch
              filterOption={(input, option) =>
                (option?.children as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {courses.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="batchNumber"
              label="รุ่นที่"
              rules={[{ required: true, message: 'กรุณากรอกรุ่นที่' }]}
            >
              <InputNumber min={1} className="w-full" placeholder="1" />
            </Form.Item>

            <Form.Item
              name="maxStudents"
              label="จำนวนนักเรียนสูงสุด"
              rules={[{ required: true, message: 'กรุณากรอกจำนวนนักเรียน' }]}
            >
              <InputNumber min={1} className="w-full" placeholder="30" />
            </Form.Item>
          </div>

          <Form.Item
            name="name"
            label="ชื่อรุ่น"
            rules={[{ required: true, message: 'กรุณากรอกชื่อรุ่น' }]}
          >
            <Input placeholder="เช่น หลักสูตรนวดไทย รุ่นที่ 30" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="startDate"
              label="วันที่เริ่ม"
              rules={[{ required: true, message: 'กรุณาเลือกวันที่เริ่ม' }]}
            >
              <DatePicker className="w-full" format="DD/MM/YYYY" placeholder="เลือกวันที่เริ่ม" />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="วันที่สิ้นสุด"
              rules={[{ required: true, message: 'กรุณาเลือกวันที่สิ้นสุด' }]}
            >
              <DatePicker className="w-full" format="DD/MM/YYYY" placeholder="เลือกวันที่สิ้นสุด" />
            </Form.Item>
          </div>

          <Form.Item
            name="totalHours"
            label="จำนวนชั่วโมงทั้งหมด"
            rules={[{ required: true, message: 'กรุณากรอกจำนวนชั่วโมง' }]}
          >
            <InputNumber min={1} className="w-full" placeholder="150" />
          </Form.Item>

          <Form.Item name="location" label="สถานที่">
            <Input placeholder="สถานที่เรียน" />
          </Form.Item>

          <Form.Item name="description" label="คำอธิบาย">
            <TextArea rows={3} placeholder="คำอธิบายเพิ่มเติม" />
          </Form.Item>

          <Form.Item
            name="status"
            label="สถานะ"
            rules={[{ required: true, message: 'กรุณาเลือกสถานะ' }]}
          >
            <Select placeholder="เลือกสถานะ">
              <Option value="PLANNING">กำลังวางแผน</Option>
              <Option value="ACTIVE">เปิดสอน</Option>
              <Option value="COMPLETED">จบหลักสูตร</Option>
              <Option value="CANCELLED">ยกเลิก</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="รายละเอียดรุ่นเรียน"
        open={isDetailModalVisible}
        onCancel={handleDetailModalClose}
        footer={[
          <Button key="close" onClick={handleDetailModalClose}>
            ปิด
          </Button>,
        ]}
        width={700}
      >
        {viewingBatch && (
          <div className="space-y-4">
            <div>
              <Text type="secondary">ชื่อรุ่น</Text>
              <div className="font-medium text-lg">{viewingBatch.name}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text type="secondary">รุ่นที่</Text>
                <div className="font-medium">{viewingBatch.batchNumber}</div>
              </div>
              <div>
                <Text type="secondary">จำนวนชั่วโมง</Text>
                <div className="font-medium">{viewingBatch.totalHours} ชั่วโมง</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text type="secondary">วันที่เริ่ม</Text>
                <div className="font-medium">{dayjs(viewingBatch.startDate).format('DD/MM/YYYY')}</div>
              </div>
              <div>
                <Text type="secondary">วันที่สิ้นสุด</Text>
                <div className="font-medium">{dayjs(viewingBatch.endDate).format('DD/MM/YYYY')}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text type="secondary">จำนวนนักเรียน</Text>
                <div className="font-medium">{viewingBatch.currentStudents || 0} / {viewingBatch.maxStudents}</div>
              </div>
              <div>
                <Text type="secondary">สถานะ</Text>
                <div>
                  <Tag color={
                    viewingBatch.status === 'ACTIVE' ? 'green' :
                      viewingBatch.status === 'PLANNING' ? 'orange' :
                        viewingBatch.status === 'COMPLETED' ? 'blue' : 'red'
                  }>
                    {viewingBatch.status === 'ACTIVE' ? 'เปิดสอน' :
                      viewingBatch.status === 'PLANNING' ? 'กำลังวางแผน' :
                        viewingBatch.status === 'COMPLETED' ? 'จบหลักสูตร' : 'ยกเลิก'}
                  </Tag>
                </div>
              </div>
            </div>

            {viewingBatch.location && (
              <div>
                <Text type="secondary">สถานที่</Text>
                <div className="font-medium">{viewingBatch.location}</div>
              </div>
            )}

            {viewingBatch.description && (
              <div>
                <Text type="secondary">คำอธิบาย</Text>
                <div className="font-medium">{viewingBatch.description}</div>
              </div>
            )}

            <div>
              <Text type="secondary">วันที่สร้าง</Text>
              <div className="font-medium">{dayjs(viewingBatch.createdAt).format('DD/MM/YYYY HH:mm')}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
