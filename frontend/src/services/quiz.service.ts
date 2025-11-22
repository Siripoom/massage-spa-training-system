import axiosInstance from '@/lib/axios';
import { API_CONFIG } from '@/config/api.config';

export interface Quiz {
  id: string;
  title: string;
  course: string;
  batch: string;
  dueDate: string;
  duration: number;
  totalPoints: number;
  passingScore: number;
  students: number;
  questionsCount: number;
  attemptsCount: number;
  status: 'scheduled' | 'expired';
}

export interface QuizDetail extends Quiz {
  courseId: string;
  batchId?: string;
  description?: string;
  isPublished: boolean;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'ESSAY';
  options?: any;
  correctAnswer: string;
  points: number;
  order: number;
}

export interface CreateQuizDTO {
  courseId: string;
  batchId?: string;
  title: string;
  description?: string;
  dueDate: string;
  duration: number;
  totalPoints?: number;
  passingScore?: number;
  isPublished?: boolean;
  questions?: Omit<QuizQuestion, 'id'>[];
}

export interface UpdateQuizDTO {
  title?: string;
  description?: string;
  dueDate?: string;
  duration?: number;
  totalPoints?: number;
  passingScore?: number;
  isPublished?: boolean;
}

/**
 * Get upcoming quizzes
 */
export const getUpcomingQuizzes = async (limit?: number): Promise<Quiz[]> => {
  const params = limit ? { limit } : {};
  const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.QUIZZES.UPCOMING, { params });
  return response.data.data;
};

/**
 * Get all quizzes with pagination
 */
export const getAllQuizzes = async (params?: {
  page?: number;
  limit?: number;
  courseId?: string;
  batchId?: string;
  search?: string;
}) => {
  const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.QUIZZES.BASE, { params });
  return response.data;
};

/**
 * Get quiz by ID
 */
export const getQuizById = async (id: string): Promise<QuizDetail> => {
  const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.QUIZZES.BY_ID(id));
  return response.data.data;
};

/**
 * Create new quiz
 */
export const createQuiz = async (data: CreateQuizDTO) => {
  const response = await axiosInstance.post(API_CONFIG.ENDPOINTS.QUIZZES.BASE, data);
  return response.data;
};

/**
 * Update quiz
 */
export const updateQuiz = async (id: string, data: UpdateQuizDTO) => {
  const response = await axiosInstance.put(API_CONFIG.ENDPOINTS.QUIZZES.BY_ID(id), data);
  return response.data;
};

/**
 * Delete quiz
 */
export const deleteQuiz = async (id: string) => {
  const response = await axiosInstance.delete(API_CONFIG.ENDPOINTS.QUIZZES.BY_ID(id));
  return response.data;
};

const quizService = {
  getUpcomingQuizzes,
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};

export default quizService;
