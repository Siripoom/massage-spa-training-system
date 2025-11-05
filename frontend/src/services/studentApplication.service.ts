/**
 * Student Application Service
 * Handle student application management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  StudentApplication,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  CreateStudentApplicationDto,
  UpdateStudentApplicationDto,
} from '@/types/api';

class StudentApplicationService {
  /**
   * Get all student applications with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<StudentApplication>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<StudentApplication>>(
      `${API_CONFIG.ENDPOINTS.STUDENT_APPLICATIONS.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get student application by ID
   */
  async getById(id: string | number): Promise<StudentApplication> {
    const response = await axiosInstance.get<ApiResponse<StudentApplication>>(
      API_CONFIG.ENDPOINTS.STUDENT_APPLICATIONS.BY_ID(id)
    );
    return response.data.data as StudentApplication;
  }

  /**
   * Create new student application
   */
  async create(data: CreateStudentApplicationDto): Promise<StudentApplication> {
    const response = await axiosInstance.post<ApiResponse<StudentApplication>>(
      API_CONFIG.ENDPOINTS.STUDENT_APPLICATIONS.BASE,
      data
    );
    return response.data.data as StudentApplication;
  }

  /**
   * Update student application by ID
   */
  async update(id: string | number, data: UpdateStudentApplicationDto): Promise<StudentApplication> {
    const response = await axiosInstance.put<ApiResponse<StudentApplication>>(
      API_CONFIG.ENDPOINTS.STUDENT_APPLICATIONS.BY_ID(id),
      data
    );
    return response.data.data as StudentApplication;
  }

  /**
   * Delete student application by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.STUDENT_APPLICATIONS.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get applications by user ID
   */
  async getByUserId(userId: string | number, params?: PaginationParams): Promise<PaginatedResponse<StudentApplication>> {
    const queryParams = { ...params, userId };
    return this.getAll(queryParams);
  }

  /**
   * Get applications by course ID
   */
  async getByCourseId(courseId: string | number, params?: PaginationParams): Promise<PaginatedResponse<StudentApplication>> {
    const queryParams = { ...params, courseId };
    return this.getAll(queryParams);
  }

  /**
   * Get applications by batch ID
   */
  async getByBatchId(batchId: string | number, params?: PaginationParams): Promise<PaginatedResponse<StudentApplication>> {
    const queryParams = { ...params, batchId };
    return this.getAll(queryParams);
  }

  /**
   * Get applications by status
   */
  async getByStatus(status: string, params?: PaginationParams): Promise<PaginatedResponse<StudentApplication>> {
    const queryParams = { ...params, status };
    return this.getAll(queryParams);
  }

  /**
   * Approve application
   */
  async approve(id: string | number, reviewedBy: string): Promise<StudentApplication> {
    const response = await axiosInstance.put<ApiResponse<StudentApplication>>(
      `${API_CONFIG.ENDPOINTS.STUDENT_APPLICATIONS.BY_ID(id)}/approve`,
      { reviewedBy }
    );
    return response.data.data as StudentApplication;
  }

  /**
   * Reject application
   */
  async reject(id: string | number, reviewedBy: string, notes?: string): Promise<StudentApplication> {
    const response = await axiosInstance.put<ApiResponse<StudentApplication>>(
      `${API_CONFIG.ENDPOINTS.STUDENT_APPLICATIONS.BY_ID(id)}/reject`,
      { reviewedBy, notes }
    );
    return response.data.data as StudentApplication;
  }

  /**
   * Upload documents
   */
  async uploadDocuments(id: string | number, files: File[]): Promise<StudentApplication> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('documents', file);
    });

    const response = await axiosInstance.put<ApiResponse<StudentApplication>>(
      `${API_CONFIG.ENDPOINTS.STUDENT_APPLICATIONS.BY_ID(id)}/upload-documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data as StudentApplication;
  }
}

// Export singleton instance
const studentApplicationService = new StudentApplicationService();
export default studentApplicationService;
