import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import quizAttemptService, {
  CreateQuizAttemptDTO,
  SubmitQuizAttemptDTO,
} from '@/services/quizAttempt.service';

// Query keys
export const QUIZ_ATTEMPT_KEYS = {
  all: ['quizAttempts'] as const,
  lists: () => [...QUIZ_ATTEMPT_KEYS.all, 'list'] as const,
  list: (params: any) => [...QUIZ_ATTEMPT_KEYS.lists(), params] as const,
  details: () => [...QUIZ_ATTEMPT_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...QUIZ_ATTEMPT_KEYS.details(), id] as const,
};

/**
 * Hook to fetch all quiz attempts
 */
export const useQuizAttempts = (params?: {
  page?: number;
  limit?: number;
  quizId?: string;
  userId?: string;
  enrollmentId?: string;
  isPassed?: boolean;
  search?: string;
}) => {
  return useQuery({
    queryKey: QUIZ_ATTEMPT_KEYS.list(params),
    queryFn: () => quizAttemptService.getAllQuizAttempts(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Hook to fetch quiz attempt by ID
 */
export const useQuizAttempt = (id: string) => {
  return useQuery({
    queryKey: QUIZ_ATTEMPT_KEYS.detail(id),
    queryFn: () => quizAttemptService.getQuizAttemptById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to create quiz attempt
 */
export const useCreateQuizAttempt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateQuizAttemptDTO) =>
      quizAttemptService.createQuizAttempt(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUIZ_ATTEMPT_KEYS.lists() });
    },
  });
};

/**
 * Hook to submit quiz attempt
 */
export const useSubmitQuizAttempt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubmitQuizAttemptDTO }) =>
      quizAttemptService.submitQuizAttempt(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUIZ_ATTEMPT_KEYS.lists() });
      queryClient.invalidateQueries({
        queryKey: QUIZ_ATTEMPT_KEYS.detail(variables.id),
      });
    },
  });
};

/**
 * Hook to delete quiz attempt
 */
export const useDeleteQuizAttempt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => quizAttemptService.deleteQuizAttempt(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUIZ_ATTEMPT_KEYS.lists() });
    },
  });
};
