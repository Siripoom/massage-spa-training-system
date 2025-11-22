/**
 * Dashboard Service
 * Handle dashboard statistics API calls
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import type { ApiResponse } from '@/types/api';

interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalActiveBatches: number;
  totalEnrollments: number;
  totalPayments: number;
  totalRevenue: number;
  recentStudents: number;
  trends: {
    students: {
      value: number;
      isUp: boolean;
    };
  };
}

interface Activity {
  type: string;
  title: string;
  description: string;
  time: string;
  avatar: string;
  color: string;
}

interface CourseProgress {
  id: string;
  name: string;
  courseName: string;
  progress: number;
  students: number;
  maxStudents: number;
  totalHours: number;
  status: string;
}

class DashboardService {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<DashboardStats> {
    const response = await axiosInstance.get<ApiResponse<DashboardStats>>(
      `${API_CONFIG.ENDPOINTS.DASHBOARD}/stats`
    );
    return response.data.data as DashboardStats;
  }

  /**
   * Get recent activities
   */
  async getActivities(limit: number = 10): Promise<Activity[]> {
    const response = await axiosInstance.get<ApiResponse<Activity[]>>(
      `${API_CONFIG.ENDPOINTS.DASHBOARD}/activities?limit=${limit}`
    );
    return response.data.data as Activity[];
  }

  /**
   * Get course progress overview
   */
  async getCourseProgress(limit: number = 5): Promise<CourseProgress[]> {
    const response = await axiosInstance.get<ApiResponse<CourseProgress[]>>(
      `${API_CONFIG.ENDPOINTS.DASHBOARD}/course-progress?limit=${limit}`
    );
    return response.data.data as CourseProgress[];
  }
}

// Export singleton instance
const dashboardService = new DashboardService();
export default dashboardService;
