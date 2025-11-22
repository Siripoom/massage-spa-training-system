/**
 * User Service
 * Handle user management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  User,
  ApiResponse,
  PaginatedResponse,
  UserQueryParams,
} from '@/types/api';

class UserService {
  /**
   * Get all users with optional filters
   */
  async getAll(params?: UserQueryParams): Promise<PaginatedResponse<User>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<ApiResponse<User[]> & { pagination: any }>(
      `${API_CONFIG.ENDPOINTS.USERS.BASE}${queryString}`
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
   * Get user by ID
   */
  async getById(id: string | number): Promise<User> {
    const response = await axiosInstance.get<ApiResponse<User>>(
      API_CONFIG.ENDPOINTS.USERS.BY_ID(id)
    );
    return response.data.data as User;
  }

  /**
   * Create new user
   */
  async create(data: Partial<User>): Promise<User> {
    const response = await axiosInstance.post<ApiResponse<User>>(
      API_CONFIG.ENDPOINTS.USERS.BASE,
      data
    );
    return response.data.data as User;
  }

  /**
   * Update user by ID
   */
  async update(id: string | number, data: Partial<User>): Promise<User> {
    const response = await axiosInstance.put<ApiResponse<User>>(
      API_CONFIG.ENDPOINTS.USERS.BY_ID(id),
      data
    );
    return response.data.data as User;
  }

  /**
   * Delete user by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.USERS.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Search users by query
   */
  async search(searchTerm: string, params?: UserQueryParams): Promise<PaginatedResponse<User>> {
    const queryParams = { ...params, search: searchTerm };
    return this.getAll(queryParams);
  }

  /**
   * Get users by role
   */
  async getByRole(role: string, params?: UserQueryParams): Promise<PaginatedResponse<User>> {
    const queryParams = { ...params, role };
    return this.getAll(queryParams);
  }
}

// Export singleton instance
const userService = new UserService();
export default userService;
