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
  TeamOutlined,
  FormOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter, usePathname } from "next/navigation";
import "./sidebar.css";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  userRole?: 'admin' | 'teacher' | 'student';
}

export default function Sidebar({ collapsed, onCollapse, userRole = 'admin' }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getMenuItems = (): MenuProps["items"] => {
    switch (userRole) {
      case 'admin':
        return [
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
            key: "/admin/batches",
            icon: <TeamOutlined />,
            label: "Batches",
            className: "sidebar-menu-item",
          },
          {
            key: "/admin/attendance",
            icon: <ClockCircleOutlined />,
            label: "Attendance",
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
      
      case 'teacher':
        return [
          {
            key: "/teacher/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
            className: "sidebar-menu-item",
          },
          {
            key: "/teacher/students",
            icon: <UserOutlined />,
            label: "Students",
            className: "sidebar-menu-item",
          },
          {
            key: "/teacher/evaluations",
            icon: <EditOutlined />,
            label: "Evaluations",
            className: "sidebar-menu-item",
          },
        ];
      
      case 'student':
        return [
          {
            key: "/student/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
            className: "sidebar-menu-item",
          },
          {
            key: "/student/application",
            icon: <FormOutlined />,
            label: "Apply Course",
            className: "sidebar-menu-item",
          },
          {
            key: "/student/courses",
            icon: <BookOutlined />,
            label: "My Courses",
            className: "sidebar-menu-item",
          },
          {
            key: "/student/exams",
            icon: <EditOutlined />,
            label: "Exams",
            className: "sidebar-menu-item",
          },
          {
            key: "/student/certificates",
            icon: <FileTextOutlined />,
            label: "Certificates",
            className: "sidebar-menu-item",
          },
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

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
