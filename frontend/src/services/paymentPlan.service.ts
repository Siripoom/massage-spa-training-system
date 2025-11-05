/**
 * Payment Plan Service
 * Handle payment plan management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  PaymentPlan,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api';

interface CreatePaymentPlanDto {
  enrollmentId: string;
  installments: number;
  amount: number;
  dueDate: string;
  status?: string;
}

interface UpdatePaymentPlanDto extends Partial<CreatePaymentPlanDto> {
  paidAmount?: number;
  paidDate?: string;
}

class PaymentPlanService {
  /**
   * Get all payment plans with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<PaymentPlan>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<PaymentPlan>>(
      `${API_CONFIG.ENDPOINTS.PAYMENT_PLANS.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get payment plan by ID
   */
  async getById(id: string | number): Promise<PaymentPlan> {
    const response = await axiosInstance.get<ApiResponse<PaymentPlan>>(
      API_CONFIG.ENDPOINTS.PAYMENT_PLANS.BY_ID(id)
    );
    return response.data.data as PaymentPlan;
  }

  /**
   * Create new payment plan
   */
  async create(data: CreatePaymentPlanDto): Promise<PaymentPlan> {
    const response = await axiosInstance.post<ApiResponse<PaymentPlan>>(
      API_CONFIG.ENDPOINTS.PAYMENT_PLANS.BASE,
      data
    );
    return response.data.data as PaymentPlan;
  }

  /**
   * Update payment plan by ID
   */
  async update(id: string | number, data: UpdatePaymentPlanDto): Promise<PaymentPlan> {
    const response = await axiosInstance.put<ApiResponse<PaymentPlan>>(
      API_CONFIG.ENDPOINTS.PAYMENT_PLANS.BY_ID(id),
      data
    );
    return response.data.data as PaymentPlan;
  }

  /**
   * Delete payment plan by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.PAYMENT_PLANS.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get payment plans by enrollment ID
   */
  async getByEnrollmentId(enrollmentId: string | number, params?: PaginationParams): Promise<PaginatedResponse<PaymentPlan>> {
    const queryParams = { ...params, enrollmentId };
    return this.getAll(queryParams);
  }

  /**
   * Get payment plans by status
   */
  async getByStatus(status: string, params?: PaginationParams): Promise<PaginatedResponse<PaymentPlan>> {
    const queryParams = { ...params, status };
    return this.getAll(queryParams);
  }
}

// Export singleton instance
const paymentPlanService = new PaymentPlanService();
export default paymentPlanService;
