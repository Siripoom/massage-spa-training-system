// src/app/(pages)/(admin)/quiz/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Tabs, Table, Button, Space, Modal, Form, Input, message, Tag, Select, Typography, DatePicker } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { Text } = Typography;

// --- Interfaces for Evaluation Tab ---
interface Evaluation {
  key: string;
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

// --- Interfaces for Create Exam Tab ---
interface ExamQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface Exam {
  key: string;
  examTitle: string;
  course: string;
  numQuestions: number;
  status: 'Draft' | 'Published';
  questions: ExamQuestion[]; // Store questions within the exam
}

interface ExamFormValues {
  examTitle: string;
  course: string;
  numQuestions: number;
  status: 'Draft' | 'Published';
}


export default function QuizPage() {
  // *** แก้ไข: ใช้ activeTab เป็น activeKey ของ Tabs component ***
  const [activeTab, setActiveTab] = useState('evaluation'); // State สำหรับควบคุม Tab ที่ Active

  // --- State for Evaluation Tab ---
  const [isEvaluationModalVisible, setIsEvaluationModalVisible] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [evaluationForm] = Form.useForm<EvaluationFormValues>();
  const [isEvaluationDetailModalVisible, setIsEvaluationDetailModalVisible] = useState(false);
  const [viewingEvaluation, setViewingEvaluation] = useState<Evaluation | null>(null);

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
      status: 'Pending', // สมมติว่ายังไม่ตรวจ
    },
  ]);

  // --- State for Create Exam Tab ---
  const [isExamModalVisible, setIsExamModalVisible] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [examForm] = Form.useForm<ExamFormValues>();
  const [isExamDetailModalVisible, setIsExamDetailModalVisible] = useState(false);
  const [viewingExam, setViewingExam] = useState<Exam | null>(null);

  const [exams, setExams] = useState<Exam[]>([
    {
      key: '1',
      examTitle: 'แบบทดสอบบทที่ 1: พื้นฐานนวด',
      course: 'นวดแผนไทยเบื้องต้น',
      numQuestions: 10,
      status: 'Published',
      questions: [
        { id: 'q1', questionText: 'ข้อใดคือท่าพื้นฐานการนวดไทย?', options: ['กดจุด', 'คลึง', 'ยืด', 'ถูกทุกข้อ'], correctAnswer: 'ถูกทุกข้อ' }
      ]
    },
    {
      key: '2',
      examTitle: 'แบบทดสอบกลางภาค: สปา',
      course: 'สปาเพื่อสุขภาพ',
      numQuestions: 20,
      status: 'Draft',
      questions: []
    },
  ]);

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

  // --- Create Exam Tab Handlers ---
  const handleAddExam = () => {
    setEditingExam(null);
    examForm.resetFields();
    setIsExamModalVisible(true);
  };

  const handleEditExam = (record: Exam) => {
    setEditingExam(record);
    examForm.setFieldsValue(record);
    setIsExamModalVisible(true);
  };

  const handleDeleteExam = (keyToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อสอบนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setExams(prevExams => prevExams.filter(exam => exam.key !== keyToDelete));
        message.success('ลบข้อสอบสำเร็จ!');
      },
    });
  };

  const handleExamOk = () => {
    examForm.validateFields()
      .then((values: ExamFormValues) => {
        if (editingExam) {
          setExams(prevExams =>
            prevExams.map(exam =>
              exam.key === editingExam.key ? { ...exam, ...values } : exam
            )
          );
          message.success('อัปเดตข้อสอบสำเร็จ!');
        } else {
          const newExam: Exam = {
            key: (exams.length + 1).toString(),
            ...values,
            questions: [], // ข้อสอบใหม่เริ่มต้นด้วยคำถามว่างเปล่า
          };
          setExams(prevExams => [...prevExams, newExam]);
          message.success('เพิ่มข้อสอบสำเร็จ!');
        }
        setIsExamModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleExamCancel = () => {
    setIsExamModalVisible(false);
  };

  const handleViewExam = (record: Exam) => {
    setViewingExam(record);
    setIsExamDetailModalVisible(true);
  };

  const handleExamDetailModalCancel = () => {
    setIsExamDetailModalVisible(false);
    setViewingExam(null);
  };


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

  // --- Columns for Create Exam Tab ---
  const examColumns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text: string) => parseInt(text),
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'EXAM TITLE',
      dataIndex: 'examTitle',
      key: 'examTitle',
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
      dataIndex: 'numQuestions',
      key: 'numQuestions',
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'Draft' | 'Published') => (
        <Tag color={status === 'Published' ? 'green' : 'blue'} className="rounded-full px-3 py-1 text-xs font-semibold">
          {status}
        </Tag>
      ),
      className: 'text-center',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_text: string, record: Exam) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewExam(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button icon={<EditOutlined />} onClick={() => handleEditExam(record)} className="text-blue-500 border-none shadow-none hover:bg-blue-50" />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteExam(record.key)}
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
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Search Evaluation"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-80 rounded-lg shadow-sm table-search-input"
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
            dataSource={evaluations}
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
      key: 'create-exam',
      label: 'ส่วนสร้างข้อสอบ',
      children: (
        <>
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Search Exam"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-80 rounded-lg shadow-sm table-search-input"
            />
            <Button
              type="primary"
              onClick={handleAddExam}
              icon={<PlusOutlined />}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
            >
              สร้างข้อสอบใหม่
            </Button>
          </div>
          <Table
            columns={examColumns}
            dataSource={exams}
            className="rounded-xl shadow-custom-light"
            pagination={{ pageSize: 10 }}
            bordered={false}
          />
          {/* Modal for Add/Edit Exam */}
          <Modal
            title={editingExam ? 'แก้ไขข้อสอบ' : 'สร้างข้อสอบใหม่'}
            open={isExamModalVisible}
            onOk={handleExamOk}
            onCancel={handleExamCancel}
            className="rounded-xl"
            centered
          >
            <Form
              form={examForm}
              layout="vertical"
              name="exam_form"
              className="p-4"
            >
              <Form.Item
                name="examTitle"
                label={<span className="font-semibold text-gray-700">ชื่อข้อสอบ</span>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อข้อสอบ!' }]}
              >
                <Input placeholder="เช่น แบบทดสอบกลางภาค" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="course"
                label={<span className="font-semibold text-gray-700">หลักสูตร</span>}
                rules={[{ required: true, message: 'กรุณากรอกหลักสูตรที่เกี่ยวข้อง!' }]}
              >
                <Input placeholder="เช่น สปาเพื่อสุขภาพ" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="numQuestions"
                label={<span className="font-semibold text-gray-700">จำนวนคำถาม</span>}
                rules={[{ required: true, message: 'กรุณากรอกจำนวนคำถาม!', type: 'number', transform: (value) => Number(value) || 0 }]}
              >
                <Input type="number" placeholder="เช่น 20" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="status"
                label={<span className="font-semibold text-gray-700">สถานะ</span>}
                rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
              >
                <Select<ExamFormValues['status']> placeholder="เลือกสถานะ" className="rounded-lg">
                  <Option value="Draft">Draft</Option>
                  <Option value="Published">Published</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
          {/* Modal for Viewing Exam Details */}
          <Modal
            title="รายละเอียดข้อสอบ"
            open={isExamDetailModalVisible}
            onCancel={handleExamDetailModalCancel}
            footer={null}
            className="rounded-xl"
            centered
          >
            {viewingExam ? (
              <div className="p-4">
                <p className="mb-2"><Text strong>ชื่อข้อสอบ:</Text> {viewingExam.examTitle}</p>
                <p className="mb-2"><Text strong>หลักสูตร:</Text> {viewingExam.course}</p>
                <p className="mb-2"><Text strong>จำนวนคำถาม:</Text> {viewingExam.numQuestions}</p>
                <p className="mb-2"><Text strong>สถานะ:</Text> <Tag color={viewingExam.status === 'Published' ? 'green' : 'blue'}>{viewingExam.status}</Tag></p>
                {/* สามารถแสดงรายการคำถามได้ที่นี่ในอนาคต */}
                {viewingExam.questions.length > 0 && (
                  <div className="mt-4">
                    <Text strong>คำถาม:</Text>
                    <ul>
                      {viewingExam.questions.map((q, index) => (
                        <li key={q.id || index}>{index + 1}. {q.questionText}</li>
                      ))}
                    </ul>
                  </div>
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
        activeKey={activeTab} // *** แก้ไข: เพิ่ม activeKey prop เพื่อใช้งาน activeTab ***
        className="rounded-xl shadow-custom-light bg-white p-4"
      />
    </>
  );
}
