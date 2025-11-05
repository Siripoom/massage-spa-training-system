/**
 * Auth Store - Zustand
 * Global state management for authentication
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '@/services/auth.service';
import type { User, LoginRequest, RegisterRequest } from '@/types/api';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  checkAuth: () => void;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Login action
      login: async (credentials: LoginRequest) => {
        try {
          set({ isLoading: true });
          const response = await authService.login(credentials);

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Register action
      register: async (data: RegisterRequest) => {
        try {
          set({ isLoading: true });
          await authService.register(data);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Logout action
      logout: async () => {
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      // Set user
      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      // Set token
      setToken: (token: string | null) => {
        set({ token });
      },

      // Check authentication status
      checkAuth: () => {
        const isAuthenticated = authService.isAuthenticated();
        const user = authService.getCurrentUser();
        const token = authService.getAccessToken();

        set({
          user,
          token,
          isAuthenticated,
        });
      },

      // Refresh user profile
      refreshProfile: async () => {
        try {
          const user = await authService.getProfile();
          set({ user });
        } catch (error) {
          console.error('Failed to refresh profile:', error);
          // If profile fetch fails, user might be logged out
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for better performance
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
