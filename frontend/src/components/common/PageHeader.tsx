"use client";
import React from "react";
import { Typography, Breadcrumb, Space, Button } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import type { BreadcrumbProps } from "antd";

const { Title, Text } = Typography;

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbProps["items"];
  extra?: React.ReactNode;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonText?: string;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  extra,
  showAddButton = false,
  onAddClick,
  addButtonText = "เพิ่มใหม่",
}: PageHeaderProps) {
  const defaultBreadcrumbs = [
    {
      href: "/admin/dashboard",
      title: <HomeOutlined />,
    },
    {
      title: title,
    },
  ];

  return (
    <div className="mb-8">
      <Breadcrumb items={breadcrumbs || defaultBreadcrumbs} className="mb-4" />

      <div className="flex justify-between items-start">
        <div>
          <Title level={1} className="!m-0 !text-3xl !font-bold !text-gray-800">
            {title}
          </Title>
          {description && (
            <Text type="secondary" className="text-base mt-2 block">
              {description}
            </Text>
          )}
        </div>

        <Space>
          {showAddButton && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onAddClick}
              size="large"
              className="!bg-[#1890ff] !border-[#1890ff] hover:!bg-[#096dd9]"
            >
              {addButtonText}
            </Button>
          )}
          {extra}
        </Space>
      </div>
    </div>
  );
}
