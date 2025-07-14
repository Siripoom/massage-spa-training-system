// src/app/(pages)/(admin)/courses/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Tag, Select, Typography } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

interface Course {
  key: string;
  title: string;
  organization: string;
  price: number;
  studentsEnrolled: number;
  status: 'ACTIVE' | 'INACTIVE';
  description: string;
}

interface CourseFormValues {
  title: string;
  organization: string;
  price: number;
  studentsEnrolled: number;
  status: 'ACTIVE' | 'INACTIVE';
  description: string;
}

export default function CoursePage() { // เปลี่ยนชื่อ Component เป็น CoursePage
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm<CourseFormValues>();

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([
    {
      key: '1',
      title: 'หลักสูตรนวดแผนไทยเบื้องต้น',
      organization: 'โรงเรียนนวดไทย',
      price: 12500,
      studentsEnrolled: 30,
      status: 'ACTIVE',
      description: 'เรียนรู้เทคนิคการนวดแผนไทยพื้นฐานและประวัติศาสตร์',
    },
    {
      key: '2',
      title: 'หลักสูตรสปาเพื่อสุขภาพ',
      organization: 'สปาบำบัดสุข',
      price: 15000,
      studentsEnrolled: 25,
      status: 'ACTIVE',
      description: 'เรียนรู้การทำสปาและทรีทเม้นท์ต่างๆ เพื่อสุขภาพและความผ่อนคลาย',
    },
    {
      key: '3',
      title: 'หลักสูตรอโรมาเธอราพี',
      organization: 'ศูนย์บำบัดกลิ่นหอม',
      price: 10000,
      studentsEnrolled: 15,
      status: 'INACTIVE',
      description: 'เรียนรู้การใช้น้ำมันหอมระเหยเพื่อการบำบัดและเทคนิคการผสม',
    },
    {
      key: '4',
      title: 'หลักสูตรนวดกดจุดเท้า',
      organization: 'คลินิกเท้าเพื่อสุขภาพ',
      price: 8000,
      studentsEnrolled: 20,
      status: 'ACTIVE',
      description: 'เรียนรู้การนวดกดจุดเท้าเพื่อสุขภาพและบรรเทาอาการต่างๆ',
    },
    {
      key: '5',
      title: 'หลักสูตรการดูแลผิวหน้า',
      organization: 'สถาบันความงาม',
      price: 18000,
      studentsEnrolled: 10,
      status: 'INACTIVE',
      description: 'เรียนรู้เทคนิคการดูแลผิวหน้าและการใช้ผลิตภัณฑ์ที่เหมาะสม',
    },
  ]);

  const filteredCourses = courses.filter(courses =>
    courses.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    courses.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    courses.status.toLowerCase().includes(searchTerm.toLowerCase())
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
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'ORGANIZATION',
      dataIndex: 'organization',
      key: 'organization',
      className: 'text-gray-700',
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} THB`,
      className: 'text-gray-700',
    },
    {
      title: 'STUDENTS ENROLLED',
      dataIndex: 'studentsEnrolled',
      key: 'studentsEnrolled',
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
      render: (_text: string, record: Course) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} className="text-blue-500 border-none shadow-none hover:bg-blue-50" />
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
    setEditingCourse(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Course) => {
    setEditingCourse(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (keyToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลหลักสูตรนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setCourses(prevCourses => prevCourses.filter(course => course.key !== keyToDelete));
        message.success('ลบข้อมูลหลักสูตรสำเร็จ!');
      },
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: CourseFormValues) => {
        if (editingCourse) {
          setCourses(prevCourses =>
            prevCourses.map(course =>
              course.key === editingCourse.key ? { ...course, ...values } : course
            )
          );
          message.success('อัปเดตข้อมูลหลักสูตรสำเร็จ!');
        } else {
          const newCourse: Course = {
            key: (courses.length + 1).toString(),
            ...values,
          };
          setCourses(prevCourses => [...prevCourses, newCourse]);
          message.success('เพิ่มข้อมูลหลักสูตรสำเร็จ!');
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

  const handleView = (record: Course) => {
    setViewingCourse(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setViewingCourse(null);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Course</h1>
      <div className="flex justify-between gap-25 items-center mb-6">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-10 rounded-lg shadow-sm table-search-input"
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
        dataSource={filteredCourses}
        className="rounded-xl shadow-custom-light mt-2"
        pagination={{ pageSize: 10 }}
        bordered={false}
      />

      <Modal
        title={editingCourse ? 'แก้ไขข้อมูลหลักสูตร' : 'เพิ่มหลักสูตรใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-xl"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="course_form"
          className="p-4"
        >
          <Form.Item
            name="title"
            label={<span className="font-semibold text-gray-700">ชื่อหลักสูตร</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อหลักสูตร!' }]}
          >
            <Input placeholder="เช่น หลักสูตรนวดแผนไทย" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="organization"
            label={<span className="font-semibold text-gray-700">องค์กร</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อองค์กร!' }]}
          >
            <Input placeholder="เช่น โรงเรียนนวดไทย" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="price"
            label={<span className="font-semibold text-gray-700">ราคา</span>}
            rules={[{ required: true, message: 'กรุณากรอกราคา!', type: 'number', transform: (value) => Number(value) || 0 }]}
          >
            <Input type="number" placeholder="เช่น 12500" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="studentsEnrolled"
            label={<span className="font-semibold text-gray-700">จำนวนนักเรียนที่ลงทะเบียน</span>}
            rules={[{ required: true, message: 'กรุณากรอกจำนวนนักเรียน!', type: 'number', transform: (value) => Number(value) || 0 }]}
          >
            <Input type="number" placeholder="เช่น 30" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="status"
            label={<span className="font-semibold text-gray-700">สถานะ</span>}
            rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
          >
            <Select<CourseFormValues['status']> placeholder="เลือกสถานะ" className="rounded-lg">
              <Option value="ACTIVE">ACTIVE</Option>
              <Option value="INACTIVE">INACTIVE</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label={<span className="font-semibold text-gray-700">คำอธิบาย</span>}
          >
            <Input.TextArea rows={4} placeholder="รายละเอียดเกี่ยวกับหลักสูตร" className="rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="รายละเอียดหลักสูตร"
        open={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={null}
        className="rounded-xl"
        centered
      >
        {viewingCourse ? (
          <div className="p-4">
            <p className="mb-2"><Text strong>ชื่อหลักสูตร:</Text> {viewingCourse.title}</p>
            <p className="mb-2"><Text strong>องค์กร:</Text> {viewingCourse.organization}</p>
            <p className="mb-2"><Text strong>ราคา:</Text> {viewingCourse.price.toLocaleString()} THB</p>
            <p className="mb-2"><Text strong>จำนวนนักเรียนที่ลงทะเบียน:</Text> {viewingCourse.studentsEnrolled}</p>
            <p className="mb-2"><Text strong>สถานะ:</Text> <Tag color={viewingCourse.status === 'ACTIVE' ? 'green' : 'red'}>{viewingCourse.status}</Tag></p>
            <p className="mb-2"><Text strong>คำอธิบาย:</Text> {viewingCourse.description}</p>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}
      </Modal>
    </>
  );
}
