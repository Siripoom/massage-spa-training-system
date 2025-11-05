/**
 * Batch Service
 * Handle batch management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  Batch,
  ApiResponse,
  PaginatedResponse,
  BatchQueryParams,
  CreateBatchDto,
  UpdateBatchDto,
} from '@/types/api';

class BatchService {
  /**
   * Get all batches with optional filters
   */
  async getAll(params?: BatchQueryParams): Promise<PaginatedResponse<Batch>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<Batch>>(
      `${API_CONFIG.ENDPOINTS.BATCHES.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get batch by ID
   */
  async getById(id: string | number): Promise<Batch> {
    const response = await axiosInstance.get<ApiResponse<Batch>>(
      API_CONFIG.ENDPOINTS.BATCHES.BY_ID(id)
    );
    return response.data.data as Batch;
  }

  /**
   * Create new batch
   */
  async create(data: CreateBatchDto): Promise<Batch> {
    const response = await axiosInstance.post<ApiResponse<Batch>>(
      API_CONFIG.ENDPOINTS.BATCHES.BASE,
      data
    );
    return response.data.data as Batch;
  }

  /**
   * Update batch by ID
   */
  async update(id: string | number, data: UpdateBatchDto): Promise<Batch> {
    const response = await axiosInstance.put<ApiResponse<Batch>>(
      API_CONFIG.ENDPOINTS.BATCHES.BY_ID(id),
      data
    );
    return response.data.data as Batch;
  }

  /**
   * Delete batch by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.BATCHES.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get next batch number for a course
   */
  async getNextBatchNumber(courseId: string | number): Promise<number> {
    const response = await axiosInstance.get<ApiResponse<{ nextNumber: number }>>(
      API_CONFIG.ENDPOINTS.BATCHES.NEXT_NUMBER(courseId)
    );
    return response.data.data?.nextNumber || 1;
  }

  /**
   * Get batches by course ID
   */
  async getByCourseId(courseId: string | number, params?: BatchQueryParams): Promise<PaginatedResponse<Batch>> {
    const queryParams = { ...params, courseId };
    return this.getAll(queryParams);
  }

  /**
   * Get batches by status
   */
  async getByStatus(status: string, params?: BatchQueryParams): Promise<PaginatedResponse<Batch>> {
    const queryParams = { ...params, status };
    return this.getAll(queryParams);
  }

  /**
   * Get active batches
   */
  async getActiveBatches(params?: BatchQueryParams): Promise<PaginatedResponse<Batch>> {
    return this.getByStatus('ACTIVE', params);
  }

  /**
   * Search batches by query
   */
  async search(searchTerm: string, params?: BatchQueryParams): Promise<PaginatedResponse<Batch>> {
    const queryParams = { ...params, search: searchTerm };
    return this.getAll(queryParams);
  }
}

// Export singleton instance
const batchService = new BatchService();
export default batchService;
