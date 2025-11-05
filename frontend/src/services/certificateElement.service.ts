/**
 * Certificate Element Service
 * Handle certificate element management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  CertificateElement,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api';

interface CreateCertificateElementDto {
  templateId: string;
  type: string;
  elementKey: string;
  content: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  color: string;
}

interface UpdateCertificateElementDto extends Partial<CreateCertificateElementDto> {}

class CertificateElementService {
  /**
   * Get all certificate elements with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<CertificateElement>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<CertificateElement>>(
      `${API_CONFIG.ENDPOINTS.CERTIFICATE_ELEMENTS.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get certificate element by ID
   */
  async getById(id: string | number): Promise<CertificateElement> {
    const response = await axiosInstance.get<ApiResponse<CertificateElement>>(
      API_CONFIG.ENDPOINTS.CERTIFICATE_ELEMENTS.BY_ID(id)
    );
    return response.data.data as CertificateElement;
  }

  /**
   * Create new certificate element
   */
  async create(data: CreateCertificateElementDto): Promise<CertificateElement> {
    const response = await axiosInstance.post<ApiResponse<CertificateElement>>(
      API_CONFIG.ENDPOINTS.CERTIFICATE_ELEMENTS.BASE,
      data
    );
    return response.data.data as CertificateElement;
  }

  /**
   * Update certificate element by ID
   */
  async update(id: string | number, data: UpdateCertificateElementDto): Promise<CertificateElement> {
    const response = await axiosInstance.put<ApiResponse<CertificateElement>>(
      API_CONFIG.ENDPOINTS.CERTIFICATE_ELEMENTS.BY_ID(id),
      data
    );
    return response.data.data as CertificateElement;
  }

  /**
   * Delete certificate element by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.CERTIFICATE_ELEMENTS.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get elements by template ID
   */
  async getByTemplateId(templateId: string | number, params?: PaginationParams): Promise<PaginatedResponse<CertificateElement>> {
    const queryParams = { ...params, templateId };
    return this.getAll(queryParams);
  }

  /**
   * Bulk update elements
   */
  async bulkUpdate(elements: Array<{ id: string; data: UpdateCertificateElementDto }>): Promise<CertificateElement[]> {
    const response = await axiosInstance.put<ApiResponse<CertificateElement[]>>(
      `${API_CONFIG.ENDPOINTS.CERTIFICATE_ELEMENTS.BASE}/bulk`,
      { elements }
    );
    return response.data.data as CertificateElement[];
  }
}

// Export singleton instance
const certificateElementService = new CertificateElementService();
export default certificateElementService;
