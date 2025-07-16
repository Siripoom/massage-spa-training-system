// src/app/(pages)/(admin)/users/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Tag, Typography, Breadcrumb, Card, Select, DatePicker } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, DeleteOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // Import Thai locale for dayjs
import locale from 'antd/es/date-picker/locale/th_TH'; // Import Thai locale for Ant Design DatePicker

dayjs.locale('th'); // Set dayjs to Thai locale globally for this component

const { Text, Title: AntdTitle } = Typography;
const { Option } = Select;

// Interface for Student Data
interface StudentData {
  id: string;
  studentId: string; // Student ID, could be auto-generated or manual
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string; // Date of Birth (ISO string format)
  status: 'Active' | 'Inactive' | 'Graduated';
  createdAt: string;
  updatedAt: string;
}

// The defaultStudentData has been removed as it was not being used

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: dayjs.Dayjs;
  status: 'Active' | 'Inactive' | 'Graduated';
}

export default function UsersPage() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentData | null>(null);
  const [form] = Form.useForm<FormValues>();
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<StudentData | null>(null);
  const [hasLoadedStudents, setHasLoadedStudents] = useState(false); // State for hydration

  // Load students from localStorage on component mount
  useEffect(() => {
    const loadStudents = () => {
      try {
        const storedStudents = JSON.parse(localStorage.getItem('students') || '[]') as StudentData[];
        setStudents(storedStudents);
        setHasLoadedStudents(true);
      } catch (error) {
        console.error("Failed to parse students from localStorage", error);
        setStudents([]);
        setHasLoadedStudents(true);
      }
    };
    loadStudents();

    // Add event listener for 'storage' to update when localStorage changes from other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'students') {
        loadStudents();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle form submission (Add/Edit)
  const handleOk = () => {
    form.validateFields()
      .then((values: FormValues) => {
        const now = dayjs().toISOString();
        const dobISO = values.dob.toISOString(); // Now we know dob is always a Dayjs object

        if (editingStudent) {
          // Update existing student
          const updatedStudent: StudentData = {
            ...editingStudent,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            dob: dobISO,
            status: values.status,
            updatedAt: now,
          };
          setStudents(prevStudents => {
            const newStudents = prevStudents.map(student =>
              student.id === updatedStudent.id ? updatedStudent : student
            );
            localStorage.setItem('students', JSON.stringify(newStudents));
            return newStudents;
          });
          message.success('อัปเดตข้อมูลนักเรียนเรียบร้อยแล้ว!');
        } else {
          // Add new student
          const newStudent: StudentData = {
            id: uuidv4(),
            studentId: `STU-${Math.floor(Math.random() * 100000)}`, // Simple auto-generated ID
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            dob: dobISO,
            status: values.status,
            createdAt: now,
            updatedAt: now,
          };
          setStudents(prevStudents => {
            const newStudents = [...prevStudents, newStudent];
            localStorage.setItem('students', JSON.stringify(newStudents));
            return newStudents;
          });
          message.success('เพิ่มนักเรียนใหม่เรียบร้อยแล้ว!');
        }
        setIsModalVisible(false);
        setEditingStudent(null);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
        message.error('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง');
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
    form.resetFields();
  };

  const handleAdd = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: StudentData) => {
    setEditingStudent(record);
    form.setFieldsValue({
      ...record,
      dob: dayjs(record.dob),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (studentId: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนักเรียนนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setStudents(prevStudents => {
          const updatedStudents = prevStudents.filter(student => student.id !== studentId);
          localStorage.setItem('students', JSON.stringify(updatedStudents));
          message.success('ลบข้อมูลนักเรียนเรียบร้อยแล้ว!');
          return updatedStudents;
        });
      },
    });
  };

  const handleView = (record: StudentData) => {
    setViewingStudent(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setViewingStudent(null);
  };

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: '#',
      render: (_: unknown, __: unknown, index: number) => index + 1,
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'รหัสนักเรียน',
      dataIndex: 'studentId',
      key: 'studentId',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'ชื่อ-นามสกุล',
      key: 'fullName',
      render: (_: unknown, record: StudentData) => `${record.firstName} ${record.lastName}`,
      className: 'text-gray-900',
    },
    {
      title: 'อีเมล',
      dataIndex: 'email',
      key: 'email',
      className: 'text-gray-700',
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'phone',
      key: 'phone',
      className: 'text-gray-700',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'Active' | 'Inactive' | 'Graduated') => (
        <Tag color={status === 'Active' ? 'green' : (status === 'Inactive' ? 'red' : 'blue')} className="rounded-full px-3 py-1 text-xs font-semibold">
          {status}
        </Tag>
      ),
      className: 'text-center',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_: unknown, record: StudentData) => (
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
          />
        </Space>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <a href="/admin/dashboard"><HomeOutlined /> หน้าหลัก</a>,
    },
    {
      title: <><UserOutlined /> จัดการนักเรียน</>,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 min-h-screen">
      <Breadcrumb className="mb-4 sm:mb-6" items={breadcrumbItems} />

      <AntdTitle level={1} className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-800">
        การจัดการนักเรียน
      </AntdTitle>

      <Card className="rounded-lg sm:rounded-xl shadow-custom-light p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <Input
            placeholder="ค้นหานักเรียน (ชื่อ, รหัส, อีเมล)"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full sm:w-80 rounded-lg shadow-sm table-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleAdd}
            icon={<PlusOutlined />}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
          >
            เพิ่มนักเรียนใหม่
          </Button>
        </div>
        {hasLoadedStudents ? (
          <Table
            columns={columns}
            dataSource={filteredStudents}
            rowKey="id"
            className="rounded-xl shadow-custom-light"
            pagination={{ pageSize: 10 }}
            bordered={false}
          />
        ) : (
          <div className="flex justify-center items-center h-40">
            <Text>กำลังโหลดข้อมูลนักเรียน...</Text>
          </div>
        )}

        {/* Modal for Add/Edit Student */}
        <Modal
          title={editingStudent ? 'แก้ไขข้อมูลนักเรียน' : 'เพิ่มนักเรียนใหม่'}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          className="rounded-xl modal-responsive"
          centered
          width={"90%"}
          style={{ maxWidth: "600px" }}
        >
          <Form
            form={form}
            layout="vertical"
            name="student_form"
            className="p-4"
          >
            <Form.Item
              name="firstName"
              label={<span className="font-semibold text-gray-700">ชื่อจริง</span>}
              rules={[{ required: true, message: 'กรุณากรอกชื่อจริง!' }]}
            >
              <Input placeholder="ชื่อจริง" className="rounded-lg" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label={<span className="font-semibold text-gray-700">นามสกุล</span>}
              rules={[{ required: true, message: 'กรุณากรอกนามสกุล!' }]}
            >
              <Input placeholder="นามสกุล" className="rounded-lg" />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span className="font-semibold text-gray-700">อีเมล</span>}
              rules={[{ required: true, message: 'กรุณากรอกอีเมล!', type: 'email' }]}
            >
              <Input placeholder="example@email.com" className="rounded-lg" />
            </Form.Item>
            <Form.Item
              name="phone"
              label={<span className="font-semibold text-gray-700">เบอร์โทรศัพท์</span>}
              rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์!' }]}
            >
              <Input placeholder="08XXXXXXXX" className="rounded-lg" />
            </Form.Item>
            <Form.Item
              name="dob"
              label={<span className="font-semibold text-gray-700">วันเกิด</span>}
              rules={[{ required: true, message: 'กรุณาเลือกวันเกิด!' }]}
            >
              <DatePicker
                locale={locale} // Apply Thai locale to DatePicker
                format="DD/MM/YYYY"
                className="w-full rounded-lg"
                placeholder="เลือกวันเกิด"
              />
            </Form.Item>
            <Form.Item
              name="status"
              label={<span className="font-semibold text-gray-700">สถานะ</span>}
              rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
            >
              <Select placeholder="เลือกสถานะ" className="rounded-lg">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
                <Option value="Graduated">Graduated</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for Viewing Student Details */}
        <Modal
          title="รายละเอียดนักเรียน"
          open={isDetailModalVisible}
          onCancel={handleDetailModalCancel}
          footer={null}
          className="rounded-xl modal-responsive"
          centered
          width={"90%"}
          style={{ maxWidth: "600px" }}
        >
          {viewingStudent ? (
            <div className="p-2 sm:p-4 space-y-3 sm:space-y-4">
              <p className="mb-1 sm:mb-2"><Text strong className="inline-block w-32">รหัสนักเรียน:</Text> {viewingStudent.studentId}</p>
              <p className="mb-1 sm:mb-2"><Text strong className="inline-block w-32">ชื่อ-นามสกุล:</Text> {viewingStudent.firstName} {viewingStudent.lastName}</p>
              <p className="mb-1 sm:mb-2"><Text strong className="inline-block w-32">อีเมล:</Text> {viewingStudent.email}</p>
              <p className="mb-1 sm:mb-2"><Text strong className="inline-block w-32">เบอร์โทรศัพท์:</Text> {viewingStudent.phone}</p>
              <p className="mb-1 sm:mb-2"><Text strong className="inline-block w-32">วันเกิด:</Text> {dayjs(viewingStudent.dob).format('DD MMMM YYYY')}</p>
              <p className="mb-1 sm:mb-2"><Text strong className="inline-block w-32">สถานะ:</Text> <Tag color={viewingStudent.status === 'Active' ? 'green' : (viewingStudent.status === 'Inactive' ? 'red' : 'blue')}>{viewingStudent.status}</Tag></p>
              <p className="mb-1 sm:mb-2"><Text strong className="inline-block w-32">สร้างเมื่อ:</Text> {dayjs(viewingStudent.createdAt).format('DD/MM/YYYY, HH:mm')}</p>
              <p className="mb-1 sm:mb-2"><Text strong className="inline-block w-32">อัปเดตเมื่อ:</Text> {dayjs(viewingStudent.updatedAt).format('DD/MM/YYYY, HH:mm')}</p>
            </div>
          ) : (
            <p>ไม่พบข้อมูล</p>
          )}
        </Modal>
      </Card>
    </div>
  );
}
