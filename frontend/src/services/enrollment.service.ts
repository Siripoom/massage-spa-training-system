/**
 * Enrollment Service
 * Handle enrollment management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  Enrollment,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
} from '@/types/api';

class EnrollmentService {
  /**
   * Get all enrollments with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Enrollment>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<Enrollment>>(
      `${API_CONFIG.ENDPOINTS.ENROLLMENTS.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get enrollment by ID
   */
  async getById(id: string | number): Promise<Enrollment> {
    const response = await axiosInstance.get<ApiResponse<Enrollment>>(
      API_CONFIG.ENDPOINTS.ENROLLMENTS.BY_ID(id)
    );
    return response.data.data as Enrollment;
  }

  /**
   * Create new enrollment
   */
  async create(data: CreateEnrollmentDto): Promise<Enrollment> {
    const response = await axiosInstance.post<ApiResponse<Enrollment>>(
      API_CONFIG.ENDPOINTS.ENROLLMENTS.BASE,
      data
    );
    return response.data.data as Enrollment;
  }

  /**
   * Update enrollment by ID
   */
  async update(id: string | number, data: UpdateEnrollmentDto): Promise<Enrollment> {
    const response = await axiosInstance.put<ApiResponse<Enrollment>>(
      API_CONFIG.ENDPOINTS.ENROLLMENTS.BY_ID(id),
      data
    );
    return response.data.data as Enrollment;
  }

  /**
   * Delete enrollment by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.ENROLLMENTS.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get enrollments by user ID
   */
  async getByUserId(userId: string | number, params?: PaginationParams): Promise<PaginatedResponse<Enrollment>> {
    const queryParams = { ...params, userId };
    return this.getAll(queryParams);
  }

  /**
   * Get enrollments by course ID
   */
  async getByCourseId(courseId: string | number, params?: PaginationParams): Promise<PaginatedResponse<Enrollment>> {
    const queryParams = { ...params, courseId };
    return this.getAll(queryParams);
  }

  /**
   * Get enrollments by batch ID
   */
  async getByBatchId(batchId: string | number, params?: PaginationParams): Promise<PaginatedResponse<Enrollment>> {
    const queryParams = { ...params, batchId };
    return this.getAll(queryParams);
  }
}

// Export singleton instance
const enrollmentService = new EnrollmentService();
export default enrollmentService;
