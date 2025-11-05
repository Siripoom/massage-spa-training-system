/**
 * Organization Service
 * Handle organization management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  Organization,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api';

interface CreateOrganizationDto {
  name: string;
  courseId: string;
}

interface UpdateOrganizationDto extends Partial<CreateOrganizationDto> {}

class OrganizationService {
  /**
   * Get all organizations with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Organization>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<Organization>>(
      `${API_CONFIG.ENDPOINTS.ORGANIZATION.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get organization by ID
   */
  async getById(id: string | number): Promise<Organization> {
    const response = await axiosInstance.get<ApiResponse<Organization>>(
      API_CONFIG.ENDPOINTS.ORGANIZATION.BY_ID(id)
    );
    return response.data.data as Organization;
  }

  /**
   * Create new organization
   */
  async create(data: CreateOrganizationDto): Promise<Organization> {
    const response = await axiosInstance.post<ApiResponse<Organization>>(
      API_CONFIG.ENDPOINTS.ORGANIZATION.BASE,
      data
    );
    return response.data.data as Organization;
  }

  /**
   * Update organization by ID
   */
  async update(id: string | number, data: UpdateOrganizationDto): Promise<Organization> {
    const response = await axiosInstance.put<ApiResponse<Organization>>(
      API_CONFIG.ENDPOINTS.ORGANIZATION.BY_ID(id),
      data
    );
    return response.data.data as Organization;
  }

  /**
   * Delete organization by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.ORGANIZATION.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get organizations by course ID
   */
  async getByCourseId(courseId: string | number, params?: PaginationParams): Promise<PaginatedResponse<Organization>> {
    const queryParams = { ...params, courseId };
    return this.getAll(queryParams);
  }
}

// Export singleton instance
const organizationService = new OrganizationService();
export default organizationService;
