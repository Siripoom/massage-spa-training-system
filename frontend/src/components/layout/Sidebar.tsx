// src/components/layout/Sidebar.tsx
"use client";
import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  EditOutlined,
  DollarOutlined,
  FileTextOutlined,
  SettingOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter, usePathname } from "next/navigation";
import "./sidebar.css";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems: MenuProps["items"] = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      className: "sidebar-menu-item",
    },
    {
      key: "/admin/courses",
      icon: <BookOutlined />,
      label: "Course",
      className: "sidebar-menu-item",
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "Student",
      className: "sidebar-menu-item",
    },
    {
      key: "/admin/quiz",
      icon: <EditOutlined />,
      label: "Quiz",
      className: "sidebar-menu-item",
    },
    {
      key: "/admin/payment",
      icon: <DollarOutlined />,
      label: "Payment",
      className: "sidebar-menu-item",
    },
    {
      key: "/admin/certificate",
      icon: <FileTextOutlined />,
      label: "Certificate",
      className: "sidebar-menu-item",
    },
    {
      key: "/admin/setting",
      icon: <SettingOutlined />,
      label: "Setting",
      className: "sidebar-menu-item",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key.startsWith("/")) {
      router.push(e.key);
    }
  };

  const getSelectedKeys = () => {
    return [pathname];
  };

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        collapsedWidth={80}
        className="relaxplus-sidebar"
      >
        {/* Logo Section */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              className="logo-svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1890ff"
                strokeWidth="3"
              />
              {/* Woman silhouette */}
              <path
                d="M35 30C35 25 40 20 45 20C50 20 55 25 55 30C55 35 50 40 45 40C40 40 35 35 35 30Z"
                fill="#1890ff"
              />
              <path
                d="M30 45C30 40 35 35 45 35C55 35 60 40 60 45C60 50 55 55 45 55C35 55 30 50 30 45Z"
                fill="#1890ff"
              />
              {/* Leaves */}
              <path
                d="M60 25C65 20 70 25 68 30C66 35 60 32 60 25Z"
                fill="#52c41a"
              />
              <path
                d="M62 35C67 30 72 35 70 40C68 45 62 42 62 35Z"
                fill="#52c41a"
              />
              <path
                d="M55 15C58 10 63 12 62 18C61 24 55 22 55 15Z"
                fill="#52c41a"
              />
            </svg>
          </div>
          {!collapsed && <div className="logo-text">RelaxPlus</div>}
        </div>

        {/* Menu Section */}
        <div className="sidebar-menu">
          <Menu
            mode="inline"
            selectedKeys={getSelectedKeys()}
            items={menuItems}
            onClick={handleMenuClick}
            className="relaxplus-menu"
          />
        </div>

        {/* Collapse Button */}
        <div
          className="sidebar-collapse-btn"
          onClick={() => onCollapse(!collapsed)}
        >
          <LeftOutlined
            style={{
              transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      </Sider>
    </>
  );
}
