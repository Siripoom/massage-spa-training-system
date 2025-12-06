/**
 * Attendance Service
 * Handle attendance management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  Attendance,
  ApiResponse,
  PaginatedResponse,
  AttendanceQueryParams,
  CreateAttendanceDto,
  UpdateAttendanceDto,
} from '@/types/api';

class AttendanceService {
  /**
   * Get all attendance records with optional filters
   */
  async getAll(params?: AttendanceQueryParams): Promise<PaginatedResponse<Attendance>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<ApiResponse<Attendance[]> & { pagination: any }>(
      `${API_CONFIG.ENDPOINTS.ATTENDANCE.BASE}${queryString}`
    );

    // Transform backend response to match frontend expected format
    return {
      data: response.data.data || [],
      pagination: response.data.pagination || {
        page: params?.page || 1,
        limit: params?.limit || 50,
        total: response.data.data?.length || 0,
        totalPages: 1,
      },
      success: response.data.success,
    };
  }

  /**
   * Get attendance by ID
   */
  async getById(id: string | number): Promise<Attendance> {
    const response = await axiosInstance.get<ApiResponse<Attendance>>(
      API_CONFIG.ENDPOINTS.ATTENDANCE.BY_ID(id)
    );
    return response.data.data as Attendance;
  }

  /**
   * Create new attendance record
   */
  async create(data: CreateAttendanceDto): Promise<Attendance> {
    const response = await axiosInstance.post<ApiResponse<Attendance>>(
      API_CONFIG.ENDPOINTS.ATTENDANCE.BASE,
      data
    );
    return response.data.data as Attendance;
  }

  /**
   * Update attendance by ID
   */
  async update(id: string | number, data: UpdateAttendanceDto): Promise<Attendance> {
    const response = await axiosInstance.put<ApiResponse<Attendance>>(
      API_CONFIG.ENDPOINTS.ATTENDANCE.BY_ID(id),
      data
    );
    return response.data.data as Attendance;
  }

  /**
   * Delete attendance by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.ATTENDANCE.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get attendance by batch ID
   */
  async getByBatchId(batchId: string | number, params?: AttendanceQueryParams): Promise<PaginatedResponse<Attendance>> {
    const queryParams = { ...params, batchId };
    return this.getAll(queryParams);
  }

  /**
   * Get attendance by user ID
   */
  async getByUserId(userId: string | number, params?: AttendanceQueryParams): Promise<PaginatedResponse<Attendance>> {
    const queryParams = { ...params, userId };
    return this.getAll(queryParams);
  }

  /**
   * Get attendance by enrollment ID
   */
  async getByEnrollmentId(enrollmentId: string | number, params?: AttendanceQueryParams): Promise<PaginatedResponse<Attendance>> {
    const queryParams = { ...params, enrollmentId };
    return this.getAll(queryParams);
  }

  /**
   * Get attendance by date
   */
  async getByDate(date: string, params?: AttendanceQueryParams): Promise<PaginatedResponse<Attendance>> {
    const queryParams = { ...params, date };
    return this.getAll(queryParams);
  }

  /**
   * Get attendance by status
   */
  async getByStatus(status: string, params?: AttendanceQueryParams): Promise<PaginatedResponse<Attendance>> {
    const queryParams = { ...params, status };
    return this.getAll(queryParams);
  }

  /**
   * Check-in (mark time in)
   */
  async checkIn(id: string | number): Promise<Attendance> {
    const response = await axiosInstance.put<ApiResponse<Attendance>>(
      `${API_CONFIG.ENDPOINTS.ATTENDANCE.BY_ID(id)}/check-in`,
      { timeIn: new Date().toISOString() }
    );
    return response.data.data as Attendance;
  }

  /**
   * Check-out (mark time out)
   */
  async checkOut(id: string | number): Promise<Attendance> {
    const response = await axiosInstance.put<ApiResponse<Attendance>>(
      `${API_CONFIG.ENDPOINTS.ATTENDANCE.BY_ID(id)}/check-out`,
      { timeOut: new Date().toISOString() }
    );
    return response.data.data as Attendance;
  }

  /**
   * Bulk mark attendance for multiple students
   */
  async bulkMarkAttendance(
    batchId: string,
    date: string,
    attendanceData: Array<{
      enrollmentId: string;
      userId: string;
      status: string;
      timeIn?: string;
      timeOut?: string;
      notes?: string;
    }>
  ): Promise<any> {
    const response = await axiosInstance.post<ApiResponse<any>>(
      `${API_CONFIG.ENDPOINTS.ATTENDANCE.BASE}/bulk`,
      { batchId, date, attendanceData }
    );
    return response.data.data;
  }

  /**
   * Get attendance summary for a user
   */
  async getUserSummary(userId: string | number, batchId?: string): Promise<{
    totalHours: number;
    presentDays: number;
    absentDays: number;
    lateDays: number;
    excusedDays: number;
  }> {
    const params: any = { userId };
    if (batchId) params.batchId = batchId;

    const queryString = buildQueryString(params);
    const response = await axiosInstance.get<ApiResponse<any>>(
      `${API_CONFIG.ENDPOINTS.ATTENDANCE.BASE}/summary${queryString}`
    );
    return response.data.data;
  }

  /**
   * Get batch attendance report
   */
  async getBatchReport(
    batchId: string,
    params?: { date?: string; startDate?: string; endDate?: string }
  ): Promise<any> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<ApiResponse<any>>(
      `${API_CONFIG.ENDPOINTS.ATTENDANCE.BASE}/batch/${batchId}/report${queryString}`
    );
    return response.data.data;
  }
}

// Export singleton instance
const attendanceService = new AttendanceService();
export default attendanceService;
