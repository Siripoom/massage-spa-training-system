// src/app/(pages)/admin/courses/manage/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Typography, Breadcrumb, Card, Row, Col, InputNumber,Space } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, HomeOutlined, BookOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import CourseContentManager, { CourseContentModule } from './CourseContentManager'; // Import the new component and its interfaces

const { Text, Title: AntdTitle } = Typography;
const { TextArea } = Input;

// Interface for Course Data
interface CourseData {
  id: string;
  courseName: string;
  description: string;
  price: number;
  durationHours: number; // Duration in hours
  createdAt: string;
  updatedAt: string;
  modules: CourseContentModule[]; // Array of modules for course content
}

// Default course data for initial state
const defaultCourseData: CourseData = {
  id: uuidv4(),
  courseName: '',
  description: '',
  price: 0,
  durationHours: 0,
  createdAt: dayjs().toISOString(),
  updatedAt: dayjs().toISOString(),
  modules: [], // Start with no modules
};

export default function ManageCoursePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id');

  const [form] = Form.useForm<CourseData>();
  const [course, setCourse] = useState<CourseData>(defaultCourseData);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load course data from localStorage on component mount if editing
  useEffect(() => {
    const initializeCourse = () => {
      if (courseId) {
        setIsEditMode(true);
        try {
          const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]') as CourseData[];
          const foundCourse = storedCourses.find(c => c.id === courseId);
          if (foundCourse) {
            setCourse(foundCourse);
            form.setFieldsValue(foundCourse);
          } else {
            message.error('ไม่พบหลักสูตรที่ต้องการแก้ไข');
            router.push('/admin/courses');
          }
        } catch (error) {
          console.error("Failed to parse courses from localStorage", error);
          message.error('เกิดข้อผิดพลาดในการโหลดหลักสูตร');
          router.push('/admin/courses');
        }
      } else {
        setIsEditMode(false);
        form.setFieldsValue(defaultCourseData);
      }
      setLoading(false);
    };

    initializeCourse();
  }, [courseId, form, router]);

  // Callback to update modules state from CourseContentManager
  const handleModulesChange = (newModules: CourseContentModule[]) => {
    setCourse(prev => ({
      ...prev,
      modules: newModules,
      updatedAt: dayjs().toISOString(),
    }));
    // Also update form values so Ant Design form is in sync (important for saving)
    form.setFieldsValue({ modules: newModules });
  };

  // Handle form submission
  const onFinish = (values: CourseData) => {
    try {
      const now = dayjs().toISOString();
      const finalCourse: CourseData = {
        ...course, // Keep existing ID, createdAt if editing
        ...values, // Take updated values from form
        modules: course.modules, // Ensure modules from state are used
        createdAt: isEditMode ? course.createdAt : now,
        updatedAt: now,
      };

      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]') as CourseData[];
      let updatedCourses: CourseData[];

      if (isEditMode) {
        updatedCourses = storedCourses.map(c => c.id === finalCourse.id ? finalCourse : c);
        message.success('อัปเดตหลักสูตรเรียบร้อยแล้ว!');
      } else {
        updatedCourses = [...storedCourses, finalCourse];
        message.success('สร้างหลักสูตรใหม่เรียบร้อยแล้ว!');
      }
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      router.push('/admin/courses'); // Redirect back to course list
    } catch (error) {
      console.error("Failed to save course data to localStorage", error);
      message.error('เกิดข้อผิดพลาดในการบันทึกหลักสูตร');
    }
  };

  const handleCancel = () => {
    router.push('/admin/courses');
  };

  const breadcrumbItems = [
    {
      title: <a href="/admin/dashboard"><HomeOutlined /> หน้าหลัก</a>,
    },
    {
      title: <a href="/admin/courses"><BookOutlined /> หลักสูตร</a>,
    },
    {
      title: <><AppstoreOutlined /> {courseId ? 'แก้ไขหลักสูตร' : 'สร้างหลักสูตรใหม่'}</>,
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
        {courseId ? 'แก้ไขหลักสูตร' : 'สร้างหลักสูตรใหม่'}
      </AntdTitle>

      <Card className="rounded-xl shadow-custom-light p-6">
        <Form
          form={form}
          layout="vertical"
          name="manage_course_form"
          onFinish={onFinish}
          initialValues={course} // Use the course state for initial values
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <AntdTitle level={4} className="text-gray-700 mb-6">ข้อมูลหลักสูตร</AntdTitle>
              <Form.Item
                name="courseName"
                label={<span className="font-semibold text-gray-700">ชื่อหลักสูตร</span>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อหลักสูตร!' }]}
              >
                <Input placeholder="เช่น หลักสูตรนวดแผนไทยเบื้องต้น" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="description"
                label={<span className="font-semibold text-gray-700">คำอธิบายหลักสูตร</span>}
                rules={[{ required: true, message: 'กรุณากรอกคำอธิบายหลักสูตร!' }]}
              >
                <TextArea rows={4} placeholder="คำอธิบายโดยละเอียดเกี่ยวกับหลักสูตร" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="price"
                label={<span className="font-semibold text-gray-700">ราคา (บาท)</span>}
                rules={[{ required: true, message: 'กรุณากรอกราคา!', type: 'number', min: 0 }]}
              >
                <InputNumber min={0} className="w-full rounded-lg" />
              </Form.Item>
              <Form.Item
                name="durationHours"
                label={<span className="font-semibold text-gray-700">ระยะเวลา (ชั่วโมง)</span>}
                rules={[{ required: true, message: 'กรุณากรอกระยะเวลา!', type: 'number', min: 0 }]}
              >
                <InputNumber min={0} className="w-full rounded-lg" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              {/* Course Content Manager Component */}
              {/* We don't use Form.Item directly for modules because CourseContentManager manages its own internal state and calls onModulesChange */}
              <CourseContentManager
                modules={course.modules}
                onModulesChange={handleModulesChange}
              />
            </Col>
          </Row>

          <Form.Item className="mt-8">
            <Space>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={handleCancel}
                className="rounded-lg shadow-md px-6 py-3 text-base"
              >
                กลับ
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
              >
                บันทึกหลักสูตร
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
