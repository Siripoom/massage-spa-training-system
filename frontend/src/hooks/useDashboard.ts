/**
 * Dashboard Hooks
 * Custom hooks for dashboard API calls with React Query
 */

import { useQuery } from '@tanstack/react-query';
import dashboardService from '@/services/dashboard.service';

/**
 * Hook for fetching dashboard statistics
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardService.getStats(),
    staleTime: 60000, // 1 minute
  });
};

/**
 * Hook for fetching recent activities
 */
export const useDashboardActivities = (limit: number = 10) => {
  return useQuery({
    queryKey: ['dashboard-activities', limit],
    queryFn: () => dashboardService.getActivities(limit),
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook for fetching course progress
 */
export const useDashboardCourseProgress = (limit: number = 5) => {
  return useQuery({
    queryKey: ['dashboard-course-progress', limit],
    queryFn: () => dashboardService.getCourseProgress(limit),
    staleTime: 60000, // 1 minute
  });
};
