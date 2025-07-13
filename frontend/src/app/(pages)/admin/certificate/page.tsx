"use client";

import '@ant-design/v5-patch-for-react-19';
import React, { useState, useRef } from 'react';
// import { Layout, Form, Input, Select, Button, message, Card, Typography, Modal, DatePicker, Row, Col, Slider, Space } from 'antd';
import { Form, Input, Select, Button, message, Card, Typography, Modal, DatePicker, Row, Col, Slider, Space } from 'antd';
import { SaveOutlined, PrinterOutlined } from '@ant-design/icons';
// import type { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface'; // ยังคง import ไว้เผื่อใช้ในอนาคต
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Konva from 'konva';

// const { Content } = Layout;
const { Option } = Select;
const { Title: AntdTitle } = Typography;

// Dynamically import CertificateCanvas to ensure it only runs on the client-side
const CertificateCanvas = dynamic(() => import('./certificateCanvas'), { ssr: false });

/// --- Interfaces ---
interface School {
  key: string;
  name: string;
  address: string;
  contact: string;
  logoUrl?: string;
}

interface CertificateData {
  title: string;
  studentName: string;
  courseName: string;
  issueDate: dayjs.Dayjs | null;
  schoolName: string;
  schoolLogoUrl: string;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  bgColor: string;
  signatureLine1: string;
  signatureLine2: string;
  // Positions for Konva shapes (all in pixels, representing the TOP-LEFT of the element's bounding box)
  titlePos: { x: number; y: number };
  studentNamePos: { x: number; y: number };
  courseNamePos: { x: number; y: number };

  // *** เพิ่ม Properties สำหรับการปรับแต่งกรอบ ***
  mainBorderWidth: number;
  mainBorderColor: string;
  mainBorderRadius: number;
  // mainBorderLineCap: 'butt' | 'round' | 'square'; // ลบออก
  // mainBorderLineJoin: 'miter' | 'round' | 'bevel'; // ลบออก
  mainBorderStyle: 'solid' | 'dashed'; // เพิ่มสไตล์เส้นกรอบหลัก
  mainBorderDashLength: number; // ความยาวเส้นประกรอบหลัก
  mainBorderDashGap: number; // ระยะห่างเส้นประกรอบหลัก
  innerBorder1Width: number;
  innerBorder1Color: string;
  innerBorder1DashLength: number;
  innerBorder1DashGap: number;
  innerBorder2Width: number;
  innerBorder2Color: string;
}

export default function CertificatePage() {
  const [form] = Form.useForm<CertificateData>();
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

  const stageRef = useRef<Konva.Stage | null>(null); 

  const dummySchools: School[] = [
    { key: '1', name: 'โรงเรียนสาธิต ม.เกษตรศาสตร์', address: 'กรุงเทพมหานคร', contact: '02-123-4567', logoUrl: '' },
    { key: '2', name: 'โรงเรียนเตรียมอุดมศึกษา', address: 'กรุงเทพมหานคร', contact: '02-765-4321', logoUrl: '' },
    { key: '3', name: 'โรงเรียนบดินทรเดชา', address: 'กรุงเทพมหานคร', contact: '02-987-6543', logoUrl: '' },
  ];

  // กำหนดค่าเริ่มต้นของ certificateData
  const [certificateData, setCertificateData] = useState<CertificateData>({
    title: 'ใบประกาศนียบัตร',
    studentName: 'ชื่อนักเรียน',
    courseName: 'ชื่อหลักสูตรที่สำเร็จ',
    issueDate: dayjs(), // กำหนด dayjs() ตั้งแต่แรกเพื่อป้องกัน Hydration Error
    schoolName: dummySchools[0].name,
    schoolLogoUrl: '',
    fontFamily: 'Prompt',
    fontSize: 16,
    textColor: '#000000',
    bgColor: '#FFFFFF',
    signatureLine1: 'ผู้อำนวยการ',
    signatureLine2: 'โรงเรียนสาธิต ม.เกษตรศาสตร์',
    // Initial positions in pixels, representing the TOP-LEFT of the element's bounding box
    // DESIGN_WIDTH = 720, DESIGN_HEIGHT = 508.5 (จาก CertificateCanvas.tsx)
    titlePos: { x: 720 / 2, y: 108 }, 
    studentNamePos: { x: 720 / 2, y: 252 }, 
    courseNamePos: { x: 720 / 2, y: 322 }, 

    // *** ค่าเริ่มต้นสำหรับกรอบ ***
    mainBorderWidth: 10,
    mainBorderColor: '#f97316',
    mainBorderRadius: 8,
    // mainBorderLineCap: 'butt', // ลบออก
    // mainBorderLineJoin: 'miter', // ลบออก
    mainBorderStyle: 'solid',
    mainBorderDashLength: 10,
    mainBorderDashGap: 5,
    innerBorder1Width: 4,
    innerBorder1Color: '#d4af37',
    innerBorder1DashLength: 10,
    innerBorder1DashGap: 5,
    innerBorder2Width: 2,
    innerBorder2Color: '#b8860b',
  });

  const handleFormChange = (changedValues: Partial<CertificateData>) => {
    setCertificateData(prevData => ({
      ...prevData,
      ...changedValues,
    }));
  };

  const handleSchoolSelect = (value: string) => {
    const selectedSchool = dummySchools.find(school => school.key === value);
    if (selectedSchool) {
      setCertificateData(prevData => ({
        ...prevData,
        schoolName: selectedSchool.name,
        schoolLogoUrl: '',
        signatureLine2: selectedSchool.name,
      }));
      form.setFieldsValue({
        schoolName: selectedSchool.name,
        schoolLogoUrl: '',
        signatureLine2: selectedSchool.name,
      });
    }
  };

  const handleSaveDesign = () => {
    form.validateFields()
      .then(() => {
        setIsSaveModalVisible(true);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
        message.error('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      });
  };

  const handleConfirmSave = () => {
    console.log('Saving Certificate Design:', {
      ...certificateData,
      issueDate: certificateData.issueDate ? certificateData.issueDate.format('YYYY-MM-DD') : null,
    });
    message.success('บันทึกการออกแบบใบประกาศสำเร็จ!');
    setIsSaveModalVisible(false);
  };

  const handlePositionChange = (elementName: string, newPos: { x: number; y: number }) => {
    setCertificateData(prevData => {
      switch (elementName) {
        case 'title':
          return { ...prevData, titlePos: newPos };
        case 'studentName':
          return { ...prevData, studentNamePos: newPos };
        case 'courseName':
          return { ...prevData, courseNamePos: newPos };
        default:
          return prevData;
      }
    });
  };

  const handlePrintCertificate = async () => {
    if (stageRef.current) {
      message.loading('กำลังสร้างใบประกาศสำหรับการพิมพ์...', 0);
      try {
        const dataURL = stageRef.current.toDataURL({
          mimeType: 'image/png',
          quality: 1,
          pixelRatio: 2, // Export at 2x resolution for better print quality
        });

        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Print Certificate</title>
                <style>
                  body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f2f5; }
                  img { max-width: 100%; height: auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                  @media print {
                    body { background: none; }
                    img { box-shadow: none; }
                  }
                </style>
              </head>
              <body>
                <img src="${dataURL}" onload="window.print(); window.close();" />
              </body>
            </html>
          `);
          printWindow.document.close();
        } else {
          message.error('ไม่สามารถเปิดหน้าต่างสำหรับพิมพ์ได้ กรุณาตรวจสอบ Pop-up Blocker');
        }
      } catch (error) {
        console.error('Error generating image from Konva Stage:', error);
        message.error('เกิดข้อผิดพลาดในการสร้างใบประกาศ');
      } finally {
        message.destroy();
      }
    } else {
      message.error('ไม่พบส่วนแสดงตัวอย่างใบประกาศ');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AntdTitle level={1} className="text-3xl font-bold mb-8 text-gray-800">ออกแบบใบประกาศ</AntdTitle>
      
      <div className="flex justify-end items-center mb-6">
        <Space size="middle" className="gap-4">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSaveDesign}
            className="bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
          >
            บันทึกการออกแบบ
          </Button>
          <Button
            icon={<PrinterOutlined />}
            onClick={handlePrintCertificate}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
          >
            พิมพ์ใบประกาศ
          </Button>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        {/* Controls Panel */}
        <Col xs={24} lg={8}>
          <Card className="rounded-xl shadow-custom-light p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <AntdTitle level={4} className="text-gray-700 mb-6">ตั้งค่าใบประกาศ</AntdTitle>
            <Form
              form={form}
              layout="vertical"
              onValuesChange={handleFormChange}
              initialValues={{
                ...certificateData,
                issueDate: certificateData.issueDate || dayjs(),
              }}
            >
              <Form.Item
                name="schoolName"
                label={<span className="font-semibold text-gray-700">เลือกโรงเรียน</span>}
                rules={[{ required: true, message: 'กรุณาเลือกโรงเรียน!' }]}
              >
                <Select
                  placeholder="เลือกโรงเรียน"
                  className="rounded-lg"
                  onChange={handleSchoolSelect}
                >
                  {dummySchools.map(school => (
                    <Option key={school.key} value={school.key}>{school.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="title"
                label={<span className="font-semibold text-gray-700">หัวข้อใบประกาศ</span>}
                rules={[{ required: true, message: 'กรุณากรอกหัวข้อใบประกาศ!' }]}
              >
                <Input placeholder="เช่น ใบประกาศนียบัตร" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="studentName"
                label={<span className="font-semibold text-gray-700">ชื่อนักเรียน</span>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อนักเรียน!' }]}
              >
                <Input placeholder="เช่น นายสมชาย ใจดี" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="courseName"
                label={<span className="font-semibold text-gray-700">ชื่อหลักสูตร</span>}
                rules={[{ required: true, message: 'กรุณากรอกหลักสูตร!' }]}
              >
                <Input placeholder="เช่น หลักสูตรนวดแผนไทยเบื้องต้น" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="issueDate"
                label={<span className="font-semibold text-gray-700">วันที่ออกใบประกาศ</span>}
                rules={[{ required: true, message: 'กรุณาเลือกวันที่!' }]}
              >
                <DatePicker format="YYYY-MM-DD" className="w-full rounded-lg" />
              </Form.Item>
              <Form.Item
                name="fontFamily"
                label={<span className="font-semibold text-gray-700">รูปแบบตัวอักษร</span>}
              >
                <Select placeholder="เลือกฟอนต์" className="rounded-lg">
                  <Option value="Inter">Inter (Default)</Option>
                  <Option value="Arial">Arial</Option>
                  <Option value="Sarabun">Sarabun</Option>
                  <Option value="Kanit">Kanit</Option>
                  <Option value="Prompt">Prompt</Option>
                  <Option value="Anchan">Anchan</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="fontSize"
                label={<span className="font-semibold text-gray-700">ขนาดตัวอักษร (px)</span>}
              >
                <Slider min={12} max={72} />
              </Form.Item>
              <Form.Item
                name="textColor"
                label={<span className="font-semibold text-gray-700">สีตัวอักษร</span>}
              >
                <Input type="color" className="rounded-lg h-10 p-1" />
              </Form.Item>
              <Form.Item
                name="bgColor"
                label={<span className="font-semibold text-gray-700">สีพื้นหลังใบประกาศ</span>}
              >
                <Input type="color" className="rounded-lg h-10 p-1" />
              </Form.Item>
              <Form.Item
                name="signatureLine1"
                label={<span className="font-semibold text-gray-700">ตำแหน่งผู้ลงนาม</span>}
                rules={[{ required: true, message: 'กรุณากรอกตำแหน่งผู้ลงนาม!' }]}
              >
                <Input placeholder="เช่น ผู้อำนวยการ" className="rounded-lg" />
              </Form.Item>
              <Form.Item
                name="signatureLine2"
                label={<span className="font-semibold text-gray-700">ชื่อองค์กรผู้ลงนาม</span>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อองค์กรผู้ลงนาม!' }]}
              >
                <Input placeholder="เช่น โรงเรียนสาธิต ม.เกษตรศาสตร์" className="rounded-lg" />
              </Form.Item>

              {/* *** ส่วนควบคุมการปรับแต่งกรอบ *** */}
              <AntdTitle level={5} className="text-gray-700 mt-8 mb-4">ตั้งค่ากรอบ</AntdTitle>
              <Form.Item name="mainBorderWidth" label={<span className="font-semibold text-gray-700">ความกว้างกรอบหลัก (px)</span>}>
                <Slider min={0} max={20} />
              </Form.Item>
              <Form.Item name="mainBorderColor" label={<span className="font-semibold text-gray-700">สีกรอบหลัก</span>}>
                <Input type="color" className="rounded-lg h-10 p-1" />
              </Form.Item>
              <Form.Item name="mainBorderRadius" label={<span className="font-semibold text-gray-700">รัศมีมุมกรอบหลัก (px)</span>}>
                <Slider min={0} max={20} />
              </Form.Item>
              {/* <Form.Item name="mainBorderLineCap" label={<span className="font-semibold text-gray-700">รูปแบบปลายเส้นกรอบหลัก</span>}> // ลบออก
                <Select className="rounded-lg">
                  <Option value="butt">Butt</Option>
                  <Option value="round">Round</Option>
                  <Option value="square">Square</Option>
                </Select>
              </Form.Item>
              <Form.Item name="mainBorderLineJoin" label={<span className="font-semibold text-gray-700">รูปแบบมุมเส้นกรอบหลัก</span>}> // ลบออก
                <Select className="rounded-lg">
                  <Option value="miter">Miter</Option>
                  <Option value="round">Round</Option>
                  <Option value="bevel">Bevel</Option>
                </Select>
              </Form.Item> */}

              <Form.Item name="mainBorderStyle" label={<span className="font-semibold text-gray-700">สไตล์เส้นกรอบหลัก</span>}>
                <Select className="rounded-lg">
                  <Option value="solid">Solid</Option>
                  <Option value="dashed">Dashed</Option>
                </Select>
              </Form.Item>

              {certificateData.mainBorderStyle === 'dashed' && (
                <>
                  <Form.Item name="mainBorderDashLength" label={<span className="font-semibold text-gray-700">ความยาวเส้นประกรอบหลัก (px)</span>}>
                    <Slider min={0} max={30} />
                  </Form.Item>
                  <Form.Item name="mainBorderDashGap" label={<span className="font-semibold text-gray-700">ระยะห่างเส้นประกรอบหลัก (px)</span>}>
                    <Slider min={0} max={30} />
                  </Form.Item>
                </>
              )}

              <Form.Item name="innerBorder1Width" label={<span className="font-semibold text-gray-700">ความกว้างกรอบใน 1 (px)</span>}>
                <Slider min={0} max={10} />
              </Form.Item>
              <Form.Item name="innerBorder1Color" label={<span className="font-semibold text-gray-700">สีกรอบใน 1</span>}>
                <Input type="color" className="rounded-lg h-10 p-1" />
              </Form.Item>
              <Form.Item name="innerBorder1DashLength" label={<span className="font-semibold text-gray-700">ความยาวเส้นประกรอบใน 1 (px)</span>}>
                <Slider min={0} max={30} />
              </Form.Item>
              <Form.Item name="innerBorder1DashGap" label={<span className="font-semibold text-gray-700">ระยะห่างเส้นประกรอบใน 1 (px)</span>}>
                <Slider min={0} max={30} />
              </Form.Item>

              <Form.Item name="innerBorder2Width" label={<span className="font-semibold text-gray-700">ความกว้างกรอบใน 2 (px)</span>}>
                <Slider min={0} max={10} />
              </Form.Item>
              <Form.Item name="innerBorder2Color" label={<span className="font-semibold text-gray-700">สีกรอบใน 2</span>}>
                <Input type="color" className="rounded-lg h-10 p-1" />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Certificate Preview Area (Konva Canvas) */}
        <Col xs={24} lg={16} className="overflow-x-auto">
          <Card className="rounded-xl shadow-custom-light p-4 flex flex-col items-center justify-center">
            <CertificateCanvas
              certificateData={certificateData}
              onPositionChange={handlePositionChange}
              stageRef={stageRef}
            />
          </Card>
        </Col>
      </Row>

      {/* Modal for Save Confirmation */}
      <Modal
        title="บันทึกการออกแบบใบประกาศ"
        open={isSaveModalVisible}
        onOk={handleConfirmSave}
        onCancel={() => setIsSaveModalVisible(false)}
        okText="บันทึก"
        cancelText="ยกเลิก"
        className="rounded-xl"
        centered
      >
        <p>คุณต้องการบันทึกการออกแบบใบประกาศนี้หรือไม่?</p>
        <p>ข้อมูลที่บันทึก: <br/>
           หัวข้อ: {certificateData.title} <br/>
           ชื่อนักเรียน: {certificateData.studentName} <br/>
           หลักสูตร: {certificateData.courseName} <br/>
           วันที่ออก: {certificateData.issueDate ? certificateData.issueDate.format('YYYY-MM-DD') : ''}
        </p>
      </Modal>
    </div>
  );
}