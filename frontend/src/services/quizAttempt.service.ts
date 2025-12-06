import axiosInstance from '@/lib/axios';
import { API_CONFIG } from '@/config/api.config';

export interface QuizAttempt {
  id: string;
  quizTitle: string;
  studentName: string;
  studentEmail: string;
  score: number;
  totalPoints: number;
  percentage: number;
  isPassed: boolean;
  startedAt: string;
  submittedAt: string | null;
  status: 'Passed' | 'Failed' | 'Pending';
}

export interface QuizAttemptDetail extends QuizAttempt {
  answers: any;
  questions: any[];
}

export interface CreateQuizAttemptDTO {
  quizId: string;
  userId: string;
  enrollmentId: string;
}

export interface SubmitQuizAttemptDTO {
  answers: Record<string, string>;
}

/**
 * Get all quiz attempts with pagination
 */
export const getAllQuizAttempts = async (params?: {
  page?: number;
  limit?: number;
  quizId?: string;
  userId?: string;
  enrollmentId?: string;
  isPassed?: boolean;
  search?: string;
}) => {
  const response = await axiosInstance.get('/quiz-attempts', { params });
  return response.data;
};

/**
 * Get quiz attempt by ID
 */
export const getQuizAttemptById = async (id: string): Promise<QuizAttemptDetail> => {
  const response = await axiosInstance.get(`/quiz-attempts/${id}`);
  return response.data.data;
};

/**
 * Create quiz attempt (start quiz)
 */
export const createQuizAttempt = async (data: CreateQuizAttemptDTO) => {
  const response = await axiosInstance.post('/quiz-attempts', data);
  return response.data;
};

/**
 * Submit quiz attempt
 */
export const submitQuizAttempt = async (id: string, data: SubmitQuizAttemptDTO) => {
  const response = await axiosInstance.put(`/quiz-attempts/${id}/submit`, data);
  return response.data;
};

/**
 * Delete quiz attempt
 */
export const deleteQuizAttempt = async (id: string) => {
  const response = await axiosInstance.delete(`/quiz-attempts/${id}`);
  return response.data;
};

const quizAttemptService = {
  getAllQuizAttempts,
  getQuizAttemptById,
  createQuizAttempt,
  submitQuizAttempt,
  deleteQuizAttempt,
};

export default quizAttemptService;
