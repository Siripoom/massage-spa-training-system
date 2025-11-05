/**
 * User Hooks
 * Custom hooks for user-related API operations
 */

import { useCallback } from 'react';
import { userService } from '@/services';
import { usePaginatedApi, useMutation } from './useApi';
import type { User, UserQueryParams } from '@/types/api';

/**
 * Hook to fetch all users with pagination
 */
export function useUsers(params?: UserQueryParams) {
  return usePaginatedApi<User>(
    async (page, limit) => {
      return await userService.getAll({ ...params, page, limit });
    },
    params?.page || 1,
    params?.limit || 10
  );
}

/**
 * Hook to create a user
 */
export function useCreateUser() {
  return useMutation<User, Partial<User>>(async (userData) => {
    return await userService.create(userData);
  });
}

/**
 * Hook to update a user
 */
export function useUpdateUser() {
  return useMutation<User, { id: string | number; data: Partial<User> }>(
    async ({ id, data }) => {
      return await userService.update(id, data);
    }
  );
}

/**
 * Hook to delete a user
 */
export function useDeleteUser() {
  return useMutation<void, string | number>(async (id) => {
    await userService.delete(id);
  });
}

/**
 * Hook to search users
 */
export function useSearchUsers() {
  return useMutation<any, { searchTerm: string; params?: UserQueryParams }>(
    async ({ searchTerm, params }) => {
      return await userService.search(searchTerm, params);
    }
  );
}
