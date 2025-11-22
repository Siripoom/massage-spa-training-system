/**
 * Custom Hooks for Certificate Template Management
 * Handles certificate template CRUD operations with React Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { certificateTemplateService } from '@/services';
import type {
  CertificateTemplate,
  PaginationParams,
} from '@/types/api';
import { message } from 'antd';

interface CreateCertificateTemplateDto {
  name: string;
  templateUrl: string;
  layoutData: any;
}

interface UpdateCertificateTemplateDto extends Partial<CreateCertificateTemplateDto> { }

/**
 * Hook for fetching all certificate templates with optional filters
 */
export const useCertificateTemplates = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['certificateTemplates', params],
    queryFn: () => certificateTemplateService.getAll(params),
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook for fetching a single certificate template by ID
 */
export const useCertificateTemplate = (id: string | number) => {
  return useQuery({
    queryKey: ['certificateTemplate', id],
    queryFn: () => certificateTemplateService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook for creating a new certificate template
 */
export const useCreateCertificateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCertificateTemplateDto) => certificateTemplateService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificateTemplates'] });
      message.success('สร้าง Template สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการสร้าง Template');
    },
  });
};

/**
 * Hook for updating a certificate template
 */
export const useUpdateCertificateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdateCertificateTemplateDto }) =>
      certificateTemplateService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['certificateTemplates'] });
      queryClient.invalidateQueries({ queryKey: ['certificateTemplate', variables.id] });
      message.success('อัปเดต Template สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการอัปเดต Template');
    },
  });
};

/**
 * Hook for deleting a certificate template
 */
export const useDeleteCertificateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => certificateTemplateService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificateTemplates'] });
      message.success('ลบ Template สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการลบ Template');
    },
  });
};

/**
 * Hook for uploading template image
 */
export const useUploadCertificateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string | number; file: File }) =>
      certificateTemplateService.uploadTemplate(id, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['certificateTemplates'] });
      queryClient.invalidateQueries({ queryKey: ['certificateTemplate', variables.id] });
      message.success('อัปโหลด Template สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการอัปโหลด Template');
    },
  });
};
