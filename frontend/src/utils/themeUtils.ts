export const fontFamilyOptions = [
  { label: "Inter (Modern)", value: "Inter", preview: "Aa" },
  { label: "Roboto (Clean)", value: "Roboto", preview: "Aa" },
  { label: "Poppins (Friendly)", value: "Poppins", preview: "Aa" },
  { label: "Nunito (Rounded)", value: "Nunito", preview: "Aa" },
  {
    label: "Source Sans Pro (Professional)",
    value: "Source Sans Pro",
    preview: "Aa",
  },
  { label: "Sarabun (Thai)", value: "Sarabun", preview: "อก" },
  { label: "Noto Sans Thai", value: "Noto Sans Thai", preview: "อก" },
  { label: "Prompt (Thai Modern)", value: "Prompt", preview: "อก" },
];

export const fontWeightOptions = [
  { label: "เบา (Light)", value: "light", weight: 300 },
  { label: "ปกติ (Regular)", value: "normal", weight: 400 },
  { label: "กลาง (Medium)", value: "medium", weight: 500 },
  { label: "หนา (Semi Bold)", value: "semibold", weight: 600 },
  { label: "หนามาก (Bold)", value: "bold", weight: 700 },
];

export const shadowLevelOptions = [
  {
    label: "ไม่มีเงา",
    value: "none",
    shadow: "none",
  },
  {
    label: "เบา",
    value: "light",
    shadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  {
    label: "กลาง",
    value: "medium",
    shadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  },
  {
    label: "เข้ม",
    value: "strong",
    shadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
  },
];

export const borderRadiusOptions = [
  { label: "ไม่มีมุมโค้ง (0px)", value: 0 },
  { label: "เล็ก (4px)", value: 4 },
  { label: "กลาง (8px)", value: 8 },
  { label: "ใหญ่ (12px)", value: 12 },
  { label: "ใหญ่มาก (16px)", value: 16 },
  { label: "โค้งมาก (24px)", value: 24 },
];

export const colorPresets = {
  blue: {
    primary: "#1890ff",
    secondary: "#52c41a",
    name: "น้ำเงิน (ค่าเริ่มต้น)",
  },
  green: { primary: "#52c41a", secondary: "#1890ff", name: "เขียว" },
  purple: { primary: "#722ed1", secondary: "#52c41a", name: "ม่วง" },
  red: { primary: "#f5222d", secondary: "#fa8c16", name: "แดง" },
  orange: { primary: "#fa8c16", secondary: "#52c41a", name: "ส้ม" },
  pink: { primary: "#eb2f96", secondary: "#52c41a", name: "ชมพู" },
  cyan: { primary: "#13c2c2", secondary: "#52c41a", name: "ฟ้าอมเขียว" },
  brown: {
    primary: "#8b4513",
    secondary: "#52c41a",
    name: "น้ำตาล (RelaxPlus)",
  },
};
