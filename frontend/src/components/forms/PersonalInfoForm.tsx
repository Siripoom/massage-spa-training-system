"use client";

import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Alert,
  Divider,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  IdcardOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

interface PersonalInfoFormProps {
  className?: string; // Add optional prop to avoid empty interface
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = () => {
  return (
    <div>
      <Alert
        message="ข้อมูลสำคัญ"
        description="กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วนและถูกต้อง ข้อมูลเหล่านี้จะใช้ในการออกใบประกาศนียบัตร"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Divider orientation="left">ข้อมูลพื้นฐาน</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Form.Item
            name="titleName"
            label={<span style={{ fontWeight: "bold" }}>คำนำหน้า</span>}
            rules={[{ required: true, message: "กรุณาเลือกคำนำหน้า" }]}
          >
            <Select placeholder="เลือกคำนำหน้า" size="large">
              <Option value="นาย">
                <ManOutlined /> นาย
              </Option>
              <Option value="นางสาว">
                <WomanOutlined /> นางสาว
              </Option>
              <Option value="นาง">
                <WomanOutlined /> นาง
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name="firstName"
            label={<span style={{ fontWeight: "bold" }}>ชื่อ</span>}
            rules={[
              { required: true, message: "กรุณากรอกชื่อ" },
              { min: 2, message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" },
            ]}
          >
            <Input
              placeholder="ชื่อ"
              size="large"
              prefix={<UserOutlined style={{ color: "#8c8c8c" }} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name="lastName"
            label={<span style={{ fontWeight: "bold" }}>นามสกุล</span>}
            rules={[
              { required: true, message: "กรุณากรอกนามสกุล" },
              { min: 2, message: "นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร" },
            ]}
          >
            <Input
              placeholder="นามสกุล"
              size="large"
              prefix={<UserOutlined style={{ color: "#8c8c8c" }} />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="idCard"
            label={
              <span style={{ fontWeight: "bold" }}>เลขบัตรประจำตัวประชาชน</span>
            }
            rules={[
              { required: true, message: "กรุณากรอกเลขบัตรประจำตัวประชาชน" },
              {
                pattern: /^\d{13}$/,
                message: "เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก",
              },
            ]}
          >
            <Input
              placeholder="1234567890123"
              size="large"
              maxLength={13}
              prefix={<IdcardOutlined style={{ color: "#8c8c8c" }} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="dateOfBirth"
            label={<span style={{ fontWeight: "bold" }}>วันเกิด</span>}
            rules={[{ required: true, message: "กรุณาเลือกวันเกิด" }]}
          >
            <DatePicker
              placeholder="เลือกวันเกิด"
              size="large"
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
              format="DD/MM/YYYY"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Form.Item
            name="gender"
            label={<span style={{ fontWeight: "bold" }}>เพศ</span>}
            rules={[{ required: true, message: "กรุณาเลือกเพศ" }]}
          >
            <Select placeholder="เลือกเพศ" size="large">
              <Option value="ชาย">
                <ManOutlined /> ชาย
              </Option>
              <Option value="หญิง">
                <WomanOutlined /> หญิง
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name="phone"
            label={<span style={{ fontWeight: "bold" }}>เบอร์โทรศัพท์</span>}
            rules={[
              { required: true, message: "กรุณากรอกเบอร์โทรศัพท์" },
              {
                pattern: /^[0-9]{10}$/,
                message: "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก",
              },
            ]}
          >
            <Input
              placeholder="0987654321"
              size="large"
              maxLength={10}
              prefix={<PhoneOutlined style={{ color: "#8c8c8c" }} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name="email"
            label={<span style={{ fontWeight: "bold" }}>อีเมล</span>}
            rules={[
              { required: true, message: "กรุณากรอกอีเมล" },
              { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" },
            ]}
          >
            <Input
              placeholder="example@email.com"
              size="large"
              prefix={<MailOutlined style={{ color: "#8c8c8c" }} />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">ที่อยู่ติดต่อ</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="address"
            label={<span style={{ fontWeight: "bold" }}>ที่อยู่</span>}
            rules={[
              { required: true, message: "กรุณากรอกที่อยู่" },
              { min: 10, message: "ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร" },
            ]}
          >
            <TextArea placeholder="บ้านเลขที่ ซอย ถนน" rows={3} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="province"
            label={<span style={{ fontWeight: "bold" }}>จังหวัด</span>}
            rules={[{ required: true, message: "กรุณาเลือกจังหวัด" }]}
          >
            <Select
              placeholder="เลือกจังหวัด"
              size="large"
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              <Option value="กรุงเทพมหานคร">กรุงเทพมหานคร</Option>
              <Option value="เชียงใหม่">เชียงใหม่</Option>
              <Option value="เชียงราย">เชียงราย</Option>
              <Option value="น่าน">น่าน</Option>
              <Option value="พะเยา">พะเยา</Option>
              <Option value="แพร่">แพร่</Option>
              <Option value="แม่ฮ่องสอน">แม่ฮ่องสอน</Option>
              <Option value="ลำปาง">ลำปาง</Option>
              <Option value="ลำพูน">ลำพูน</Option>
              <Option value="อุตรดิตถ์">อุตรดิตถ์</Option>
              <Option value="กำแพงเพชร">กำแพงเพชร</Option>
              <Option value="เก้าไก่">ตาก</Option>
              <Option value="นครสวรรค์">นครสวรรค์</Option>
              <Option value="อุทัยธานี">อุทัยธานี</Option>
              <Option value="พิจิตร">พิจิตร</Option>
              <Option value="พิษณุโลก">พิษณุโลก</Option>
              <Option value="เพชรบูรณ์">เพชรบูรณ์</Option>
              <Option value="สุโขทัย">สุโขทัย</Option>
              {/* เพิ่มจังหวัดอื่นๆ ตามต้องการ */}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="district"
            label={<span style={{ fontWeight: "bold" }}>อำเภอ/เขต</span>}
            rules={[{ required: true, message: "กรุณากรอกอำเภอ/เขต" }]}
          >
            <Input placeholder="อำเภอ/เขต" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="subdistrict"
            label={<span style={{ fontWeight: "bold" }}>ตำบล/แขวง</span>}
            rules={[{ required: true, message: "กรุณากรอกตำบล/แขวง" }]}
          >
            <Input placeholder="ตำบล/แขวง" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="postalCode"
            label={<span style={{ fontWeight: "bold" }}>รหัสไปรษณีย์</span>}
            rules={[
              { required: true, message: "กรุณากรอกรหัสไปรษณีย์" },
              {
                pattern: /^\d{5}$/,
                message: "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก",
              },
            ]}
          >
            <Input placeholder="12345" size="large" maxLength={5} />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">ข้อมูลการศึกษาและอาชีพ</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="education"
            label={<span style={{ fontWeight: "bold" }}>ระดับการศึกษา</span>}
            rules={[{ required: true, message: "กรุณาเลือกระดับการศึกษา" }]}
          >
            <Select placeholder="เลือกระดับการศึกษา" size="large">
              <Option value="ต่ำกว่าม.6">ต่ำกว่า ม.6</Option>
              <Option value="ม.6/เทียบเท่า">ม.6/เทียบเท่า</Option>
              <Option value="ปวช./เทียบเท่า">ปวช./เทียบเท่า</Option>
              <Option value="ปวส./เทียบเท่า">ปวส./เทียบเท่า</Option>
              <Option value="ปริญญาตรี">ปริญญาตรี</Option>
              <Option value="ปริญญาโท">ปริญญาโท</Option>
              <Option value="ปริญญาเอก">ปริญญาเอก</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="occupation"
            label={<span style={{ fontWeight: "bold" }}>อาชีพปัจจุบัน</span>}
            rules={[{ required: true, message: "กรุณากรอกอาชีพ" }]}
          >
            <Input
              placeholder="เช่น นักเรียน, พนักงานบริษัท, ข้าราชการ"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="experience"
            label={
              <span style={{ fontWeight: "bold" }}>
                ประสบการณ์ที่เกี่ยวข้อง (ถ้ามี)
              </span>
            }
          >
            <TextArea
              placeholder="ประสบการณ์การทำงานหรือการเรียนรู้ที่เกี่ยวข้องกับหลักสูตรที่สมัคร"
              rows={3}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="learningObjectives"
            label={
              <span style={{ fontWeight: "bold" }}>เป้าหมายในการเรียน</span>
            }
            rules={[{ required: true, message: "กรุณากรอกเป้าหมายในการเรียน" }]}
          >
            <TextArea
              placeholder="บอกเราเกี่ยวกับเป้าหมายหรือความคาดหวังของคุณจากการเรียนหลักสูตรนี้"
              rows={3}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfoForm;
