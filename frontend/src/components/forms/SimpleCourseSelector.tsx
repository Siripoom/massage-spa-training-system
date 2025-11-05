"use client";

import React from "react";
import { Card, Row, Col, Button, Typography, Modal, Alert } from "antd";
import {
  BookOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export interface Course {
  id: string;
  title: string;
  duration: number;
  price: number;
  description?: string;
  courseTypeId: string;
}

interface SimpleCourseSelector {
  courses: Course[];
  selectedCourse?: Course | null;
  courseModalOpen: boolean;
  onCourseSelect: (courseId: string) => void;
  onOpenCourseModal: () => void;
  onCloseCourseModal: () => void;
}

const SimpleCourseSelector: React.FC<SimpleCourseSelector> = ({
  courses,
  selectedCourse,
  courseModalOpen,
  onCourseSelect,
  onOpenCourseModal,
  onCloseCourseModal,
}) => {
  return (
    <div>
      <Alert
        message="ข้อมูลสำคัญ"
        description="กรุณาเลือกหลักสูตรที่ต้องการ หลังจากส่งใบสมัครแล้วจะไม่สามารถเปลี่ยนแปลงได้"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* Course Selection */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <BookOutlined style={{ color: "#5d4037", fontSize: "20px" }} />
          <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
            หลักสูตรที่สนใจ
          </Title>
          <span style={{ color: "#ff4d4f" }}>*</span>
        </div>

        <Button
          size="large"
          onClick={onOpenCourseModal}
          style={{
            width: "100%",
            height: "auto",
            minHeight: "80px",
            borderRadius: "12px",
            border: selectedCourse ? "2px solid #5d4037" : "2px dashed #d1d5db",
            backgroundColor: selectedCourse ? "#5d403715" : "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {selectedCourse ? (
            <>
              <CheckOutlined
                style={{
                  color: "#5d4037",
                  fontSize: "20px",
                  marginBottom: "8px",
                }}
              />
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#5d4037",
                }}
              >
                {selectedCourse.title}
              </Text>
              <Text type="secondary" style={{ fontSize: "14px" }}>
                {selectedCourse.duration} ชั่วโมง | ราคา{" "}
                {selectedCourse.price.toLocaleString()} บาท
              </Text>
            </>
          ) : (
            <>
              <BookOutlined
                style={{
                  fontSize: "20px",
                  marginBottom: "8px",
                  color: "#9ca3af",
                }}
              />
              <Text style={{ fontSize: "16px", color: "#6b7280" }}>
                คลิกเพื่อเลือกหลักสูตร
              </Text>
            </>
          )}
        </Button>
      </div>

      {/* Course Selection Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BookOutlined style={{ color: "#5d4037" }} />
            เลือกหลักสูตรที่ต้องการสมัคร
          </div>
        }
        open={courseModalOpen}
        onCancel={onCloseCourseModal}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        <Row gutter={[16, 16]}>
          {courses.map((course) => (
            <Col xs={24} sm={12} lg={8} key={course.id}>
              <Card
                hoverable
                size="small"
                style={{
                  height: "100%",
                  borderRadius: "12px",
                  border:
                    selectedCourse?.id === course.id
                      ? "2px solid #5d4037"
                      : "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
                styles={{ body: { padding: "20px" } }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#5d4037",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    <BookOutlined />
                  </div>

                  <Title
                    level={5}
                    style={{
                      margin: "0 0 12px 0",
                      minHeight: "48px",
                      color: "#1f2937",
                    }}
                  >
                    {course.title}
                  </Title>

                  <div style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <ClockCircleOutlined
                        style={{ color: "#10b981", marginRight: "6px" }}
                      />
                      <Text style={{ color: "#374151", fontSize: "14px" }}>
                        {course.duration} ชั่วโมง
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DollarOutlined
                        style={{ color: "#f59e0b", marginRight: "6px" }}
                      />
                      <Text
                        style={{
                          color: "#374151",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {course.price.toLocaleString()} บาท
                      </Text>
                    </div>
                  </div>

                  <Button
                    type={
                      selectedCourse?.id === course.id ? "primary" : "default"
                    }
                    size="large"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      fontWeight: "600",
                      backgroundColor:
                        selectedCourse?.id === course.id ? "#5d4037" : "white",
                      borderColor:
                        selectedCourse?.id === course.id
                          ? "#5d4037"
                          : "#d1d5db",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCourseSelect(course.id);
                    }}
                  >
                    {selectedCourse?.id === course.id ? (
                      <>
                        <CheckOutlined /> เลือกแล้ว
                      </>
                    ) : (
                      "เลือกหลักสูตรนี้"
                    )}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  );
};

export default SimpleCourseSelector;
