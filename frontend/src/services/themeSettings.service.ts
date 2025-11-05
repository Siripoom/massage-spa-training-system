/**
 * Theme Settings Service
 * Handle theme settings management API calls (CRUD operations)
 */

import axiosInstance from '@/lib/axios';
import API_CONFIG from '@/config/api.config';
import { buildQueryString } from '@/utils/api.utils';
import type {
  ThemeSettings,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api';

interface CreateThemeSettingsDto {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
}

interface UpdateThemeSettingsDto extends Partial<CreateThemeSettingsDto> {}

class ThemeSettingsService {
  /**
   * Get all theme settings with optional filters
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<ThemeSettings>> {
    const queryString = params ? buildQueryString(params) : '';
    const response = await axiosInstance.get<PaginatedResponse<ThemeSettings>>(
      `${API_CONFIG.ENDPOINTS.THEME_SETTINGS.BASE}${queryString}`
    );
    return response.data;
  }

  /**
   * Get theme settings by ID
   */
  async getById(id: string | number): Promise<ThemeSettings> {
    const response = await axiosInstance.get<ApiResponse<ThemeSettings>>(
      API_CONFIG.ENDPOINTS.THEME_SETTINGS.BY_ID(id)
    );
    return response.data.data as ThemeSettings;
  }

  /**
   * Create new theme settings
   */
  async create(data: CreateThemeSettingsDto): Promise<ThemeSettings> {
    const response = await axiosInstance.post<ApiResponse<ThemeSettings>>(
      API_CONFIG.ENDPOINTS.THEME_SETTINGS.BASE,
      data
    );
    return response.data.data as ThemeSettings;
  }

  /**
   * Update theme settings by ID
   */
  async update(id: string | number, data: UpdateThemeSettingsDto): Promise<ThemeSettings> {
    const response = await axiosInstance.put<ApiResponse<ThemeSettings>>(
      API_CONFIG.ENDPOINTS.THEME_SETTINGS.BY_ID(id),
      data
    );
    return response.data.data as ThemeSettings;
  }

  /**
   * Delete theme settings by ID
   */
  async delete(id: string | number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(
      API_CONFIG.ENDPOINTS.THEME_SETTINGS.BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get active theme settings
   */
  async getActiveTheme(): Promise<ThemeSettings | null> {
    try {
      const response = await axiosInstance.get<ApiResponse<ThemeSettings>>(
        `${API_CONFIG.ENDPOINTS.THEME_SETTINGS.BASE}/active`
      );
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching active theme:', error);
      return null;
    }
  }

  /**
   * Set theme as active
   */
  async setActive(id: string | number): Promise<ThemeSettings> {
    const response = await axiosInstance.put<ApiResponse<ThemeSettings>>(
      `${API_CONFIG.ENDPOINTS.THEME_SETTINGS.BY_ID(id)}/set-active`,
      {}
    );
    return response.data.data as ThemeSettings;
  }
}

// Export singleton instance
const themeSettingsService = new ThemeSettingsService();
export default themeSettingsService;
