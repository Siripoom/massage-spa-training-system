"use client";

import React, { useState, useCallback, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, Typography, Row, Col, Button, Progress, Badge, Empty, Space, message, Radio, Checkbox } from 'antd';
import { 
  FileTextOutlined, 
  ClockCircleOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  CalendarOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
import '@ant-design/v5-patch-for-react-19';

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
      case 'available': return 'Available';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'locked': return 'Locked';
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
      <AppLayout userRole="student">
        <div style={{ padding: '24px' }}>
          {/* Exam Header */}
          <Card style={{ marginBottom: '24px' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={3} style={{ margin: 0 }}>
                  {selectedExam.title}
                </Title>
                <Text type="secondary">
                  Question {currentQuestionIndex + 1} of {mockQuestions.length}
                </Text>
              </Col>
              <Col>
                <Space align="center">
                  <ClockCircleOutlined />
                  <Text strong style={{ fontSize: '18px', color: timeLeft < 300 ? '#ff4d4f' : '#1890ff' }}>
                    {formatTime(timeLeft)}
                  </Text>
                </Space>
              </Col>
            </Row>
            
            <Progress 
              percent={progress} 
              showInfo={false} 
              style={{ marginTop: '16px' }}
            />
          </Card>

          {/* Question Card */}
          <Card>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Title level={4}>
                  <QuestionCircleOutlined style={{ marginRight: '8px' }} />
                  {currentQuestion.question}
                </Title>
              </div>

              <div style={{ padding: '16px 0' }}>
                {renderQuestion(currentQuestion)}
              </div>

              {/* Navigation Buttons */}
              <Row justify="space-between" style={{ marginTop: '24px' }}>
                <Col>
                  {currentQuestionIndex > 0 && (
                    <Button 
                      onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                      size="large"
                    >
                      Previous
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
                      >
                        Next
                      </Button>
                    ) : (
                      <Button 
                        type="primary" 
                        onClick={handleSubmitExam}
                        size="large"
                        disabled={!answers[currentQuestion.id]}
                      >
                        Submit Exam
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </Space>
          </Card>

          {/* Question Navigation */}
          <Card style={{ marginTop: '24px' }}>
            <Title level={5}>Question Navigation</Title>
            <Space wrap>
              {mockQuestions.map((_, index) => (
                <Button
                  key={index}
                  size="small"
                  type={index === currentQuestionIndex ? 'primary' : answers[mockQuestions[index].id] ? 'default' : 'dashed'}
                  onClick={() => setCurrentQuestionIndex(index)}
                  style={{
                    backgroundColor: answers[mockQuestions[index].id] && index !== currentQuestionIndex ? '#52c41a' : undefined,
                    borderColor: answers[mockQuestions[index].id] && index !== currentQuestionIndex ? '#52c41a' : undefined,
                    color: answers[mockQuestions[index].id] && index !== currentQuestionIndex ? 'white' : undefined
                  }}
                >
                  {index + 1}
                </Button>
              ))}
            </Space>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout userRole="student">
      <div style={{ padding: '24px' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col>
            <Title level={2}>Student Exams</Title>
            <Text type="secondary">Take exams to test your knowledge and earn certificates</Text>
          </Col>
        </Row>

        {/* Exam Statistics */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <FileTextOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '8px' }} />
                <div>
                  <Text type="secondary">Total Exams</Text>
                  <Title level={3} style={{ margin: '4px 0' }}>{mockExams.length}</Title>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <TrophyOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '8px' }} />
                <div>
                  <Text type="secondary">Completed</Text>
                  <Title level={3} style={{ margin: '4px 0' }}>
                    {mockExams.filter(exam => exam.status === 'completed').length}
                  </Title>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <ClockCircleOutlined style={{ fontSize: '32px', color: '#fa8c16', marginBottom: '8px' }} />
                <div>
                  <Text type="secondary">Available</Text>
                  <Title level={3} style={{ margin: '4px 0' }}>
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
            description="No exams available"
            style={{ marginTop: '48px' }}
          />
        ) : (
          <Row gutter={[16, 16]}>
            {mockExams.map(exam => (
              <Col xs={24} lg={12} xl={8} key={exam.id}>
                <Card
                  hoverable
                  style={{ height: '100%' }}
                  actions={[
                    exam.status === 'available' ? (
                      <Button 
                        type="primary" 
                        icon={<PlayCircleOutlined />}
                        onClick={() => startExam(exam)}
                        size="large"
                      >
                        Start Exam
                      </Button>
                    ) : exam.status === 'completed' ? (
                      <Button 
                        type="default"
                        disabled
                      >
                        Completed ({exam.score}%)
                      </Button>
                    ) : (
                      <Button 
                        type="default"
                        disabled
                      >
                        {getStatusText(exam.status)}
                      </Button>
                    )
                  ]}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <Title level={4} style={{ margin: 0 }}>
                        {exam.title}
                      </Title>
                      <Badge 
                        color={getStatusColor(exam.status)} 
                        text={getStatusText(exam.status)}
                      />
                    </div>
                    <Text type="secondary">{exam.description}</Text>
                  </div>

                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text><ClockCircleOutlined /> {exam.duration} minutes</Text>
                      <Text><TrophyOutlined /> {exam.passingScore}% to pass</Text>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text><CalendarOutlined /> Due: {exam.deadline}</Text>
                      <Text>Attempts: {exam.attempts}</Text>
                    </div>

                    {exam.status === 'completed' && exam.score && (
                      <Progress 
                        percent={exam.score} 
                        format={(percent) => `${percent || 0}%`}
                        strokeColor={exam.score >= exam.passingScore ? '#52c41a' : '#ff4d4f'}
                      />
                    )}
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </AppLayout>
  );
};

export default StudentExamsPage;
