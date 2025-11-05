/**
 * Payment Service
 * Handle payment management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  Payment,
  ApiResponse,
  PaginatedResponse,
  PaymentQueryParams,
  CreatePaymentDto,
  UpdatePaymentDto,
} from '@/types/api';

class PaymentService {
  /**
   * Get all payments with optional filters
   */
  async getAll(params?: PaymentQueryParams): Promise<PaginatedResponse<Payment>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<Payment>>(
      `${API_CONFIG.ENDPOINTS.PAYMENTS.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get payment by ID
   */
  async getById(id: string | number): Promise<Payment> {
    const response = await axiosInstance.get<ApiResponse<Payment>>(
      API_CONFIG.ENDPOINTS.PAYMENTS.BY_ID(id)
    );
    return response.data.data as Payment;
  }

  /**
   * Create new payment
   */
  async create(data: CreatePaymentDto): Promise<Payment> {
    const response = await axiosInstance.post<ApiResponse<Payment>>(
      API_CONFIG.ENDPOINTS.PAYMENTS.BASE,
      data
    );
    return response.data.data as Payment;
  }

  /**
   * Update payment by ID
   */
  async update(id: string | number, data: UpdatePaymentDto): Promise<Payment> {
    const response = await axiosInstance.put<ApiResponse<Payment>>(
      API_CONFIG.ENDPOINTS.PAYMENTS.BY_ID(id),
      data
    );
    return response.data.data as Payment;
  }

  /**
   * Delete payment by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.PAYMENTS.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get payments by enrollment ID
   */
  async getByEnrollmentId(enrollmentId: string | number, params?: PaymentQueryParams): Promise<PaginatedResponse<Payment>> {
    const queryParams = { ...params, enrollmentId };
    return this.getAll(queryParams);
  }

  /**
   * Get payments by status
   */
  async getByStatus(status: string, params?: PaymentQueryParams): Promise<PaginatedResponse<Payment>> {
    const queryParams = { ...params, status };
    return this.getAll(queryParams);
  }

  /**
   * Upload payment slip
   */
  async uploadSlip(id: string | number, files: File[]): Promise<Payment> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('slipUrl', file);
    });

    const response = await axiosInstance.put<ApiResponse<Payment>>(
      `${API_CONFIG.ENDPOINTS.PAYMENTS.BY_ID(id)}/upload-slip`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data as Payment;
  }
}

// Export singleton instance
const paymentService = new PaymentService();
export default paymentService;
