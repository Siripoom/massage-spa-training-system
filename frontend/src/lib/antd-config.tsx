"use client";
import { ConfigProvider } from "antd";
import thTH from "antd/locale/th_TH";
import { ReactNode } from "react";

interface AntdConfigProps {
  children: ReactNode;
}

export default function AntdConfig({ children }: AntdConfigProps) {
  return (
    <ConfigProvider
      locale={thTH}
      theme={{
        token: {
          colorPrimary: "#5d4037",
          colorSuccess: "#52c41a",
          colorWarning: "#faad14",
          colorError: "#ff4d4f",
          colorInfo: "#1890ff",
          borderRadius: 8,
          wireframe: false,
        },
        components: {
          Button: {
            borderRadius: 8,
            controlHeight: 40,
          },
          Input: {
            borderRadius: 8,
            controlHeight: 40,
          },
          Card: {
            borderRadius: 12,
            boxShadowTertiary: "0 2px 8px rgba(0, 0, 0, 0.06)",
          },
          Menu: {
            itemBorderRadius: 8,
            itemHeight: 48,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
