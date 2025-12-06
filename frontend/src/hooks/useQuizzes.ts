import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import quizService, { CreateQuizDTO, UpdateQuizDTO } from '@/services/quiz.service';

// Query keys
export const QUIZ_KEYS = {
  all: ['quizzes'] as const,
  upcoming: () => [...QUIZ_KEYS.all, 'upcoming'] as const,
  lists: () => [...QUIZ_KEYS.all, 'list'] as const,
  list: (params: any) => [...QUIZ_KEYS.lists(), params] as const,
  details: () => [...QUIZ_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...QUIZ_KEYS.details(), id] as const,
};

/**
 * Hook to fetch upcoming quizzes
 */
export const useUpcomingQuizzes = (limit?: number) => {
  return useQuery({
    queryKey: QUIZ_KEYS.upcoming(),
    queryFn: () => quizService.getUpcomingQuizzes(limit),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

/**
 * Hook to fetch all quizzes with pagination
 */
export const useQuizzes = (params?: {
  page?: number;
  limit?: number;
  courseId?: string;
  batchId?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: QUIZ_KEYS.list(params),
    queryFn: () => quizService.getAllQuizzes(params),
    staleTime: 1000 * 60, // 1 minute
  });
};

/**
 * Hook to fetch quiz by ID
 */
export const useQuiz = (id: string) => {
  return useQuery({
    queryKey: QUIZ_KEYS.detail(id),
    queryFn: () => quizService.getQuizById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a new quiz
 */
export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateQuizDTO) => quizService.createQuiz(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.all });
    },
  });
};

/**
 * Hook to update a quiz
 */
export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateQuizDTO }) =>
      quizService.updateQuiz(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.all });
      queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.detail(variables.id) });
    },
  });
};

/**
 * Hook to delete a quiz
 */
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => quizService.deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.all });
    },
  });
};

const useQuizzesHooks = {
  useUpcomingQuizzes,
  useQuizzes,
  useQuiz,
  useCreateQuiz,
  useUpdateQuiz,
  useDeleteQuiz,
};

export default useQuizzesHooks;
