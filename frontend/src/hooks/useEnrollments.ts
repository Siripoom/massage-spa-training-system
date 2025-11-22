/**
 * Custom Hook for Enrollment Management
 * Handles enrollment CRUD operations with React Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enrollmentService } from '@/services';
import type {
  Enrollment,
  PaginationParams,
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
} from '@/types/api';
import { message } from 'antd';

/**
 * Hook for fetching all enrollments with optional filters
 */
export const useEnrollments = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['enrollments', params],
    queryFn: () => enrollmentService.getAll(params),
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook for fetching a single enrollment by ID
 */
export const useEnrollment = (id: string | number) => {
  return useQuery({
    queryKey: ['enrollment', id],
    queryFn: () => enrollmentService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook for creating a new enrollment
 */
export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEnrollmentDto) => enrollmentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      message.success('เพิ่มข้อมูล Enrollment สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล Enrollment');
    },
  });
};

/**
 * Hook for updating an enrollment
 */
export const useUpdateEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdateEnrollmentDto }) =>
      enrollmentService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['enrollment', variables.id] });
      message.success('อัปเดตข้อมูล Enrollment สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล Enrollment');
    },
  });
};

/**
 * Hook for deleting an enrollment
 */
export const useDeleteEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => enrollmentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      message.success('ลบข้อมูล Enrollment สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการลบข้อมูล Enrollment');
    },
  });
};

/**
 * Hook for getting enrollments by user ID
 */
export const useEnrollmentsByUser = (userId: string | number, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['enrollments', 'user', userId, params],
    queryFn: () => enrollmentService.getByUserId(userId, params),
    enabled: !!userId,
  });
};

/**
 * Hook for getting enrollments by course ID
 */
export const useEnrollmentsByCourse = (courseId: string | number, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['enrollments', 'course', courseId, params],
    queryFn: () => enrollmentService.getByCourseId(courseId, params),
    enabled: !!courseId,
  });
};

/**
 * Hook for getting enrollments by batch ID
 */
export const useEnrollmentsByBatch = (batchId: string | number, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['enrollments', 'batch', batchId, params],
    queryFn: () => enrollmentService.getByBatchId(batchId, params),
    enabled: !!batchId,
  });
};
