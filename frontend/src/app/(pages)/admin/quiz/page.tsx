// src/app/(pages)/(admin)/quiz/page.tsx
"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Tabs, Table, Button, Space, Modal, Form, Input, message, Tag, Select, Typography, DatePicker, Breadcrumb, Card, Spin } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, DeleteOutlined, HomeOutlined, FileTextOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useQuizzes, useDeleteQuiz, useQuizAttempts, useDeleteQuizAttempt } from '@/hooks';

dayjs.locale('th');

const { Option } = Select;
const { Text, Title: AntdTitle } = Typography;


export default function QuizManagementPage() {
  const [activeTab, setActiveTab] = useState('evaluation');

  // --- State for Evaluation Tab ---
  const [isEvaluationDetailModalVisible, setIsEvaluationDetailModalVisible] = useState(false);
  const [viewingEvaluation, setViewingEvaluation] = useState<any>(null);
  const [searchTermEvaluation, setSearchTermEvaluation] = useState('');
  const [evaluationPage, setEvaluationPage] = useState(1);
  const [evaluationLimit, setEvaluationLimit] = useState(10);

  // Fetch quiz attempts from API
  const { data: attemptsData, isLoading: isLoadingAttempts, refetch: refetchAttempts } = useQuizAttempts({
    page: evaluationPage,
    limit: evaluationLimit,
    search: searchTermEvaluation
  });
  const { mutate: deleteAttempt } = useDeleteQuizAttempt();

  const attempts = attemptsData?.data || [];
  const totalAttempts = attemptsData?.pagination?.total || 0;

  // --- State for Quiz Management Tab ---
  const [isQuizDetailModalVisible, setIsQuizDetailModalVisible] = useState(false);
  const [viewingQuiz, setViewingQuiz] = useState<any>(null);
  const [searchTermQuiz, setSearchTermQuiz] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Fetch quizzes from API
  const { data: quizzesData, isLoading: quizzesLoading, refetch } = useQuizzes({
    page,
    limit,
    search: searchTermQuiz
  });
  const { mutate: deleteQuiz } = useDeleteQuiz();

  const quizzes = quizzesData?.data || [];
  const total = quizzesData?.pagination?.total || 0;

  // --- Evaluation Tab Handlers ---
  const handleDeleteEvaluation = (idToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลการประเมินนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        deleteAttempt(idToDelete, {
          onSuccess: () => {
            message.success('ลบข้อมูลการประเมินสำเร็จ!');
            refetchAttempts();
          },
          onError: () => {
            message.error('เกิดข้อผิดพลาดในการลบข้อมูลการประเมิน');
          },
        });
      },
    });
  };

  const handleViewEvaluation = (record: any) => {
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
        deleteQuiz(idToDelete, {
          onSuccess: () => {
            message.success('ลบข้อสอบเรียบร้อย!');
            refetch();
          },
          onError: () => {
            message.error('เกิดข้อผิดพลาดในการลบข้อสอบ');
          },
        });
      },
    });
  };

  const handleViewQuiz = (record: any) => {
    setViewingQuiz(record);
    setIsQuizDetailModalVisible(true); // Corrected: use setIsQuizDetailModalVisible
  };

  const handleQuizDetailModalCancel = () => {
    setIsQuizDetailModalVisible(false); // Corrected: use setIsQuizDetailModalVisible
    setViewingQuiz(null);
  };

  // --- Columns for Evaluation Tab ---
  const evaluationColumns = [
    {
      title: '#',
      render: (_: unknown, __: unknown, index: number) => (evaluationPage - 1) * evaluationLimit + index + 1,
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
      key: 'score',
      render: (record: any) => `${record.score}/${record.totalPoints} (${record.percentage}%)`,
      className: 'text-gray-700',
    },
    {
      title: 'DATE SUBMITTED',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-',
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
      render: (_text: string, record: any) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewEvaluation(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteEvaluation(record.id)}
            className="text-red-500 border-none shadow-none hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];

  // --- Columns for Quiz Management Tab ---
  const quizColumns = [
    {
      title: '#',
      render: (_: unknown, __: unknown, index: number) => (page - 1) * limit + index + 1,
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'QUIZ TITLE',
      dataIndex: 'title',
      key: 'title',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'COURSE',
      key: 'course',
      render: (record: any) => record.course?.name || '-',
      className: 'text-gray-700',
    },
    {
      title: 'BATCH',
      key: 'batch',
      render: (record: any) => record.batch ? `รุ่นที่ ${record.batch.batchNumber}` : 'ทุกรุ่น',
      className: 'text-gray-700',
    },
    {
      title: 'QUESTIONS',
      key: 'questions',
      render: (record: any) => record._count?.questions || 0,
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) => (
        <Tag color={isPublished ? 'green' : 'blue'} className="rounded-full px-3 py-1 text-xs font-semibold">
          {isPublished ? 'Published' : 'Draft'}
        </Tag>
      ),
      className: 'text-center',
    },
    {
      title: 'DUE DATE',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
      className: 'text-gray-700',
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
      className: 'text-gray-700',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_text: string, record: any) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewQuiz(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Link href={`/admin/quiz/manage?id=${record.id}`}>
            <Button icon={<EditOutlined />} className="text-blue-500 border-none shadow-none hover:bg-blue-50" />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteQuiz(record.id)}
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
        <Card className="rounded-xl shadow-custom-light p-4">
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Search Evaluation"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-80 rounded-lg shadow-sm table-search-input"
              value={searchTermEvaluation}
              onChange={(e) => setSearchTermEvaluation(e.target.value)}
            />
          </div>
          <Table
            columns={evaluationColumns}
            dataSource={attempts}
            loading={isLoadingAttempts}
            rowKey="id"
            className="rounded-xl shadow-custom-light"
            pagination={{
              current: evaluationPage,
              pageSize: evaluationLimit,
              total: totalAttempts,
              onChange: (page, pageSize) => {
                setEvaluationPage(page);
                setEvaluationLimit(pageSize);
              },
              showSizeChanger: true,
              showTotal: (total) => `ทั้งหมด ${total} รายการ`,
            }}
            bordered={false}
          />

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
                <p className="mb-2"><Text strong>อีเมล:</Text> {viewingEvaluation.studentEmail}</p>
                <p className="mb-2"><Text strong>คะแนน:</Text> {viewingEvaluation.score}/{viewingEvaluation.totalPoints} ({viewingEvaluation.percentage}%)</p>
                <p className="mb-2"><Text strong>วันที่เริ่มทำ:</Text> {viewingEvaluation.startedAt ? dayjs(viewingEvaluation.startedAt).format('DD/MM/YYYY HH:mm') : '-'}</p>
                <p className="mb-2"><Text strong>วันที่ส่ง:</Text> {viewingEvaluation.submittedAt ? dayjs(viewingEvaluation.submittedAt).format('DD/MM/YYYY HH:mm') : '-'}</p>
                <p className="mb-2"><Text strong>สถานะ:</Text> <Tag color={viewingEvaluation.status === 'Passed' ? 'green' : (viewingEvaluation.status === 'Failed' ? 'red' : 'blue')}>{viewingEvaluation.status}</Tag></p>
              </div>
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </Modal>
        </Card>
      ),
    },
    {
      key: 'quiz-management',
      label: 'จัดการข้อสอบ',
      children: (
        <Card className="rounded-xl shadow-custom-light p-4">
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="ค้นหาข้อสอบ"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-80 rounded-lg shadow-sm table-search-input"
              value={searchTermQuiz}
              onChange={(e) => setSearchTermQuiz(e.target.value)}
            />
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
            columns={quizColumns}
            dataSource={quizzes}
            rowKey="id"
            loading={quizzesLoading}
            className="rounded-xl shadow-custom-light"
            pagination={{
              current: page,
              pageSize: limit,
              total: total,
              onChange: (newPage) => setPage(newPage),
              showSizeChanger: false,
              showTotal: (total) => `ทั้งหมด ${total} รายการ`,
            }}
            bordered={false}
          />
          {/* Modal for Viewing Quiz Details */}
          <Modal
            title="รายละเอียดข้อสอบ"
            open={isQuizDetailModalVisible} // Corrected: use isQuizDetailModalVisible
            onCancel={handleQuizDetailModalCancel}
            footer={null}
            className="rounded-xl"
            centered
          >
            {viewingQuiz ? (
              <div className="p-4">
                <p className="mb-2"><Text strong>ชื่อข้อสอบ:</Text> {viewingQuiz.title}</p>
                <p className="mb-2"><Text strong>หลักสูตร:</Text> {viewingQuiz.course?.name || '-'}</p>
                <p className="mb-2"><Text strong>รุ่น:</Text> {viewingQuiz.batch ? `รุ่นที่ ${viewingQuiz.batch.batchNumber}` : 'ทุกรุ่น'}</p>
                <p className="mb-2"><Text strong>จำนวนคำถาม:</Text> {viewingQuiz._count?.questions || 0}</p>
                <p className="mb-2"><Text strong>ระยะเวลา:</Text> {viewingQuiz.duration} นาที</p>
                <p className="mb-2"><Text strong>คะแนนเต็ม:</Text> {viewingQuiz.totalPoints} คะแนน</p>
                <p className="mb-2"><Text strong>คะแนนผ่าน:</Text> {viewingQuiz.passingScore} คะแนน</p>
                <p className="mb-2"><Text strong>วันครบกำหนด:</Text> {dayjs(viewingQuiz.dueDate).format('DD/MM/YYYY HH:mm น.')}</p>
                <p className="mb-2"><Text strong>สถานะ:</Text> <Tag color={viewingQuiz.isPublished ? 'green' : 'blue'}>{viewingQuiz.isPublished ? 'Published' : 'Draft'}</Tag></p>
                <p className="mb-2"><Text strong>สร้างเมื่อ:</Text> {dayjs(viewingQuiz.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                <p className="mb-2"><Text strong>อัปเดตล่าสุด:</Text> {dayjs(viewingQuiz.updatedAt).format('DD/MM/YYYY HH:mm')}</p>
                {viewingQuiz.description && <p className="mb-2"><Text strong>คำอธิบาย:</Text> {viewingQuiz.description}</p>}

                {viewingQuiz.questions && viewingQuiz.questions.length > 0 && (
                  <div className="mt-4">
                    <Text strong className="text-lg">รายการคำถาม:</Text>
                    <ul className="list-disc list-inside ml-4">
                      {viewingQuiz.questions.map((q: any, index: number) => (
                        <li key={q.id || index} className="mb-2">
                          <Text strong>{index + 1}. {q.questionText}</Text>
                          {q.options && (
                            <ul className="list-circle list-inside ml-4">
                              {JSON.parse(q.options).map((opt: string, optIndex: number) => (
                                <li key={optIndex} className={opt === q.correctAnswer ? 'text-green-600 font-medium' : ''}>
                                  {opt} {opt === q.correctAnswer && <Text type="success">(Correct)</Text>}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(!viewingQuiz.questions || viewingQuiz.questions.length === 0) && (
                  <p className="text-gray-500 mt-4">ยังไม่มีคำถามสำหรับข้อสอบนี้</p>
                )}
              </div>
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </Modal>
        </Card>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <a href="/admin/dashboard"><HomeOutlined /> หน้าหลัก</a>,
    },
    {
      title: <><FileTextOutlined /> แบบทดสอบ</>,
    },
    {
      title: activeTab === 'evaluation' ? 'ส่วนประเมิน' : 'จัดการข้อสอบ',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6" items={breadcrumbItems} />

      <AntdTitle level={1} className="text-3xl font-bold mb-8 text-gray-800">Quiz Management</AntdTitle>

      <Tabs
        defaultActiveKey="evaluation"
        items={items}
        onChange={setActiveTab}
        activeKey={activeTab}
        className="rounded-xl shadow-custom-light bg-white"
      />
    </div>
  );
}