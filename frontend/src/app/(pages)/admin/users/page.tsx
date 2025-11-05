"use client";

import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, Tag, Typography, Breadcrumb, Select, DatePicker, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@/hooks/useUsers';
import { handleError, showSuccess } from '@/lib/errorHandler';
import type { User, Role } from '@/types/api';

const { Text } = Typography;
const { Option } = Select;

interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  birthDate?: dayjs.Dayjs | null;
}

export default function UsersPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm<UserFormValues>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [filterRole, setFilterRole] = useState<string>('all');

  // Use custom hooks
  const { data, loading, pagination, goToPage, refetch } = useUsers({ page: 1, limit: 10 });
  const { mutate: createUser, loading: creating } = useCreateUser();
  const { mutate: updateUser, loading: updating } = useUpdateUser();
  const { mutate: deleteUser, loading: deleting } = useDeleteUser();

  const filteredUsers = data.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = filterRole === 'all' || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, __: any, index: number) => (pagination.page - 1) * pagination.limit + index + 1,
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'ชื่อ-นามสกุล',
      key: 'fullName',
      render: (record: User) => `${record.firstName} ${record.lastName}`,
      className: 'font-medium text-gray-900',
    },
    {
      title: 'อีเมล',
      dataIndex: 'email',
      key: 'email',
      className: 'text-gray-700',
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'phone',
      key: 'phone',
      className: 'text-gray-700',
    },
    {
      title: 'บทบาท',
      dataIndex: 'role',
      key: 'role',
      render: (role: Role) => {
        const colors = {
          ADMIN: 'red',
          TEACHER: 'blue',
          STUDENT: 'green'
        };
        const labels = {
          ADMIN: 'ผู้ดูแลระบบ',
          TEACHER: 'อาจารย์',
          STUDENT: 'นักเรียน'
        };
        return (
          <Tag color={colors[role]} className="rounded-full px-3 py-1 text-xs font-semibold">
            {labels[role]}
          </Tag>
        );
      },
      className: 'text-center',
    },
    {
      title: 'วันที่สมัคร',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
      className: 'text-gray-700',
    },
    {
      title: 'การดำเนินการ',
      key: 'actions',
      render: (_: unknown, record: User) => (
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
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue({
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      phone: record.phone,
      role: record.role,
      birthDate: record.birthDate ? dayjs(record.birthDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      async onOk() {
        try {
          await deleteUser(id);
          showSuccess('ลบผู้ใช้สำเร็จ!');
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
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        role: values.role,
        birthDate: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : undefined,
      };

      if (editingUser) {
        await updateUser({ id: editingUser.id, data: userData });
        showSuccess('อัปเดตผู้ใช้สำเร็จ!');
      } else {
        await createUser({ ...userData, password: '123456' }); // Default password
        showSuccess('เพิ่มผู้ใช้สำเร็จ!');
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
    setEditingUser(null);
    form.resetFields();
  };

  const handleView = (record: User) => {
    setViewingUser(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false);
    setViewingUser(null);
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
                <UserOutlined />
                <span>จัดการผู้ใช้</span>
              </>
            ),
          },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">จัดการผู้ใช้</h1>
          <Text type="secondary">จัดการข้อมูลผู้ใช้ในระบบ</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
          className="shadow-sm"
        >
          เพิ่มผู้ใช้
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="ค้นหาด้วยชื่อ อีเมล หรือเบอร์โทร"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          size="large"
        />
        <Select
          defaultValue="all"
          onChange={(value) => setFilterRole(value)}
          className="w-48"
          size="large"
        >
          <Option value="all">บทบาททั้งหมด</Option>
          <Option value="ADMIN">ผู้ดูแลระบบ</Option>
          <Option value="TEACHER">อาจารย์</Option>
          <Option value="STUDENT">นักเรียน</Option>
        </Select>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          onChange: goToPage,
          showSizeChanger: false,
          showTotal: (total) => `ทั้งหมด ${total} รายการ`,
        }}
        className="bg-white rounded-lg shadow-sm"
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingUser ? 'อัปเดต' : 'เพิ่ม'}
        cancelText="ยกเลิก"
        confirmLoading={creating || updating}
        width={600}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="firstName"
            label="ชื่อ"
            rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
          >
            <Input placeholder="ชื่อ" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="นามสกุล"
            rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}
          >
            <Input placeholder="นามสกุล" />
          </Form.Item>

          <Form.Item
            name="email"
            label="อีเมล"
            rules={[
              { required: true, message: 'กรุณากรอกอีเมล' },
              { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' }
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="เบอร์โทร"
            rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
          >
            <Input placeholder="081-234-5678" />
          </Form.Item>

          <Form.Item
            name="role"
            label="บทบาท"
            rules={[{ required: true, message: 'กรุณาเลือกบทบาท' }]}
          >
            <Select placeholder="เลือกบทบาท">
              <Option value="ADMIN">ผู้ดูแลระบบ</Option>
              <Option value="TEACHER">อาจารย์</Option>
              <Option value="STUDENT">นักเรียน</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="วันเกิด"
          >
            <DatePicker
              className="w-full"
              format="DD/MM/YYYY"
              placeholder="เลือกวันเกิด"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="รายละเอียดผู้ใช้"
        open={isDetailModalVisible}
        onCancel={handleDetailModalClose}
        footer={[
          <Button key="close" onClick={handleDetailModalClose}>
            ปิด
          </Button>,
        ]}
        width={600}
      >
        {viewingUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text type="secondary">ชื่อ-นามสกุล</Text>
                <div className="font-medium">{viewingUser.firstName} {viewingUser.lastName}</div>
              </div>
              <div>
                <Text type="secondary">อีเมล</Text>
                <div className="font-medium">{viewingUser.email}</div>
              </div>
              <div>
                <Text type="secondary">เบอร์โทร</Text>
                <div className="font-medium">{viewingUser.phone}</div>
              </div>
              <div>
                <Text type="secondary">บทบาท</Text>
                <div>
                  <Tag color={viewingUser.role === 'ADMIN' ? 'red' : viewingUser.role === 'TEACHER' ? 'blue' : 'green'}>
                    {viewingUser.role === 'ADMIN' ? 'ผู้ดูแลระบบ' : viewingUser.role === 'TEACHER' ? 'อาจารย์' : 'นักเรียน'}
                  </Tag>
                </div>
              </div>
              {viewingUser.birthDate && (
                <div>
                  <Text type="secondary">วันเกิด</Text>
                  <div className="font-medium">{dayjs(viewingUser.birthDate).format('DD/MM/YYYY')}</div>
                </div>
              )}
              <div>
                <Text type="secondary">วันที่สมัคร</Text>
                <div className="font-medium">{dayjs(viewingUser.createdAt).format('DD/MM/YYYY HH:mm')}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
