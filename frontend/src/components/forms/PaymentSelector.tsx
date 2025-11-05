"use client";

import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Radio,
  Typography,
  Space,
  Alert,
  Upload,
  Form,
  message,
} from "antd";
import type { RadioChangeEvent } from "antd";
import {
  DollarOutlined,
  CheckOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  UploadOutlined,
  BankOutlined,
  QrcodeOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
}

interface PaymentSelectorProps {
  course?: {
    id: string;
    title: string;
    duration: number;
    price: number;
  };
  selectedPaymentType?: string;
  onPaymentTypeSelect: (paymentType: string) => void;
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  course,
  selectedPaymentType,
  onPaymentTypeSelect,
}) => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const paymentOptions: PaymentOption[] = [
    {
      id: "full",
      name: "จ่ายเต็มจำนวน",
      description: "ชำระค่าเรียนครั้งเดียวเต็มจำนวน",
      icon: <DollarOutlined />,
      color: "#52c41a",
      details: [
        "ได้รับส่วนลด 5% จากราคาเต็ม",
        "ไม่มีค่าธรรมเนียมเพิ่มเติม",
        "การันตีที่นั่งในหลักสูตร",
        "ได้รับใบประกาศนียบัตรทันทีหลังจบหลักสูตร",
      ],
    },
    {
      id: "partial",
      name: "จ่ายบางส่วน 20%",
      description: "จ่ายเงินมัดจำ 20% ก่อนเรียน",
      icon: <CreditCardOutlined />,
      color: "#fa8c16",
      details: [
        "จ่ายมัดจำ 20% เพื่อจองที่นั่ง",
        "จ่ายส่วนที่เหลือ 80% ภายใน 7 วันหลังจบหลักสูตร",
        "หากไม่จ่ายครบจะไม่ได้รับใบประกาศนียบัตร",
        "ค่าธรรมเนียมเพิ่มเติม 2% ของยอดรวม",
      ],
    },
    {
      id: "installment",
      name: "แบ่งจ่ายเป็นงวด",
      description: "แบ่งจ่ายได้สูงสุด 5 งวด",
      icon: <CalendarOutlined />,
      color: "#1890ff",
      details: [
        "แบ่งจ่ายได้สูงสุด 5 งวด",
        "จ่ายงวดแรก 30% เพื่อยืนยันการลงทะเบียน",
        "งวดถัดไปจ่ายทุกเดือน",
        "ค่าธรรมเนียม 3% ของยอดรวม",
      ],
    },
  ];

  const calculatePayment = (option: PaymentOption) => {
    if (!course) return { total: 0, discount: 0, fee: 0, finalAmount: 0 };

    const basePrice = course.price;
    let discount = 0;
    let fee = 0;
    let finalAmount = basePrice;

    switch (option.id) {
      case "full":
        discount = Math.round(basePrice * 0.05); // 5% discount
        finalAmount = basePrice - discount;
        break;
      case "partial":
        fee = Math.round(basePrice * 0.02); // 2% fee
        finalAmount = basePrice + fee;
        break;
      case "installment":
        fee = Math.round(basePrice * 0.03); // 3% fee
        finalAmount = basePrice + fee;
        break;
    }

    return { total: basePrice, discount, fee, finalAmount };
  };

  const getInstallmentBreakdown = () => {
    if (!course) return [];

    const { finalAmount } = calculatePayment(paymentOptions[2]);
    const firstPayment = Math.round(finalAmount * 0.3);
    const remainingAmount = finalAmount - firstPayment;
    const monthlyPayment = Math.round(remainingAmount / 4);
    const lastPayment = remainingAmount - monthlyPayment * 3;

    return [
      { period: "งวดที่ 1 (วันลงทะเบียน)", amount: firstPayment },
      { period: "งวดที่ 2 (เดือนที่ 1)", amount: monthlyPayment },
      { period: "งวดที่ 3 (เดือนที่ 2)", amount: monthlyPayment },
      { period: "งวดที่ 4 (เดือนที่ 3)", amount: monthlyPayment },
      { period: "งวดที่ 5 (เดือนที่ 4)", amount: lastPayment },
    ];
  };

  const handlePaymentTypeChange = (e: RadioChangeEvent) => {
    const paymentType = e.target.value;
    onPaymentTypeSelect(paymentType);
    setShowPaymentDetails(true);
  };

  return (
    <div>
      <Alert
        message="เลือกวิธีการชำระเงิน"
        description="กรุณาเลือกวิธีการชำระเงินที่เหมาะสมกับคุณ แต่ละวิธีมีเงื่อนไขและข้อดีที่แตกต่างกัน"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {course && (
        <Card
          size="small"
          style={{ backgroundColor: "#f8fafc", marginBottom: 24 }}
        >
          <Title level={5} style={{ marginBottom: 16, color: "#5d4037" }}>
            <BookOutlined /> ข้อมูลหลักสูตรที่เลือก
          </Title>
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: "16px" }}>
                {course.title}
              </Text>
              <br />
              <Text type="secondary">
                ระยะเวลา: {course.duration} ชั่วโมง | ราคาเต็ม:{" "}
                {course.price.toLocaleString()} บาท
              </Text>
            </Col>
          </Row>
        </Card>
      )}

      <Form.Item
        name="paymentType"
        label={
          <span
            style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937" }}
          >
            <DollarOutlined style={{ marginRight: "8px", color: "#5d4037" }} />
            วิธีการชำระเงิน
          </span>
        }
        rules={[{ required: true, message: "กรุณาเลือกวิธีการชำระเงิน" }]}
      >
        <Radio.Group
          onChange={handlePaymentTypeChange}
          style={{ width: "100%" }}
        >
          <Row gutter={[16, 16]}>
            {paymentOptions.map((option) => {
              const payment = calculatePayment(option);

              return (
                <Col xs={24} lg={8} key={option.id}>
                  <Card
                    hoverable
                    style={{
                      height: "100%",
                      borderRadius: "12px",
                      border:
                        selectedPaymentType === option.id
                          ? `2px solid ${option.color}`
                          : "1px solid #e2e8f0",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    styles={{ body: { padding: "24px" } }}
                    onClick={() => {
                      onPaymentTypeSelect(option.id);
                      setShowPaymentDetails(true);
                    }}
                  >
                    <Radio value={option.id} style={{ display: "none" }} />

                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          backgroundColor: `${option.color}15`,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 12px",
                          fontSize: "20px",
                          color: option.color,
                        }}
                      >
                        {option.icon}
                      </div>

                      <Title level={5} style={{ margin: 0, color: "#1f2937" }}>
                        {option.name}
                      </Title>

                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {option.description}
                      </Text>
                    </div>

                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: option.color,
                          marginBottom: "4px",
                        }}
                      >
                        {payment.finalAmount.toLocaleString()} บาท
                      </div>

                      {payment.discount > 0 && (
                        <div style={{ color: "#52c41a", fontSize: "14px" }}>
                          ประหยัด {payment.discount.toLocaleString()} บาท
                        </div>
                      )}

                      {payment.fee > 0 && (
                        <div style={{ color: "#fa8c16", fontSize: "14px" }}>
                          +ค่าธรรมเนียม {payment.fee.toLocaleString()} บาท
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <Space
                        direction="vertical"
                        size={4}
                        style={{ width: "100%" }}
                      >
                        {option.details.map((detail, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                          >
                            <CheckOutlined
                              style={{
                                color: option.color,
                                fontSize: "12px",
                                marginRight: "8px",
                                marginTop: "2px",
                                flexShrink: 0,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: "13px",
                                color: "#6b7280",
                                lineHeight: "1.4",
                              }}
                            >
                              {detail}
                            </Text>
                          </div>
                        ))}
                      </Space>
                    </div>

                    {selectedPaymentType === option.id && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          width: "24px",
                          height: "24px",
                          backgroundColor: option.color,
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
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Radio.Group>
      </Form.Item>

      {/* แสดงรายละเอียดการจ่ายเงินแบบผ่อน */}
      {selectedPaymentType === "installment" && (
        <Card
          title="รายละเอียดการแบ่งจ่าย"
          size="small"
          style={{ marginTop: 16, backgroundColor: "#f0f8ff" }}
        >
          {getInstallmentBreakdown().map((installment, index) => (
            <Row
              key={index}
              justify="space-between"
              style={{
                padding: "8px 0",
                borderBottom: index < 4 ? "1px solid #e2e8f0" : "none",
              }}
            >
              <Col>
                <Text>{installment.period}</Text>
              </Col>
              <Col>
                <Text strong>{installment.amount.toLocaleString()} บาท</Text>
              </Col>
            </Row>
          ))}
        </Card>
      )}

      {/* แสดงข้อมูลการชำระเงินเมื่อเลือกวิธีการแล้ว */}
      {showPaymentDetails && selectedPaymentType && (
        <Card
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <BankOutlined style={{ marginRight: "8px", color: "#5d4037" }} />
              ข้อมูลการชำระเงิน
            </div>
          }
          style={{ marginTop: 24 }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card size="small" title="ข้อมูลบัญชีธนาคาร">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text strong>ธนาคาร:</Text> ธนาคารกสิกรไทย
                  </div>
                  <div>
                    <Text strong>ชื่อบัญชี:</Text> โรงเรียนสอนนวดไทยเพื่อสุขภาพ
                  </div>
                  <div>
                    <Text strong>เลขที่บัญชี:</Text> 123-4-56789-0
                  </div>
                  <div>
                    <Text strong>สาขา:</Text> สำนักงานใหญ่
                  </div>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card size="small" title="QR Code สำหรับโอนเงิน">
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      backgroundColor: "#f5f5f5",
                      border: "2px dashed #d9d9d9",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      fontSize: "48px",
                      color: "#bfbfbf",
                    }}
                  >
                    <QrcodeOutlined />
                  </div>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    สแกน QR Code เพื่อโอนเงิน
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>

          <Card
            size="small"
            title="อัปโหลดหลักฐานการชำระเงิน"
            style={{ marginTop: 16 }}
          >
            <Form.Item
              name="paymentProof"
              label="หลักฐานการโอนเงิน"
              rules={[
                { required: true, message: "กรุณาอัปโหลดหลักฐานการชำระเงิน" },
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
                onChange={(info) => {
                  if (info.file.status === "done") {
                    message.success("อัปโหลดหลักฐานการชำระเงินสำเร็จ");
                  }
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <UploadOutlined
                    style={{ fontSize: "24px", marginBottom: "8px" }}
                  />
                  <div>อัปโหลดหลักฐาน</div>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    รองรับ: JPG, PNG, PDF
                  </Text>
                </div>
              </Upload>
            </Form.Item>

            <Alert
              message="ข้อปฏิบัติสำหรับการอัปโหลดหลักฐาน"
              description={
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  <li>อัปโหลดสลิปการโอนเงินหรือหลักฐานการชำระเงิน</li>
                  <li>ตรวจสอบให้แน่ใจว่าเลขบัญชีปลายทางถูกต้อง</li>
                  <li>ยอดเงินที่โอนต้องตรงกับจำนวนที่แสดงในระบบ</li>
                  <li>หลักฐานต้องชัดเจนและอ่านได้</li>
                </ul>
              }
              type="info"
              showIcon
              style={{ marginTop: 16 }}
            />
          </Card>
        </Card>
      )}
    </div>
  );
};

export default PaymentSelector;
