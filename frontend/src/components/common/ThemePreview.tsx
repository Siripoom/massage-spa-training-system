// src/components/common/ThemePreview.tsx
"use client";
import React from "react";
import { Card, Button, Typography, Space, Tag } from "antd";
import {
  StarOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import type { AppSettings } from "@/types/settings";

const { Title, Text, Paragraph } = Typography;

interface ThemePreviewProps {
  settings: AppSettings;
}

export default function ThemePreview({ settings }: ThemePreviewProps) {
  const { theme, typography } = settings;

  const previewStyle = {
    backgroundColor: theme.backgroundColor,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight,
    borderRadius: theme.borderRadius,
    border: `2px dashed ${theme.primaryColor}`,
    minHeight: "300px",
  };

  const buttonStyle = {
    backgroundColor: theme.primaryColor,
    borderColor: theme.primaryColor,
    borderRadius: theme.borderRadius,
  };

  const secondaryButtonStyle = {
    borderColor: theme.secondaryColor,
    color: theme.secondaryColor,
    borderRadius: theme.borderRadius,
  };

  return (
    <div style={previewStyle} className="p-6 relative overflow-hidden">
      <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
        PREVIEW
      </div>

      <Title
        level={3}
        style={{
          color: theme.textColor,
          fontSize: typography.headingFontSize,
          fontWeight:
            typography.fontWeight === "normal"
              ? 400
              : typography.fontWeight === "medium"
              ? 500
              : typography.fontWeight === "semibold"
              ? 600
              : typography.fontWeight === "bold"
              ? 700
              : 300,
          marginBottom: 16,
          fontFamily: typography.fontFamily,
        }}
      >
        ตัวอย่างหัวข้อหลัก
      </Title>

      <Paragraph style={{ color: theme.textColor, marginBottom: 20 }}>
        นี่คือตัวอย่างเนื้อหาที่ใช้การตั้งค่าธีมและตัวอักษรที่คุณเลือก
        คุณสามารถปรับเปลี่ยนค่าต่างๆ เพื่อดูผลลัพธ์แบบเรียลไทม์
        ระบบจะแสดงผลตามการตั้งค่าที่คุณกำหนด
      </Paragraph>

      <Space wrap className="mb-4">
        <Tag color={theme.primaryColor}>หลักสูตรยอดนิยม</Tag>
        <Tag color={theme.secondaryColor}>แนะนำ</Tag>
        <Tag>ปกติ</Tag>
      </Space>

      <Space wrap>
        <Button type="primary" icon={<StarOutlined />} style={buttonStyle}>
          ปุ่มหลัก
        </Button>
        <Button icon={<HeartOutlined />} style={secondaryButtonStyle}>
          ปุ่มรอง
        </Button>
        <Button
          type="text"
          icon={<ShareAltOutlined />}
          style={{ color: theme.textColor }}
        >
          แชร์
        </Button>
      </Space>

      <div
        className="mt-6 p-4 bg-white bg-opacity-50 rounded"
        style={{ borderRadius: theme.borderRadius }}
      >
        <Text strong style={{ color: theme.textColor }}>
          Card ตัวอย่าง
        </Text>
        <br />
        <Text type="secondary" style={{ color: theme.textColor, opacity: 0.7 }}>
          เนื้อหาภายใน Card จะแสดงผลตามธีมที่เลือก
        </Text>
      </div>
    </div>
  );
}
