"use client";

import React from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Modal,
  Progress,
  Alert,
} from "antd";
import {
  BookOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  CalendarOutlined,
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

export interface Batch {
  id: number;
  batchNumber: number;
  name: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  status: string;
}

interface CourseSelectorProps {
  courses: Course[];
  batches: Batch[];
  selectedCourse?: Course | null;
  selectedBatchId?: number | null;
  courseModalOpen: boolean;
  batchModalOpen: boolean;
  onCourseSelect: (courseId: string) => void;
  onBatchSelect: (batchId: number) => void;
  onOpenCourseModal: () => void;
  onCloseCourseModal: () => void;
  onOpenBatchModal: () => void;
  onCloseBatchModal: () => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({
  courses,
  batches,
  selectedCourse,
  selectedBatchId,
  courseModalOpen,
  batchModalOpen,
  onCourseSelect,
  onBatchSelect,
  onOpenCourseModal,
  onCloseCourseModal,
  onOpenBatchModal,
  onCloseBatchModal,
}) => {
  return (
    <div>
      <Alert
        message="ข้อมูลสำคัญ"
        description="กรุณาเลือกหลักสูตรและรุ่นเรียนที่ต้องการ หลังจากส่งใบสมัครแล้วจะไม่สามารถเปลี่ยนแปลงได้"
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

      {/* Batch Selection - Show only when course is selected */}
      {selectedCourse && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <CalendarOutlined style={{ color: "#5d4037", fontSize: "20px" }} />
            <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
              รุ่นเรียนที่สนใจ
            </Title>
            <span style={{ color: "#ff4d4f" }}>*</span>
          </div>

          <Button
            size="large"
            onClick={onOpenBatchModal}
            disabled={!selectedCourse}
            style={{
              width: "100%",
              height: "auto",
              minHeight: "80px",
              borderRadius: "12px",
              border: selectedBatchId
                ? "2px solid #5d4037"
                : "2px dashed #d1d5db",
              backgroundColor: selectedBatchId ? "#5d403715" : "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            {selectedBatchId ? (
              <>
                <CheckOutlined
                  style={{
                    color: "#5d4037",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                />
                {(() => {
                  const batch = batches.find((b) => b.id === selectedBatchId);
                  return batch ? (
                    <>
                      <Text
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#5d4037",
                        }}
                      >
                        {batch.name}
                      </Text>
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {batch.startDate} - {batch.endDate}
                      </Text>
                    </>
                  ) : null;
                })()}
              </>
            ) : (
              <>
                <CalendarOutlined
                  style={{
                    fontSize: "20px",
                    marginBottom: "8px",
                    color: "#9ca3af",
                  }}
                />
                <Text style={{ fontSize: "16px", color: "#6b7280" }}>
                  คลิกเพื่อเลือกรุ่นเรียน
                </Text>
              </>
            )}
          </Button>
        </div>
      )}

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

      {/* Batch Selection Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CalendarOutlined style={{ color: "#5d4037" }} />
            เลือกรุ่นเรียนที่ต้องการสมัคร
          </div>
        }
        open={batchModalOpen}
        onCancel={onCloseBatchModal}
        footer={null}
        width={900}
        style={{ top: 20 }}
      >
        <Row gutter={[16, 16]}>
          {batches.map((batch) => (
            <Col xs={24} lg={12} key={batch.id}>
              <Card
                hoverable
                size="small"
                style={{
                  borderRadius: "12px",
                  border:
                    selectedBatchId === batch.id
                      ? "2px solid #5d4037"
                      : "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                }}
                styles={{ body: { padding: "20px" } }}
              >
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                      <Title
                        level={5}
                        style={{ margin: "0 0 8px 0", color: "#1f2937" }}
                      >
                        {batch.name}
                      </Title>
                      <Text type="secondary" style={{ fontSize: "13px" }}>
                        รุ่นที่ {batch.batchNumber}
                      </Text>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          color: "#6b7280",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        วันที่เริ่มเรียน
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#374151",
                          fontSize: "14px",
                        }}
                      >
                        {batch.startDate}
                      </div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          color: "#6b7280",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        วันที่จบหลักสูตร
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#374151",
                          fontSize: "14px",
                        }}
                      >
                        {batch.endDate}
                      </div>
                    </div>
                  </Col>

                  <Col span={24}>
                    <div style={{ textAlign: "center", marginBottom: "8px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          marginBottom: "8px",
                        }}
                      >
                        <TeamOutlined style={{ color: "#10b981" }} />
                        <div style={{ color: "#6b7280", fontSize: "12px" }}>
                          จำนวนผู้เรียน
                        </div>
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#374151",
                          fontSize: "14px",
                        }}
                      >
                        {batch.currentStudents}/{batch.maxStudents} คน
                      </div>
                    </div>
                  </Col>
                </Row>

                <div style={{ marginTop: "16px" }}>
                  <Progress
                    percent={Math.round(
                      (batch.currentStudents / batch.maxStudents) * 100
                    )}
                    size="small"
                    strokeColor={{
                      "0%": "#8d6e63",
                      "50%": "#6d4c41",
                      "100%": "#5d4037",
                    }}
                    format={(percent) => `${percent}% เต็ม`}
                  />
                </div>

                <div style={{ marginTop: "16px", textAlign: "center" }}>
                  <Button
                    type={selectedBatchId === batch.id ? "primary" : "default"}
                    size="large"
                    style={{
                      width: "200px",
                      borderRadius: "12px",
                      fontWeight: "600",
                      height: "40px",
                      backgroundColor:
                        selectedBatchId === batch.id ? "#5d4037" : "white",
                      borderColor:
                        selectedBatchId === batch.id ? "#5d4037" : "#d1d5db",
                      boxShadow:
                        selectedBatchId === batch.id
                          ? "0 4px 12px rgba(93, 64, 55, 0.3)"
                          : "none",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onBatchSelect(batch.id);
                    }}
                  >
                    {selectedBatchId === batch.id ? (
                      <>
                        <CheckOutlined /> เลือกแล้ว
                      </>
                    ) : (
                      "เลือกรุ่นนี้"
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

export default CourseSelector;
