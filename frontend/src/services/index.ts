/**
 * Services Index
 * Central export file for all API services
 */

// Authentication & User Services
export { default as authService } from './auth.service';
export { default as userService } from './user.service';

// Course Management Services
export { default as courseService } from './course.service';
export { default as batchService } from './batch.service';
export { default as scheduleService } from './schedule.service';

// Enrollment Services
export { default as enrollmentService } from './enrollment.service';

// Payment Services
export { default as paymentService } from './payment.service';
export { default as paymentPlanService } from './paymentPlan.service';
export { default as bankService } from './bank.service';

// Certificate Services
export { default as certificateService } from './certificate.service';
export { default as certificateTemplateService } from './certificateTemplate.service';
export { default as certificateElementService } from './certificateElement.service';

// Student Services
export { default as studentApplicationService } from './studentApplication.service';
export { default as attendanceService } from './attendance.service';

// Settings Services
export { default as themeSettingsService } from './themeSettings.service';
export { default as organizationService } from './organization.service';

// Re-export types for convenience
export type * from '@/types/api';
