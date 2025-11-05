/**
 * Schedule Service
 * Handle schedule management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  Schedule,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api';

interface CreateScheduleDto {
  courseId: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface UpdateScheduleDto extends Partial<CreateScheduleDto> {}

class ScheduleService {
  /**
   * Get all schedules with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Schedule>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<Schedule>>(
      `${API_CONFIG.ENDPOINTS.SCHEDULES.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get schedule by ID
   */
  async getById(id: string | number): Promise<Schedule> {
    const response = await axiosInstance.get<ApiResponse<Schedule>>(
      API_CONFIG.ENDPOINTS.SCHEDULES.BY_ID(id)
    );
    return response.data.data as Schedule;
  }

  /**
   * Create new schedule
   */
  async create(data: CreateScheduleDto): Promise<Schedule> {
    const response = await axiosInstance.post<ApiResponse<Schedule>>(
      API_CONFIG.ENDPOINTS.SCHEDULES.BASE,
      data
    );
    return response.data.data as Schedule;
  }

  /**
   * Update schedule by ID
   */
  async update(id: string | number, data: UpdateScheduleDto): Promise<Schedule> {
    const response = await axiosInstance.put<ApiResponse<Schedule>>(
      API_CONFIG.ENDPOINTS.SCHEDULES.BY_ID(id),
      data
    );
    return response.data.data as Schedule;
  }

  /**
   * Delete schedule by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.SCHEDULES.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get schedules by course ID
   */
  async getByCourseId(courseId: string | number, params?: PaginationParams): Promise<PaginatedResponse<Schedule>> {
    const queryParams = { ...params, courseId };
    return this.getAll(queryParams);
  }
}

// Export singleton instance
const scheduleService = new ScheduleService();
export default scheduleService;
