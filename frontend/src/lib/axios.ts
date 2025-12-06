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

// Function to get token from auth store
const getTokenFromStore = () => {
  if (typeof window === 'undefined') return null;

  try {
    // Get from Zustand persist storage
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      return parsed.state?.token || null;
    }

    // Fallback to direct localStorage
    return localStorage.getItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// ==================== Request Interceptor ====================

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from auth store
    const token = getTokenFromStore();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
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

    // Handle 401 Unauthorized - Token invalid or expired
    if (error.response?.status === 401) {
      // Don't retry if already retried or if it's a login/register request
      const isAuthEndpoint = originalRequest.url?.includes('/auth/login') ||
        originalRequest.url?.includes('/auth/register');

      if (!originalRequest._retry && !isAuthEndpoint) {
        originalRequest._retry = true;

        try {
          // Try to refresh token
          if (typeof window !== 'undefined') {
            // Get refresh token from auth store
            const authStorage = localStorage.getItem('auth-storage');
            let refreshToken = null;

            if (authStorage) {
              try {
                const parsed = JSON.parse(authStorage);
                refreshToken = parsed.state?.refreshToken;
              } catch (e) {
                console.error('Failed to parse auth storage:', e);
              }
            }

            // Fallback to direct localStorage
            if (!refreshToken) {
              refreshToken = localStorage.getItem(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
            }

            if (refreshToken) {
              const response = await axios.post(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN}`,
                { refreshToken }
              );

              const { token, refreshToken: newRefreshToken } = response.data;

              // Update both localStorage and auth store
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
          console.error('Token refresh failed:', refreshError);
        }
      }

      // If we reach here, authentication failed - clear storage and redirect
      if (typeof window !== 'undefined' && !isAuthEndpoint) {
        localStorage.clear(); // Clear all storage

        // Show error message
        console.error('Authentication failed. Please login again.');

        // Redirect to login page
        window.location.href = '/login';
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
