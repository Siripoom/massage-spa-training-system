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
}

export default function Header({ collapsed }: HeaderProps) {
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
          ระบบจัดการหลักสูตรฝึกอบรม RelaxPlus
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
              <div className="user-name">ผู้ดูแลระบบ</div>
              <div className="user-email">admin@relaxplus.com</div>
            </div>
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
}
