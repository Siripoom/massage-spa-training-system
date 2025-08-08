"use client";

import React, { useState } from 'react';
import { Card, Typography, Table, Button, Tag, Space, Input, Select, Avatar, Progress, message, Modal, Descriptions } from 'antd';
import { 
  UserOutlined, 
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  MessageOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import '../../admin/dashboard/dashboard.css';

const { Title, Text } = Typography;
const { Option } = Select;

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  enrolledCourses: string[];
  completedCourses: string[];
  overallProgress: number;
  status: 'active' | 'inactive' | 'completed' | 'withdrawn';
  joinDate: string;
  lastActivity: string;
  grade: number;
  certificates: number;
}

interface Course {
  id: string;
  title: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'not-started';
  grade?: number;
  completedAt?: string;
}

const TeacherStudentsPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Mock data
  const mockStudents: Student[] = [
    {
      id: '1',
      firstName: 'สมหญิง',
      lastName: 'ใจดี',
      email: 'somying@email.com',
      phone: '081-234-5678',
      enrolledCourses: ['1', '2'],
      completedCourses: ['3'],
      overallProgress: 75,
      status: 'active',
      joinDate: '2024-01-15',
      lastActivity: '2024-02-01',
      grade: 85,
      certificates: 2
    },
    {
      id: '2',
      firstName: 'วิชัย',
      lastName: 'มานะ',
      email: 'wichai@email.com',
      phone: '082-345-6789',
      enrolledCourses: ['1'],
      completedCourses: ['2', '3'],
      overallProgress: 90,
      status: 'completed',
      joinDate: '2023-12-01',
      lastActivity: '2024-01-25',
      grade: 92,
      certificates: 3
    },
    {
      id: '3',
      firstName: 'นิดา',
      lastName: 'สุขใส',
      email: 'nida@email.com',
      phone: '083-456-7890',
      enrolledCourses: ['2'],
      completedCourses: [],
      overallProgress: 45,
      status: 'active',
      joinDate: '2024-01-20',
      lastActivity: '2024-01-30',
      grade: 78,
      certificates: 0
    }
  ];

  const mockCourses = [
    { id: '1', title: 'หลักสูตรการนวดแผนไทย' },
    { id: '2', title: 'หลักสูตรการนวดอโรม่า' },
    { id: '3', title: 'หลักสูตรการนวดสปา' }
  ];

  const mockStudentCourses: Course[] = [
    {
      id: '1',
      title: 'หลักสูตรการนวดแผนไทย',
      progress: 80,
      status: 'in-progress',
      grade: 85
    },
    {
      id: '2',
      title: 'หลักสูตรการนวดอโรม่า',
      progress: 100,
      status: 'completed',
      grade: 90,
      completedAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'หลักสูตรการนวดสปา',
      progress: 100,
      status: 'completed',
      grade: 88,
      completedAt: '2024-01-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'blue';
      case 'completed': return 'green';
      case 'inactive': return 'orange';
      case 'withdrawn': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'กำลังเรียน';
      case 'completed': return 'จบหลักสูตร';
      case 'inactive': return 'ไม่ใช้งาน';
      case 'withdrawn': return 'ถอนตัว';
      default: return status;
    }
  };

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      case 'not-started': return 'default';
      default: return 'default';
    }
  };

  const getCourseStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'เสร็จสิ้น';
      case 'in-progress': return 'กำลังเรียน';
      case 'not-started': return 'ยังไม่เริ่ม';
      default: return status;
    }
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      student.email.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    const matchesCourse = courseFilter === 'all' || 
      student.enrolledCourses.includes(courseFilter) ||
      student.completedCourses.includes(courseFilter);

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setDetailModalVisible(true);
  };

  const handleSendMessage = (studentId: string) => {
    message.info(`ส่งข้อความถึงนักเรียน ID: ${studentId}`);
  };

  const handleViewProgress = (studentId: string) => {
    message.info(`ดูความคืบหน้าของนักเรียน ID: ${studentId}`);
  };

  const columns = [
    {
      title: 'นักเรียน',
      dataIndex: 'student',
      key: 'student',
      render: (_: unknown, record: Student) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>
              {record.firstName} {record.lastName}
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'หลักสูตรที่เรียน',
      dataIndex: 'enrolledCourses',
      key: 'enrolledCourses',
      render: (courses: string[]) => (
        <div>
          {courses.length} หลักสูตร
        </div>
      ),
    },
    {
      title: 'ความคืบหน้า',
      dataIndex: 'overallProgress',
      key: 'progress',
      render: (progress: number) => (
        <Progress 
          percent={progress} 
          size="small" 
          format={percent => `${percent}%`}
        />
      ),
    },
    {
      title: 'เกรด',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade: number) => (
        <Tag color={grade >= 80 ? 'green' : grade >= 70 ? 'orange' : 'red'}>
          {grade}%
        </Tag>
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'วันที่เข้าเรียน',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date: string) => new Date(date).toLocaleDateString('th-TH'),
    },
    {
      title: 'การดำเนินการ',
      key: 'actions',
      render: (_: unknown, record: Student) => (
        <Space>
          <Button 
            type="primary" 
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewStudent(record)}
          >
            ดูรายละเอียด
          </Button>
          <Button 
            size="small"
            icon={<MessageOutlined />}
            onClick={() => handleSendMessage(record.id)}
          >
            ส่งข้อความ
          </Button>
          <Button 
            size="small"
            icon={<FileTextOutlined />}
            onClick={() => handleViewProgress(record.id)}
          >
            ความคืบหน้า
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>จัดการนักเรียน</Title>
        <Text type="secondary">ดูและจัดการข้อมูลนักเรียนในหลักสูตรของคุณ</Text>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <UserOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '8px' }} />
            <div>
              <Text type="secondary">นักเรียนทั้งหมด</Text>
              <Title level={3} style={{ margin: '4px 0' }}>{mockStudents.length}</Title>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '8px' }} />
            <div>
              <Text type="secondary">จบหลักสูตร</Text>
              <Title level={3} style={{ margin: '4px 0' }}>
                {mockStudents.filter(s => s.status === 'completed').length}
              </Title>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <ClockCircleOutlined style={{ fontSize: '32px', color: '#fa8c16', marginBottom: '8px' }} />
            <div>
              <Text type="secondary">กำลังเรียน</Text>
              <Title level={3} style={{ margin: '4px 0' }}>
                {mockStudents.filter(s => s.status === 'active').length}
              </Title>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <TrophyOutlined style={{ fontSize: '32px', color: '#722ed1', marginBottom: '8px' }} />
            <div>
              <Text type="secondary">เกรดเฉลี่ย</Text>
              <Title level={3} style={{ margin: '4px 0' }}>
                {Math.round(mockStudents.reduce((acc, s) => acc + s.grade, 0) / mockStudents.length)}%
              </Title>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space wrap>
            <Input.Search
              placeholder="ค้นหานักเรียน..."
              allowClear
              style={{ width: 250 }}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <Select
              style={{ width: 150 }}
              placeholder="สถานะ"
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">ทุกสถานะ</Option>
              <Option value="active">กำลังเรียน</Option>
              <Option value="completed">จบหลักสูตร</Option>
              <Option value="inactive">ไม่ใช้งาน</Option>
              <Option value="withdrawn">ถอนตัว</Option>
            </Select>
            <Select
              style={{ width: 200 }}
              placeholder="หลักสูตร"
              value={courseFilter}
              onChange={setCourseFilter}
            >
              <Option value="all">ทุกหลักสูตร</Option>
              {mockCourses.map(course => (
                <Option key={course.id} value={course.id}>
                  {course.title}
                </Option>
              ))}
            </Select>
          </Space>
          <Button icon={<FilterOutlined />}>
            ตัวกรอง
          </Button>
        </Space>
      </Card>

      {/* Students Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} จาก ${total} รายการ`,
          }}
        />
      </Card>

      {/* Student Detail Modal */}
      <Modal
        title={`รายละเอียดนักเรียน: ${selectedStudent?.firstName} ${selectedStudent?.lastName}`}
        open={detailModalVisible}
        onCancel={() => {
          setDetailModalVisible(false);
          setSelectedStudent(null);
        }}
        width={800}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            ปิด
          </Button>,
          <Button key="message" type="primary" icon={<MessageOutlined />}>
            ส่งข้อความ
          </Button>
        ]}
      >
        {selectedStudent && (
          <div>
            <Descriptions bordered column={2} style={{ marginBottom: '24px' }}>
              <Descriptions.Item label="ชื่อ-นามสกุล">
                {selectedStudent.firstName} {selectedStudent.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="อีเมล">
                {selectedStudent.email}
              </Descriptions.Item>
              <Descriptions.Item label="เบอร์โทร">
                {selectedStudent.phone}
              </Descriptions.Item>
              <Descriptions.Item label="สถานะ">
                <Tag color={getStatusColor(selectedStudent.status)}>
                  {getStatusText(selectedStudent.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="วันที่เข้าเรียน">
                {new Date(selectedStudent.joinDate).toLocaleDateString('th-TH')}
              </Descriptions.Item>
              <Descriptions.Item label="กิจกรรมล่าสุด">
                {new Date(selectedStudent.lastActivity).toLocaleDateString('th-TH')}
              </Descriptions.Item>
              <Descriptions.Item label="ความคืบหน้าโดยรวม">
                <Progress percent={selectedStudent.overallProgress} />
              </Descriptions.Item>
              <Descriptions.Item label="จำนวนใบประกาศนียบัตร">
                {selectedStudent.certificates} ใบ
              </Descriptions.Item>
            </Descriptions>

            <Title level={4}>หลักสูตรที่เรียน</Title>
            <Table
              columns={[
                {
                  title: 'หลักสูตร',
                  dataIndex: 'title',
                  key: 'title',
                },
                {
                  title: 'ความคืบหน้า',
                  dataIndex: 'progress',
                  key: 'progress',
                  render: (progress: number) => (
                    <Progress percent={progress} size="small" />
                  ),
                },
                {
                  title: 'สถานะ',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: string) => (
                    <Tag color={getCourseStatusColor(status)}>
                      {getCourseStatusText(status)}
                    </Tag>
                  ),
                },
                {
                  title: 'เกรด',
                  dataIndex: 'grade',
                  key: 'grade',
                  render: (grade: number) => (
                    grade ? (
                      <Tag color={grade >= 80 ? 'green' : grade >= 70 ? 'orange' : 'red'}>
                        {grade}%
                      </Tag>
                    ) : '-'
                  ),
                },
                {
                  title: 'วันที่เสร็จสิ้น',
                  dataIndex: 'completedAt',
                  key: 'completedAt',
                  render: (date: string) => 
                    date ? new Date(date).toLocaleDateString('th-TH') : '-',
                },
              ]}
              dataSource={mockStudentCourses}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TeacherStudentsPage;
