/**
 * API Utility Helpers
 * Helper functions for API operations
 */

import type { AxiosResponse } from 'axios';
import type { ApiResponse, PaginationParams } from '@/types/api';

// ==================== Query String Builder ====================

/**
 * Build query string from object
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => queryParams.append(key, String(item)));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Build pagination query string
 */
export const buildPaginationQuery = (params: PaginationParams): string => {
  const { page = 1, limit = 10 } = params;
  return buildQueryString({ page, limit });
};

// ==================== Response Data Extraction ====================

/**
 * Extract data from API response
 */
export const extractData = <T>(response: AxiosResponse<ApiResponse<T>>): T | undefined => {
  return response.data?.data;
};

/**
 * Extract message from API response
 */
export const extractMessage = (response: AxiosResponse<ApiResponse>): string | undefined => {
  return response.data?.message;
};

/**
 * Check if response is successful
 */
export const isSuccessResponse = (response: AxiosResponse<ApiResponse>): boolean => {
  return response.data?.success === true;
};

// ==================== File Upload Helpers ====================

/**
 * Create FormData for file upload
 */
export const createFormData = (
  file: File | Blob,
  fieldName: string = 'file',
  additionalData?: Record<string, any>
): FormData => {
  const formData = new FormData();
  formData.append(fieldName, file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
  }

  return formData;
};

/**
 * Create FormData for multiple files
 */
export const createMultipleFilesFormData = (
  files: File[] | Blob[],
  fieldName: string = 'files',
  additionalData?: Record<string, any>
): FormData => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append(fieldName, file);
  });

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
  }

  return formData;
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * Validate file size (in MB)
 */
export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const fileSizeMB = file.size / (1024 * 1024);
  return fileSizeMB <= maxSizeMB;
};

/**
 * Validate file type
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

// ==================== Date Formatting Helpers ====================

/**
 * Format date to API format (YYYY-MM-DD)
 */
export const formatDateForAPI = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
};

/**
 * Format datetime to API format (ISO string)
 */
export const formatDateTimeForAPI = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
};

/**
 * Parse API date to Date object
 */
export const parseAPIDate = (dateString: string): Date => {
  return new Date(dateString);
};

// ==================== Storage Helpers ====================

/**
 * Save data to localStorage (client-side only)
 */
export const saveToStorage = (key: string, data: any): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
};

/**
 * Get data from localStorage (client-side only)
 */
export const getFromStorage = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }
  return null;
};

/**
 * Remove data from localStorage (client-side only)
 */
export const removeFromStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

/**
 * Clear all data from localStorage (client-side only)
 */
export const clearStorage = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// ==================== URL Helpers ====================

/**
 * Combine base URL with path
 */
export const combineURL = (baseURL: string, path: string): string => {
  const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
};

/**
 * Get full URL from path
 */
export const getFullURL = (path: string): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }
  return path;
};

// ==================== Debounce Helper ====================

/**
 * Debounce function (useful for search inputs)
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// ==================== Data Transformation ====================

/**
 * Remove undefined and null values from object
 */
export const cleanObject = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// ==================== Export All ====================

export default {
  buildQueryString,
  buildPaginationQuery,
  extractData,
  extractMessage,
  isSuccessResponse,
  createFormData,
  createMultipleFilesFormData,
  getFileExtension,
  validateFileSize,
  validateFileType,
  formatDateForAPI,
  formatDateTimeForAPI,
  parseAPIDate,
  saveToStorage,
  getFromStorage,
  removeFromStorage,
  clearStorage,
  combineURL,
  getFullURL,
  debounce,
  cleanObject,
  deepClone,
};
