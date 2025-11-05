"use client";

import React from "react";
import { Card, Row, Col, Button, Typography, Space, Badge } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export interface CourseType {
  id: string;
  name: string;
  ministry: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

interface CourseTypeSelectorProps {
  courseTypes: CourseType[];
  selectedType?: string;
  onSelect: (courseTypeId: string) => void;
}

const CourseTypeSelector: React.FC<CourseTypeSelectorProps> = ({
  courseTypes,
  selectedType,
  onSelect,
}) => {
  return (
    <div>
      <Title
        level={4}
        style={{ textAlign: "center", marginBottom: 32, color: "#1f2937" }}
      >
        เลือกประเภทหลักสูตรที่ต้องการสมัคร
      </Title>

      <Row gutter={[24, 24]} justify="center">
        {courseTypes.map((courseType) => (
          <Col xs={24} lg={12} key={courseType.id}>
            <Card
              hoverable
              style={{
                height: "100%",
                borderRadius: "16px",
                border:
                  selectedType === courseType.id
                    ? `2px solid ${courseType.color}`
                    : "1px solid #e2e8f0",
                boxShadow:
                  selectedType === courseType.id
                    ? `0 8px 32px ${courseType.color}20`
                    : "0 4px 20px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              styles={{
                body: {
                  padding: "32px",
                  textAlign: "center",
                },
              }}
              onClick={() => onSelect(courseType.id)}
            >
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                {/* Icon and Ministry Badge */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: `${courseType.color}15`,
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      fontSize: "32px",
                      color: courseType.color,
                    }}
                  >
                    {courseType.icon}
                  </div>
                  {selectedType === courseType.id && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "24px",
                        height: "24px",
                        backgroundColor: courseType.color,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      <CheckOutlined />
                    </div>
                  )}
                </div>

                {/* Course Type Name */}
                <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
                  {courseType.name}
                </Title>

                {/* Ministry Badge */}
                <Badge
                  color={courseType.color}
                  text={
                    <Text strong style={{ color: courseType.color }}>
                      {courseType.ministry}
                    </Text>
                  }
                />

                {/* Description */}
                <Text type="secondary" style={{ lineHeight: 1.6 }}>
                  {courseType.description}
                </Text>

                {/* Features */}
                <div style={{ textAlign: "left", width: "100%" }}>
                  <Text
                    strong
                    style={{
                      color: "#374151",
                      marginBottom: 8,
                      display: "block",
                    }}
                  >
                    จุดเด่นของหลักสูตร:
                  </Text>
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: "100%" }}
                  >
                    {courseType.features.map((feature, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <CheckOutlined
                          style={{
                            color: courseType.color,
                            fontSize: "12px",
                            marginRight: "8px",
                          }}
                        />
                        <Text style={{ fontSize: "14px", color: "#6b7280" }}>
                          {feature}
                        </Text>
                      </div>
                    ))}
                  </Space>
                </div>

                {/* Select Button */}
                <Button
                  type={selectedType === courseType.id ? "primary" : "default"}
                  size="large"
                  style={{
                    width: "100%",
                    height: "48px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    marginTop: "16px",
                    backgroundColor:
                      selectedType === courseType.id
                        ? courseType.color
                        : "white",
                    borderColor:
                      selectedType === courseType.id
                        ? courseType.color
                        : "#d1d5db",
                    boxShadow:
                      selectedType === courseType.id
                        ? `0 4px 12px ${courseType.color}30`
                        : "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(courseType.id);
                  }}
                >
                  {selectedType === courseType.id ? (
                    <>
                      <CheckOutlined /> เลือกแล้ว
                    </>
                  ) : (
                    "เลือกประเภทนี้"
                  )}
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CourseTypeSelector;
