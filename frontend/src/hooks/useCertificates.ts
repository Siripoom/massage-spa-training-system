/**
 * Custom Hooks for Certificate Management
 * Handles certificate CRUD operations with React Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { certificateService } from '@/services';
import type {
  Certificate,
  PaginationParams,
  CreateCertificateDto,
  UpdateCertificateDto,
} from '@/types/api';
import { message } from 'antd';

/**
 * Hook for fetching all certificates with optional filters
 */
export const useCertificates = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['certificates', params],
    queryFn: () => certificateService.getAll(params),
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook for fetching a single certificate by ID
 */
export const useCertificate = (id: string | number) => {
  return useQuery({
    queryKey: ['certificate', id],
    queryFn: () => certificateService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook for creating a new certificate
 */
export const useCreateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCertificateDto) => certificateService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      message.success('ออก Certificate สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการออก Certificate');
    },
  });
};

/**
 * Hook for updating a certificate
 */
export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdateCertificateDto }) =>
      certificateService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['certificate', variables.id] });
      message.success('อัปเดต Certificate สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการอัปเดต Certificate');
    },
  });
};

/**
 * Hook for deleting a certificate
 */
export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => certificateService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      message.success('ยกเลิก Certificate สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการยกเลิก Certificate');
    },
  });
};

/**
 * Hook for getting certificates by user ID
 */
export const useCertificatesByUser = (userId: string | number, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['certificates', 'user', userId, params],
    queryFn: () => certificateService.getByUserId(userId, params),
    enabled: !!userId,
  });
};

/**
 * Hook for getting certificates by course ID
 */
export const useCertificatesByCourse = (courseId: string | number, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['certificates', 'course', courseId, params],
    queryFn: () => certificateService.getByCourseId(courseId, params),
    enabled: !!courseId,
  });
};

/**
 * Hook for getting certificates by status
 */
export const useCertificatesByStatus = (status: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['certificates', 'status', status, params],
    queryFn: () => certificateService.getByStatus(status, params),
    enabled: !!status,
  });
};

/**
 * Hook for generating a certificate
 */
export const useGenerateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, courseId, templateId }: { userId: string; courseId: string; templateId: string }) =>
      certificateService.generate(userId, courseId, templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      message.success('สร้าง Certificate สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการสร้าง Certificate');
    },
  });
};
