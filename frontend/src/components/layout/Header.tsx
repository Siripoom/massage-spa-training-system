// src/components/layout/Header.tsx
"use client";
import React from "react";
import {
  Layout,
  Avatar,
  Dropdown,
  Button,
  Badge,
  Space,
  Typography,
} from "antd";
import {
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed: boolean;
  userRole?: 'admin' | 'teacher' | 'student';
}

export default function Header({ collapsed, userRole = 'admin' }: HeaderProps) {
  const getUserInfo = () => {
    switch (userRole) {
      case 'admin':
        return {
          name: 'ผู้ดูแลระบบ',
          email: 'admin@relaxplus.com',
          title: 'ระบบจัดการหลักสูตรฝึกอบรม RelaxPlus'
        };
      case 'teacher':
        return {
          name: 'อาจารย์สมศรี ใจดี',
          email: 'teacher@relaxplus.com',
          title: 'ระบบจัดการการสอน RelaxPlus'
        };
      case 'student':
        return {
          name: 'นักเรียน ทดสอบ',
          email: 'student@relaxplus.com',
          title: 'ระบบเรียนออนไลน์ RelaxPlus'
        };
      default:
        return {
          name: 'ผู้ใช้งาน',
          email: 'user@relaxplus.com',
          title: 'RelaxPlus'
        };
    }
  };

  const userInfo = getUserInfo();
  console.log('Header collapsed state:', collapsed); // Use collapsed parameter
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "โปรไฟล์",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "ตั้งค่า",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "ออกจากระบบ",
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      console.log("Logout clicked");
    }
  };

  return (
    <AntHeader className="relaxplus-header">
      <div className="header-left">
        <Text className="header-title">
          {userInfo.title}
        </Text>
      </div>

      <Space size="middle" className="header-right">
        <Badge count={5} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
            size="large"
            className="header-notification-btn"
          />
        </Badge>

        <Dropdown
          menu={{ items: userMenuItems, onClick: handleMenuClick }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div className="header-user-profile">
            <Avatar icon={<UserOutlined />} className="user-avatar" />
            <div className="user-info">
              <div className="user-name">{userInfo.name}</div>
              <div className="user-email">{userInfo.email}</div>
            </div>
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
}
