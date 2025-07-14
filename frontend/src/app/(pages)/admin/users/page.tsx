// src/app/(pages)/(admin)/users/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Tag, Select, Typography } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons'; // เพิ่ม DeleteOutlined

const { Option } = Select;
const { Text } = Typography;

interface Student {
  key: string;
  name: string;
  email: string;
  course: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface StudentFormValues {
  name: string;
  email: string;
  course: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export default function StudentPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form] = Form.useForm<StudentFormValues>();

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [students, setStudents] = useState<Student[]>([
    {
      key: '1',
      name: 'สมชาย ใจดี',
      email: 'somchai@example.com',
      course: 'นวดแผนไทยเบื้องต้น',
      status: 'ACTIVE',
    },
    {
      key: '2',
      name: 'สมหญิง รักเรียน',
      email: 'somying@example.com',
      course: 'สปาเพื่อสุขภาพ',
      status: 'ACTIVE',
    },
    {
      key: '3',
      name: 'มานะ พากเพียร',
      email: 'mana@example.com',
      course: 'อโรมาเธอราพี',
      status: 'INACTIVE',
    },
    {
      key: '4',
      name: 'ดวงใจ งามยิ่ง',
      email: 'duangjai@example.com',
      course: 'นวดกดจุดเท้า',
      status: 'ACTIVE',
    },
  ]);


  const filteredStudents = students.filter(students =>
    students.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    students.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    students.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    students.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      className: 'text-gray-700',
    },
    {
      title: 'COURSE',
      dataIndex: 'course',
      key: 'course',
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'ACTIVE' | 'INACTIVE') => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'} className="rounded-full px-3 py-1 text-xs font-semibold">
          {status}
        </Tag>
      ),
      className: 'text-center',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_text: string, record: Student) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} className="text-blue-500 border-none shadow-none hover:bg-blue-50" />
          {/* *** เพิ่มปุ่ม Delete ที่นี่ *** */}
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
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Student) => {
    setEditingStudent(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // เพิ่ม handleDelete function
  const handleDelete = (keyToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนักเรียนนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setStudents(prevStudents => prevStudents.filter(student => student.key !== keyToDelete));
        message.success('ลบข้อมูลนักเรียนสำเร็จ!');
      },
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: StudentFormValues) => {
        if (editingStudent) {
          setStudents(prevStudents =>
            prevStudents.map(student =>
              student.key === editingStudent.key ? { ...student, ...values } : student
            )
          );
          message.success('อัปเดตข้อมูลนักเรียนสำเร็จ!');
        } else {
          const newStudent: Student = {
            key: (students.length + 1).toString(),
            ...values,
          };
          setStudents(prevStudents => [...prevStudents, newStudent]);
          message.success('เพิ่มข้อมูลนักเรียนสำเร็จ!');
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

  const handleView = (record: Student) => {
    setViewingStudent(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setViewingStudent(null);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Student</h1>
      <div className="flex justify-between items-center gap-25 mb-6">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-80 rounded-lg shadow-sm table-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleAdd}
          icon={<PlusOutlined />}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
        >
          เพิ่ม
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredStudents}
        className="rounded-xl shadow-custom-light"
        pagination={{ pageSize: 10 }}
        bordered={false}
      />

      <Modal
        title={editingStudent ? 'แก้ไขข้อมูลนักเรียน' : 'เพิ่มนักเรียนใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-xl"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="student_form"
          className="p-4"
        >
          <Form.Item
            name="name"
            label={<span className="font-semibold text-gray-700">ชื่อนักเรียน</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อนักเรียน!' }]}
          >
            <Input placeholder="เช่น สมชาย ใจดี" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="email"
            label={<span className="font-semibold text-gray-700">อีเมล</span>}
            rules={[{ required: true, message: 'กรุณากรอกอีเมล!', type: 'email' }]}
          >
            <Input placeholder="เช่น somchai@example.com" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="course"
            label={<span className="font-semibold text-gray-700">หลักสูตร</span>}
            rules={[{ required: true, message: 'กรุณากรอกหลักสูตร!' }]}
          >
            <Input placeholder="เช่น นวดแผนไทยเบื้องต้น" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="status"
            label={<span className="font-semibold text-gray-700">สถานะ</span>}
            rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
          >
            <Select<StudentFormValues['status']> placeholder="เลือกสถานะ" className="rounded-lg">
              <Option value="ACTIVE">ACTIVE</Option>
              <Option value="INACTIVE">INACTIVE</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="รายละเอียดนักเรียน"
        open={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={null}
        className="rounded-xl"
        centered
      >
        {viewingStudent ? (
          <div className="p-4">
            <p className="mb-2"><Text strong>ชื่อนักเรียน:</Text> {viewingStudent.name}</p>
            <p className="mb-2"><Text strong>อีเมล:</Text> {viewingStudent.email}</p>
            <p className="mb-2"><Text strong>หลักสูตร:</Text> {viewingStudent.course}</p>
            <p className="mb-2"><Text strong>สถานะ:</Text> <Tag color={viewingStudent.status === 'ACTIVE' ? 'green' : 'red'}>{viewingStudent.status}</Tag></p>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}
      </Modal>
    </>
  );
}