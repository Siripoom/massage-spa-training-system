// src/app/(pages)/(admin)/quiz/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { Tabs, Table, Button, Space, Modal, Form, Input, message, Tag, Select, Typography, DatePicker } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link'; // Import Link for navigation

dayjs.locale('th'); // Set default locale to Thai for date display

const { Option } = Select;
const { Text } = Typography;

// --- Standardized Interfaces (ต้องเหมือนกับใน manage/page.tsx) ---
interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  questionText: string;
  options: Option[];
  correctOptionId: string; // ID ของตัวเลือกที่ถูกต้อง
}

interface Quiz {
  id: string;
  title: string; // ชื่อข้อสอบ
  description: string; // คำอธิบายทั่วไปของข้อสอบ
  course: string; // หลักสูตรที่เกี่ยวข้อง
  numQuestions: number; // จำนวนคำถามในข้อสอบ (จะถูกคำนวณจาก questions.length)
  status: 'draft' | 'published'; // สถานะของข้อสอบ
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

// --- Interfaces for Evaluation Tab ---
interface Evaluation {
  key: string; // ใช้ key เพื่อความเข้ากันได้กับ Ant Design Table
  quizTitle: string;
  studentName: string;
  score: number;
  dateTaken: string;
  status: 'Passed' | 'Failed' | 'Pending';
}

interface EvaluationFormValues {
  quizTitle: string;
  studentName: string;
  score: number;
  dateTaken: dayjs.Dayjs | null | undefined;
  status: 'Passed' | 'Failed' | 'Pending';
}


export default function QuizManagementPage() { // เปลี่ยนชื่อ Component
  const [activeTab, setActiveTab] = useState('evaluation');

  // --- State for Evaluation Tab ---
  const [isEvaluationModalVisible, setIsEvaluationModalVisible] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [evaluationForm] = Form.useForm<EvaluationFormValues>();
  const [isEvaluationDetailModalVisible, setIsEvaluationDetailModalVisible] = useState(false);
  const [viewingEvaluation, setViewingEvaluation] = useState<Evaluation | null>(null);
  const [searchTermEvaluation, setSearchTermEvaluation] = useState(''); // Search term for evaluation tab

  const [evaluations, setEvaluations] = useState<Evaluation[]>([
    {
      key: '1',
      quizTitle: 'แบบทดสอบนวดแผนไทยเบื้องต้น',
      studentName: 'สมชาย ใจดี',
      score: 85,
      dateTaken: '2023-07-01',
      status: 'Passed',
    },
    {
      key: '2',
      quizTitle: 'แบบทดสอบสปาเพื่อสุขภาพ',
      studentName: 'สมหญิง รักเรียน',
      score: 40,
      dateTaken: '2023-07-05',
      status: 'Failed',
    },
    {
      key: '3',
      quizTitle: 'แบบทดสอบอโรมาเธอราพี',
      studentName: 'มานะ พากเพียร',
      score: 70,
      dateTaken: '2023-07-10',
      status: 'Pending',
    },
  ]);

  // --- State for Quiz Management Tab (formerly Create Exam) ---
  const [quizzes, setQuizzes] = useState<Quiz[]>([]); // ใช้ quizzes state
  const [isQuizDetailModalVisible, setIsQuizDetailModalVisible] = useState(false); // สำหรับ Modal แสดงรายละเอียด Quiz
  const [viewingQuiz, setViewingQuiz] = useState<Quiz | null>(null); // สำหรับ Quiz ที่กำลังดูรายละเอียด
  const [searchTermQuiz, setSearchTermQuiz] = useState(''); // Search term for quiz tab

  // Load quizzes from localStorage on component mount
  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]') as Quiz[];
    setQuizzes(storedQuizzes);
  }, []);

  // --- Evaluation Tab Handlers ---
  const handleAddEvaluation = () => {
    setEditingEvaluation(null);
    evaluationForm.resetFields();
    setIsEvaluationModalVisible(true);
  };

  const handleEditEvaluation = (record: Evaluation) => {
    setEditingEvaluation(record);
    evaluationForm.setFieldsValue({
      ...record,
      dateTaken: record.dateTaken ? dayjs(record.dateTaken) : null,
    });
    setIsEvaluationModalVisible(true);
  };

  const handleDeleteEvaluation = (keyToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลการประเมินนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setEvaluations(prevEvaluations => prevEvaluations.filter(evalItem => evalItem.key !== keyToDelete));
        message.success('ลบข้อมูลการประเมินสำเร็จ!');
      },
    });
  };

  const handleEvaluationOk = () => {
    evaluationForm.validateFields()
      .then((values: EvaluationFormValues) => {
        const formattedValues = {
          ...values,
          dateTaken: values.dateTaken ? values.dateTaken.format('YYYY-MM-DD') : '',
        };
        if (editingEvaluation) {
          setEvaluations(prevEvaluations =>
            prevEvaluations.map(evalItem =>
              evalItem.key === editingEvaluation.key ? { ...evalItem, ...formattedValues } : evalItem
            )
          );
          message.success('อัปเดตข้อมูลการประเมินสำเร็จ!');
        } else {
          const newEvaluation: Evaluation = {
            key: (evaluations.length + 1).toString(),
            ...formattedValues,
          };
          setEvaluations(prevEvaluations => [...prevEvaluations, newEvaluation]);
          message.success('เพิ่มข้อมูลการประเมินสำเร็จ!');
        }
        setIsEvaluationModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleEvaluationCancel = () => {
    setIsEvaluationModalVisible(false);
  };

  const handleViewEvaluation = (record: Evaluation) => {
    setViewingEvaluation(record);
    setIsEvaluationDetailModalVisible(true);
  };

  const handleEvaluationDetailModalCancel = () => {
    setIsEvaluationDetailModalVisible(false);
    setViewingEvaluation(null);
  };

  // --- Quiz Management Tab Handlers ---
  const handleDeleteQuiz = (idToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อสอบนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้',
      okText: 'ลบ',
      cancelText: 'ไม่',
      onOk() {
        const updatedQuizzes = quizzes.filter(quiz => quiz.id !== idToDelete);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        setQuizzes(updatedQuizzes);
        message.success('ลบข้อสอบเรียบร้อย!');
      },
    });
  };

  const handleViewQuiz = (record: Quiz) => {
    setViewingQuiz(record);
    setIsQuizDetailModalVisible(true);
  };

  const handleQuizDetailModalCancel = () => {
    setIsQuizDetailModalVisible(false);
    setViewingQuiz(null);
  };

  // --- Filtered Data ---
  const filteredEvaluations = evaluations.filter(evalItem =>
    evalItem.quizTitle.toLowerCase().includes(searchTermEvaluation.toLowerCase()) ||
    evalItem.studentName.toLowerCase().includes(searchTermEvaluation.toLowerCase()) ||
    evalItem.status.toLowerCase().includes(searchTermEvaluation.toLowerCase()) ||
    evalItem.dateTaken.includes(searchTermEvaluation)
  );

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTermQuiz.toLowerCase()) ||
    quiz.course.toLowerCase().includes(searchTermQuiz.toLowerCase()) ||
    quiz.status.toLowerCase().includes(searchTermQuiz.toLowerCase())
  );

  // --- Columns for Evaluation Tab ---
  const evaluationColumns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text: string) => parseInt(text),
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'QUIZ TITLE',
      dataIndex: 'quizTitle',
      key: 'quizTitle',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'STUDENT NAME',
      dataIndex: 'studentName',
      key: 'studentName',
      className: 'text-gray-700',
    },
    {
      title: 'SCORE',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => `${score}%`,
      className: 'text-gray-700',
    },
    {
      title: 'DATE TAKEN',
      dataIndex: 'dateTaken',
      key: 'dateTaken',
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'Passed' | 'Failed' | 'Pending') => {
        let color: string;
        switch (status) {
          case 'Passed':
            color = 'green';
            break;
          case 'Failed':
            color = 'red';
            break;
          case 'Pending':
            color = 'blue';
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
      render: (_text: string, record: Evaluation) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewEvaluation(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button icon={<EditOutlined />} onClick={() => handleEditEvaluation(record)} className="text-blue-500 border-none shadow-none hover:bg-blue-50" />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteEvaluation(record.key)}
            className="text-red-500 border-none shadow-none hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];

  // --- Columns for Quiz Management Tab ---
  const quizColumns = [ // เปลี่ยนชื่อจาก examColumns เป็น quizColumns
    {
      title: '#',
      dataIndex: 'id', // ใช้ id แทน key
      key: 'id',
      render: (text: string) => parseInt(text.split('-')[0] || '0'), // อาจจะต้องปรับการ render id
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'QUIZ TITLE', // เปลี่ยนเป็น QUIZ TITLE
      dataIndex: 'title', // ใช้ title แทน examTitle
      key: 'title',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'COURSE',
      dataIndex: 'course',
      key: 'course',
      className: 'text-gray-700',
    },
    {
      title: 'QUESTIONS',
      dataIndex: 'numQuestions', // ใช้ numQuestions
      key: 'numQuestions',
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'draft' | 'published') => ( // ใช้ status แบบ lowercase
        <Tag color={status === 'published' ? 'green' : 'blue'} className="rounded-full px-3 py-1 text-xs font-semibold">
          {status === 'published' ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}
        </Tag>
      ),
      className: 'text-center',
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('D MMMM YYYY, HH:mm'),
      className: 'text-gray-700',
    },
    {
      title: 'UPDATED AT',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('D MMMM YYYY, HH:mm'),
      className: 'text-gray-700',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_text: string, record: Quiz) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewQuiz(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          {/* *** เปลี่ยนเป็น Link ไปยัง manage/page.tsx สำหรับแก้ไข *** */}
          <Link href={`/admin/quiz/manage?id=${record.id}`}>
            <Button icon={<EditOutlined />} className="text-blue-500 border-none shadow-none hover:bg-blue-50" />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteQuiz(record.id)} // ใช้ record.id
            className="text-red-500 border-none shadow-none hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: 'evaluation',
      label: 'ส่วนประเมิน',
      children: (
        <>
          <div className="flex justify-between items-center mb-6 gap-25">
            <Input
              placeholder="Search Evaluation"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-80 rounded-lg shadow-sm table-search-input"
              value={searchTermEvaluation}
              onChange={(e) => setSearchTermEvaluation(e.target.value)}
            />
            <Button
              type="primary"
              onClick={handleAddEvaluation}
              icon={<PlusOutlined />}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
            >
              เพิ่มการประเมิน
            </Button>
          </div>
          <Table
            columns={evaluationColumns}
            dataSource={filteredEvaluations}
            className="rounded-xl shadow-custom-light"
            pagination={{ pageSize: 10 }}
            bordered={false}
          />
          {/* Modal for Add/Edit Evaluation */}
          <Modal
            title={editingEvaluation ? 'แก้ไขการประเมิน' : 'เพิ่มการประเมินใหม่'}
            open={isEvaluationModalVisible}
            onOk={handleEvaluationOk}
            onCancel={handleEvaluationCancel}
            className="rounded-xl"
            centered
          >
            <Form
              form={evaluationForm}
              layout="vertical"
              name="evaluation_form"
              className="p-4"
            >
              <Form.Item
                name="quizTitle"
                label={<span className="font-semibold text-gray-700">ชื่อ Quiz</span>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อ Quiz!' }]}
              >
                <Input placeholder="เช่น แบบทดสอบนวดแผนไทย" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="studentName"
                label={<span className="font-semibold text-gray-700">ชื่อนักเรียน</span>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อนักเรียน!' }]}
              >
                <Input placeholder="เช่น สมชาย ใจดี" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="score"
                label={<span className="font-semibold text-gray-700">คะแนน (%)</span>}
                rules={[{ required: true, message: 'กรุณากรอกคะแนน!', type: 'number', transform: (value) => Number(value) || 0 }]}
              >
                <Input type="number" placeholder="เช่น 85" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="dateTaken"
                label={<span className="font-semibold text-gray-700">วันที่ทำแบบทดสอบ</span>}
                rules={[{ required: true, message: 'กรุณาเลือกวันที่!' }]}
              >
                <DatePicker format="YYYY-MM-DD" className="w-full rounded-lg" />
              </Form.Item>
              <Form.Item
                name="status"
                label={<span className="font-semibold text-gray-700">สถานะ</span>}
                rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
              >
                <Select<EvaluationFormValues['status']> placeholder="เลือกสถานะ" className="rounded-lg">
                  <Option value="Passed">Passed</Option>
                  <Option value="Failed">Failed</Option>
                  <Option value="Pending">Pending</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
          {/* Modal for Viewing Evaluation Details */}
          <Modal
            title="รายละเอียดการประเมิน"
            open={isEvaluationDetailModalVisible}
            onCancel={handleEvaluationDetailModalCancel}
            footer={null}
            className="rounded-xl"
            centered
          >
            {viewingEvaluation ? (
              <div className="p-4">
                <p className="mb-2"><Text strong>ชื่อ Quiz:</Text> {viewingEvaluation.quizTitle}</p>
                <p className="mb-2"><Text strong>ชื่อนักเรียน:</Text> {viewingEvaluation.studentName}</p>
                <p className="mb-2"><Text strong>คะแนน:</Text> {viewingEvaluation.score}%</p>
                <p className="mb-2"><Text strong>วันที่ทำแบบทดสอบ:</Text> {viewingEvaluation.dateTaken}</p>
                <p className="mb-2"><Text strong>สถานะ:</Text> <Tag color={viewingEvaluation.status === 'Passed' ? 'green' : (viewingEvaluation.status === 'Failed' ? 'red' : 'blue')}>{viewingEvaluation.status}</Tag></p>
              </div>
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </Modal>
        </>
      ),
    },
    {
      key: 'quiz-management', // เปลี่ยน key และ label
      label: 'จัดการข้อสอบ',
      children: (
        <>
          <div className="flex justify-between items-center mb-6 gap-25">
            <Input
              placeholder="ค้นหาข้อสอบ"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-80 rounded-lg shadow-sm table-search-input"
              value={searchTermQuiz}
              onChange={(e) => setSearchTermQuiz(e.target.value)}
            />
            {/* *** เปลี่ยนเป็น Link ไปยัง manage/page.tsx สำหรับสร้างข้อสอบใหม่ *** */}
            <Link href="/admin/quiz/manage">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
              >
                สร้างข้อสอบใหม่
              </Button>
            </Link>
          </div>
          <Table
            columns={quizColumns} // ใช้ quizColumns
            dataSource={filteredQuizzes} // ใช้ filteredQuizzes
            rowKey="id" // ใช้ id เป็น rowKey
            className="rounded-xl shadow-custom-light"
            pagination={{ pageSize: 10 }}
            bordered={false}
          />
          {/* Modal for Viewing Quiz Details */}
          <Modal
            title="รายละเอียดข้อสอบ"
            open={isQuizDetailModalVisible}
            onCancel={handleQuizDetailModalCancel}
            footer={null}
            className="rounded-xl"
            centered
          >
            {viewingQuiz ? (
              <div className="p-4">
                <p className="mb-2"><Text strong>ชื่อข้อสอบ:</Text> {viewingQuiz.title}</p>
                <p className="mb-2"><Text strong>หลักสูตร:</Text> {viewingQuiz.course}</p>
                <p className="mb-2"><Text strong>จำนวนคำถาม:</Text> {viewingQuiz.numQuestions}</p>
                <p className="mb-2"><Text strong>สถานะ:</Text> <Tag color={viewingQuiz.status === 'published' ? 'green' : 'blue'}>{viewingQuiz.status === 'published' ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}</Tag></p>
                <p className="mb-2"><Text strong>สร้างเมื่อ:</Text> {dayjs(viewingQuiz.createdAt).format('D MMMM YYYY, HH:mm')}</p>
                <p className="mb-2"><Text strong>อัปเดตล่าสุด:</Text> {dayjs(viewingQuiz.updatedAt).format('D MMMM YYYY, HH:mm')}</p>
                {viewingQuiz.description && <p className="mb-2"><Text strong>คำอธิบาย:</Text> {viewingQuiz.description}</p>}

                {viewingQuiz.questions.length > 0 && (
                  <div className="mt-4">
                    <Text strong className="text-lg">รายการคำถาม:</Text>
                    <ul className="list-disc list-inside ml-4">
                      {viewingQuiz.questions.map((q, index) => (
                        <li key={q.id || index} className="mb-2">
                          <Text strong>{index + 1}. {q.questionText}</Text>
                          <ul className="list-circle list-inside ml-4">
                            {q.options.map(opt => (
                              <li key={opt.id} className={opt.id === q.correctOptionId ? 'text-green-600 font-medium' : ''}>
                                {opt.text} {opt.id === q.correctOptionId && <Text type="success">(Correct)</Text>}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {viewingQuiz.questions.length === 0 && (
                  <p className="text-gray-500 mt-4">ยังไม่มีคำถามสำหรับข้อสอบนี้</p>
                )}
              </div>
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Quiz Management</h1>
      <Tabs
        defaultActiveKey="evaluation"
        items={items}
        onChange={setActiveTab}
        activeKey={activeTab}
        className="rounded-xl shadow-custom-light bg-white p-4"
      />
    </>
  );
}
