'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Card, Typography, message, Radio, Popconfirm, Row, Col, Breadcrumb, Select, Modal, DatePicker, InputNumber, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, ArrowLeftOutlined, EditOutlined, HomeOutlined, FileTextOutlined, AppstoreOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useQuiz, useCreateQuiz, useUpdateQuiz, useCourses, useBatches } from '@/hooks';

dayjs.locale('th');

const { Title: AntdTitle, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// --- Interfaces ---
interface Question {
  id?: string;
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'ESSAY';
  options: string[];
  correctAnswer: string;
  points: number;
  order: number;
}

interface QuizFormValues {
  title: string;
  description: string;
  courseId: string;
  batchId: string | null;
  dueDate: dayjs.Dayjs;
  duration: number;
  totalPoints: number;
  passingScore: number;
  isPublished: boolean;
}


export default function ManageQuizPage() {
  const [form] = Form.useForm<QuizFormValues>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get('id');

  // Hooks
  const { data: quizData, isLoading: quizLoading } = useQuiz(quizId || '');
  const { data: coursesData } = useCourses({});
  const { data: batchesData } = useBatches({});
  const { mutate: createQuiz, isPending: isCreating } = useCreateQuiz();
  const { mutate: updateQuiz, isPending: isUpdating } = useUpdateQuiz();

  // State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [currentQuestionForm] = Form.useForm();
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);

  const currentOptions: { text: string }[] | undefined = Form.useWatch('options', currentQuestionForm);

  const courses = coursesData || [];
  const batches = batchesData || [];
  const isEditMode = !!quizId;
  const loading = quizLoading;

  // Load quiz data when editing
  useEffect(() => {
    if (quizId && quizData) {
      const quiz = quizData;
      form.setFieldsValue({
        title: quiz.title,
        description: quiz.description || '',
        courseId: quiz.courseId || '',
        batchId: quiz.batchId || null,
        dueDate: quiz.dueDate ? dayjs(quiz.dueDate) : dayjs().add(7, 'days'),
        duration: quiz.duration || 60,
        totalPoints: quiz.totalPoints || 100,
        passingScore: quiz.passingScore || 60,
        isPublished: quiz.isPublished || false,
      });

      // Load questions
      if (quiz.questions && Array.isArray(quiz.questions)) {
        const loadedQuestions: Question[] = quiz.questions.map((q: any, index: number) => ({
          id: q.id,
          questionText: q.questionText,
          questionType: q.questionType || 'MULTIPLE_CHOICE',
          options: Array.isArray(q.options) ? q.options : JSON.parse(q.options || '[]'),
          correctAnswer: q.correctAnswer,
          points: q.points || 10,
          order: q.order || index + 1,
        }));
        setQuestions(loadedQuestions);
      }
    } else if (!quizId) {
      // Initialize new quiz form
      form.setFieldsValue({
        title: '',
        description: '',
        courseId: '',
        batchId: null,
        dueDate: dayjs().add(7, 'days'),
        duration: 60,
        totalPoints: 100,
        passingScore: 60,
        isPublished: false,
      });
      setQuestions([]);
    }
  }, [quizId, quizData, form]);

  // Auto-calculate total points when questions change
  useEffect(() => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    form.setFieldValue('totalPoints', totalPoints || 100);
  }, [questions, form]);

  const handleAddQuestion = () => {
    setEditingQuestionIndex(null);
    currentQuestionForm.resetFields();
    currentQuestionForm.setFieldsValue({
      questionText: '',
      options: ['', ''],
      correctAnswer: '',
      points: 10,
    });
    setIsQuestionModalVisible(true);
  };

  const handleEditQuestion = (index: number) => {
    setEditingQuestionIndex(index);
    const questionToEdit = questions[index];
    currentQuestionForm.setFieldsValue({
      questionText: questionToEdit.questionText,
      options: questionToEdit.options,
      correctAnswer: questionToEdit.correctAnswer,
      points: questionToEdit.points,
    });
    setIsQuestionModalVisible(true);
  };

  const handleSaveQuestion = async () => {
    try {
      const values = await currentQuestionForm.validateFields();

      // Validate correct answer
      if (!values.options.includes(values.correctAnswer)) {
        message.error('กรุณาเลือกคำตอบที่ถูกต้องจากตัวเลือกที่มี!');
        return;
      }

      const newQuestion: Question = {
        id: editingQuestionIndex !== null ? questions[editingQuestionIndex].id : undefined,
        questionText: values.questionText,
        questionType: 'MULTIPLE_CHOICE',
        options: values.options.filter((opt: string) => opt.trim() !== ''),
        correctAnswer: values.correctAnswer,
        points: values.points || 10,
        order: editingQuestionIndex !== null ? questions[editingQuestionIndex].order : questions.length + 1,
      };

      const updatedQuestions = [...questions];
      if (editingQuestionIndex !== null) {
        updatedQuestions[editingQuestionIndex] = newQuestion;
      } else {
        updatedQuestions.push(newQuestion);
      }

      setQuestions(updatedQuestions);
      message.success('บันทึกคำถามเรียบร้อย!');
      currentQuestionForm.resetFields();
      setEditingQuestionIndex(null);
      setIsQuestionModalVisible(false);
    } catch (error) {
      console.error('Failed to save question:', error);
      message.error('กรุณากรอกข้อมูลคำถามให้ครบถ้วน');
    }
  };

  const handleCancelQuestionEdit = () => {
    currentQuestionForm.resetFields();
    setEditingQuestionIndex(null);
    setIsQuestionModalVisible(false);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    message.success('ลบคำถามเรียบร้อย!');

    if (editingQuestionIndex === index) {
      currentQuestionForm.resetFields();
      setEditingQuestionIndex(null);
      setIsQuestionModalVisible(false);
    } else if (editingQuestionIndex !== null && editingQuestionIndex > index) {
      setEditingQuestionIndex(editingQuestionIndex - 1);
    }
  };

  const handleSaveQuiz = (publishStatus: boolean) => {
    form.validateFields()
      .then(values => {
        if (questions.length === 0) {
          message.error('กรุณาเพิ่มคำถามอย่างน้อย 1 ข้อ');
          return;
        }

        // Calculate total points
        const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

        const quizData = {
          ...values,
          batchId: values.batchId || undefined,
          dueDate: values.dueDate.toISOString(),
          isPublished: publishStatus,
          totalPoints,
          questions: questions.map((q, index) => ({
            questionText: q.questionText,
            questionType: q.questionType,
            options: JSON.stringify(q.options),
            correctAnswer: q.correctAnswer,
            points: q.points,
            order: index + 1,
          })),
        };

        if (isEditMode && quizId) {
          updateQuiz({ id: quizId, data: quizData }, {
            onSuccess: () => {
              message.success('แก้ไขข้อสอบเรียบร้อย!');
              router.push('/admin/quiz');
            },
            onError: (error: any) => {
              message.error(error.response?.data?.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อสอบ');
            },
          });
        } else {
          console.log('Creating quiz with data:', quizData);
          createQuiz(quizData, {
            onSuccess: () => {
              message.success('สร้างข้อสอบเรียบร้อย!');
              router.push('/admin/quiz');
            },
            onError: (error: any) => {
              console.error('Error creating quiz:', error);
              console.error('Error response:', error.response?.data);
              const errorMsg = error.response?.data?.message || error.message || 'เกิดข้อผิดพลาดในการสร้างข้อสอบ';
              message.error(errorMsg);
            },
          });
        }
      })
      .catch(info => {
        message.error('กรุณากรอกข้อมูลข้อสอบให้ครบถ้วน');
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    router.push('/admin/quiz');
  };

  // Breadcrumb items
  const breadcrumbItems = [
    {
      title: <a href="/admin/dashboard"><HomeOutlined /> หน้าหลัก</a>,
    },
    {
      title: <a href="/admin/quiz"><FileTextOutlined /> แบบทดสอบ</a>,
    },
    {
      title: <a href="/admin/quiz?tab=quiz-management"><AppstoreOutlined /> จัดการข้อสอบ</a>,
    },
    {
      title: quizId ? 'แก้ไขข้อสอบ' : 'สร้างข้อสอบใหม่',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb className="mb-6" items={breadcrumbItems} />

      <AntdTitle level={1} className="text-3xl font-bold mb-8 text-gray-800">
        {quizId ? 'แก้ไขข้อสอบ' : 'สร้างข้อสอบใหม่'}
      </AntdTitle>

      {/* ใช้ Row และ Col เพื่อจัดระยะห่างระหว่าง Card และส่วนปุ่มสุดท้าย */}
      <Row gutter={[0, 24]}> {/* gutter={[horizontal, vertical]} */}
        <Col span={24}>
          <Card className="rounded-xl shadow-custom-light p-4">
            <AntdTitle level={4} className="text-gray-700 mb-6">ข้อมูลข้อสอบ</AntdTitle>
            <Form
              form={form}
              layout="vertical"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="title"
                    label={<span className="font-semibold text-gray-700">ชื่อข้อสอบ</span>}
                    rules={[{ required: true, message: 'กรุณากรอกชื่อข้อสอบ!' }]}
                  >
                    <Input placeholder="เช่น แบบทดสอบนวดแผนไทยเบื้องต้น" className="rounded-lg" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="courseId"
                    label={<span className="font-semibold text-gray-700">หลักสูตร</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกหลักสูตร!' }]}
                  >
                    <Select placeholder="เลือกหลักสูตร" className="rounded-lg">
                      {courses.map((course: any) => (
                        <Option key={course.id} value={course.id}>{course.title}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="batchId"
                    label={<span className="font-semibold text-gray-700">รุ่น (ถ้าไม่เลือกจะใช้กับทุกรุ่น)</span>}
                  >
                    <Select placeholder="เลือกรุ่น (ไม่บังคับ)" className="rounded-lg" allowClear>
                      {batches.map((batch: any) => (
                        <Option key={batch.id} value={batch.id}>รุ่นที่ {batch.batchNumber}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dueDate"
                    label={<span className="font-semibold text-gray-700">วันครบกำหนด</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกวันครบกำหนด!' }]}
                  >
                    <DatePicker
                      showTime
                      format="DD/MM/YYYY HH:mm"
                      className="w-full rounded-lg"
                      placeholder="เลือกวันและเวลา"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="duration"
                    label={<span className="font-semibold text-gray-700">ระยะเวลาทำข้อสอบ (นาที)</span>}
                    rules={[{ required: true, message: 'กรุณากรอกระยะเวลา!' }]}
                  >
                    <InputNumber min={1} placeholder="60" className="w-full rounded-lg" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="totalPoints"
                    label={<span className="font-semibold text-gray-700">คะแนนเต็ม</span>}
                    rules={[{ required: true, message: 'กรุณากรอกคะแนนเต็ม!' }]}
                  >
                    <InputNumber min={1} placeholder="100" className="w-full rounded-lg" disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="passingScore"
                    label={<span className="font-semibold text-gray-700">คะแนนผ่าน</span>}
                    rules={[{ required: true, message: 'กรุณากรอกคะแนนผ่าน!' }]}
                  >
                    <InputNumber min={1} placeholder="60" className="w-full rounded-lg" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="description"
                label={<span className="font-semibold text-gray-700">คำอธิบาย</span>}
              >
                <TextArea rows={3} placeholder="คำอธิบายข้อสอบ (ไม่บังคับ)" className="rounded-lg" />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={24}>
          <Card className="rounded-xl shadow-custom-light p-4">
            <AntdTitle level={4} className="text-gray-700 mb-6">รายการคำถาม</AntdTitle>
            {questions.length === 0 && (
              <div className="text-center text-gray-500 mb-4">ยังไม่มีคำถามในข้อสอบนี้</div>
            )}
            <Space direction="vertical" className="w-full" size="middle">
              {questions.map((q, index) => (
                <Card
                  key={q.id}
                  size="small"
                  className="rounded-lg border border-gray-200"
                  extra={
                    <Space>
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEditQuestion(index)}
                        className="text-blue-500 hover:text-blue-700"
                      />
                      <Popconfirm
                        title="ลบคำถาม"
                        description="คุณแน่ใจหรือไม่ที่จะลบคำถามนี้?"
                        onConfirm={() => handleRemoveQuestion(index)}
                        okText="ใช่"
                        cancelText="ไม่"
                      >
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          danger
                          className="text-red-500 hover:text-red-700"
                        />
                      </Popconfirm>
                    </Space>
                  }
                >
                  <Text strong>{index + 1}. {q.questionText}</Text>
                  <Radio.Group value={q.correctAnswer} className="w-full mt-2">
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center mb-1">
                        <Radio value={opt} disabled className="mr-2" />
                        <Text className={opt === q.correctAnswer ? 'font-bold text-green-600' : ''}>
                          {opt}
                        </Text>
                      </div>
                    ))}
                  </Radio.Group>
                </Card>
              ))}
            </Space>
            <Button
              type="dashed"
              onClick={handleAddQuestion}
              block
              icon={<PlusOutlined />}
              className="mt-6 rounded-lg text-blue-500 border-blue-500 hover:text-blue-700 hover:border-blue-700"
            >
              เพิ่มคำถามใหม่
            </Button>
          </Card>
        </Col>

        {/* Modal for Question Creation/Edit Form (moved out of direct render flow) */}
        <Modal
          title={editingQuestionIndex !== null ? 'แก้ไขคำถาม' : 'เพิ่มคำถาม'}
          open={isQuestionModalVisible}
          onOk={handleSaveQuestion}
          onCancel={handleCancelQuestionEdit}
          className="rounded-xl"
          centered
          width={700} // Adjust width as needed
        >
          <Form form={currentQuestionForm} layout="vertical" className="p-4">
            <Form.Item
              name="questionText"
              label={<span className="font-semibold text-gray-700">คำถาม</span>}
              rules={[{ required: true, message: 'กรุณากรอกคำถาม!' }]}
            >
              <TextArea rows={2} placeholder="เช่น ข้อใดคือน้ำมันนวดที่นิยมใช้ในสปา?" className="rounded-lg" />
            </Form.Item>

            <Form.Item
              name="points"
              label={<span className="font-semibold text-gray-700">คะแนน</span>}
              rules={[{ required: true, message: 'กรุณากรอกคะแนน!' }]}
            >
              <InputNumber min={1} placeholder="10" className="w-full rounded-lg" />
            </Form.Item>

            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  <AntdTitle level={5} className="text-gray-700 mb-4">ตัวเลือก</AntdTitle>
                  {fields.map(({ key, name }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" className="w-full">
                      <Form.Item
                        name={name}
                        rules={[{ required: true, message: 'กรุณากรอกตัวเลือก!' }]}
                        className="flex-grow"
                        noStyle
                      >
                        <Input
                          placeholder={`ตัวเลือก ${name + 1}`}
                          className="rounded-lg"
                        />
                      </Form.Item>

                      {fields.length > 2 && (
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        />
                      )}
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add('')}
                    block
                    icon={<PlusOutlined />}
                    className="mt-4 rounded-lg text-green-500 border-green-500 hover:text-green-700 hover:border-green-700"
                  >
                    เพิ่มตัวเลือก
                  </Button>
                </>
              )}
            </Form.List>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, curValues) => prevValues.options !== curValues.options}
            >
              {({ getFieldValue }) => {
                const opts = getFieldValue('options') || [];
                return (
                  <Form.Item
                    name="correctAnswer"
                    label={<span className="font-semibold text-gray-700 mt-4">เลือกคำตอบที่ถูกต้อง</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกคำตอบที่ถูกต้อง!' }]}
                  >
                    <Radio.Group className="w-full">
                      {opts.map((option: string, index: number) => (
                        <Radio key={index} value={option} className="block mb-2" disabled={!option || option.trim() === ''}>
                          {option || `ตัวเลือก ${index + 1}`}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Form>
        </Modal>

        {/* ปุ่มบันทึกและกลับ อยู่ใน Col แยก เพื่อให้ได้รับ gutter จาก Row หลัก */}
        <Col span={24}>
          <Space className="w-full justify-end">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleCancel}
              className="rounded-lg shadow-md px-6 py-3 text-base"
            >
              กลับ
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => handleSaveQuiz(false)} // Save as draft
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
            >
              บันทึกฉบับร่าง
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => handleSaveQuiz(true)} // Publish
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
            >
              เผยแพร่ข้อสอบ
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
