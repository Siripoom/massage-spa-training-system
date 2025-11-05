"use client";

import React from "react";
import { Form, Upload, Row, Col, Alert, Divider, Typography, Card } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface DocumentUploadFormProps {
  className?: string;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = () => {
  return (
    <div>
      <Alert
        message="เอกสารที่จำเป็น"
        description="กรุณาเตรียมเอกสารให้พร้อมก่อนทำการอัปโหลด ไฟล์ควรมีความละเอียดชัดเจนและอ่านได้"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Card
        size="small"
        style={{ backgroundColor: "#f8f9fa", marginBottom: 24 }}
      >
        <Title level={5} style={{ marginBottom: 16, color: "#5d4037" }}>
          <FileTextOutlined /> รายการเอกสารที่ต้องใช้:
        </Title>
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#ff4d4f", marginRight: "8px" }}>*</span>
              <SafetyCertificateOutlined
                style={{ color: "#52c41a", marginRight: "8px" }}
              />
              <Text strong>สำเนาบัตรประจำตัวประชาชน</Text>
              <Text type="secondary" style={{ marginLeft: "8px" }}>
                (รูปภาพหรือ PDF)
              </Text>
            </div>
          </Col>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#ff4d4f", marginRight: "8px" }}>*</span>
              <BookOutlined style={{ color: "#5d4037", marginRight: "8px" }} />
              <Text strong>สำเนาวุฒิการศึกษา</Text>
              <Text type="secondary" style={{ marginLeft: "8px" }}>
                (รูปภาพหรือ PDF)
              </Text>
            </div>
          </Col>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <UserOutlined style={{ color: "#fa8c16", marginRight: "8px" }} />
              <Text>รูปถ่าย 1 นิ้ว</Text>
              <Text type="secondary" style={{ marginLeft: "8px" }}>
                (ไม่บังคับ)
              </Text>
            </div>
          </Col>
          <Col span={24}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SafetyCertificateOutlined
                style={{ color: "#13c2c2", marginRight: "8px" }}
              />
              <Text>ใบรับรองแพทย์</Text>
              <Text type="secondary" style={{ marginLeft: "8px" }}>
                (ไม่บังคับ - กรณีมีประวัติป่วย)
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      <Divider orientation="left">เอกสารบังคับ</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="idCardFile"
            label={
              <span style={{ fontWeight: "bold" }}>
                <SafetyCertificateOutlined
                  style={{ color: "#52c41a", marginRight: "8px" }}
                />
                สำเนาบัตรประจำตัวประชาชน
                <span style={{ color: "#ff4d4f" }}> *</span>
              </span>
            }
            rules={[
              { required: true, message: "กรุณาอัปโหลดสำเนาบัตรประชาชน" },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*,.pdf"
              listType="picture-card"
              style={{ width: "100%" }}
            >
              <div style={{ textAlign: "center" }}>
                <UploadOutlined
                  style={{ fontSize: "24px", marginBottom: "8px" }}
                />
                <div>อัปโหลดสำเนาบัตรประชาชน</div>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  รองรับ: JPG, PNG, PDF
                </Text>
              </div>
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="educationFile"
            label={
              <span style={{ fontWeight: "bold" }}>
                <BookOutlined
                  style={{ color: "#5d4037", marginRight: "8px" }}
                />
                สำเนาวุฒิการศึกษา
                <span style={{ color: "#ff4d4f" }}> *</span>
              </span>
            }
            rules={[
              { required: true, message: "กรุณาอัปโหลดสำเนาวุฒิการศึกษา" },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*,.pdf"
              listType="picture-card"
              style={{ width: "100%" }}
            >
              <div style={{ textAlign: "center" }}>
                <UploadOutlined
                  style={{ fontSize: "24px", marginBottom: "8px" }}
                />
                <div>อัปโหลดสำเนาวุฒิการศึกษา</div>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  รองรับ: JPG, PNG, PDF
                </Text>
              </div>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">เอกสารเพิ่มเติม (ไม่บังคับ)</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="photoFile"
            label={
              <span style={{ fontWeight: "bold" }}>
                <UserOutlined
                  style={{ color: "#fa8c16", marginRight: "8px" }}
                />
                รูปถ่าย 1 นิ้ว
              </span>
            }
            extra={
              <Text type="secondary">รูปถ่ายจะใช้ในการออกใบประกาศนียบัตร</Text>
            }
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
              listType="picture-card"
            >
              <div style={{ textAlign: "center" }}>
                <UploadOutlined
                  style={{ fontSize: "24px", marginBottom: "8px" }}
                />
                <div>อัปโหลดรูปถ่าย</div>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  รองรับ: JPG, PNG
                </Text>
              </div>
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="medicalFile"
            label={
              <span style={{ fontWeight: "bold" }}>
                <SafetyCertificateOutlined
                  style={{ color: "#13c2c2", marginRight: "8px" }}
                />
                ใบรับรองแพทย์
              </span>
            }
            extra={
              <Text type="secondary">
                กรณีมีประวัติป่วยหรือข้อจำกัดทางร่างกาย
              </Text>
            }
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*,.pdf"
              listType="picture-card"
            >
              <div style={{ textAlign: "center" }}>
                <UploadOutlined
                  style={{ fontSize: "24px", marginBottom: "8px" }}
                />
                <div>อัปโหลดใบรับรองแพทย์</div>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  รองรับ: JPG, PNG, PDF
                </Text>
              </div>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Alert
        message="ข้อปฏิบัติ"
        description={
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>ขนาดไฟล์ไม่เกิน 5 MB ต่อไฟล์</li>
            <li>รูปภาพควรมีความละเอียดชัดเจนและอ่านได้</li>
            <li>หากอัปโหลด PDF ควรเป็นไฟล์ที่สแกนจากต้นฉบับ</li>
            <li>สามารถอัปโหลดซ้ำได้หากต้องการแก้ไข</li>
          </ul>
        }
        type="warning"
        showIcon
        style={{ marginTop: 24 }}
      />
    </div>
  );
};

export default DocumentUploadForm;
