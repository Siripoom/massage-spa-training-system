/**
 * API Types and Interfaces
 * TypeScript definitions matching backend Prisma schema
 */

// ==================== Enums ====================

export enum Role {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
}

export enum BatchStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

// ==================== Main Models ====================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  phone: string;
  imageUrl?: string;
  birthDate?: string;
  email: string;
  password?: string; // Optional for security (not sent from backend in most cases)
  createdAt: string;
  updatedAt: string;
  address?: Address;
  certificates?: Certificate[];
  enrollments?: Enrollment[];
  attendances?: Attendance[];
  studentApplications?: StudentApplication[];
}

export interface Address {
  id: string;
  userId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  duration: number; // Total hours
  requirements?: string;
  status: string;
  registrationStart?: string;
  registrationEnd?: string;
  createdAt: string;
  updatedAt: string;
  enrollments?: Enrollment[];
  organizations?: Organization[];
  schedules?: Schedule[];
  batches?: Batch[];
  studentApplications?: StudentApplication[];
}

export interface Schedule {
  id: string;
  courseId: string;
  startTime: string;
  endTime: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  course?: Course;
}

export interface Organization {
  id: string;
  name: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  course?: Course;
}

export interface Batch {
  id: string;
  courseId: string;
  batchNumber: number;
  name: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  status: BatchStatus;
  totalHours: number;
  description?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  course?: Course;
  enrollments?: Enrollment[];
  attendances?: Attendance[];
  studentApplications?: StudentApplication[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  batchId?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  course?: Course;
  user?: User;
  batch?: Batch;
  payments?: Payment[];
  paymentPlans?: PaymentPlan[];
  attendances?: Attendance[];
}

export interface Payment {
  id: string;
  enrollmentId: string;
  paymentPlanId: string;
  amount: number;
  status: string;
  paymentType: string;
  installmentNumber: number;
  slipUrl: string[];
  transferDate?: string;
  receiptUrl?: string;
  createdAt: string;
  updatedAt: string;
  enrollment?: Enrollment;
  paymentPlan?: PaymentPlan;
}

export interface PaymentPlan {
  id: string;
  enrollmentId: string;
  installments: number;
  amount: number;
  status: string;
  dueDate: string;
  paidAmount: number;
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
  payments?: Payment[];
  enrollment?: Enrollment;
}

export interface Bank {
  id: string;
  name: string;
  accountHolder: string;
  accountNo: string;
  qrCodeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  enrollmentId: string;
  batchId: string;
  userId: string;
  date: string;
  timeIn?: string;
  timeOut?: string;
  totalHours: number;
  status: AttendanceStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  enrollment?: Enrollment;
  batch?: Batch;
  user?: User;
}

export interface StudentApplication {
  id: string;
  userId: string;
  courseId: string;
  batchId?: string;
  applicationDate: string;
  status: ApplicationStatus;
  personalInfo: any; // JSON type
  documents: string[];
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  course?: Course;
  batch?: Batch;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  templateId: string;
  certUrl: string;
  issueDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  template?: CertificateTemplate;
  user?: User;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  templateUrl: string;
  layoutData: any; // JSON type
  createdAt: string;
  updatedAt: string;
  certificates?: Certificate[];
  elements?: CertificateElement[];
}

export interface CertificateElement {
  id: string;
  templateId: string;
  type: string;
  elementKey: string;
  content: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  template?: CertificateTemplate;
}

export interface ThemeSettings {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  createdAt: string;
  updatedAt: string;
}

// ==================== API Response Types ====================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

// ==================== Auth Types ====================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken?: string;
  user: User;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  birthDate?: string;
  role?: Role;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  imageUrl?: string;
}

// ==================== Query Parameters ====================

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface CourseQueryParams extends PaginationParams {
  status?: string;
  search?: string;
}

export interface BatchQueryParams extends PaginationParams {
  courseId?: string;
  status?: BatchStatus;
  search?: string;
}

export interface UserQueryParams extends PaginationParams {
  role?: Role;
  search?: string;
}

export interface AttendanceQueryParams extends PaginationParams {
  batchId?: string;
  userId?: string;
  enrollmentId?: string;
  date?: string;
  status?: AttendanceStatus;
}

export interface PaymentQueryParams extends PaginationParams {
  enrollmentId?: string;
  status?: string;
}

// ==================== Create/Update DTOs ====================

export interface CreateCourseDto {
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  duration: number;
  requirements?: string;
  status?: string;
  registrationStart?: string;
  registrationEnd?: string;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {}

export interface CreateBatchDto {
  courseId: string;
  batchNumber: number;
  name: string;
  startDate: string;
  endDate: string;
  maxStudents?: number;
  totalHours?: number;
  description?: string;
  location?: string;
  status?: BatchStatus;
}

export interface UpdateBatchDto extends Partial<CreateBatchDto> {}

export interface CreateEnrollmentDto {
  userId: string;
  courseId: string;
  batchId?: string;
  status?: string;
}

export interface UpdateEnrollmentDto extends Partial<CreateEnrollmentDto> {}

export interface CreatePaymentDto {
  enrollmentId: string;
  paymentPlanId: string;
  amount: number;
  paymentType: string;
  installmentNumber: number;
  slipUrl: string[];
  transferDate?: string;
  status?: string;
}

export interface UpdatePaymentDto extends Partial<CreatePaymentDto> {}

export interface CreateAttendanceDto {
  enrollmentId: string;
  batchId: string;
  userId: string;
  date: string;
  timeIn?: string;
  timeOut?: string;
  totalHours?: number;
  status?: AttendanceStatus;
  notes?: string;
}

export interface UpdateAttendanceDto extends Partial<CreateAttendanceDto> {}

export interface CreateStudentApplicationDto {
  userId: string;
  courseId: string;
  batchId?: string;
  personalInfo: any;
  documents: string[];
  notes?: string;
}

export interface UpdateStudentApplicationDto extends Partial<CreateStudentApplicationDto> {
  status?: ApplicationStatus;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface CreateCertificateDto {
  userId: string;
  courseId: string;
  templateId: string;
  certUrl: string;
  issueDate: string;
  status?: string;
}

export interface UpdateCertificateDto extends Partial<CreateCertificateDto> {}

export interface CreateBankDto {
  name: string;
  accountHolder: string;
  accountNo: string;
  qrCodeUrl?: string;
}

export interface UpdateBankDto extends Partial<CreateBankDto> {}

// ==================== Utility Types ====================

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}
