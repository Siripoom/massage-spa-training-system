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
  userRole?: 'admin' | 'teacher' | 'student';
}

export default function AppLayout({ children, userRole = 'admin' }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="relaxplus-layout">
      <Sidebar collapsed={collapsed} onCollapse={handleCollapse} userRole={userRole} />

      <Layout>
        <Header collapsed={collapsed} userRole={userRole} />

        <Content className="relaxplus-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
