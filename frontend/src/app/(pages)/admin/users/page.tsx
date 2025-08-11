"use client";

import React, { useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, message, Tag, Typography, Breadcrumb, Select, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;
const { Option } = Select;

interface User {
  key: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'teacher' | 'student';
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
  lastLogin?: string;
}

interface UserFormValues {
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'teacher' | 'student';
  status: 'active' | 'inactive' | 'pending';
  registrationDate: dayjs.Dayjs | null;
}

export default function UsersPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm<UserFormValues>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [users, setUsers] = useState<User[]>([
    {
      key: '1',
      fullName: 'สมชาย ใจดี',
      email: 'somchai@email.com',
      phone: '081-234-5678',
      role: 'student',
      status: 'active',
      registrationDate: '2023-12-01',
      lastLogin: '2024-01-15',
    },
    {
      key: '2',
      fullName: 'สมหญิง รักเรียน',
      email: 'somying@email.com',
      phone: '082-345-6789',
      role: 'student',
      status: 'active',
      registrationDate: '2023-12-05',
      lastLogin: '2024-01-14',
    },
    {
      key: '3',
      fullName: 'อาจารย์มานะ พากเพียร',
      email: 'mana@school.com',
      phone: '083-456-7890',
      role: 'teacher',
      status: 'active',
      registrationDate: '2023-11-15',
      lastLogin: '2024-01-15',
    },
    {
      key: '4',
      fullName: 'ผู้ดูแลระบบ',
      email: 'admin@relaxplus.com',
      phone: '084-567-8901',
      role: 'admin',
      status: 'active',
      registrationDate: '2023-10-01',
      lastLogin: '2024-01-15',
    },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text: string) => parseInt(text),
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'FULL NAME',
      dataIndex: 'fullName',
      key: 'fullName',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      className: 'text-gray-700',
    },
    {
      title: 'PHONE',
      dataIndex: 'phone',
      key: 'phone',
      className: 'text-gray-700',
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
      render: (role: User['role']) => {
        const colors = {
          admin: 'red',
          teacher: 'blue',
          student: 'green'
        };
        const labels = {
          admin: 'ผู้ดูแลระบบ',
          teacher: 'อาจารย์',
          student: 'นักเรียน'
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
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: User['status']) => {
        const colors = {
          active: 'green',
          inactive: 'red',
          pending: 'orange'
        };
        const labels = {
          active: 'ใช้งาน',
          inactive: 'ไม่ใช้งาน',
          pending: 'รอดำเนินการ'
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
      title: 'REGISTRATION DATE',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
      className: 'text-gray-700',
    },
    {
      title: 'ACTIONS',
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
            onClick={() => handleDelete(record.key)}
            className="text-red-500 border-none shadow-none hover:bg-red-50"
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
      ...record,
      registrationDate: record.registrationDate ? dayjs(record.registrationDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (keyToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setUsers(prevUsers => prevUsers.filter(user => user.key !== keyToDelete));
        message.success('ลบผู้ใช้สำเร็จ!');
      },
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: UserFormValues) => {
        const formattedValues = {
          ...values,
          registrationDate: values.registrationDate ? values.registrationDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
        };
        
        if (editingUser) {
          setUsers(prevUsers =>
            prevUsers.map(user =>
              user.key === editingUser.key 
                ? { ...user, ...formattedValues } 
                : user
            )
          );
          message.success('อัปเดตผู้ใช้สำเร็จ!');
        } else {
          const newUser: User = {
            key: (users.length + 1).toString(),
            ...formattedValues,
          };
          setUsers(prevUsers => [...prevUsers, newUser]);
          message.success('เพิ่มผู้ใช้สำเร็จ!');
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleView = (record: User) => {
    setViewingUser(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setViewingUser(null);
  };

  const breadcrumbItems = [
    {
      title: (
        <a href="/admin/dashboard">
          <HomeOutlined /> หน้าหลัก
        </a>
      ),
    },
    {
      title: (
        <>
          <UserOutlined /> จัดการผู้ใช้
        </>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Professional Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #5d4037 0%, #8d6e63 50%, #a1887f 100%)', 
        borderRadius: '16px', 
        padding: '32px 40px', 
        marginBottom: '32px',
        boxShadow: '0 8px 24px rgba(93, 64, 55, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          zIndex: 1
        }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '32px', 
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            marginBottom: '8px'
          }}>
            จัดการผู้ใช้
          </h1>
          <p style={{ 
            margin: 0, 
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '300'
          }}>
            ระบบจัดการผู้ใช้ RelaxPlus
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex gap-4">
          <Input
            placeholder="ค้นหาผู้ใช้"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-80 rounded-lg shadow-sm table-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterRole}
            onChange={setFilterRole}
            className="w-40"
            placeholder="กรองตามบทบาท"
          >
            <Option value="all">ทุกบทบาท</Option>
            <Option value="admin">ผู้ดูแลระบบ</Option>
            <Option value="teacher">อาจารย์</Option>
            <Option value="student">นักเรียน</Option>
          </Select>
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-40"
            placeholder="กรองตามสถานะ"
          >
            <Option value="all">ทุกสถานะ</Option>
            <Option value="active">ใช้งาน</Option>
            <Option value="inactive">ไม่ใช้งาน</Option>
            <Option value="pending">รอดำเนินการ</Option>
          </Select>
        </div>
        <Button
          type="primary"
          onClick={handleAdd}
          icon={<PlusOutlined />}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
        >
          เพิ่มผู้ใช้
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        className="rounded-xl shadow-custom-light mt-4"
        pagination={{ pageSize: 10 }}
        bordered={false}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-xl"
        centered
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          name="user_form"
          className="p-4"
        >
          <Form.Item
            name="fullName"
            label={<span className="font-semibold text-gray-700">ชื่อ-นามสกุล</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อ-นามสกุล!' }]}
          >
            <Input placeholder="เช่น สมชาย ใจดี" className="rounded-lg" />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="email"
              label={<span className="font-semibold text-gray-700">อีเมล</span>}
              rules={[
                { required: true, message: 'กรุณากรอกอีเมล!' },
                { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง!' }
              ]}
            >
              <Input placeholder="example@email.com" className="rounded-lg" />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="font-semibold text-gray-700">เบอร์โทร</span>}
              rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร!' }]}
            >
              <Input placeholder="081-234-5678" className="rounded-lg" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="role"
              label={<span className="font-semibold text-gray-700">บทบาท</span>}
              rules={[{ required: true, message: 'กรุณาเลือกบทบาท!' }]}
            >
              <Select placeholder="เลือกบทบาท" className="rounded-lg">
                <Option value="admin">ผู้ดูแลระบบ</Option>
                <Option value="teacher">อาจารย์</Option>
                <Option value="student">นักเรียน</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label={<span className="font-semibold text-gray-700">สถานะ</span>}
              rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
            >
              <Select placeholder="เลือกสถานะ" className="rounded-lg">
                <Option value="active">ใช้งาน</Option>
                <Option value="inactive">ไม่ใช้งาน</Option>
                <Option value="pending">รอดำเนินการ</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="registrationDate"
            label={<span className="font-semibold text-gray-700">วันที่สมัคร</span>}
            rules={[{ required: true, message: 'กรุณาเลือกวันที่!' }]}
          >
            <DatePicker format="YYYY-MM-DD" className="w-full rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Details Modal */}
      <Modal
        title="รายละเอียดผู้ใช้"
        open={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={null}
        className="rounded-xl"
        centered
        width={600}
      >
        {viewingUser && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><Text strong>ชื่อ-นามสกุล:</Text></p>
                <p className="mb-4 text-gray-700">{viewingUser.fullName}</p>
                
                <p className="mb-2"><Text strong>อีเมล:</Text></p>
                <p className="mb-4 text-gray-700">{viewingUser.email}</p>
                
                <p className="mb-2"><Text strong>เบอร์โทร:</Text></p>
                <p className="mb-4 text-gray-700">{viewingUser.phone}</p>
              </div>
              
              <div>
                <p className="mb-2"><Text strong>บทบาท:</Text></p>
                <p className="mb-4">
                  <Tag color={
                    viewingUser.role === 'admin' ? 'red' :
                    viewingUser.role === 'teacher' ? 'blue' : 'green'
                  }>
                    {viewingUser.role === 'admin' ? 'ผู้ดูแลระบบ' :
                     viewingUser.role === 'teacher' ? 'อาจารย์' : 'นักเรียน'}
                  </Tag>
                </p>
                
                <p className="mb-2"><Text strong>สถานะ:</Text></p>
                <p className="mb-4">
                  <Tag color={
                    viewingUser.status === 'active' ? 'green' :
                    viewingUser.status === 'inactive' ? 'red' : 'orange'
                  }>
                    {viewingUser.status === 'active' ? 'ใช้งาน' :
                     viewingUser.status === 'inactive' ? 'ไม่ใช้งาน' : 'รอดำเนินการ'}
                  </Tag>
                </p>
                
                <p className="mb-2"><Text strong>วันที่สมัคร:</Text></p>
                <p className="mb-4 text-gray-700">{dayjs(viewingUser.registrationDate).format('DD/MM/YYYY')}</p>
              </div>
            </div>
            
            {viewingUser.lastLogin && (
              <div className="border-t pt-4 mt-4">
                <p className="mb-2"><Text strong>เข้าสู่ระบบล่าสุด:</Text></p>
                <p className="text-gray-500 text-sm">{dayjs(viewingUser.lastLogin).format('DD/MM/YYYY HH:mm')}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
