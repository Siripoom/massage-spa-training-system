"use client";

import React, { useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, Tag, Typography, Breadcrumb, Select, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from '@/hooks/useCourses';
import { handleError, showSuccess } from '@/lib/errorHandler';
import type { Course, CreateCourseDto, UpdateCourseDto } from '@/types/api';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface CourseFormValues {
  title: string;
  description: string;
  duration: number;
  price: number;
  requirements?: string;
  status: string;
}

export default function CoursesPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm<CourseFormValues>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Use custom hooks - pass search and status filter to API
  const { data, loading, pagination, goToPage, refetch } = useCourses({
    page: currentPage,
    limit: 10,
    search: searchTerm,
    status: filterStatus !== 'all' ? filterStatus : undefined,
  });
  const { mutate: createCourse, loading: creating } = useCreateCourse();
  const { mutate: updateCourse, loading: updating } = useUpdateCourse();
  const { mutate: deleteCourse, loading: deleting } = useDeleteCourse();

  // Use data directly from API (already filtered by backend)
  const filteredCourses = data;

  // Reset to page 1 when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

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
      title: 'ชื่อหลักสูตร',
      dataIndex: 'title',
      key: 'title',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'คำอธิบาย',
      dataIndex: 'description',
      key: 'description',
      className: 'text-gray-700',
      ellipsis: true,
    },
    {
      title: 'ระยะเวลา (ชม.)',
      dataIndex: 'duration',
      key: 'duration',
      className: 'text-gray-700 text-center',
      render: (duration: number) => `${duration} ชม.`,
    },
    {
      title: 'ราคา (บาท)',
      dataIndex: 'price',
      key: 'price',
      className: 'text-gray-700 text-right',
      render: (price: number) => `฿${price.toLocaleString()}`,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          'ACTIVE': 'green',
          'INACTIVE': 'red',
          'DRAFT': 'orange',
        };
        const labels: Record<string, string> = {
          'ACTIVE': 'เปิดใช้งาน',
          'INACTIVE': 'ปิดใช้งาน',
          'DRAFT': 'แบบร่าง',
        };
        return (
          <Tag color={colors[status] || 'default'} className="rounded-full px-3 py-1 text-xs font-semibold">
            {labels[status] || status}
          </Tag>
        );
      },
      className: 'text-center',
    },
    {
      title: 'วันที่สร้าง',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
      className: 'text-gray-700',
    },
    {
      title: 'การดำเนินการ',
      key: 'actions',
      render: (_: unknown, record: Course) => (
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
    setEditingCourse(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Course) => {
    setEditingCourse(record);
    form.setFieldsValue({
      title: record.title,
      description: record.description || '',
      duration: record.duration,
      price: record.price,
      requirements: record.requirements || '',
      status: record.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบหลักสูตรนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      async onOk() {
        try {
          await deleteCourse(id);
          showSuccess('ลบหลักสูตรสำเร็จ!');
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
      const courseData: CreateCourseDto | UpdateCourseDto = {
        title: values.title,
        description: values.description,
        duration: values.duration,
        price: values.price,
        requirements: values.requirements,
        status: values.status,
      };

      if (editingCourse) {
        await updateCourse({ id: editingCourse.id, data: courseData });
        showSuccess('อัปเดตหลักสูตรสำเร็จ!');
      } else {
        await createCourse(courseData as CreateCourseDto);
        showSuccess('เพิ่มหลักสูตรสำเร็จ!');
      }

      setIsModalVisible(false);
      form.resetFields();
      refetch();
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCourse(null);
    form.resetFields();
  };

  const handleView = (record: Course) => {
    setViewingCourse(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false);
    setViewingCourse(null);
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
                <BookOutlined />
                <span>จัดการหลักสูตร</span>
              </>
            ),
          },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">จัดการหลักสูตร</h1>
          <Text type="secondary">จัดการข้อมูลหลักสูตรการฝึกอบรม</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
          className="shadow-sm"
        >
          เพิ่มหลักสูตร
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="ค้นหาด้วยชื่อหลักสูตรหรือคำอธิบาย"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          size="large"
        />
        <Select
          defaultValue="all"
          onChange={(value) => setFilterStatus(value)}
          className="w-48"
          size="large"
        >
          <Option value="all">สถานะทั้งหมด</Option>
          <Option value="ACTIVE">เปิดใช้งาน</Option>
          <Option value="INACTIVE">ปิดใช้งาน</Option>
          <Option value="DRAFT">แบบร่าง</Option>
        </Select>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredCourses}
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
        title={editingCourse ? 'แก้ไขหลักสูตร' : 'เพิ่มหลักสูตร'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingCourse ? 'อัปเดต' : 'เพิ่ม'}
        cancelText="ยกเลิก"
        confirmLoading={creating || updating}
        width={700}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="title"
            label="ชื่อหลักสูตร"
            rules={[{ required: true, message: 'กรุณากรอกชื่อหลักสูตร' }]}
          >
            <Input placeholder="ชื่อหลักสูตร" />
          </Form.Item>

          <Form.Item
            name="description"
            label="คำอธิบาย"
            rules={[{ required: true, message: 'กรุณากรอกคำอธิบาย' }]}
          >
            <TextArea rows={4} placeholder="คำอธิบายหลักสูตร" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="duration"
              label="ระยะเวลา (ชั่วโมง)"
              rules={[{ required: true, message: 'กรุณากรอกระยะเวลา' }]}
            >
              <InputNumber
                min={1}
                className="w-full"
                placeholder="120"
              />
            </Form.Item>

            <Form.Item
              name="price"
              label="ราคา (บาท)"
              rules={[{ required: true, message: 'กรุณากรอกราคา' }]}
            >
              <InputNumber
                min={0}
                className="w-full"
                placeholder="15000"
                formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="requirements"
            label="คุณสมบัติผู้เรียน"
          >
            <TextArea rows={3} placeholder="คุณสมบัติหรือข้อกำหนดของผู้เรียน" />
          </Form.Item>

          <Form.Item
            name="status"
            label="สถานะ"
            rules={[{ required: true, message: 'กรุณาเลือกสถานะ' }]}
          >
            <Select placeholder="เลือกสถานะ">
              <Option value="ACTIVE">เปิดใช้งาน</Option>
              <Option value="INACTIVE">ปิดใช้งาน</Option>
              <Option value="DRAFT">แบบร่าง</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="รายละเอียดหลักสูตร"
        open={isDetailModalVisible}
        onCancel={handleDetailModalClose}
        footer={[
          <Button key="close" onClick={handleDetailModalClose}>
            ปิด
          </Button>,
        ]}
        width={700}
      >
        {viewingCourse && (
          <div className="space-y-4">
            <div>
              <Text type="secondary">ชื่อหลักสูตร</Text>
              <div className="font-medium text-lg">{viewingCourse.title}</div>
            </div>

            <div>
              <Text type="secondary">คำอธิบาย</Text>
              <div className="font-medium">{viewingCourse.description || '-'}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text type="secondary">ระยะเวลา</Text>
                <div className="font-medium">{viewingCourse.duration} ชั่วโมง</div>
              </div>
              <div>
                <Text type="secondary">ราคา</Text>
                <div className="font-medium">฿{viewingCourse.price.toLocaleString()}</div>
              </div>
            </div>

            {viewingCourse.requirements && (
              <div>
                <Text type="secondary">คุณสมบัติผู้เรียน</Text>
                <div className="font-medium">{viewingCourse.requirements}</div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text type="secondary">สถานะ</Text>
                <div>
                  <Tag color={viewingCourse.status === 'ACTIVE' ? 'green' : viewingCourse.status === 'INACTIVE' ? 'red' : 'orange'}>
                    {viewingCourse.status === 'ACTIVE' ? 'เปิดใช้งาน' : viewingCourse.status === 'INACTIVE' ? 'ปิดใช้งาน' : 'แบบร่าง'}
                  </Tag>
                </div>
              </div>
              <div>
                <Text type="secondary">วันที่สร้าง</Text>
                <div className="font-medium">{dayjs(viewingCourse.createdAt).format('DD/MM/YYYY HH:mm')}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
