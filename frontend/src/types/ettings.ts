// src/types/settings.ts
export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  shadowLevel: "none" | "light" | "medium" | "strong";
}

export interface TypographySettings {
  fontFamily: string;
  fontSize: number;
  headingFontSize: number;
  lineHeight: number;
  fontWeight: "light" | "normal" | "medium" | "semibold" | "bold";
}

export interface LayoutSettings {
  sidebarWidth: number;
  headerHeight: number;
  contentPadding: number;
  cardSpacing: number;
}

export interface AppSettings {
  theme: ThemeSettings;
  typography: TypographySettings;
  layout: LayoutSettings;
}

export interface SchoolSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  registrationNumber: string;
  director: string;
  establishedYear: number;
}
