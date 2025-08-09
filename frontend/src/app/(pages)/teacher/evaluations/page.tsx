"use client";

import React, { useState } from 'react';
// import { Card, Typography, Table, Button, Tag, Space, Input, Select, Rate, Progress, message, Modal, Descriptions, Avatar, Tabs } from 'antd';
import { Card, Typography, Table, Button, Tag, Space, Input, Select, message, Modal, Descriptions, Avatar, Tabs } from 'antd';
import { 
  FileTextOutlined, 
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  UserOutlined,
  // CalendarOutlined,
  // BookOutlined
} from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import '../../admin/dashboard/dashboard.css';
import '@ant-design/v5-patch-for-react-19';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Assignment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  submittedAt: string;
  dueDate: string;
  status: 'submitted' | 'graded' | 'late' | 'pending';
  grade?: number;
  feedback?: string;
  attachments: string[];
  type: 'assignment' | 'exam' | 'project';
}

interface Evaluation {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  type: 'practical' | 'written' | 'oral';
  title: string;
  evaluationDate: string;
  criteria: EvaluationCriteria[];
  overallScore: number;
  feedback: string;
  status: 'completed' | 'pending' | 'scheduled';
}

interface EvaluationCriteria {
  id: string;
  name: string;
  maxScore: number;
  score: number;
  weight: number;
}

const TeacherEvaluationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assignments');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<Assignment | Evaluation | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [gradeModalVisible, setGradeModalVisible] = useState(false);
  const [currentGrade, setCurrentGrade] = useState<number>(0);
  const [currentFeedback, setCurrentFeedback] = useState<string>('');

  // Mock data for assignments
  const mockAssignments: Assignment[] = [
    {
      id: '1',
      studentId: '1',
      studentName: 'สมหญิง ใจดี',
      courseId: '1',
      courseName: 'หลักสูตรการนวดแผนไทย',
      title: 'การปฏิบัติการนวดแผนไทยพื้นฐาน',
      description: 'ส่งวิดีโอการปฏิบัติการนวดแผนไทย ท่าพื้นฐาน 10 ท่า',
      submittedAt: '2024-02-01T10:30:00',
      dueDate: '2024-02-05T23:59:00',
      status: 'submitted',
      attachments: ['video1.mp4', 'report.pdf'],
      type: 'assignment'
    },
    {
      id: '2',
      studentId: '2',
      studentName: 'วิชัย มานะ',
      courseId: '2',
      courseName: 'หลักสูตรการนวดอโรม่า',
      title: 'การผสมน้ำมันหอมระเหย',
      description: 'รายงานการศึกษาคุณสมบัติของน้ำมันหอมระเหยต่างๆ',
      submittedAt: '2024-01-30T15:45:00',
      dueDate: '2024-02-01T23:59:00',
      status: 'graded',
      grade: 85,
      feedback: 'งานดีมาก มีความเข้าใจเรื่องคุณสมบัติของน้ำมันเป็นอย่างดี',
      attachments: ['aromatherapy_report.pdf'],
      type: 'assignment'
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'นิดา สุขใส',
      courseId: '1',
      courseName: 'หลักสูตรการนวดแผนไทย',
      title: 'สอบปลายภาค - ทฤษฎีการนวดแผนไทย',
      description: 'ข้อสอบทฤษฎีการนวดแผนไทย ความรู้พื้นฐาน',
      submittedAt: '2024-02-02T14:20:00',
      dueDate: '2024-02-02T16:00:00',
      status: 'late',
      attachments: [],
      type: 'exam'
    }
  ];

  // Mock data for evaluations
  const mockEvaluations: Evaluation[] = [
    {
      id: '1',
      studentId: '1',
      studentName: 'สมหญิง ใจดี',
      courseId: '1',
      courseName: 'หลักสูตรการนวดแผนไทย',
      type: 'practical',
      title: 'การประเมินการปฏิบัติการนวดแผนไทย',
      evaluationDate: '2024-02-03T09:00:00',
      criteria: [
        { id: '1', name: 'ความถูกต้องของท่าทาง', maxScore: 25, score: 22, weight: 0.3 },
        { id: '2', name: 'ความนุ่มนวลในการสัมผัส', maxScore: 25, score: 24, weight: 0.3 },
        { id: '3', name: 'ความปลอดภัย', maxScore: 25, score: 25, weight: 0.2 },
        { id: '4', name: 'การสื่อสารกับผู้รับบริการ', maxScore: 25, score: 20, weight: 0.2 }
      ],
      overallScore: 89,
      feedback: 'มีทักษะการนวดที่ดี ควรพัฒนาด้านการสื่อสารให้มากขึ้น',
      status: 'completed'
    },
    {
      id: '2',
      studentId: '2',
      studentName: 'วิชัย มานะ',
      courseId: '2',
      courseName: 'หลักสูตรการนวดอโรม่า',
      type: 'practical',
      title: 'การประเมินการนวดอโรม่าเธอราปี',
      evaluationDate: '2024-02-05T10:00:00',
      criteria: [],
      overallScore: 0,
      feedback: '',
      status: 'scheduled'
    }
  ];

  const mockCourses = [
    { id: '1', title: 'หลักสูตรการนวดแผนไทย' },
    { id: '2', title: 'หลักสูตรการนวดอโรม่า' },
    { id: '3', title: 'หลักสูตรการนวดสปา' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'blue';
      case 'graded': return 'green';
      case 'late': return 'red';
      case 'pending': return 'orange';
      case 'completed': return 'green';
      case 'scheduled': return 'blue';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted': return 'ส่งแล้ว';
      case 'graded': return 'ให้คะแนนแล้ว';
      case 'late': return 'ส่งช้า';
      case 'pending': return 'รอดำเนินการ';
      case 'completed': return 'เสร็จสิ้น';
      case 'scheduled': return 'กำหนดเวลาแล้ว';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'assignment': return 'งานที่มอบหมาย';
      case 'exam': return 'การสอบ';
      case 'project': return 'โปรเจค';
      case 'practical': return 'การปฏิบัติ';
      case 'written': return 'ข้อเขียน';
      case 'oral': return 'การพูด';
      default: return type;
    }
  };

  const handleGradeAssignment = (assignment: Assignment) => {
    setSelectedItem(assignment);
    setCurrentGrade(assignment.grade || 0);
    setCurrentFeedback(assignment.feedback || '');
    setGradeModalVisible(true);
  };

  const handleSaveGrade = () => {
    message.success('บันทึกคะแนนเรียบร้อย');
    setGradeModalVisible(false);
    // Here you would typically save to backend
  };

  const handleViewDetail = (item: Assignment | Evaluation) => {
    setSelectedItem(item);
    setDetailModalVisible(true);
  };

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = 
      assignment.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
      assignment.title.toLowerCase().includes(searchText.toLowerCase()) ||
      assignment.courseName.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || assignment.courseId === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const filteredEvaluations = mockEvaluations.filter(evaluation => {
    const matchesSearch = 
      evaluation.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
      evaluation.title.toLowerCase().includes(searchText.toLowerCase()) ||
      evaluation.courseName.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || evaluation.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || evaluation.courseId === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const assignmentColumns = [
    {
      title: 'นักเรียน',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (name: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          {name}
        </Space>
      ),
    },
    {
      title: 'งาน',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Assignment) => (
        <div>
          <div style={{ fontWeight: 500 }}>{title}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.courseName}
          </Text>
        </div>
      ),
    },
    {
      title: 'ประเภท',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color="blue">{getTypeText(type)}</Tag>
      ),
    },
    {
      title: 'วันที่ส่ง',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (date: string) => new Date(date).toLocaleDateString('th-TH'),
    },
    {
      title: 'กำหนดส่ง',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => new Date(date).toLocaleDateString('th-TH'),
    },
    {
      title: 'คะแนน',
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
      title: 'การดำเนินการ',
      key: 'actions',
      render: (_: unknown, record: Assignment) => (
        <Space>
          <Button 
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            ดูรายละเอียด
          </Button>
          {record.status === 'submitted' && (
            <Button 
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleGradeAssignment(record)}
            >
              ให้คะแนน
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const evaluationColumns = [
    {
      title: 'นักเรียน',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (name: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          {name}
        </Space>
      ),
    },
    {
      title: 'การประเมิน',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Evaluation) => (
        <div>
          <div style={{ fontWeight: 500 }}>{title}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.courseName}
          </Text>
        </div>
      ),
    },
    {
      title: 'ประเภท',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color="purple">{getTypeText(type)}</Tag>
      ),
    },
    {
      title: 'วันที่ประเมิน',
      dataIndex: 'evaluationDate',
      key: 'evaluationDate',
      render: (date: string) => new Date(date).toLocaleDateString('th-TH'),
    },
    {
      title: 'คะแนน',
      dataIndex: 'overallScore',
      key: 'overallScore',
      render: (score: number) => (
        score ? (
          <Tag color={score >= 80 ? 'green' : score >= 70 ? 'orange' : 'red'}>
            {score}%
          </Tag>
        ) : '-'
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
      title: 'การดำเนินการ',
      key: 'actions',
      render: (_: unknown, record: Evaluation) => (
        <Space>
          <Button 
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            ดูรายละเอียด
          </Button>
          {record.status === 'scheduled' && (
            <Button 
              type="primary"
              size="small"
              icon={<EditOutlined />}
            >
              ประเมิน
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>การประเมินและให้คะแนน</Title>
        <Text type="secondary">จัดการงานที่มอบหมายและการประเมินของนักเรียน</Text>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <FileTextOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '8px' }} />
            <div>
              <Text type="secondary">งานรอตรวจ</Text>
              <Title level={3} style={{ margin: '4px 0' }}>
                {mockAssignments.filter(a => a.status === 'submitted').length}
              </Title>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '8px' }} />
            <div>
              <Text type="secondary">ให้คะแนนแล้ว</Text>
              <Title level={3} style={{ margin: '4px 0' }}>
                {mockAssignments.filter(a => a.status === 'graded').length}
              </Title>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <ClockCircleOutlined style={{ fontSize: '32px', color: '#fa8c16', marginBottom: '8px' }} />
            <div>
              <Text type="secondary">การประเมินที่กำหนด</Text>
              <Title level={3} style={{ margin: '4px 0' }}>
                {mockEvaluations.filter(e => e.status === 'scheduled').length}
              </Title>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <StarOutlined style={{ fontSize: '32px', color: '#722ed1', marginBottom: '8px' }} />
            <div>
              <Text type="secondary">คะแนนเฉลี่ย</Text>
              <Title level={3} style={{ margin: '4px 0' }}>
                85%
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
              placeholder="ค้นหา..."
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
              <Option value="submitted">ส่งแล้ว</Option>
              <Option value="graded">ให้คะแนนแล้ว</Option>
              <Option value="late">ส่งช้า</Option>
              <Option value="pending">รอดำเนินการ</Option>
              <Option value="completed">เสร็จสิ้น</Option>
              <Option value="scheduled">กำหนดเวลาแล้ว</Option>
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
        </Space>
      </Card>

      {/* Tabs for Assignments and Evaluations */}
      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'assignments',
              label: 'งานที่มอบหมาย',
              children: (
                <Table
                  columns={assignmentColumns}
                  dataSource={filteredAssignments}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} จาก ${total} รายการ`,
                  }}
                />
              )
            },
            {
              key: 'evaluations',
              label: 'การประเมิน',
              children: (
                <Table
                  columns={evaluationColumns}
                  dataSource={filteredEvaluations}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} จาก ${total} รายการ`,
                  }}
                />
              )
            }
          ]}
        />
      </Card>

      {/* Grade Assignment Modal */}
      <Modal
        title="ให้คะแนนงาน"
        open={gradeModalVisible}
        onOk={handleSaveGrade}
        onCancel={() => setGradeModalVisible(false)}
        width={600}
      >
        {selectedItem && (
          <div>
            <Descriptions column={1} style={{ marginBottom: '24px' }}>
              <Descriptions.Item label="นักเรียน">
                {(selectedItem as Assignment).studentName}
              </Descriptions.Item>
              <Descriptions.Item label="งาน">
                {selectedItem.title}
              </Descriptions.Item>
              <Descriptions.Item label="หลักสูตร">
                {(selectedItem as Assignment).courseName}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginBottom: '16px' }}>
              <Text strong>คะแนน (0-100)</Text>
              <Input
                type="number"
                min={0}
                max={100}
                value={currentGrade}
                onChange={(e) => setCurrentGrade(Number(e.target.value))}
                style={{ marginTop: '8px' }}
                placeholder="ใส่คะแนน"
              />
            </div>

            <div>
              <Text strong>ความคิดเห็น</Text>
              <TextArea
                rows={4}
                value={currentFeedback}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentFeedback(e.target.value)}
                style={{ marginTop: '8px' }}
                placeholder="ให้ความคิดเห็นเกี่ยวกับงาน..."
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="รายละเอียด"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            ปิด
          </Button>
        ]}
      >
        {selectedItem && (
          <div>
            {('studentName' in selectedItem && 'submittedAt' in selectedItem) ? (
              // Assignment details
              <Descriptions bordered column={2}>
                <Descriptions.Item label="นักเรียน">
                  {(selectedItem as Assignment).studentName}
                </Descriptions.Item>
                <Descriptions.Item label="หลักสูตร">
                  {(selectedItem as Assignment).courseName}
                </Descriptions.Item>
                <Descriptions.Item label="ชื่องาน">
                  {selectedItem.title}
                </Descriptions.Item>
                <Descriptions.Item label="ประเภท">
                  {getTypeText((selectedItem as Assignment).type)}
                </Descriptions.Item>
                <Descriptions.Item label="วันที่ส่ง">
                  {new Date((selectedItem as Assignment).submittedAt).toLocaleString('th-TH')}
                </Descriptions.Item>
                <Descriptions.Item label="กำหนดส่ง">
                  {new Date((selectedItem as Assignment).dueDate).toLocaleString('th-TH')}
                </Descriptions.Item>
                <Descriptions.Item label="สถานะ">
                  <Tag color={getStatusColor((selectedItem as Assignment).status)}>
                    {getStatusText((selectedItem as Assignment).status)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="คะแนน">
                  {(selectedItem as Assignment).grade ? `${(selectedItem as Assignment).grade}%` : 'ยังไม่ให้คะแนน'}
                </Descriptions.Item>
                <Descriptions.Item label="รายละเอียดงาน" span={2}>
                  {(selectedItem as Assignment).description}
                </Descriptions.Item>
                <Descriptions.Item label="ไฟล์แนบ" span={2}>
                  {(selectedItem as Assignment).attachments.length > 0 ? (
                    <Space direction="vertical">
                      {(selectedItem as Assignment).attachments.map((file: string, index: number) => (
                        <Button key={index} type="link" size="small">
                          {file}
                        </Button>
                      ))}
                    </Space>
                  ) : 'ไม่มีไฟล์แนบ'}
                </Descriptions.Item>
                {(selectedItem as Assignment).feedback && (
                  <Descriptions.Item label="ความคิดเห็น" span={2}>
                    {(selectedItem as Assignment).feedback}
                  </Descriptions.Item>
                )}
              </Descriptions>
            ) : (
              // Evaluation details
              <div>
                <Descriptions bordered column={2} style={{ marginBottom: '24px' }}>
                  <Descriptions.Item label="นักเรียน">
                    {(selectedItem as Evaluation).studentName}
                  </Descriptions.Item>
                  <Descriptions.Item label="หลักสูตร">
                    {(selectedItem as Evaluation).courseName}
                  </Descriptions.Item>
                  <Descriptions.Item label="การประเมิน">
                    {selectedItem.title}
                  </Descriptions.Item>
                  <Descriptions.Item label="ประเภท">
                    {getTypeText((selectedItem as Evaluation).type)}
                  </Descriptions.Item>
                  <Descriptions.Item label="วันที่ประเมิน">
                    {new Date((selectedItem as Evaluation).evaluationDate).toLocaleString('th-TH')}
                  </Descriptions.Item>
                  <Descriptions.Item label="คะแนนรวม">
                    {(selectedItem as Evaluation).overallScore ? `${(selectedItem as Evaluation).overallScore}%` : 'ยังไม่ประเมิน'}
                  </Descriptions.Item>
                </Descriptions>

                {(selectedItem as Evaluation).criteria.length > 0 && (
                  <div>
                    <Title level={5}>เกณฑ์การประเมิน</Title>
                    <Table
                      columns={[
                        { title: 'เกณฑ์', dataIndex: 'name', key: 'name' },
                        { title: 'คะแนนเต็ม', dataIndex: 'maxScore', key: 'maxScore' },
                        { title: 'คะแนนที่ได้', dataIndex: 'score', key: 'score' },
                        { 
                          title: 'น้ำหนัก', 
                          dataIndex: 'weight', 
                          key: 'weight',
                          render: (weight: number) => `${weight * 100}%`
                        },
                        {
                          title: 'เปอร์เซ็นต์',
                          key: 'percentage',
                          render: (_: unknown, record: EvaluationCriteria) => 
                            `${Math.round((record.score / record.maxScore) * 100)}%`
                        }
                      ]}
                      dataSource={(selectedItem as Evaluation).criteria}
                      rowKey="id"
                      pagination={false}
                      size="small"
                    />
                  </div>
                )}

                {(selectedItem as Evaluation).feedback && (
                  <div style={{ marginTop: '24px' }}>
                    <Title level={5}>ความคิดเห็น</Title>
                    <Text>{(selectedItem as Evaluation).feedback}</Text>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TeacherEvaluationsPage;
