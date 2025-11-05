/**
 * API Configuration
 * Central configuration for API endpoints and settings
 */

export const API_CONFIG = {
  // Base URL from environment variable or fallback to default
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',

  // Request timeout in milliseconds
  TIMEOUT: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,

  // API Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
      UPDATE_PROFILE: '/auth/profile',
      CHANGE_PASSWORD: '/auth/change-password',
      REFRESH_TOKEN: '/auth/refresh-token',
    },

    // Users
    USERS: {
      BASE: '/users',
      BY_ID: (id: string | number) => `/users/${id}`,
    },

    // Courses
    COURSES: {
      BASE: '/courses',
      BY_ID: (id: string | number) => `/courses/${id}`,
    },

    // Batches
    BATCHES: {
      BASE: '/batches',
      BY_ID: (id: string | number) => `/batches/${id}`,
      NEXT_NUMBER: (courseId: string | number) => `/batches/course/${courseId}/next-number`,
    },

    // Enrollments
    ENROLLMENTS: {
      BASE: '/enrollments',
      BY_ID: (id: string | number) => `/enrollments/${id}`,
    },

    // Schedules
    SCHEDULES: {
      BASE: '/schedules',
      BY_ID: (id: string | number) => `/schedules/${id}`,
    },

    // Payments
    PAYMENTS: {
      BASE: '/payments',
      BY_ID: (id: string | number) => `/payments/${id}`,
    },

    // Payment Plans
    PAYMENT_PLANS: {
      BASE: '/payment-plans',
      BY_ID: (id: string | number) => `/payment-plans/${id}`,
    },

    // Banks
    BANKS: {
      BASE: '/banks',
      BY_ID: (id: string | number) => `/banks/${id}`,
    },

    // Certificates
    CERTIFICATES: {
      BASE: '/certificates',
      BY_ID: (id: string | number) => `/certificates/${id}`,
    },

    // Certificate Templates
    CERTIFICATE_TEMPLATES: {
      BASE: '/certificate-templates',
      BY_ID: (id: string | number) => `/certificate-templates/${id}`,
    },

    // Certificate Elements
    CERTIFICATE_ELEMENTS: {
      BASE: '/certificate-elements',
      BY_ID: (id: string | number) => `/certificate-elements/${id}`,
    },

    // Student Applications
    STUDENT_APPLICATIONS: {
      BASE: '/student-applications',
      BY_ID: (id: string | number) => `/student-applications/${id}`,
    },

    // Attendance
    ATTENDANCE: {
      BASE: '/attendance',
      BY_ID: (id: string | number) => `/attendance/${id}`,
    },

    // Theme Settings
    THEME_SETTINGS: {
      BASE: '/theme-settings',
      BY_ID: (id: string | number) => `/theme-settings/${id}`,
    },

    // Organization
    ORGANIZATION: {
      BASE: '/organization',
      BY_ID: (id: string | number) => `/organization/${id}`,
    },
  },

  // Storage keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
  },
} as const;

export default API_CONFIG;
