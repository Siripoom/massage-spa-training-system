/**
 * Course Service
 * Handle course management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  Course,
  ApiResponse,
  PaginatedResponse,
  CourseQueryParams,
  CreateCourseDto,
  UpdateCourseDto,
} from '@/types/api';

class CourseService {
  /**
   * Get all courses with optional filters
   */
  async getAll(params?: CourseQueryParams): Promise<PaginatedResponse<Course>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<ApiResponse<Course[]> & { pagination: any }>(
      `${API_CONFIG.ENDPOINTS.COURSES.BASE}${queryString}`
    );

    // Transform backend response to match frontend expected format
    return {
      data: response.data.data || [],
      pagination: response.data.pagination || {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: response.data.data?.length || 0,
        totalPages: 1,
      },
      success: response.data.success,
    };
  }

  /**
   * Get course by ID
   */
  async getById(id: string | number): Promise<Course> {
    const response = await axiosInstance.get<ApiResponse<Course>>(
      API_CONFIG.ENDPOINTS.COURSES.BY_ID(id)
    );
    return response.data.data as Course;
  }

  /**
   * Create new course
   */
  async create(data: CreateCourseDto): Promise<Course> {
    const response = await axiosInstance.post<ApiResponse<Course>>(
      API_CONFIG.ENDPOINTS.COURSES.BASE,
      data
    );
    return response.data.data as Course;
  }

  /**
   * Update course by ID
   */
  async update(id: string | number, data: UpdateCourseDto): Promise<Course> {
    const response = await axiosInstance.put<ApiResponse<Course>>(
      API_CONFIG.ENDPOINTS.COURSES.BY_ID(id),
      data
    );
    return response.data.data as Course;
  }

  /**
   * Delete course by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.COURSES.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Search courses by query
   */
  async search(searchTerm: string, params?: CourseQueryParams): Promise<PaginatedResponse<Course>> {
    const queryParams = { ...params, search: searchTerm };
    return this.getAll(queryParams);
  }

  /**
   * Get courses by status
   */
  async getByStatus(status: string, params?: CourseQueryParams): Promise<PaginatedResponse<Course>> {
    const queryParams = { ...params, status };
    return this.getAll(queryParams);
  }

  /**
   * Get active courses
   */
  async getActiveCourses(params?: CourseQueryParams): Promise<PaginatedResponse<Course>> {
    return this.getByStatus('ACTIVE', params);
  }
}

// Export singleton instance
const courseService = new CourseService();
export default courseService;
