/**
 * Bank Service
 * Handle bank account management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  Bank,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  CreateBankDto,
  UpdateBankDto,
} from '@/types/api';

class BankService {
  /**
   * Get all banks with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Bank>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<Bank>>(
      `${API_CONFIG.ENDPOINTS.BANKS.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get bank by ID
   */
  async getById(id: string | number): Promise<Bank> {
    const response = await axiosInstance.get<ApiResponse<Bank>>(
      API_CONFIG.ENDPOINTS.BANKS.BY_ID(id)
    );
    return response.data.data as Bank;
  }

  /**
   * Create new bank account
   */
  async create(data: CreateBankDto): Promise<Bank> {
    const response = await axiosInstance.post<ApiResponse<Bank>>(
      API_CONFIG.ENDPOINTS.BANKS.BASE,
      data
    );
    return response.data.data as Bank;
  }

  /**
   * Update bank by ID
   */
  async update(id: string | number, data: UpdateBankDto): Promise<Bank> {
    const response = await axiosInstance.put<ApiResponse<Bank>>(
      API_CONFIG.ENDPOINTS.BANKS.BY_ID(id),
      data
    );
    return response.data.data as Bank;
  }

  /**
   * Delete bank by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.BANKS.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Upload QR code for bank
   */
  async uploadQRCode(id: string | number, file: File): Promise<Bank> {
    const formData = new FormData();
    formData.append('qrCode', file);

    const response = await axiosInstance.put<ApiResponse<Bank>>(
      `${API_CONFIG.ENDPOINTS.BANKS.BY_ID(id)}/upload-qr`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data as Bank;
  }
}

// Export singleton instance
const bankService = new BankService();
export default bankService;
