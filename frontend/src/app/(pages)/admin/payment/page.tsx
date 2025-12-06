// src/app/(pages)/(admin)/payment/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Tag, DatePicker, Select, Typography, Breadcrumb, Spin } from 'antd';
import { EditOutlined, EyeOutlined, SearchOutlined, PlusOutlined, DeleteOutlined, HomeOutlined, DollarCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { usePayments, useCreatePayment, useUpdatePayment, useDeletePayment, useEnrollments } from '@/hooks';
import type { Payment } from '@/types/api';

const { Option } = Select;
const { Text, Title: AntdTitle } = Typography;

interface PaymentFormValues {
  enrollmentId: string;
  paymentPlanId?: string;
  amount: number;
  paymentType: 'FULL' | 'INSTALLMENT';
  installmentNumber?: number;
  transferDate?: dayjs.Dayjs | null;
  status: string;
}

export default function PaymentPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [form] = Form.useForm<PaymentFormValues>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingPayment, setViewingPayment] = useState<Payment | null>(null);

  // React Query hooks
  const { data: paymentsData, isLoading } = usePayments({ search: searchTerm });
  const { data: enrollmentsData, isLoading: isLoadingEnrollments } = useEnrollments({ limit: 1000 });
  const createPaymentMutation = useCreatePayment();
  const updatePaymentMutation = useUpdatePayment();
  const deletePaymentMutation = useDeletePayment();

  const payments = paymentsData?.data || [];
  const enrollments = enrollmentsData?.data || [];
  const filteredPayments = payments;

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (_text: string, _record: Payment, index: number) => index + 1,
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'STUDENT NAME',
      dataIndex: ['enrollment', 'user'],
      key: 'studentName',
      render: (user: any) => user ? `${user.firstName} ${user.lastName}` : 'N/A',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'COURSE TITLE',
      dataIndex: ['enrollment', 'batch', 'course'],
      key: 'courseTitle',
      render: (course: any) => course?.title || 'N/A',
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
      title: 'TRANSFER DATE',
      dataIndex: 'transferDate',
      key: 'transferDate',
      render: (date: string) => date ? dayjs(date).format('YYYY-MM-DD') : 'N/A',
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color: string;
        switch (status?.toUpperCase()) {
          case 'COMPLETED':
          case 'COMPLETE':
            color = 'green';
            break;
          case 'PENDING':
            color = 'blue';
            break;
          case 'UNPAID':
          case 'FAILED':
            color = 'red';
            break;
          default:
            color = 'default';
        }
        return (
          <Tag color={color} className="rounded-full px-3 py-1 text-xs font-semibold">
            {status || 'N/A'}
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

  const handleAdd = () => {
    setEditingPayment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Payment) => {
    setEditingPayment(record);
    form.setFieldsValue({
      enrollmentId: record.enrollmentId,
      paymentPlanId: record.paymentPlanId,
      amount: record.amount,
      paymentType: record.paymentType as 'FULL' | 'INSTALLMENT',
      installmentNumber: record.installmentNumber,
      transferDate: record.transferDate ? dayjs(record.transferDate) : null,
      status: record.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (idToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูล Payment นี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        deletePaymentMutation.mutate(idToDelete);
      },
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: PaymentFormValues) => {
        const formattedValues = {
          ...values,
          transferDate: values.transferDate ? values.transferDate.format('YYYY-MM-DD') : undefined,
          amount: Number(values.amount),
        };

        if (editingPayment) {
          updatePaymentMutation.mutate(
            { id: editingPayment.id, data: formattedValues },
            {
              onSuccess: () => {
                setIsModalVisible(false);
                form.resetFields();
              },
            }
          );
        } else {
          createPaymentMutation.mutate(formattedValues as any, {
            onSuccess: () => {
              setIsModalVisible(false);
              form.resetFields();
            },
          });
        }
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

  // กำหนด items สำหรับ Breadcrumb
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
          <DollarCircleOutlined /> จัดการการชำระเงิน
        </>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs ใช้ items prop */}
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* เปลี่ยน h1 เป็น AntdTitle */}
      <AntdTitle level={1} className="text-3xl font-bold mb-8 text-gray-800">Payment</AntdTitle>

      <div className="flex justify-between items-center mb-6 gap-10">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-80 rounded-lg shadow-sm table-search-input" // Adjusted width
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

      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={filteredPayments}
          rowKey="id"
          className="rounded-xl shadow-custom-light mt-4"
          pagination={{ pageSize: 10 }}
          bordered={false}
        />
      </Spin>

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
            name="enrollmentId"
            label={<span className="font-semibold text-gray-700">เลือกการลงทะเบียน</span>}
            rules={[{ required: true, message: 'กรุณาเลือกการลงทะเบียน!' }]}
          >
            <Select
              placeholder="เลือกนักเรียนและหลักสูตร"
              className="rounded-lg"
              loading={isLoadingEnrollments}
              showSearch
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
              }
            >
              {enrollments.map((enrollment) => (
                <Option
                  key={enrollment.id}
                  value={enrollment.id}
                  label={`${enrollment.user?.firstName || ''} ${enrollment.user?.lastName || ''} - ${enrollment.course?.title || ''}`}
                >
                  {enrollment.user?.firstName} {enrollment.user?.lastName} - {enrollment.course?.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="paymentPlanId"
            label={<span className="font-semibold text-gray-700">Payment Plan ID (Optional)</span>}
          >
            <Input placeholder="payment-plan-id (ถ้ามี)" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="amount"
            label={<span className="font-semibold text-gray-700">จำนวนเงิน</span>}
            rules={[{ required: true, message: 'กรุณากรอกจำนวนเงิน!' }]}
          >
            <Input type="number" placeholder="เช่น 12500" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="paymentType"
            label={<span className="font-semibold text-gray-700">ประเภทการชำระ</span>}
            rules={[{ required: true, message: 'กรุณาเลือกประเภทการชำระ!' }]}
          >
            <Select placeholder="เลือกประเภทการชำระ" className="rounded-lg">
              <Option value="FULL">ชำระเต็มจำนวน</Option>
              <Option value="INSTALLMENT">ผ่อนชำระ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="installmentNumber"
            label={<span className="font-semibold text-gray-700">งวดที่</span>}
          >
            <Input type="number" placeholder="เช่น 1" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="transferDate"
            label={<span className="font-semibold text-gray-700">วันที่โอนเงิน</span>}
          >
            <DatePicker format="YYYY-MM-DD" className="w-full rounded-lg" />
          </Form.Item>
          <Form.Item
            name="status"
            label={<span className="font-semibold text-gray-700">สถานะ</span>}
            rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
          >
            <Select placeholder="เลือกสถานะ" className="rounded-lg">
              <Option value="COMPLETED">Complete</Option>
              <Option value="PENDING">Pending</Option>
              <Option value="UNPAID">Unpaid</Option>
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
            <p className="mb-2">
              <Text strong>ชื่อนักเรียน:</Text>{' '}
              {viewingPayment.enrollment?.user
                ? `${viewingPayment.enrollment.user.firstName} ${viewingPayment.enrollment.user.lastName}`
                : 'N/A'}
            </p>
            <p className="mb-2">
              <Text strong>ชื่อหลักสูตร:</Text>{' '}
              {viewingPayment.enrollment?.batch?.course?.title || 'N/A'}
            </p>
            <p className="mb-2">
              <Text strong>จำนวนเงิน:</Text> {viewingPayment.amount.toLocaleString()} THB
            </p>
            <p className="mb-2">
              <Text strong>ประเภทการชำระ:</Text> {viewingPayment.paymentType}
            </p>
            <p className="mb-2">
              <Text strong>งวดที่:</Text> {viewingPayment.installmentNumber || 'N/A'}
            </p>
            <p className="mb-2">
              <Text strong>วันที่โอน:</Text>{' '}
              {viewingPayment.transferDate ? dayjs(viewingPayment.transferDate).format('YYYY-MM-DD') : 'N/A'}
            </p>
            <p className="mb-2">
              <Text strong>สถานะ:</Text>{' '}
              <Tag
                color={
                  viewingPayment.status?.toUpperCase() === 'COMPLETED' || viewingPayment.status?.toUpperCase() === 'COMPLETE'
                    ? 'green'
                    : viewingPayment.status?.toUpperCase() === 'PENDING'
                      ? 'blue'
                      : 'red'
                }
              >
                {viewingPayment.status}
              </Tag>
            </p>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}
      </Modal>
    </div>
  );
}
