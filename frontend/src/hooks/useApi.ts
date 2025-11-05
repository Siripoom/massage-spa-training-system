/**
 * Custom Hooks for API Services
 * Provides data fetching, loading states, and error handling
 */

import { useState, useEffect, useCallback } from 'react';
import { handleError } from '@/lib/errorHandler';

// Generic API hook with loading and error states
export function useApi<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = [],
  executeOnMount: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(executeOnMount);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    if (executeOnMount) {
      execute();
    }
  }, [execute, executeOnMount]);

  const refetch = () => execute();

  return { data, loading, error, refetch, execute };
}

// Hook for mutations (POST, PUT, DELETE)
export function useMutation<TData, TVariables = void>(
  mutationFunction: (variables: TVariables) => Promise<TData>
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: TVariables) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFunction(variables);
      setData(result);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { mutate, data, loading, error, reset };
}

// Hook for paginated data
export function usePaginatedApi<T>(
  apiFunction: (page: number, limit: number) => Promise<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>,
  initialPage: number = 1,
  initialLimit: number = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (page: number = pagination.page, limit: number = pagination.limit) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(page, limit);
        setData(result.data);
        setPagination(result.pagination);
      } catch (err) {
        const error = err as Error;
        setError(error);
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  useEffect(() => {
    fetchData(initialPage, initialLimit);
  }, []);

  const goToPage = (page: number) => {
    fetchData(page, pagination.limit);
  };

  const changePageSize = (limit: number) => {
    fetchData(1, limit);
  };

  const refetch = () => fetchData(pagination.page, pagination.limit);

  return {
    data,
    pagination,
    loading,
    error,
    goToPage,
    changePageSize,
    refetch,
  };
}

// Hook for infinite scroll / load more
export function useInfiniteApi<T>(
  apiFunction: (page: number, limit: number) => Promise<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>,
  limit: number = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMore = async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(page, limit);
      setData((prev) => [...prev, ...result.data]);
      setHasMore(page < result.pagination.totalPages);
      setPage((prev) => prev + 1);
    } catch (err) {
      const error = err as Error;
      setError(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMore();
  }, []);

  const reset = () => {
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  return { data, loading, error, hasMore, fetchMore, reset };
}

export default useApi;
