// src/components/layout/AppLayout.tsx
"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./layout.css";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="relaxplus-layout">
      <Sidebar collapsed={collapsed} onCollapse={handleCollapse} />

      <Layout>
        <Header collapsed={collapsed} />

        <Content className="relaxplus-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
