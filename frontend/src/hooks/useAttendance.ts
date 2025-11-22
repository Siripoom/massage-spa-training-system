/**
 * Attendance Hooks
 * Custom hooks for attendance API calls with React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import attendanceService from '@/services/attendance.service';
import type {
  Attendance,
  AttendanceQueryParams,
  CreateAttendanceDto,
  UpdateAttendanceDto,
} from '@/types/api';

/**
 * Hook for fetching attendance records with pagination and filters
 */
export const useAttendance = (params?: AttendanceQueryParams) => {
  return useQuery({
    queryKey: ['attendance', params],
    queryFn: () => attendanceService.getAll(params),
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook for fetching single attendance by ID
 */
export const useAttendanceById = (id: string | number) => {
  return useQuery({
    queryKey: ['attendance', id],
    queryFn: () => attendanceService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook for creating attendance
 */
export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAttendanceDto) => attendanceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      message.success('บันทึกการเข้าเรียนเรียบร้อยแล้ว');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึกการเข้าเรียน');
    },
  });
};

/**
 * Hook for updating attendance
 */
export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdateAttendanceDto }) =>
      attendanceService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      message.success('แก้ไขข้อมูลการเข้าเรียนเรียบร้อยแล้ว');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลการเข้าเรียน');
    },
  });
};

/**
 * Hook for deleting attendance
 */
export const useDeleteAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => attendanceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      message.success('ลบข้อมูลการเข้าเรียนเรียบร้อยแล้ว');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'เกิดข้อผิดพลาดในการลบข้อมูลการเข้าเรียน');
    },
  });
};

/**
 * Hook for bulk creating attendance
 */
export const useBulkMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ batchId, date, attendanceData }: {
      batchId: string;
      date: string;
      attendanceData: Array<{
        enrollmentId: string;
        userId: string;
        status: string;
        timeIn?: string;
        timeOut?: string;
        notes?: string;
      }>;
    }) => attendanceService.bulkMarkAttendance(batchId, date, attendanceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      message.success('บันทึกการเข้าเรียนทั้งหมดเรียบร้อยแล้ว');
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึกการเข้าเรียนทั้งหมด');
    },
  });
};

/**
 * Hook for getting attendance summary for a user
 */
export const useAttendanceSummary = (userId: string | number, batchId?: string) => {
  return useQuery({
    queryKey: ['attendance-summary', userId, batchId],
    queryFn: () => attendanceService.getUserSummary(userId, batchId),
    enabled: !!userId,
  });
};

/**
 * Hook for getting batch attendance report
 */
export const useBatchAttendanceReport = (batchId: string, params?: { date?: string; startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: ['batch-attendance-report', batchId, params],
    queryFn: () => attendanceService.getBatchReport(batchId, params),
    enabled: !!batchId,
  });
};
