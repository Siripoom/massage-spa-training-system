"use client";

import React, { useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, message, Tag, Typography, Breadcrumb, Select, DatePicker, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Course {
  key: string;
  courseName: string;
  description: string;
  durationHours: number;
  price: number;
  maxStudents: number;
  currentStudents?: number;
  status: 'active' | 'draft' | 'completed' | 'cancelled';
  batchNumber?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseFormValues {
  courseName: string;
  description: string;
  durationHours: number;
  price: number;
  maxStudents: number;
  status: 'active' | 'draft' | 'completed' | 'cancelled';
  batchNumber?: string;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
}

export default function CoursesPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm<CourseFormValues>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);

  const [courses, setCourses] = useState<Course[]>([
    {
      key: '1',
      courseName: 'หลักสูตรนวดแผนไทยเบื้องต้น',
      description: 'เรียนรู้เทคนิคนวดแผนไทยพื้นฐาน เหมาะสำหรับผู้เริ่มต้น',
      durationHours: 120,
      price: 15000,
      maxStudents: 20,
      currentStudents: 12,
      status: 'active',
      batchNumber: 'THAI-001',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      createdAt: '2023-12-01',
      updatedAt: '2023-12-15',
    },
    {
      key: '2',
      courseName: 'หลักสูตรสปาเพื่อสุขภาพ',
      description: 'เทคนิคการนวดสปาและอโรมาเธอราปี',
      durationHours: 80,
      price: 12000,
      maxStudents: 15,
      currentStudents: 8,
      status: 'active',
      batchNumber: 'SPA-002',
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      createdAt: '2023-12-05',
      updatedAt: '2023-12-20',
    },
    {
      key: '3',
      courseName: 'หลักสูตรนวดเท้าเพื่อสุขภาพ',
      description: 'การนวดกดจุดเท้าเพื่อการรักษาและผ่อนคลาย',
      durationHours: 60,
      price: 8000,
      maxStudents: 25,
      currentStudents: 18,
      status: 'completed',
      batchNumber: 'FOOT-003',
      startDate: '2023-11-01',
      endDate: '2023-12-20',
      createdAt: '2023-10-15',
      updatedAt: '2023-12-21',
    },
  ]);

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.batchNumber && course.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()))
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
      title: 'COURSE NAME',
      dataIndex: 'courseName',
      key: 'courseName',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'DURATION',
      dataIndex: 'durationHours',
      key: 'durationHours',
      render: (hours: number) => `${hours} ชั่วโมง`,
      className: 'text-gray-700',
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `฿${price.toLocaleString()}`,
      className: 'text-gray-700',
    },
    {
      title: 'STUDENTS',
      key: 'students',
      render: (_: unknown, record: Course) => `${record.currentStudents || 0}/${record.maxStudents}`,
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: Course['status']) => {
        const colors = {
          active: 'green',
          draft: 'orange',
          completed: 'blue',
          cancelled: 'red'
        };
        const labels = {
          active: 'เปิดรับสมัคร',
          draft: 'ร่าง',
          completed: 'เสร็จสิ้น',
          cancelled: 'ยกเลิก'
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
      title: 'ACTIONS',
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
    form.setFieldsValue({
      ...record,
      startDate: record.startDate ? dayjs(record.startDate) : null,
      endDate: record.endDate ? dayjs(record.endDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (keyToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบหลักสูตรนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setCourses(prevCourses => prevCourses.filter(course => course.key !== keyToDelete));
        message.success('ลบหลักสูตรสำเร็จ!');
      },
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: CourseFormValues) => {
        const formattedValues = {
          ...values,
          startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : undefined,
          endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : undefined,
        };
        
        if (editingCourse) {
          setCourses(prevCourses =>
            prevCourses.map(course =>
              course.key === editingCourse.key 
                ? { 
                    ...course, 
                    ...formattedValues,
                    updatedAt: dayjs().format('YYYY-MM-DD')
                  } 
                : course
            )
          );
          message.success('อัปเดตหลักสูตรสำเร็จ!');
        } else {
          const newCourse: Course = {
            key: (courses.length + 1).toString(),
            ...formattedValues,
            currentStudents: 0,
            createdAt: dayjs().format('YYYY-MM-DD'),
            updatedAt: dayjs().format('YYYY-MM-DD'),
          };
          setCourses(prevCourses => [...prevCourses, newCourse]);
          message.success('เพิ่มหลักสูตรสำเร็จ!');
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
          <BookOutlined /> จัดการหลักสูตร
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
            จัดการหลักสูตร
          </h1>
          <p style={{ 
            margin: 0, 
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '300'
          }}>
            ระบบจัดการหลักสูตรการฝึกอบรม RelaxPlus
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="flex justify-between items-center mb-6 gap-10">
        <Input
          placeholder="ค้นหาหลักสูตร"
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
          เพิ่มหลักสูตร
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredCourses}
        className="rounded-xl shadow-custom-light mt-4"
        pagination={{ pageSize: 10 }}
        bordered={false}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingCourse ? 'แก้ไขหลักสูตร' : 'เพิ่มหลักสูตรใหม่'}
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
          name="course_form"
          className="p-4"
        >
          <Form.Item
            name="courseName"
            label={<span className="font-semibold text-gray-700">ชื่อหลักสูตร</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อหลักสูตร!' }]}
          >
            <Input placeholder="เช่น หลักสูตรนวดแผนไทยเบื้องต้น" className="rounded-lg" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label={<span className="font-semibold text-gray-700">คำอธิบาย</span>}
            rules={[{ required: true, message: 'กรุณากรอกคำอธิบาย!' }]}
          >
            <TextArea rows={3} placeholder="อธิบายรายละเอียดหลักสูตร" className="rounded-lg" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="durationHours"
              label={<span className="font-semibold text-gray-700">ระยะเวลา (ชั่วโมง)</span>}
              rules={[{ required: true, message: 'กรุณากรอกระยะเวลา!' }]}
            >
              <InputNumber min={1} placeholder="120" className="w-full rounded-lg" />
            </Form.Item>

            <Form.Item
              name="price"
              label={<span className="font-semibold text-gray-700">ราคา (บาท)</span>}
              rules={[{ required: true, message: 'กรุณากรอกราคา!' }]}
            >
              <InputNumber min={0} placeholder="15000" className="w-full rounded-lg" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="maxStudents"
              label={<span className="font-semibold text-gray-700">จำนวนนักเรียนสูงสุด</span>}
              rules={[{ required: true, message: 'กรุณากรอกจำนวนนักเรียน!' }]}
            >
              <InputNumber min={1} placeholder="20" className="w-full rounded-lg" />
            </Form.Item>

            <Form.Item
              name="status"
              label={<span className="font-semibold text-gray-700">สถานะ</span>}
              rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
            >
              <Select placeholder="เลือกสถานะ" className="rounded-lg">
                <Option value="active">เปิดรับสมัคร</Option>
                <Option value="draft">ร่าง</Option>
                <Option value="completed">เสร็จสิ้น</Option>
                <Option value="cancelled">ยกเลิก</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="batchNumber"
            label={<span className="font-semibold text-gray-700">รหัสรุ่น</span>}
          >
            <Input placeholder="เช่น THAI-001" className="rounded-lg" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="startDate"
              label={<span className="font-semibold text-gray-700">วันที่เริ่มต้น</span>}
            >
              <DatePicker format="YYYY-MM-DD" className="w-full rounded-lg" />
            </Form.Item>

            <Form.Item
              name="endDate"
              label={<span className="font-semibold text-gray-700">วันที่สิ้นสุด</span>}
            >
              <DatePicker format="YYYY-MM-DD" className="w-full rounded-lg" />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      {/* View Details Modal */}
      <Modal
        title="รายละเอียดหลักสูตร"
        open={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={null}
        className="rounded-xl"
        centered
        width={700}
      >
        {viewingCourse && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><Text strong>ชื่อหลักสูตร:</Text></p>
                <p className="mb-4 text-gray-700">{viewingCourse.courseName}</p>
                
                <p className="mb-2"><Text strong>คำอธิบาย:</Text></p>
                <p className="mb-4 text-gray-700">{viewingCourse.description}</p>
                
                <p className="mb-2"><Text strong>ระยะเวลา:</Text></p>
                <p className="mb-4 text-gray-700">{viewingCourse.durationHours} ชั่วโมง</p>
                
                <p className="mb-2"><Text strong>ราคา:</Text></p>
                <p className="mb-4 text-gray-700">฿{viewingCourse.price.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="mb-2"><Text strong>จำนวนนักเรียนสูงสุด:</Text></p>
                <p className="mb-4 text-gray-700">{viewingCourse.maxStudents} คน</p>
                
                <p className="mb-2"><Text strong>นักเรียนปัจจุบัน:</Text></p>
                <p className="mb-4 text-gray-700">{viewingCourse.currentStudents || 0} คน</p>
                
                {viewingCourse.batchNumber && (
                  <>
                    <p className="mb-2"><Text strong>รหัสรุ่น:</Text></p>
                    <p className="mb-4"><Tag color="blue">{viewingCourse.batchNumber}</Tag></p>
                  </>
                )}
                
                <p className="mb-2"><Text strong>สถานะ:</Text></p>
                <p className="mb-4">
                  <Tag color={
                    viewingCourse.status === 'active' ? 'green' :
                    viewingCourse.status === 'draft' ? 'orange' :
                    viewingCourse.status === 'completed' ? 'blue' : 'red'
                  }>
                    {viewingCourse.status === 'active' ? 'เปิดรับสมัคร' :
                     viewingCourse.status === 'draft' ? 'ร่าง' :
                     viewingCourse.status === 'completed' ? 'เสร็จสิ้น' : 'ยกเลิก'}
                  </Tag>
                </p>
              </div>
            </div>
            
            {(viewingCourse.startDate || viewingCourse.endDate) && (
              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {viewingCourse.startDate && (
                    <div>
                      <p className="mb-2"><Text strong>วันที่เริ่มต้น:</Text></p>
                      <p className="text-gray-700">{dayjs(viewingCourse.startDate).format('DD/MM/YYYY')}</p>
                    </div>
                  )}
                  {viewingCourse.endDate && (
                    <div>
                      <p className="mb-2"><Text strong>วันที่สิ้นสุด:</Text></p>
                      <p className="text-gray-700">{dayjs(viewingCourse.endDate).format('DD/MM/YYYY')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><Text strong>สร้างเมื่อ:</Text></p>
                  <p className="text-gray-500 text-sm">{dayjs(viewingCourse.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                </div>
                <div>
                  <p className="mb-2"><Text strong>อัปเดตล่าสุด:</Text></p>
                  <p className="text-gray-500 text-sm">{dayjs(viewingCourse.updatedAt).format('DD/MM/YYYY HH:mm')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
