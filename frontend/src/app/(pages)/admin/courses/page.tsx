"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Input, message, Tag, Typography, Breadcrumb, Card, Collapse } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, DeleteOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { CourseContentModule, CourseContentItem } from './manage/CourseContentManager'; // Import the interfaces
import type { CollapseProps } from 'antd'; // Make sure to import CollapseProps

const { Text, Title: AntdTitle } = Typography;
// const { Panel } = Collapse; // Still need Panel for the type definition, but we'll use items directly

// Interface for Course Data (must match the one in manage/page.tsx)
interface CourseData {
  id: string;
  courseName: string;
  description: string;
  price: number;
  durationHours: number;
  createdAt: string;
  updatedAt: string;
  modules: CourseContentModule[]; // Array of modules for course content
}

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingCourse, setViewingCourse] = useState<CourseData | null>(null);
  const [hasLoadedCourses, setHasLoadedCourses] = useState(false); // State for hydration

  // Load courses from localStorage on component mount
  useEffect(() => {
    const loadCourses = () => {
      try {
        const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]') as CourseData[];
        setCourses(storedCourses);
        setHasLoadedCourses(true);
      } catch (error) {
        console.error("Failed to parse courses from localStorage", error);
        setCourses([]);
        setHasLoadedCourses(true);
      }
    };
    loadCourses();

    // Add event listener for 'storage' to update when localStorage changes from other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'courses') {
        loadCourses();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCreateCourse = () => {
    router.push('/admin/courses/manage'); // Navigate to the new manage page for creation
  };

  const handleEditCourse = (courseId: string) => {
    router.push(`/admin/courses/manage?id=${courseId}`); // Navigate to manage page for editing
  };

  const handleDeleteCourse = (courseId: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบหลักสูตรนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setCourses(prevCourses => {
          const updatedCourses = prevCourses.filter(course => course.id !== courseId);
          localStorage.setItem('courses', JSON.stringify(updatedCourses));
          message.success('ลบหลักสูตรเรียบร้อยแล้ว!');
          return updatedCourses;
        });
      },
    });
  };

  const handleViewCourse = (record: CourseData) => {
    setViewingCourse(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setViewingCourse(null);
  };

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: '#',
      render: (_: unknown, __: unknown, index: number) => index + 1,
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'ชื่อหลักสูตร',
      dataIndex: 'courseName',
      key: 'courseName',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'คำอธิบาย',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      className: 'text-gray-700',
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toFixed(2)} บาท`,
      className: 'text-gray-700',
    },
    {
      title: 'ระยะเวลา',
      dataIndex: 'durationHours',
      key: 'durationHours',
      render: (duration: number) => `${duration} ชั่วโมง`,
      className: 'text-gray-700',
    },
    {
      title: 'สร้างเมื่อ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY, HH:mm'),
      className: 'text-gray-700',
    },
    {
      title: 'อัปเดตเมื่อ',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY, HH:mm'),
      className: 'text-gray-700',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_: unknown, record: CourseData) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewCourse(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCourse(record.id)}
            className="text-blue-500 border-none shadow-none hover:bg-blue-50"
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteCourse(record.id)}
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
      title: <><BookOutlined /> หลักสูตร</>,
    },
  ];

  // Prepare items for Ant Design Collapse component in the Modal
  const modalCollapseItems: CollapseProps['items'] = viewingCourse?.modules.map((module) => ({
    key: module.id,
    label: <Text strong>{module.moduleName}</Text>,
    children: (
      module.contents.length === 0 ? (
        <Text type="secondary">ไม่มีเนื้อหาในโมดูลนี้</Text>
      ) : (
        <Space direction="vertical" className="w-full">
          {module.contents.map((item: CourseContentItem) => (
            <Card key={item.id} size="small" className="rounded-lg shadow-sm">
              <Text strong>{item.itemTitle}</Text>
              <div
                className="text-gray-600 text-sm quill-content-display"
                dangerouslySetInnerHTML={{ __html: item.itemDescription }}
              />
              <Tag color="blue" className="mt-2 text-xs">{item.itemType}</Tag>
            </Card>
          ))}
        </Space>
      )
    ),
  })) || []; // Ensure it's an empty array if viewingCourse or modules is null/undefined

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb className="mb-6" items={breadcrumbItems} />

      <AntdTitle level={1} className="text-3xl font-bold mb-8 text-gray-800">
        การจัดการหลักสูตร
      </AntdTitle>

      <Card className="rounded-xl shadow-custom-light p-4">
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
            onClick={handleCreateCourse}
            icon={<PlusOutlined />}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
          >
            สร้างหลักสูตรใหม่
          </Button>
        </div>
        {hasLoadedCourses ? (
          <Table
            columns={columns}
            dataSource={filteredCourses}
            rowKey="id"
            className="rounded-xl shadow-custom-light"
            pagination={{ pageSize: 10 }}
            bordered={false}
          />
        ) : (
          <div className="flex justify-center items-center h-40">
            <Text>กำลังโหลดหลักสูตร...</Text>
          </div>
        )}

        {/* Modal for Viewing Course Details */}
        <Modal
          title="รายละเอียดหลักสูตร"
          open={isDetailModalVisible}
          onCancel={handleDetailModalCancel}
          footer={null}
          className="rounded-xl"
          centered
          width={800}
        >
          {viewingCourse ? (
            <div className="p-4">
              <p className="mb-2"><Text strong>ชื่อหลักสูตร:</Text> {viewingCourse.courseName}</p>
              <p className="mb-2"><Text strong>คำอธิบาย:</Text> {viewingCourse.description}</p>
              <p className="mb-2"><Text strong>ราคา:</Text> {viewingCourse.price.toFixed(2)} บาท</p>
              <p className="mb-2"><Text strong>ระยะเวลา:</Text> {viewingCourse.durationHours} ชั่วโมง</p>
              <p className="mb-2"><Text strong>สร้างเมื่อ:</Text> {dayjs(viewingCourse.createdAt).format('DD/MM/YYYY, HH:mm')}</p>
              <p className="mb-2"><Text strong>อัปเดตเมื่อ:</Text> {dayjs(viewingCourse.updatedAt).format('DD/MM/YYYY, HH:mm')}</p>

              <AntdTitle level={5} className="mt-6 mb-4 text-gray-700">เนื้อหาหลักสูตร</AntdTitle>
              {viewingCourse.modules.length === 0 ? (
                <Text type="secondary">ไม่มีเนื้อหาในหลักสูตรนี้</Text>
              ) : (
                // Use items prop here as well
                <Collapse accordion className="rounded-lg shadow-sm" items={modalCollapseItems} />
              )}
            </div>
          ) : (
            <p>ไม่พบข้อมูล</p>
          )}
        </Modal>
      </Card>
    </div>
  );
}
