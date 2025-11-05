/**
 * Course Hooks
 * Custom hooks for course-related API operations
 */

import { courseService } from '@/services';
import { usePaginatedApi, useMutation } from './useApi';
import type { Course, CourseQueryParams, CreateCourseDto, UpdateCourseDto } from '@/types/api';

/**
 * Hook to fetch all courses with pagination
 */
export function useCourses(params?: CourseQueryParams) {
  return usePaginatedApi<Course>(
    async (page, limit) => {
      return await courseService.getAll({ ...params, page, limit });
    },
    params?.page || 1,
    params?.limit || 10
  );
}

/**
 * Hook to create a course
 */
export function useCreateCourse() {
  return useMutation<Course, CreateCourseDto>(async (courseData) => {
    return await courseService.create(courseData);
  });
}

/**
 * Hook to update a course
 */
export function useUpdateCourse() {
  return useMutation<Course, { id: string | number; data: UpdateCourseDto }>(
    async ({ id, data }) => {
      return await courseService.update(id, data);
    }
  );
}

/**
 * Hook to delete a course
 */
export function useDeleteCourse() {
  return useMutation<void, string | number>(async (id) => {
    await courseService.delete(id);
  });
}

/**
 * Hook to search courses
 */
export function useSearchCourses() {
  return useMutation<any, { searchTerm: string; params?: CourseQueryParams }>(
    async ({ searchTerm, params }) => {
      return await courseService.search(searchTerm, params);
    }
  );
}

/**
 * Hook to fetch active courses
 */
export function useActiveCourses(params?: CourseQueryParams) {
  return usePaginatedApi<Course>(
    async (page, limit) => {
      return await courseService.getActiveCourses({ ...params, page, limit });
    },
    params?.page || 1,
    params?.limit || 10
  );
}
