"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Typography, Breadcrumb, Card, Upload, Row, Col } from 'antd';
import { SaveOutlined, HomeOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Text, Title: AntdTitle } = Typography;
const { TextArea } = Input;

// Interface for school data
interface SchoolData {
  schoolName: string;
  address: string;
  phone: string;
  email: string;
  logoUrl?: string; // Optional logo URL
  description?: string;
}

// Default school data for initial state
const defaultSchoolData: SchoolData = {
  schoolName: '',
  address: '',
  phone: '',
  email: '',
  logoUrl: '',
  description: '',
};

export default function SchoolSettingsPage() {
  const [form] = Form.useForm<SchoolData>();
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState<UploadFile[]>([]); // State for Ant Design Upload component

  // Load school data from localStorage on component mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('schoolData');
      if (storedData) {
        const parsedData: SchoolData = JSON.parse(storedData);
        form.setFieldsValue(parsedData);
        // If a logoUrl exists, set it to the fileList for display
        if (parsedData.logoUrl) {
          setFileList([{
            uid: '-1', // Unique ID for the file
            name: 'school_logo.png', // Placeholder name
            status: 'done', // Mark as uploaded
            url: parsedData.logoUrl, // The actual URL
            thumbUrl: parsedData.logoUrl, // Thumbnail URL
          }]);
        }
      } else {
        form.setFieldsValue(defaultSchoolData);
      }
    } catch (error) {
      console.error("Failed to load school data from localStorage", error);
      message.error('เกิดข้อผิดพลาดในการโหลดข้อมูลโรงเรียน');
      form.setFieldsValue(defaultSchoolData);
    } finally {
      setLoading(false);
    }
  }, [form]);

  // Handle form submission
  const onFinish = (values: SchoolData) => {
    try {
      // Update logoUrl from fileList if a file is present
      const updatedLogoUrl = fileList.length > 0 ? fileList[0].url || fileList[0].thumbUrl : '';
      const finalData = { ...values, logoUrl: updatedLogoUrl };

      localStorage.setItem('schoolData', JSON.stringify(finalData));
      message.success('บันทึกข้อมูลโรงเรียนเรียบร้อยแล้ว!');
    } catch (error) {
      console.error("Failed to save school data to localStorage", error);
      message.error('เกิดข้อผิดพลาดในการบันทึกข้อมูลโรงเรียน');
    }
  };

  // Props for Ant Design Upload component
  const uploadProps: UploadProps = {
    onRemove: () => {
      // Remove the file from state
      setFileList([]);
      // Clear the logoUrl from form values immediately
      form.setFieldsValue({ logoUrl: '' });
      message.info('ลบโลโก้โรงเรียนแล้ว');
    },
    beforeUpload: (file) => {
      // Prevent default upload behavior (we'll handle it manually)
      // Convert file to base64 for local storage or simulate upload to get a URL
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageUrl = reader.result as string;
          setFileList([{
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: imageUrl,
            thumbUrl: imageUrl,
          }]);
          form.setFieldsValue({ logoUrl: imageUrl }); // Update form field with base64 URL
          message.success(`${file.name} อัปโหลดสำเร็จ`);
          resolve(false); // Return false to prevent Ant Design from trying to upload
        };
        reader.onerror = (error) => {
          message.error(`${file.name} อัปโหลดไม่สำเร็จ`);
          console.error("File reading error:", error);
          reject(false);
        };
      });
    },
    fileList, // Controlled component
    maxCount: 1, // Only allow one logo
    listType: "picture", // Display as a picture list
    accept: "image/*", // Accept only image files
  };

  const breadcrumbItems = [
    {
      title: <a href="/admin/dashboard"><HomeOutlined /> หน้าหลัก</a>,
    },
    {
      title: <><SettingOutlined /> ตั้งค่าโรงเรียน</>,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text>กำลังโหลด...</Text>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb className="mb-6" items={breadcrumbItems} />

      <AntdTitle level={1} className="text-3xl font-bold mb-8 text-gray-800">
        ตั้งค่าข้อมูลโรงเรียน
      </AntdTitle>

      <Card className="rounded-xl shadow-custom-light p-6">
        <Form
          form={form}
          layout="vertical"
          name="school_settings_form"
          onFinish={onFinish}
          initialValues={defaultSchoolData}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="schoolName"
                label={<span className="font-semibold text-gray-700">ชื่อโรงเรียน</span>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อโรงเรียน!' }]}
              >
                <Input placeholder="เช่น โรงเรียนนวดแผนไทย" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="address"
                label={<span className="font-semibold text-gray-700">ที่อยู่</span>}
                rules={[{ required: true, message: 'กรุณากรอกที่อยู่โรงเรียน!' }]}
              >
                <TextArea rows={3} placeholder="เช่น 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="phone"
                label={<span className="font-semibold text-gray-700">เบอร์โทรศัพท์</span>}
                rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์!' }]}
              >
                <Input placeholder="เช่น 02-123-4567" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="email"
                label={<span className="font-semibold text-gray-700">อีเมล</span>}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล!', type: 'email' }]}
              >
                <Input placeholder="เช่น info@school.com" className="rounded-lg" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="description"
                label={<span className="font-semibold text-gray-700">คำอธิบายโรงเรียน (ไม่บังคับ)</span>}
              >
                <TextArea rows={5} placeholder="คำอธิบายสั้นๆ เกี่ยวกับโรงเรียน" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                label={<span className="font-semibold text-gray-700">ตราโรงเรียน (โลโก้)</span>}
              >
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />} className="rounded-lg">อัปโหลดโลโก้</Button>
                </Upload>
                {/* Hidden input to store logoUrl in form data, updated by uploadProps.beforeUpload */}
                <Input type="hidden" name="logoUrl" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
            >
              บันทึกข้อมูลโรงเรียน
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
