/**
 * Batch Hooks
 * Custom hooks for batch-related API operations
 */

import { batchService } from '@/services';
import { usePaginatedApi, useMutation, useApi } from './useApi';
import type { Batch, BatchQueryParams, CreateBatchDto, UpdateBatchDto } from '@/types/api';

/**
 * Hook to fetch all batches with pagination
 */
export function useBatches(params?: BatchQueryParams) {
  return usePaginatedApi<Batch>(
    async (page, limit) => {
      return await batchService.getAll({ ...params, page, limit });
    },
    params?.page || 1,
    params?.limit || 10
  );
}

/**
 * Hook to get next batch number for a course
 */
export function useNextBatchNumber(courseId: string | number) {
  return useApi<number>(
    () => batchService.getNextBatchNumber(courseId),
    [courseId],
    !!courseId
  );
}

/**
 * Hook to create a batch
 */
export function useCreateBatch() {
  return useMutation<Batch, CreateBatchDto>(async (batchData) => {
    return await batchService.create(batchData);
  });
}

/**
 * Hook to update a batch
 */
export function useUpdateBatch() {
  return useMutation<Batch, { id: string | number; data: UpdateBatchDto }>(
    async ({ id, data }) => {
      return await batchService.update(id, data);
    }
  );
}

/**
 * Hook to delete a batch
 */
export function useDeleteBatch() {
  return useMutation<void, string | number>(async (id) => {
    await batchService.delete(id);
  });
}

/**
 * Hook to fetch batches by course
 */
export function useBatchesByCourse(courseId: string | number, params?: BatchQueryParams) {
  return usePaginatedApi<Batch>(
    async (page, limit) => {
      return await batchService.getByCourseId(courseId, { ...params, page, limit });
    },
    params?.page || 1,
    params?.limit || 10
  );
}

/**
 * Hook to fetch active batches
 */
export function useActiveBatches(params?: BatchQueryParams) {
  return usePaginatedApi<Batch>(
    async (page, limit) => {
      return await batchService.getActiveBatches({ ...params, page, limit });
    },
    params?.page || 1,
    params?.limit || 10
  );
}
