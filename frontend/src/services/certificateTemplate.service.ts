/**
 * Certificate Template Service
 * Handle certificate template management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  CertificateTemplate,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api';

interface CreateCertificateTemplateDto {
  name: string;
  templateUrl: string;
  layoutData: any;
}

interface UpdateCertificateTemplateDto extends Partial<CreateCertificateTemplateDto> { }

class CertificateTemplateService {
  /**
   * Get all certificate templates with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<CertificateTemplate>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<CertificateTemplate[] | PaginatedResponse<CertificateTemplate>>(
      `${API_CONFIG.ENDPOINTS.CERTIFICATE_TEMPLATES.BASE}${queryString}`
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
      } as PaginatedResponse<CertificateTemplate>;
    }

    return response.data as PaginatedResponse<CertificateTemplate>;
  }

  /**
   * Get certificate template by ID
   */
  async getById(id: string | number): Promise<CertificateTemplate> {
    const response = await axiosInstance.get<ApiResponse<CertificateTemplate>>(
      API_CONFIG.ENDPOINTS.CERTIFICATE_TEMPLATES.BY_ID(id)
    );
    return response.data.data as CertificateTemplate;
  }

  /**
   * Create new certificate template
   */
  async create(data: CreateCertificateTemplateDto): Promise<CertificateTemplate> {
    const response = await axiosInstance.post<ApiResponse<CertificateTemplate>>(
      API_CONFIG.ENDPOINTS.CERTIFICATE_TEMPLATES.BASE,
      data
    );
    return response.data.data as CertificateTemplate;
  }

  /**
   * Update certificate template by ID
   */
  async update(id: string | number, data: UpdateCertificateTemplateDto): Promise<CertificateTemplate> {
    const response = await axiosInstance.put<ApiResponse<CertificateTemplate>>(
      API_CONFIG.ENDPOINTS.CERTIFICATE_TEMPLATES.BY_ID(id),
      data
    );
    return response.data.data as CertificateTemplate;
  }

  /**
   * Delete certificate template by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.CERTIFICATE_TEMPLATES.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Upload template image
   */
  async uploadTemplate(id: string | number, file: File): Promise<CertificateTemplate> {
    const formData = new FormData();
    formData.append('template', file);

    const response = await axiosInstance.put<ApiResponse<CertificateTemplate>>(
      `${API_CONFIG.ENDPOINTS.CERTIFICATE_TEMPLATES.BY_ID(id)}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data as CertificateTemplate;
  }
}

// Export singleton instance
const certificateTemplateService = new CertificateTemplateService();
export default certificateTemplateService;
