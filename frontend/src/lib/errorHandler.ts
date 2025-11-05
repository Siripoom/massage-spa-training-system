/**
 * Error Handler Utility
 * Centralized error handling with user-friendly Thai messages
 */

import { message, notification } from 'antd';
import type { AxiosError } from 'axios';
import { getErrorMessage, isNetworkError, isTimeoutError, getStatusCode } from './axios';
import type { ApiError } from '@/types/api';

// ==================== Error Messages (Thai) ====================

const ERROR_MESSAGES: Record<number, string> = {
  400: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง',
  401: 'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ',
  403: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้',
  404: 'ไม่พบข้อมูลที่ต้องการ',
  409: 'ข้อมูลนี้มีอยู่ในระบบแล้ว',
  422: 'ข้อมูลไม่ถูกต้องหรือไม่สมบูรณ์',
  429: 'มีการเรียกใช้บ่อยเกินไป กรุณารอสักครู่',
  500: 'เกิดข้อผิดพลาดของระบบ กรุณาลองใหม่ภายหลัง',
  502: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
  503: 'บริการไม่พร้อมใช้งานชั่วคราว กรุณาลองใหม่ภายหลัง',
  504: 'เซิร์ฟเวอร์ใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง',
};

// ==================== Error Handler Class ====================

class ErrorHandler {
  /**
   * Handle API errors and show appropriate notifications
   */
  handleError(error: unknown, customMessage?: string): void {
    let errorMessage = customMessage || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';

    // Network error
    if (isNetworkError(error)) {
      errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต';
      this.showError(errorMessage);
      return;
    }

    // Timeout error
    if (isTimeoutError(error)) {
      errorMessage = 'การเชื่อมต่อหมดเวลา กรุณาลองใหม่อีกครั้ง';
      this.showError(errorMessage);
      return;
    }

    // Get status code
    const statusCode = getStatusCode(error);
    if (statusCode && ERROR_MESSAGES[statusCode]) {
      errorMessage = ERROR_MESSAGES[statusCode];
    }

    // Try to get specific error message from response
    const specificMessage = getErrorMessage(error);
    if (specificMessage && !customMessage) {
      errorMessage = specificMessage;
    }

    this.showError(errorMessage, statusCode);
  }

  /**
   * Show error message using Ant Design message component
   */
  showError(errorMessage: string, statusCode?: number): void {
    message.error(errorMessage);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Handler:', {
        message: errorMessage,
        statusCode,
      });
    }
  }

  /**
   * Show error notification (for more detailed errors)
   */
  showNotification(
    title: string,
    description: string,
    duration: number = 4.5
  ): void {
    notification.error({
      message: title,
      description,
      duration,
      placement: 'topRight',
    });
  }

  /**
   * Handle form validation errors
   */
  handleValidationErrors(error: unknown): Record<string, string> | null {
    if (!error || typeof error !== 'object') return null;

    const axiosError = error as AxiosError<ApiError & { errors?: Record<string, string> }>;

    // Check if response contains validation errors
    if (axiosError.response?.data?.errors) {
      return axiosError.response.data.errors;
    }

    return null;
  }

  /**
   * Show success message
   */
  showSuccess(successMessage: string): void {
    message.success(successMessage);
  }

  /**
   * Show warning message
   */
  showWarning(warningMessage: string): void {
    message.warning(warningMessage);
  }

  /**
   * Show info message
   */
  showInfo(infoMessage: string): void {
    message.info(infoMessage);
  }

  /**
   * Show loading message
   */
  showLoading(loadingMessage: string = 'กำลังโหลด...'): () => void {
    const hide = message.loading(loadingMessage, 0);
    return hide;
  }
}

// ==================== Export Singleton ====================

const errorHandler = new ErrorHandler();

export default errorHandler;

// Export individual methods for convenience
export const {
  handleError,
  showError,
  showNotification,
  handleValidationErrors,
  showSuccess,
  showWarning,
  showInfo,
  showLoading,
} = errorHandler;
