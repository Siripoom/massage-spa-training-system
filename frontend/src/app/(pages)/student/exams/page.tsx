"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Card, Typography, Row, Col, Button, Progress, Badge, Empty, Space, message, Radio, Checkbox } from 'antd';
import { 
  FileTextOutlined, 
  ClockCircleOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  CalendarOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import '../dashboard/dashboard.css';

const { Title, Text } = Typography;

interface Question {
  id: string;
  type: 'multiple-choice' | 'multiple-select' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
}

interface Exam {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // minutes
  questions: Question[];
  passingScore: number;
  attempts: number;
  status: 'available' | 'in-progress' | 'completed' | 'locked';
  score?: number;
  completedAt?: string;
  deadline: string;
}

type AnswerValue = string | string[] | boolean;

const StudentExamsPage: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});

  // Mock exam data
  const mockExams: Exam[] = [
    {
      id: '1',
      courseId: '1',
      title: 'Swedish Massage Fundamentals Assessment',
      description: 'Comprehensive test covering basic Swedish massage techniques, anatomy, and safety protocols.',
      duration: 45,
      questions: [],
      passingScore: 80,
      attempts: 2,
      status: 'available',
      deadline: '2024-02-15'
    },
    {
      id: '2',
      courseId: '2',
      title: 'Anatomy & Physiology Quiz',
      description: 'Test your knowledge of human anatomy and physiological systems relevant to massage therapy.',
      duration: 30,
      questions: [],
      passingScore: 75,
      attempts: 3,
      status: 'completed',
      score: 85,
      completedAt: '2024-01-10',
      deadline: '2024-01-20'
    },
    {
      id: '3',
      courseId: '3',
      title: 'Deep Tissue Techniques Evaluation',
      description: 'Advanced assessment of deep tissue massage methods and contraindications.',
      duration: 60,
      questions: [],
      passingScore: 85,
      attempts: 1,
      status: 'locked',
      deadline: '2024-03-01'
    }
  ];

  // Mock questions for the exam
  const mockQuestions: Question[] = [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What is the primary benefit of Swedish massage?',
      options: [
        'Deep muscle therapy',
        'Relaxation and stress relief',
        'Joint manipulation',
        'Injury rehabilitation'
      ],
      correctAnswer: 'Relaxation and stress relief'
    },
    {
      id: '2',
      type: 'multiple-select',
      question: 'Which of the following are Swedish massage techniques? (Select all that apply)',
      options: [
        'Effleurage',
        'Petrissage',
        'Tapotement',
        'Deep tissue pressure'
      ],
      correctAnswer: ['Effleurage', 'Petrissage', 'Tapotement']
    },
    {
      id: '3',
      type: 'true-false',
      question: 'Swedish massage should always be performed with deep pressure.',
      options: ['True', 'False'],
      correctAnswer: 'False'
    }
  ];

  const handleSubmitExam = useCallback(() => {
    setExamStarted(false);
    setSelectedExam(null);
    message.success('Exam submitted successfully!');
    
    // Reset state
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(0);
  }, []);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, timeLeft, handleSubmitExam]);

  const startExam = (exam: Exam) => {
    setSelectedExam(exam);
    setExamStarted(true);
    setTimeLeft(exam.duration * 60); // Convert minutes to seconds
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'blue';
      case 'in-progress': return 'orange';
      case 'completed': return 'green';
      case 'locked': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'พร้อมสอบ';
      case 'in-progress': return 'กำลังสอบ';
      case 'completed': return 'สำเร็จแล้ว';
      case 'locked': return 'ล็อค';
      default: return status;
    }
  };

  const handleAnswerChange = (questionId: string, answer: AnswerValue) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const renderQuestion = (question: Question) => {
    const currentAnswer = answers[question.id];

    switch (question.type) {
      case 'multiple-choice':
        return (
          <Radio.Group
            value={currentAnswer as string}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {question.options?.map((option, index) => (
                <Radio key={index} value={option} style={{ padding: '8px 0' }}>
                  {option}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        );

      case 'multiple-select':
        return (
          <Checkbox.Group
            value={currentAnswer as string[]}
            onChange={(values) => handleAnswerChange(question.id, values)}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {question.options?.map((option, index) => (
                <Checkbox key={index} value={option} style={{ padding: '8px 0' }}>
                  {option}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        );

      case 'true-false':
        return (
          <Radio.Group
            value={currentAnswer as string}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Radio value="True" style={{ padding: '8px 0' }}>True</Radio>
              <Radio value="False" style={{ padding: '8px 0' }}>False</Radio>
            </Space>
          </Radio.Group>
        );

      default:
        return null;
    }
  };

  if (examStarted && selectedExam) {
    const currentQuestion = mockQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

    return (
      <div className="dashboard-container">
        {/* Exam Header */}
        <Card className="content-card" style={{ marginBottom: 24 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ margin: 0, color: '#5d4037' }}>
                {selectedExam.title}
              </Title>
              <Text type="secondary">
                คำถามที่ {currentQuestionIndex + 1} จาก {mockQuestions.length}
              </Text>
            </Col>
            <Col>
              <Space size="large">
                <div style={{ textAlign: 'center' }}>
                  <ClockCircleOutlined style={{ fontSize: 20, color: timeLeft < 300 ? '#ff4d4f' : '#1890ff' }} />
                  <div style={{ color: timeLeft < 300 ? '#ff4d4f' : '#1890ff', fontWeight: 'bold', fontSize: 16 }}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <Progress
                  type="circle"
                  size={60}
                  percent={Math.round(progress)}
                  format={() => `${currentQuestionIndex + 1}/${mockQuestions.length}`}
                />
              </Space>
            </Col>
          </Row>
          
          <Progress 
            percent={progress} 
            showInfo={false} 
            style={{ marginTop: 16 }}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </Card>

          {/* Question Card */}
          <Card className="content-card" style={{ marginBottom: 24 }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Title level={4} style={{ color: '#5d4037', marginBottom: 16 }}>
                  <QuestionCircleOutlined style={{ marginRight: 8 }} />
                  {currentQuestion.question}
                </Title>
              </div>

              <div style={{ padding: '16px 0', background: '#fafafa', borderRadius: 8, marginBottom: 16 }}>
                {renderQuestion(currentQuestion)}
              </div>

              {/* Navigation Buttons */}
              <Row justify="space-between" style={{ marginTop: 32 }}>
                <Col>
                  {currentQuestionIndex > 0 && (
                    <Button 
                      onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                      size="large"
                      style={{ minWidth: 120 }}
                    >
                      ก่อนหน้า
                    </Button>
                  )}
                </Col>
                <Col>
                  <Space>
                    {currentQuestionIndex < mockQuestions.length - 1 ? (
                      <Button 
                        type="primary" 
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        size="large"
                        disabled={!answers[currentQuestion.id]}
                        style={{ minWidth: 120 }}
                      >
                        ถัดไป
                      </Button>
                    ) : (
                      <Button 
                        type="primary" 
                        onClick={handleSubmitExam}
                        size="large"
                        disabled={!answers[currentQuestion.id]}
                        style={{ minWidth: 120, backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                      >
                        ส่งข้อสอบ
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </Space>
          </Card>

          {/* Question Navigation */}
          <Card className="content-card">
            <Title level={5} style={{ color: '#5d4037', marginBottom: 16 }}>
              การนำทางคำถาม
            </Title>
            <Space wrap size={[8, 8]}>
              {mockQuestions.map((_, index) => (
                <Button
                  key={index}
                  size="small"
                  type={index === currentQuestionIndex ? 'primary' : answers[mockQuestions[index].id] ? 'default' : 'dashed'}
                  onClick={() => setCurrentQuestionIndex(index)}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: answers[mockQuestions[index].id] && index !== currentQuestionIndex ? '#52c41a' : undefined,
                    borderColor: answers[mockQuestions[index].id] && index !== currentQuestionIndex ? '#52c41a' : undefined,
                    color: answers[mockQuestions[index].id] && index !== currentQuestionIndex ? 'white' : undefined
                  }}
                >
                  {index + 1}
                </Button>
              ))}
            </Space>
            <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
              <Space>
                <span>🔵 คำถามปัจจุบัน</span>
                <span>🟢 ตอบแล้ว</span>
                <span>⚪ ยังไม่ตอบ</span>
              </Space>
            </div>
          </Card>
        </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">แบบทดสอบของฉัน</h1>
          <p className="dashboard-subtitle">
            เข้าสอบเพื่อทดสอบความรู้และรับเกียรติบัตร
          </p>
          </div>
          <div>
            <Badge count={mockExams.filter(exam => exam.status === 'available').length} showZero>
              <FileTextOutlined style={{ fontSize: 24, color: '#5d4037' }} />
            </Badge>
          </div>
        </div>

        {/* Exam Statistics */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={8}>
            <Card className="content-card">
              <div style={{ textAlign: 'center' }}>
                <FileTextOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
                <div>
                  <Text type="secondary">แบบทดสอบทั้งหมด</Text>
                  <Title level={3} style={{ margin: '4px 0', color: '#5d4037' }}>{mockExams.length}</Title>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="content-card">
              <div style={{ textAlign: 'center' }}>
                <TrophyOutlined style={{ fontSize: 32, color: '#52c41a', marginBottom: 8 }} />
                <div>
                  <Text type="secondary">สำเร็จแล้ว</Text>
                  <Title level={3} style={{ margin: '4px 0', color: '#5d4037' }}>
                    {mockExams.filter(exam => exam.status === 'completed').length}
                  </Title>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="content-card">
              <div style={{ textAlign: 'center' }}>
                <ClockCircleOutlined style={{ fontSize: 32, color: '#fa8c16', marginBottom: 8 }} />
                <div>
                  <Text type="secondary">พร้อมสอบ</Text>
                  <Title level={3} style={{ margin: '4px 0', color: '#5d4037' }}>
                    {mockExams.filter(exam => exam.status === 'available').length}
                  </Title>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Exams List */}
        {mockExams.length === 0 ? (
          <Empty 
            image={<FileTextOutlined className="text-6xl text-gray-300" />}
            description={
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">ยังไม่มีแบบทดสอบ</p>
                <Text type="secondary">
                  เรียนหลักสูตรเพื่อเข้าสอบ
                </Text>
              </div>
            }
          />
        ) : (
          <Row gutter={[24, 24]}>
            {mockExams.map(exam => (
              <Col xs={24} lg={12} xl={8} key={exam.id}>
                <Card
                  className="content-card"
                  style={{ height: '100%' }}
                  cover={
                    <div style={{ 
                      height: 180, 
                      background: `linear-gradient(135deg, ${
                        exam.status === 'completed' ? '#52c41a, #73d13d' : 
                        exam.status === 'available' ? '#1890ff, #40a9ff' : 
                        exam.status === 'in-progress' ? '#faad14, #ffc53d' : 
                        '#d9d9d9, #f0f0f0'
                      })`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      position: 'relative',
                      borderRadius: '8px 8px 0 0'
                    }}>
                      <FileTextOutlined style={{ fontSize: 48, opacity: 0.8 }} />
                      <div style={{ position: 'absolute', top: 12, right: 12 }}>
                        <Badge 
                          color={getStatusColor(exam.status)} 
                          text={getStatusText(exam.status)}
                          style={{ 
                            background: 'rgba(255,255,255,0.95)', 
                            padding: '4px 8px', 
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 500,
                            color: '#333'
                          }}
                        />
                      </div>
                    </div>
                  }
                  actions={[
                    exam.status === 'available' ? (
                      <Button 
                        type="primary" 
                        className="dashboard-action-btn"
                        icon={<PlayCircleOutlined />}
                        onClick={() => startExam(exam)}
                        size="large"
                        style={{ width: '90%' }}
                      >
                        เริ่มทำข้อสอบ
                      </Button>
                    ) : exam.status === 'completed' ? (
                      <Button 
                        type="default"
                        disabled
                        style={{ width: '90%' }}
                      >
                        สำเร็จแล้ว ({exam.score}%)
                      </Button>
                    ) : (
                      <Button 
                        type="default"
                        disabled
                        style={{ width: '90%' }}
                      >
                        {getStatusText(exam.status)}
                      </Button>
                    )
                  ]}
                >
                  <Card.Meta
                    title={
                      <Title level={4} style={{ margin: 0, color: '#5d4037', marginBottom: 8 }}>
                        {exam.title}
                      </Title>
                    }
                    description={
                      <div>
                        <Text type="secondary" style={{ fontSize: 14, lineHeight: 1.5, display: 'block', marginBottom: 16 }}>
                          {exam.description}
                        </Text>

                        <Space direction="vertical" style={{ width: '100%' }} size="middle">
                          <Row gutter={[16, 8]}>
                            <Col span={24}>
                              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 13 }}>
                                  <ClockCircleOutlined style={{ marginRight: 4, color: '#666' }} />
                                  {exam.duration} นาที
                                </Text>
                                <Text style={{ fontSize: 13 }}>
                                  <TrophyOutlined style={{ marginRight: 4, color: '#666' }} />
                                  {exam.passingScore}% ผ่าน
                                </Text>
                              </Space>
                            </Col>
                            <Col span={24}>
                              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 13 }}>
                                  <CalendarOutlined style={{ marginRight: 4, color: '#666' }} />
                                  {exam.deadline}
                                </Text>
                                <Text style={{ fontSize: 13 }}>
                                  ครั้งที่: {exam.attempts}
                                </Text>
                              </Space>
                            </Col>
                          </Row>

                          {exam.status === 'completed' && exam.score && (
                            <Progress 
                              percent={exam.score} 
                              format={(percent) => `${percent || 0}%`}
                              strokeColor={exam.score >= exam.passingScore ? '#52c41a' : '#ff4d4f'}
                              style={{ marginTop: 8 }}
                            />
                          )}
                        </Space>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
  );
};

export default StudentExamsPage;
