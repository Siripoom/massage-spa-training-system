// src/app/(pages)/(admin)/payment/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Tag, DatePicker, Select, Typography } from 'antd';
import { EditOutlined, EyeOutlined, SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'; // เพิ่ม DeleteOutlined
import dayjs from 'dayjs';

const { Option } = Select;
const { Text } = Typography;

interface Payment {
  key: string;
  studentName: string;
  courseTitle: string;
  amount: number;
  paymentDate: string; // Data stored in State and Backend is string (YYYY-MM-DD)
  status: 'Complete' | 'Pending' | 'Unpaid';
}

interface PaymentFormValues {
  studentName: string;
  courseTitle: string;
  amount: number;
  paymentDate: dayjs.Dayjs | null | undefined;
  status: 'Complete' | 'Pending' | 'Unpaid';
}

export default function PaymentPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [form] = Form.useForm<PaymentFormValues>();
  const [searchTerm, setSearchTerm] = useState('');

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingPayment, setViewingPayment] = useState<Payment | null>(null);

  const [payments, setPayments] = useState<Payment[]>([
    {
      key: '1',
      studentName: 'สมชาย ใจดี',
      courseTitle: 'นวดแผนไทยเบื้องต้น',
      amount: 12500,
      paymentDate: '2023-06-01',
      status: 'Complete',
    },
    {
      key: '2',
      studentName: 'สมหญิง รักเรียน',
      courseTitle: 'สปาเพื่อสุขภาพ',
      amount: 15000,
      paymentDate: '2023-06-15',
      status: 'Pending',
    },
    {
      key: '3',
      studentName: 'มานะ พากเพียร',
      courseTitle: 'อโรมาเธอราพี',
      amount: 10000,
      paymentDate: '2023-07-01',
      status: 'Unpaid',
    },
    {
      key: '4',
      studentName: 'ดวงใจ งามยิ่ง',
      courseTitle: 'นวดกดจุดเท้า',
      amount: 8000,
      paymentDate: '2023-07-05',
      status: 'Complete',
    },
  ]);


  const filteredPayments = payments.filter(payment =>
    payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.paymentDate.includes(searchTerm) // ค้นหาจากวันที่ด้วย
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
      title: 'STUDENT NAME',
      dataIndex: 'studentName',
      key: 'studentName',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'COURSE TITLE',
      dataIndex: 'courseTitle',
      key: 'courseTitle',
      className: 'text-gray-700',
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount.toLocaleString()} THB`,
      className: 'text-gray-700',
    },
    {
      title: 'PAYMENT DATE',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'Complete' | 'Pending' | 'Unpaid') => {
        let color: string;
        switch (status) {
          case 'Complete':
            color = 'green';
            break;
          case 'Pending':
            color = 'blue';
            break;
          case 'Unpaid':
            color = 'red';
            break;
          default:
            color = 'default';
        }
        return (
          <Tag color={color} className="rounded-full px-3 py-1 text-xs font-semibold">
            {status}
          </Tag>
        );
      },
      className: 'text-center',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_text: string, record: Payment) => (
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
    setEditingPayment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Payment) => {
    setEditingPayment(record);
    form.setFieldsValue({
      ...record,
      paymentDate: record.paymentDate ? dayjs(record.paymentDate) : null,
    });
    setIsModalVisible(true);
  };

  // เพิ่ม handleDelete function
  const handleDelete = (keyToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูล Payment นี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setPayments(prevPayments => prevPayments.filter(payment => payment.key !== keyToDelete));
        message.success('ลบข้อมูล Payment สำเร็จ!');
      },
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: PaymentFormValues) => {
        const formattedValues = {
          ...values,
          paymentDate: values.paymentDate ? values.paymentDate.format('YYYY-MM-DD') : '',
        };
        if (editingPayment) {
          setPayments(prevPayments =>
            prevPayments.map(payment =>
              payment.key === editingPayment.key ? { ...payment, ...formattedValues } : payment
            )
          );
          message.success('อัปเดตข้อมูล Payment สำเร็จ!');
        } else {
          const newPayment: Payment = {
            key: (payments.length + 1).toString(),
            ...formattedValues,
          };
          setPayments(prevPayments => [...prevPayments, newPayment]);
          message.success('เพิ่มข้อมูล Payment สำเร็จ!');
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

  const handleView = (record: Payment) => {
    setViewingPayment(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setViewingPayment(null);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Payment</h1>
      <div className="flex justify-between items-center mb-6 gap-25">
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
        dataSource={filteredPayments}
        className="rounded-xl shadow-custom-light mt-4"
        pagination={{ pageSize: 10 }}
        bordered={false}
      />

      <Modal
        title={editingPayment ? 'แก้ไขข้อมูล Payment' : 'เพิ่ม Payment ใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-xl"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="payment_form"
          className="p-4"
        >
          <Form.Item
            name="studentName"
            label={<span className="font-semibold text-gray-700">ชื่อนักเรียน</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อนักเรียน!' }]}
          >
            <Input placeholder="เช่น สมชาย ใจดี" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="courseTitle"
            label={<span className="font-semibold text-gray-700">ชื่อหลักสูตร</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อหลักสูตร!' }]}
          >
            <Input placeholder="เช่น นวดแผนไทยเบื้องต้น" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="amount"
            label={<span className="font-semibold text-gray-700">จำนวนเงิน</span>}
            rules={[{ required: true, message: 'กรุณากรอกจำนวนเงิน!', type: 'number', transform: (value) => Number(value) || 0 }]}
          >
            <Input type="number" placeholder="เช่น 12500" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="paymentDate"
            label={<span className="font-semibold text-gray-700">วันที่ชำระเงิน</span>}
            rules={[{ required: true, message: 'กรุณาเลือกวันที่ชำระเงิน!' }]}
          >
            <DatePicker format="YYYY-MM-DD" className="w-full rounded-lg" />
          </Form.Item>
          <Form.Item
            name="status"
            label={<span className="font-semibold text-gray-700">สถานะ</span>}
            rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
          >
            <Select<PaymentFormValues['status']> placeholder="เลือกสถานะ" className="rounded-lg">
              <Option value="Complete">Complete</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Unpaid">Unpaid</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="รายละเอียด Payment"
        open={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={null}
        className="rounded-xl"
        centered
      >
        {viewingPayment ? (
          <div className="p-4">
            <p className="mb-2"><Text strong>ชื่อนักเรียน:</Text> {viewingPayment.studentName}</p>
            <p className="mb-2"><Text strong>ชื่อหลักสูตร:</Text> {viewingPayment.courseTitle}</p>
            <p className="mb-2"><Text strong>จำนวนเงิน:</Text> {viewingPayment.amount.toLocaleString()} THB</p>
            <p className="mb-2"><Text strong>วันที่ชำระเงิน:</Text> {viewingPayment.paymentDate}</p>
            <p className="mb-2"><Text strong>สถานะ:</Text> <Tag color={viewingPayment.status === 'Complete' ? 'green' : (viewingPayment.status === 'Pending' ? 'blue' : 'red')}>{viewingPayment.status}</Tag></p>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}
      </Modal>
    </>
  );
}
