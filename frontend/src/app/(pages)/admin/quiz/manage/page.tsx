'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Card, Typography, message, Radio, Popconfirm, Row, Col, Breadcrumb, Select, Modal } from 'antd'; // Added Breadcrumb, Select, Modal
import { PlusOutlined, DeleteOutlined, SaveOutlined, ArrowLeftOutlined, EditOutlined, HomeOutlined, FileTextOutlined, AppstoreOutlined } from '@ant-design/icons'; // Added HomeOutlined, FileTextOutlined, AppstoreOutlined
import { v4 as uuidv4 } from 'uuid'; // สำหรับสร้าง unique ID
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

dayjs.locale('th'); // Set dayjs locale to Thai

const { Title: AntdTitle, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select; // Added Option for Select component in Modal


// --- Standardized Interfaces ---
interface Option {
  id: string; // ID ควรเป็น string เสมอ
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

// Interface สำหรับค่าในฟอร์มหลักของ Quiz
interface QuizFormValues {
  title: string;
  description: string;
  course: string; // เพิ่ม course เข้ามาในฟอร์ม
}

// Interface สำหรับค่าในฟอร์มของ Question
interface QuestionFormValues {
  id?: string;
  questionText: string;
  options: { id?: string; text: string }[]; // id อาจเป็น undefined ในจังหวะแรก
  correctOptionId: string;
}


export default function ManageQuizPage() {
  const [form] = Form.useForm<QuizFormValues>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get('id');

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false); // Track if we are editing an existing quiz

  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [currentQuestionForm] = Form.useForm<QuestionFormValues>();
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false); // State for question modal

  // Use Form.useWatch to get real-time options from the form
  // Type it as an array of objects that match the Form.List structure
  const currentOptions: { id?: string; text: string }[] | undefined = Form.useWatch('options', currentQuestionForm);

  useEffect(() => {
    const initializeQuiz = () => {
      if (quizId) {
        setIsEditMode(true);
        const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]') as Quiz[];
        const foundQuiz = storedQuizzes.find(q => q.id === quizId);
        if (foundQuiz) {
          setQuiz(foundQuiz);
          form.setFieldsValue({
            title: foundQuiz.title,
            description: foundQuiz.description,
            course: foundQuiz.course,
          });
        } else {
          message.error('ไม่พบข้อสอบที่ต้องการแก้ไข');
          router.push('/admin/quiz');
        }
      } else {
        setIsEditMode(false);
        const newQuiz: Quiz = {
          id: uuidv4(),
          title: '',
          description: '',
          course: '',
          numQuestions: 0,
          status: 'draft',
          questions: [],
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        };
        setQuiz(newQuiz);
        form.setFieldsValue({
          title: newQuiz.title,
          description: newQuiz.description,
          course: newQuiz.course,
        });
      }
      setLoading(false);
    };

    initializeQuiz();
  }, [quizId, form, router]);

  const handleQuizFormChange = (changedValues: Partial<QuizFormValues>, allValues: QuizFormValues) => {
    if (quiz) {
      setQuiz(prev => {
        if (!prev) return null;
        return {
          ...prev,
          title: allValues.title,
          description: allValues.description,
          course: allValues.course,
          updatedAt: dayjs().toISOString(),
        };
      });
    }
  };

  const handleAddQuestion = () => {
    setEditingQuestionIndex(null);
    currentQuestionForm.resetFields();
    const initialOptions = [{ id: uuidv4(), text: '' }, { id: uuidv4(), text: '' }];
    currentQuestionForm.setFieldsValue({
      questionText: '',
      options: initialOptions,
      correctOptionId: '',
    });
    setIsQuestionModalVisible(true); // Open modal for adding question
  };

  const handleEditQuestion = (index: number) => {
    setEditingQuestionIndex(index);
    if (quiz) {
      const questionToEdit = quiz.questions[index];
      currentQuestionForm.setFieldsValue(questionToEdit);
    }
    setIsQuestionModalVisible(true); // Open modal for editing question
  };

  const handleSaveQuestion = async () => {
    try {
      const values: QuestionFormValues = await currentQuestionForm.validateFields();

      // Ensure that all options have an ID before checking selectedOptionExists
      const optionsWithIds = values.options.map(opt => ({
        id: opt.id || uuidv4(), // Ensure ID is always present
        text: opt.text,
      }));

      const selectedOptionExists = optionsWithIds.some(opt => opt.id === values.correctOptionId);

      if (!selectedOptionExists) {
        message.error('กรุณาเลือกคำตอบที่ถูกต้องสำหรับคำถามนี้!');
        currentQuestionForm.setFields([
          {
            name: 'correctOptionId',
            errors: ['กรุณาเลือกคำตอบที่ถูกต้อง!'],
          },
        ]);
        return;
      }

      const newQuestion: Question = {
        id: values.id || uuidv4(),
        questionText: values.questionText,
        options: optionsWithIds, // Use optionsWithIds here
        correctOptionId: values.correctOptionId,
      };

      setQuiz(prev => {
        if (!prev) return null;
        const updatedQuestions = [...prev.questions];
        if (editingQuestionIndex !== null) {
          updatedQuestions[editingQuestionIndex] = newQuestion;
        } else {
          updatedQuestions.push(newQuestion);
        }
        return {
          ...prev,
          questions: updatedQuestions,
          numQuestions: updatedQuestions.length,
          updatedAt: dayjs().toISOString(),
        };
      });

      message.success('บันทึกคำถามเรียบร้อย!');
      currentQuestionForm.resetFields();
      setEditingQuestionIndex(null);
      setIsQuestionModalVisible(false); // Close modal after saving
    } catch (error) {
      console.error('Failed to save question (validation error):', error);
      message.error('กรุณากรอกข้อมูลคำถามให้ครบถ้วนและถูกต้อง');
    }
  };

  const handleCancelQuestionEdit = () => {
    currentQuestionForm.resetFields();
    setEditingQuestionIndex(null);
    setIsQuestionModalVisible(false); // Close modal on cancel
  };

  const handleRemoveQuestion = (index: number) => {
    setQuiz(prev => {
      if (!prev) return null;
      const updatedQuestions = prev.questions.filter((_, i) => i !== index);
      return {
        ...prev,
        questions: updatedQuestions,
        numQuestions: updatedQuestions.length,
        updatedAt: dayjs().toISOString(),
      };
    });
    message.success('ลบคำถามเรียบร้อย!');
    if (editingQuestionIndex === index) {
      currentQuestionForm.resetFields();
      setEditingQuestionIndex(null);
      setIsQuestionModalVisible(false); // Close modal if current editing question is deleted
    } else if (editingQuestionIndex !== null && editingQuestionIndex > index) {
      setEditingQuestionIndex(editingQuestionIndex - 1);
    }
  };

  const handleSaveQuiz = (status: 'draft' | 'published') => {
    form.validateFields()
      .then(values => { // Use values from main quiz form
        if (!quiz) {
          message.error('ข้อสอบยังไม่ถูกโหลดหรือสร้างขึ้น');
          return;
        }
        if (quiz.questions.length === 0) {
          message.error('กรุณาเพิ่มคำถามอย่างน้อย 1 ข้อ');
          return;
        }

        // Validate that correctOptionId is one of the available options for each question
        const invalidQuestions = quiz.questions.filter(q =>
          !q.options.some(opt => opt.id === q.correctOptionId)
        );

        if (invalidQuestions.length > 0) {
          message.error('คำถามบางข้อมีตัวเลือกที่ถูกต้องไม่ถูกต้อง กรุณาแก้ไข');
          return;
        }

        const now = dayjs().toISOString();
        const finalQuiz: Quiz = {
          ...quiz, // Take existing quiz data
          ...values, // Override with form values
          numQuestions: quiz.questions.length,
          status: status,
          createdAt: isEditMode ? quiz.createdAt : now, // Keep original createdAt if editing
          updatedAt: now,
        };

        const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]') as Quiz[];
        let updatedQuizzes: Quiz[];

        if (isEditMode) {
          updatedQuizzes = storedQuizzes.map(q => q.id === finalQuiz.id ? finalQuiz : q);
          message.success('แก้ไขข้อสอบเรียบร้อย!');
        } else {
          updatedQuizzes = [...storedQuizzes, finalQuiz];
          message.success('สร้างข้อสอบเรียบร้อย!');
        }
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        router.push('/admin/quiz'); // Redirect back to quiz list
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

  if (loading || !quiz) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text>กำลังโหลด...</Text>
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
              onValuesChange={handleQuizFormChange}
            >
              <Form.Item
                name="title"
                label={<span className="font-semibold text-gray-700">ชื่อข้อสอบ</span>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อข้อสอบ!' }]}
              >
                <Input placeholder="เช่น ข้อสอบนวดแผนไทยเบื้องต้น" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="course"
                label={<span className="font-semibold text-gray-700">หลักสูตร</span>}
                rules={[{ required: true, message: 'กรุณากรอกหลักสูตรที่เกี่ยวข้อง!' }]}
              >
                <Input placeholder="เช่น นวดแผนไทยเบื้องต้น" className="rounded-lg" />
              </Form.Item>
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
            {quiz.questions.length === 0 && (
              <div className="text-center text-gray-500 mb-4">ยังไม่มีคำถามในข้อสอบนี้</div>
            )}
            <Space direction="vertical" className="w-full" size="middle">
              {quiz.questions.map((q, index) => (
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
                  <Radio.Group value={q.correctOptionId} className="w-full mt-2">
                    {q.options.map(opt => (
                      <div key={opt.id} className="flex items-center mb-1">
                        <Radio value={opt.id} disabled className="mr-2" />
                        <Text className={opt.id === q.correctOptionId ? 'font-bold text-green-600' : ''}>
                          {opt.text}
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
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="questionText"
              label={<span className="font-semibold text-gray-700">คำถาม</span>}
              rules={[{ required: true, message: 'กรุณากรอกคำถาม!' }]}
            >
              <TextArea rows={2} placeholder="เช่น ข้อใดคือน้ำมันนวดที่นิยมใช้ในสปา?" className="rounded-lg" />
            </Form.Item>

            {/* Form.List for managing options (text input and delete button) */}
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  <AntdTitle level={5} className="text-gray-700 mb-4">ตัวเลือก</AntdTitle>
                  {fields.map(({ key, name }) => {
                    return (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" className="w-full">
                        {/* Hidden Form.Item for the option's actual ID */}
                        <Form.Item
                          name={[name, 'id']}
                          hidden
                          noStyle
                        >
                          <Input />
                        </Form.Item>

                        {/* Input for option text */}
                        <Form.Item
                          name={[name, 'text']}
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
                    );
                  })}
                  <Button
                    type="dashed"
                    onClick={() => add({ id: uuidv4(), text: '' })}
                    block
                    icon={<PlusOutlined />}
                    className="mt-4 rounded-lg text-green-500 border-green-500 hover:text-green-700 hover:border-green-700"
                  >
                    เพิ่มตัวเลือก
                  </Button>
                </>
              )}
            </Form.List>

            {/* Separate Form.Item for correctOptionId and Radio.Group */}
            {/* This Radio.Group will display options based on currentOptions watched from the form */}
            <Form.Item
              name="correctOptionId"
              label={<span className="font-semibold text-gray-700 mt-4">เลือกคำตอบที่ถูกต้อง</span>}
              rules={[{ required: true, message: 'กรุณาเลือกคำตอบที่ถูกต้อง!' }]}
            >
              <Radio.Group className="w-full">
                {/* Ensure currentOptions is not null before mapping */}
                {currentOptions && currentOptions.map((option, index) => {
                  // Ensure option.id is a string for key and value props
                  const radioValue = option.id || `temp-${index}`; // Fallback to a temporary string if ID is undefined
                  return (
                    <Radio key={radioValue} value={radioValue} className="block mb-2">
                      {/* Display option text as the label for the radio button */}
                      {option.text || `ตัวเลือก ${index + 1}`}
                    </Radio>
                  );
                })}
              </Radio.Group>
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
              onClick={() => handleSaveQuiz('draft')} // Save as draft
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
            >
              บันทึกฉบับร่าง
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => handleSaveQuiz('published')} // Publish
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
