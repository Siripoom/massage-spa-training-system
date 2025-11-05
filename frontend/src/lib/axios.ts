/**
 * Axios Instance Configuration
 * Configured axios client with interceptors for authentication and error handling
 */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import API_CONFIG from '@/config/api.config';
import type { ApiResponse, ApiError } from '@/types/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== Request Interceptor ====================

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        params: config.params,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// ==================== Response Interceptor ====================

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });
    }

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        if (typeof window !== 'undefined') {
          const refreshToken = localStorage.getItem(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);

          if (refreshToken) {
            const response = await axios.post(
              `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN}`,
              { refreshToken }
            );

            const { token, refreshToken: newRefreshToken } = response.data;

            // Save new tokens
            localStorage.setItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, token);
            if (newRefreshToken) {
              localStorage.setItem(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
            }

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh token failed - clear storage and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
          localStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER_DATA);

          // Redirect to login page
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access denied. You do not have permission to access this resource.');
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found.');
    }

    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Internal server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

// ==================== Helper Functions ====================

/**
 * Extract error message from axios error
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    return (
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      axiosError.message ||
      'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
    );
  }
  return 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ';
};

/**
 * Check if error is network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return !error.response && error.message === 'Network Error';
  }
  return false;
};

/**
 * Check if error is timeout error
 */
export const isTimeoutError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return error.code === 'ECONNABORTED' || error.message.includes('timeout');
  }
  return false;
};

/**
 * Get HTTP status code from error
 */
export const getStatusCode = (error: unknown): number | undefined => {
  if (axios.isAxiosError(error)) {
    return error.response?.status;
  }
  return undefined;
};

// ==================== Export ====================

export default axiosInstance;

// Export axios for direct use if needed
export { axios };
