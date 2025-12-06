/**
 * Custom Hook for Payment Management
 * Handles payment CRUD operations with React Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '@/services';
import type {
  Payment,
  PaymentQueryParams,
  CreatePaymentDto,
  UpdatePaymentDto,
} from '@/types/api';
import { message } from 'antd';

/**
 * Hook for fetching all payments with optional filters
 */
export const usePayments = (params?: PaymentQueryParams) => {
  return useQuery({
    queryKey: ['payments', params],
    queryFn: () => paymentService.getAll(params),
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook for fetching a single payment by ID
 */
export const usePayment = (id: string | number) => {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook for creating a new payment
 */
export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentDto) => paymentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      message.success('เพิ่มข้อมูล Payment สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล Payment');
    },
  });
};

/**
 * Hook for updating a payment
 */
export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdatePaymentDto }) =>
      paymentService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment', variables.id] });
      message.success('อัปเดตข้อมูล Payment สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล Payment');
    },
  });
};

/**
 * Hook for deleting a payment
 */
export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => paymentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      message.success('ลบข้อมูล Payment สำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการลบข้อมูล Payment');
    },
  });
};

/**
 * Hook for getting payments by enrollment ID
 */
export const usePaymentsByEnrollment = (enrollmentId: string | number, params?: PaymentQueryParams) => {
  return useQuery({
    queryKey: ['payments', 'enrollment', enrollmentId, params],
    queryFn: () => paymentService.getByEnrollmentId(enrollmentId, params),
    enabled: !!enrollmentId,
  });
};

/**
 * Hook for getting payments by status
 */
export const usePaymentsByStatus = (status: string, params?: PaymentQueryParams) => {
  return useQuery({
    queryKey: ['payments', 'status', status, params],
    queryFn: () => paymentService.getByStatus(status, params),
    enabled: !!status,
  });
};

/**
 * Hook for uploading payment slip
 */
export const useUploadPaymentSlip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, files }: { id: string | number; files: File[] }) =>
      paymentService.uploadSlip(id, files),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payment', variables.id] });
      message.success('อัปโหลดสลิปสำเร็จ!');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || 'เกิดข้อผิดพลาดในการอัปโหลดสลิป');
    },
  });
};
