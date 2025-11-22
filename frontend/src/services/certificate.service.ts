/**
 * Certificate Service
 * Handle certificate management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  Certificate,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  CreateCertificateDto,
  UpdateCertificateDto,
} from '@/types/api';

class CertificateService {
  /**
   * Get all certificates with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Certificate>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<Certificate[] | PaginatedResponse<Certificate>>(
      `${API_CONFIG.ENDPOINTS.CERTIFICATES.BASE}${queryString}`
    );

    // Handle both array and paginated response
    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        pagination: {
          page: 1,
          limit: response.data.length,
          total: response.data.length,
          totalPages: 1,
        },
      } as PaginatedResponse<Certificate>;
    }

    return response.data as PaginatedResponse<Certificate>;
  }

  /**
   * Get certificate by ID
   */
  async getById(id: string | number): Promise<Certificate> {
    const response = await axiosInstance.get<ApiResponse<Certificate>>(
      API_CONFIG.ENDPOINTS.CERTIFICATES.BY_ID(id)
    );
    return response.data.data as Certificate;
  }

  /**
   * Create new certificate
   */
  async create(data: CreateCertificateDto): Promise<Certificate> {
    const response = await axiosInstance.post<ApiResponse<Certificate>>(
      API_CONFIG.ENDPOINTS.CERTIFICATES.BASE,
      data
    );
    return response.data.data as Certificate;
  }

  /**
   * Update certificate by ID
   */
  async update(id: string | number, data: UpdateCertificateDto): Promise<Certificate> {
    const response = await axiosInstance.put<ApiResponse<Certificate>>(
      API_CONFIG.ENDPOINTS.CERTIFICATES.BY_ID(id),
      data
    );
    return response.data.data as Certificate;
  }

  /**
   * Delete certificate by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.CERTIFICATES.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get certificates by user ID
   */
  async getByUserId(userId: string | number, params?: PaginationParams): Promise<PaginatedResponse<Certificate>> {
    const queryParams = { ...params, userId };
    return this.getAll(queryParams);
  }

  /**
   * Get certificates by course ID
   */
  async getByCourseId(courseId: string | number, params?: PaginationParams): Promise<PaginatedResponse<Certificate>> {
    const queryParams = { ...params, courseId };
    return this.getAll(queryParams);
  }

  /**
   * Get certificates by status
   */
  async getByStatus(status: string, params?: PaginationParams): Promise<PaginatedResponse<Certificate>> {
    const queryParams = { ...params, status };
    return this.getAll(queryParams);
  }

  /**
   * Generate certificate for user
   */
  async generate(userId: string, courseId: string, templateId: string): Promise<Certificate> {
    const response = await axiosInstance.post<ApiResponse<Certificate>>(
      `${API_CONFIG.ENDPOINTS.CERTIFICATES.BASE}/generate`,
      { userId, courseId, templateId }
    );
    return response.data.data as Certificate;
  }

  /**
   * Download certificate
   */
  async download(id: string | number): Promise<Blob> {
    const response = await axiosInstance.get(
      `${API_CONFIG.ENDPOINTS.CERTIFICATES.BY_ID(id)}/download`,
      { responseType: 'blob' }
    );
    return response.data;
  }
}

// Export singleton instance
const certificateService = new CertificateService();
export default certificateService;
