/**
 * Authentication Service
 * Handle all authentication-related API calls
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { saveToStorage, removeFromStorage } from '@/utils/api.utils';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ChangePasswordRequest,
  ProfileUpdateRequest,
  User,
  ApiResponse,
} from '@/types/api';

class AuthService {
  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await axiosInstance.post<RegisterResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  }

  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<any>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      data
    );

    console.log('Login response:', response.data);

    // Save tokens and user data to localStorage
    if (response.data.token) {
      saveToStorage(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, response.data.token);
    }
    if (response.data.refreshToken) {
      saveToStorage(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
    }
    if (response.data.user) {
      saveToStorage(API_CONFIG.STORAGE_KEYS.USER_DATA, response.data.user);
    }

    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage on logout
      this.clearAuthData();
    }
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    const response = await axiosInstance.get<ApiResponse<User>>(
      API_CONFIG.ENDPOINTS.AUTH.PROFILE
    );
    return response.data.data as User;
  }

  /**
   * Update user profile
   */
  async updateProfile(data: ProfileUpdateRequest): Promise<User> {
    const response = await axiosInstance.put<ApiResponse<User>>(
      API_CONFIG.ENDPOINTS.AUTH.UPDATE_PROFILE,
      data
    );

    // Update user data in localStorage
    if (response.data.data) {
      saveToStorage(API_CONFIG.STORAGE_KEYS.USER_DATA, response.data.data);
    }

    return response.data.data as User;
  }

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
    const response = await axiosInstance.post<ApiResponse>(
      API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD,
      data
    );
    return response.data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );

    // Update tokens in localStorage
    if (response.data.token) {
      saveToStorage(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, response.data.token);
    }
    if (response.data.refreshToken) {
      saveToStorage(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
    }

    return response.data;
  }

  /**
   * Clear authentication data from storage
   */
  clearAuthData(): void {
    removeFromStorage(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
    removeFromStorage(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
    removeFromStorage(API_CONFIG.STORAGE_KEYS.USER_DATA);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
    return !!token;
  }

  /**
   * Get current user from storage
   */
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userDataString = localStorage.getItem(API_CONFIG.STORAGE_KEYS.USER_DATA);
    if (!userDataString) return null;

    try {
      return JSON.parse(userDataString);
    } catch {
      return null;
    }
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
