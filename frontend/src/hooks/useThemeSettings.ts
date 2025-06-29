"use client";
import { useState, useEffect } from "react";
import { message } from "antd";
import type { AppSettings } from "@/types/settings";

const defaultSettings: AppSettings = {
  theme: {
    primaryColor: "#1890ff",
    secondaryColor: "#52c41a",
    backgroundColor: "#f8fafc",
    textColor: "#334155",
    borderRadius: 8,
    shadowLevel: "medium",
  },
  typography: {
    fontFamily: "Inter",
    fontSize: 14,
    headingFontSize: 24,
    lineHeight: 1.5,
    fontWeight: "normal",
  },
  layout: {
    sidebarWidth: 280,
    headerHeight: 72,
    contentPadding: 24,
    cardSpacing: 24,
  },
};

export function useThemeSettings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("relaxplus-settings");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      message.error("เกิดข้อผิดพลาดในการโหลดการตั้งค่า");
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", settings.theme.primaryColor);
    root.style.setProperty("--secondary-color", settings.theme.secondaryColor);
    root.style.setProperty(
      "--background-color",
      settings.theme.backgroundColor
    );
    root.style.setProperty("--text-color", settings.theme.textColor);
    root.style.setProperty(
      "--border-radius",
      `${settings.theme.borderRadius}px`
    );
    root.style.setProperty("--font-family", settings.typography.fontFamily);
    root.style.setProperty("--font-size", `${settings.typography.fontSize}px`);
    root.style.setProperty(
      "--heading-font-size",
      `${settings.typography.headingFontSize}px`
    );
    root.style.setProperty(
      "--line-height",
      settings.typography.lineHeight.toString()
    );
    root.style.setProperty(
      "--sidebar-width",
      `${settings.layout.sidebarWidth}px`
    );
    root.style.setProperty(
      "--header-height",
      `${settings.layout.headerHeight}px`
    );
    root.style.setProperty(
      "--content-padding",
      `${settings.layout.contentPadding}px`
    );
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
      theme: { ...prev.theme, ...(newSettings.theme || {}) },
      typography: { ...prev.typography, ...(newSettings.typography || {}) },
      layout: { ...prev.layout, ...(newSettings.layout || {}) },
    }));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem("relaxplus-settings", JSON.stringify(settings));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("บันทึกการตั้งค่าเรียบร้อยแล้ว");
      return true;
    } catch (error) {
      console.error("Error saving settings:", error);
      message.error("เกิดข้อผิดพลาดในการบันทึก");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("relaxplus-settings");
    message.info("รีเซ็ตการตั้งค่าเรียบร้อยแล้ว");
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "relaxplus-settings.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    message.success("ส่งออกการตั้งค่าเรียบร้อยแล้ว");
  };

  const importSettings = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const importedSettings = JSON.parse(result);
          setSettings({ ...defaultSettings, ...importedSettings });
          message.success("นำเข้าการตั้งค่าเรียบร้อยแล้ว");
          resolve(true);
        } catch (error) {
          console.error("Error importing settings:", error);
          message.error("ไฟล์การตั้งค่าไม่ถูกต้อง");
          reject(error);
        }
      };
      reader.onerror = () => {
        message.error("เกิดข้อผิดพลาดในการอ่านไฟล์");
        reject(new Error("File read error"));
      };
      reader.readAsText(file);
    });
  };

  return {
    settings,
    loading,
    saving,
    updateSettings,
    saveSettings,
    resetSettings,
    exportSettings,
    importSettings,
  };
}
