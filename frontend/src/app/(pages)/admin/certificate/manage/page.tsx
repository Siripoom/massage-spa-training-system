"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Select, message, Typography, Breadcrumb, Card, Row, Col, InputNumber } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, HomeOutlined, TrophyOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic'; // Ensure dynamic is imported
import Konva from 'konva';

dayjs.locale('th');

const { Option } = Select;
const { Text, Title: AntdTitle } = Typography;
const { TextArea } = Input;

// Dynamically import CertificateCanvas to ensure it's client-side rendered
const DynamicCertificateCanvas = dynamic(
  () => import('./certificateCanvas'),
  { ssr: false }
);

// Base dimensions for the certificate design (A4 landscape ratio)
const DESIGN_WIDTH = 720;
const DESIGN_HEIGHT = 508.5;

// --- Interfaces ---
interface DesignElements {
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number; // Base font size
  titleText: string;
  studentNamePlaceholder: string;
  courseNamePlaceholder: string;
  issueDatePlaceholder: string;
  signatureText: string;
  signatureLine2: string;
  logoUrl?: string;

  titlePosX: number;
  titlePosY: number;
  studentNamePosX: number;
  studentNamePosY: number;
  courseNamePosX: number;
  courseNamePosY: number;
  issueDateTextPosX: number;
  issueDateTextPosY: number;
  issueDateValuePosX: number;
  issueDateValuePosY: number;
  signatureBlockPosX: number;
  signatureBlockPosY: number;

  mainBorderWidth: number;
  mainBorderColor: string;
  mainBorderRadius: number;
  mainBorderStyle: 'solid' | 'dashed';
  mainBorderDashLength: number;
  mainBorderDashGap: number;
  innerBorder1Width: number;
  innerBorder1Color: string;
  innerBorder1DashLength: number;
  innerBorder1DashGap: number;
  innerBorder2Width: number;
  innerBorder2Color: string;
}

interface CertificateTemplate {
  id: string;
  templateName: string;
  description: string;
  status: 'Draft' | 'Published';
  createdAt: string;
  updatedAt: string;
  designElements: DesignElements;
}

// Form values for the main template form (matches top-level form fields)
interface CertificateTemplateFormValues {
  templateName: string;
  description: string;
  status: 'Draft' | 'Published';
  designElements: DesignElements;
}

// Predefined font options
const FONT_OPTIONS = [
  'Prompt', 'Sarabun', 'Thonburi', 'Arial', 'Times New Roman', 'Inter', 'Kanit', 'Mitr', 'Krub', 'Anuphan', 'IBM Plex Sans Thai'
];

// Default design elements for a Thai formal certificate template
const defaultDesignElements: DesignElements = {
  backgroundColor: '#F8F8F8', // Light grey/off-white
  textColor: '#333333',     // Dark grey
  fontFamily: 'Prompt',     // Default font
  fontSize: 24,
  titleText: 'ประกาศนียบัตร',
  studentNamePlaceholder: 'นาย/นาง/นางสาว [ชื่อ-นามสกุล]',
  courseNamePlaceholder: 'หลักสูตร [ชื่อหลักสูตร]',
  issueDatePlaceholder: 'วันที่ [วันที่ออกเกียรติบัตร]',
  signatureText: 'ชื่อผู้บริหาร',
  signatureLine2: 'โรงเรียนนวดแผนไทย',
  logoUrl: 'https://placehold.co/100x50/cccccc/ffffff?text=Logo',

  // Default positions (relative to DESIGN_WIDTH/HEIGHT) - adjusted for a more formal Thai layout
  titlePosX: DESIGN_WIDTH / 2, // Centered
  titlePosY: DESIGN_HEIGHT * 0.15,
  studentNamePosX: DESIGN_WIDTH / 2, // Centered
  studentNamePosY: DESIGN_HEIGHT * 0.45,
  courseNamePosX: DESIGN_WIDTH / 2, // Centered
  courseNamePosY: DESIGN_HEIGHT * 0.65,
  issueDateTextPosX: DESIGN_WIDTH * 0.36, // Adjusted to be closer to left edge
  issueDateTextPosY: DESIGN_HEIGHT * 0.75,
  issueDateValuePosX: DESIGN_WIDTH * 0.44, // Adjusted to be aligned with issueDateText
  issueDateValuePosY: DESIGN_HEIGHT * 0.75,
  signatureBlockPosX: DESIGN_WIDTH * 0.65, // Adjusted to be further from right edge
  signatureBlockPosY: DESIGN_HEIGHT - 80,

  // Default border properties for a formal Thai look
  mainBorderWidth: 5,
  mainBorderColor: '#A52A2A', // Brown
  mainBorderRadius: 10,
  mainBorderStyle: 'solid',
  mainBorderDashLength: 0,
  mainBorderDashGap: 0,
  innerBorder1Width: 2,
  innerBorder1Color: '#8B4513', // Saddlebrown
  innerBorder1DashLength: 10,
  innerBorder1DashGap: 5,
  innerBorder2Width: 1,
  innerBorder2Color: '#CD853F', // Peru
};

// Initial template structure for SSR consistency
const initialTemplateState: CertificateTemplate = {
  id: uuidv4(),
  templateName: '',
  description: '',
  status: 'Draft',
  createdAt: dayjs().toISOString(),
  updatedAt: dayjs().toISOString(),
  designElements: defaultDesignElements
};


export default function ManageCertificateTemplatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('id');

  const [form] = Form.useForm<CertificateTemplateFormValues>();
  const [certificateTemplate, setCertificateTemplate] = useState<CertificateTemplate>(initialTemplateState);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  const stageRef = useRef<Konva.Stage | null>(null);

  // No longer using containerRef and currentScale for responsive scaling,
  // instead, we'll use overflow-x-auto for scrolling.

  useEffect(() => {
    const initializeTemplate = () => {
      if (templateId) {
        setIsEditMode(true);
        try {
          const storedTemplates = JSON.parse(localStorage.getItem('certificateTemplates') || '[]') as CertificateTemplate[];
          const foundTemplate = storedTemplates.find(t => t.id === templateId);
          if (foundTemplate) {
            // Ensure designElements has all default properties if some are missing from old data
            const mergedDesignElements = { ...defaultDesignElements, ...foundTemplate.designElements };
            setCertificateTemplate({ ...foundTemplate, designElements: mergedDesignElements });
            form.setFieldsValue({ ...foundTemplate, designElements: mergedDesignElements });
          } else {
            message.error('ไม่พบแม่แบบเกียรติบัตรที่ต้องการแก้ไข');
            router.push('/admin/certificate');
          }
        } catch (error) {
          console.error("Failed to parse certificateTemplates from localStorage", error);
          message.error('เกิดข้อผิดพลาดในการโหลดแม่แบบ');
          router.push('/admin/certificate');
        }
      } else {
        setIsEditMode(false);
        form.setFieldsValue(initialTemplateState);
      }
      setLoading(false);
    };

    initializeTemplate();
  }, [templateId, form, router]);

  // This function is now called by draggable elements in CertificateCanvas
  const handlePositionChange = (elementName: string, newPos: { x: number; y: number }) => {
    setCertificateTemplate(prev => {
      const updatedDesignElements = { ...prev.designElements };
      switch (elementName) {
        case 'logo': // Added logo
          // For logo, if you want to store its position, you'd need logoPosX/logoPosY in DesignElements
          // For now, we're just handling the drag event, but not persisting position for logo
          // If you want to persist logo position, uncomment and add logoPosX/logoPosY to DesignElements
          // updatedDesignElements.logoPosX = newPos.x;
          // updatedDesignElements.logoPosY = newPos.y;
          break;
        case 'title':
          updatedDesignElements.titlePosX = newPos.x;
          updatedDesignElements.titlePosY = newPos.y;
          break;
        case 'studentName':
          updatedDesignElements.studentNamePosX = newPos.x;
          updatedDesignElements.studentNamePosY = newPos.y;
          break;
        case 'courseName':
          updatedDesignElements.courseNamePosX = newPos.x;
          updatedDesignElements.courseNamePosY = newPos.y;
          break;
        case 'issueDateText':
          updatedDesignElements.issueDateTextPosX = newPos.x;
          updatedDesignElements.issueDateTextPosY = newPos.y;
          break;
        case 'issueDateValue':
          updatedDesignElements.issueDateValuePosX = newPos.x;
          updatedDesignElements.issueDateValuePosY = newPos.y;
          break;
        case 'signatureBlock':
          updatedDesignElements.signatureBlockPosX = newPos.x;
          updatedDesignElements.signatureBlockPosY = newPos.y;
          break;
      }
      form.setFieldsValue({ designElements: updatedDesignElements });
      return { ...prev, designElements: updatedDesignElements, updatedAt: dayjs().toISOString() };
    });
  };

  const handleSaveTemplate = (status: 'Draft' | 'Published') => {
    form.validateFields()
      .then(values => {
        const now = dayjs().toISOString();
        const finalTemplate: CertificateTemplate = {
          ...certificateTemplate,
          templateName: values.templateName,
          description: values.description,
          status: status,
          designElements: values.designElements,
          createdAt: isEditMode ? certificateTemplate.createdAt : now,
          updatedAt: now,
        };

        const storedTemplates = JSON.parse(localStorage.getItem('certificateTemplates') || '[]') as CertificateTemplate[];
        let updatedTemplates: CertificateTemplate[];

        if (isEditMode) {
          updatedTemplates = storedTemplates.map(t => t.id === finalTemplate.id ? finalTemplate : t);
          message.success('อัปเดตแม่แบบเกียรติบัตรเรียบร้อย!');
        } else {
          updatedTemplates = [...storedTemplates, finalTemplate];
          message.success('สร้างแม่แบบเกียรติบัตรใหม่เรียบร้อย!');
        }
        localStorage.setItem('certificateTemplates', JSON.stringify(updatedTemplates));
        router.push('/admin/certificate');
      })
      .catch(info => {
        message.error('กรุณากรอกข้อมูลแม่แบบให้ครบถ้วน');
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    router.push('/admin/certificate');
  };

  const breadcrumbItems = [
    {
      title: <a href="/admin/dashboard"><HomeOutlined /> หน้าหลัก</a>,
    },
    {
      title: <a href="/admin/certificate"><TrophyOutlined /> เกียรติบัตร</a>,
    },
    {
      title: <a href="/admin/certificate?tab=templates"><AppstoreOutlined /> จัดการแม่แบบเกียรติบัตร</a>,
    },
    {
      title: templateId ? 'แก้ไขแม่แบบ' : 'สร้างแม่แบบใหม่',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text>กำลังโหลด...</Text>
      </div>
    );
  }

  // Get current form values to check mainBorderStyle
  const currentFormValues = form.getFieldsValue();
  const currentMainBorderStyle = currentFormValues?.designElements?.mainBorderStyle;


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb className="mb-6" items={breadcrumbItems} />

      <AntdTitle level={1} className="text-3xl font-bold mb-8 text-gray-800">
        {templateId ? 'แก้ไขแม่แบบเกียรติบัตร' : 'สร้างแม่แบบเกียรติบัตรใหม่'}
      </AntdTitle>
      <div className="flex flex-col gap-10"> {/* Added this div for consistent gap */}
        <Row gutter={[24, 24]} className="h-full">
          {/* Left Column: Template Data (35%) */}
          <Col xs={24} lg={8}>
            <Card className="rounded-xl shadow-custom-light p-4 mb-8 h-full">
              <AntdTitle level={4} className="text-gray-700 mb-6">ข้อมูลแม่แบบ</AntdTitle>
              {/* Adjusted maxHeight and added padding-bottom */}
              <div style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto', paddingRight: '10px', paddingBottom: '20px' }}>
                <Form
                  form={form}
                  layout="vertical"
                  name="certificate_template_form"
                  initialValues={certificateTemplate}
                  onValuesChange={(_, allValues) => {
                    setCertificateTemplate(prev => ({
                      ...prev,
                      ...allValues,
                      designElements: {
                        ...prev.designElements,
                        ...allValues.designElements,
                      },
                      updatedAt: dayjs().toISOString(),
                    }));
                  }}
                >
                  <Form.Item
                    name="templateName"
                    label={<span className="font-semibold text-gray-700">ชื่อแม่แบบ</span>}
                    rules={[{ required: true, message: 'กรุณากรอกชื่อแม่แบบ!' }]}
                  >
                    <Input placeholder="เช่น ใบประกาศนวดแผนไทย" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label={<span className="font-semibold text-gray-700">คำอธิบาย</span>}
                  >
                    <TextArea rows={3} placeholder="คำอธิบายแม่แบบเกียรติบัตร" className="rounded-lg" />
                  </Form.Item>

                  <AntdTitle level={5} className="text-gray-700 mt-6 mb-4">การออกแบบเกียรติบัตร</AntdTitle>
                  <Form.Item
                    name={['designElements', 'backgroundColor']}
                    label={<span className="font-semibold text-gray-700">สีพื้นหลัง</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกสีพื้นหลัง!' }]}
                  >
                    <Input type="color" className="w-full h-10 rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'textColor']}
                    label={<span className="font-semibold text-gray-700">สีข้อความ</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกสีข้อความ!' }]}
                  >
                    <Input type="color" className="w-full h-10 rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'fontFamily']}
                    label={<span className="font-semibold text-gray-700">รูปแบบตัวอักษร</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกรูปแบบตัวอักษร!' }]}
                  >
                    <Select className="rounded-lg" placeholder="เลือกรูปแบบตัวอักษร">
                      {FONT_OPTIONS.map(font => (
                        <Option key={font} value={font}>{font}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'fontSize']}
                    label={<span className="font-semibold text-gray-700">ขนาดตัวอักษรพื้นฐาน</span>}
                    rules={[{ required: true, message: 'กรุณากรอกขนาดตัวอักษร!', type: 'number', min: 10, max: 72 }]}
                  >
                    <InputNumber min={10} max={72} className="w-full rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'titleText']}
                    label={<span className="font-semibold text-gray-700">ข้อความหัวเรื่อง</span>}
                    rules={[{ required: true, message: 'กรุณากรอกข้อความหัวเรื่อง!' }]}
                  >
                    <Input placeholder="เช่น ประกาศนียบัตร" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'studentNamePlaceholder']}
                    label={<span className="font-semibold text-gray-700">ชื่อนักเรียน</span>}
                    tooltip="ใช้สำหรับระบุตำแหน่งชื่อนักเรียนในเกียรติบัตร"
                    rules={[{ required: true, message: 'กรุณากรอก Placeholder สำหรับชื่อนักเรียน!' }]}
                  >
                    <Input placeholder="เช่น นายสมชาย ใจดี" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'courseNamePlaceholder']}
                    label={<span className="font-semibold text-gray-700">ชื่อหลักสูตร</span>}
                    tooltip="ใช้สำหรับระบุตำแหน่งชื่อหลักสูตรในเกียรติบัตร"
                    rules={[{ required: true, message: 'กรุณากรอก Placeholder สำหรับชื่อหลักสูตร!' }]}
                  >
                    <Input placeholder="เช่น หลักสูตรนวดแผนไทยเบื้องต้น" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'issueDatePlaceholder']}
                    label={<span className="font-semibold text-gray-700">วันที่ออก</span>}
                    tooltip="ใช้สำหรับระบุตำแหน่งวันที่ออกเกียรติบัตร"
                    rules={[{ required: true, message: 'กรุณากรอก Placeholder สำหรับวันที่ออก!' }]}
                  >
                    <Input placeholder="เช่น 15 กรกฎาคม 2568" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'signatureText']}
                    label={<span className="font-semibold text-gray-700">ข้อความลายเซ็น 1</span>}
                    rules={[{ required: true, message: 'กรุณากรอกข้อความลายเซ็น!' }]}
                  >
                    <Input placeholder="เช่น ชื่อผู้บริหาร" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'signatureLine2']}
                    label={<span className="font-semibold text-gray-700">ข้อความลายเซ็น 2 (ไม่บังคับ)</span>}
                  >
                    <Input placeholder="เช่น โรงเรียนนวดแผนไทย" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'logoUrl']}
                    label={<span className="font-semibold text-gray-700">URL โลโก้ (ไม่บังคับ)</span>}
                  >
                    <Input placeholder="URL รูปภาพโลโก้" className="rounded-lg" />
                  </Form.Item>

                  <AntdTitle level={5} className="text-gray-700 mt-6 mb-4">การตั้งค่ากรอบ</AntdTitle>
                  <Form.Item
                    name={['designElements', 'mainBorderWidth']}
                    label={<span className="font-semibold text-gray-700">ความหนาขอบนอก</span>}
                    rules={[{ required: true, message: 'กรุณากรอกความหนาขอบนอก!', type: 'number', min: 0 }]}
                  >
                    <InputNumber min={0} className="w-full rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'mainBorderColor']}
                    label={<span className="font-semibold text-gray-700">สีขอบนอก</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกสีขอบนอก!' }]}
                  >
                    <Input type="color" className="w-full h-10 rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'mainBorderRadius']}
                    label={<span className="font-semibold text-gray-700">รัศมีขอบนอก</span>}
                    rules={[{ required: true, message: 'กรุณากรอกรัศมีขอบนอก!', type: 'number', min: 0 }]}
                  >
                    <InputNumber min={0} className="w-full rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'mainBorderStyle']}
                    label={<span className="font-semibold text-gray-700">รูปแบบขอบนอก</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกรูปแบบขอบนอก!' }]}
                  >
                    <Select className="rounded-lg">
                      <Option value="solid">Solid</Option>
                      <Option value="dashed">Dashed</Option>
                    </Select>
                  </Form.Item>
                  {currentMainBorderStyle === 'dashed' && (
                    <>
                      <Form.Item
                        name={['designElements', 'mainBorderDashLength']}
                        label={<span className="font-semibold text-gray-700">ความยาว Dash ขอบนอก</span>}
                        rules={[{ required: true, message: 'กรุณากรอกความยาว Dash!', type: 'number', min: 0 }]}
                      >
                        <InputNumber min={0} className="w-full rounded-lg" />
                      </Form.Item>
                      <Form.Item
                        name={['designElements', 'mainBorderDashGap']}
                        label={<span className="font-semibold text-gray-700">ช่องว่าง Dash ขอบนอก</span>}
                        rules={[{ required: true, message: 'กรุณากรอกช่องว่าง Dash!', type: 'number', min: 0 }]}
                      >
                        <InputNumber min={0} className="w-full rounded-lg" />
                      </Form.Item>
                    </>
                  )}

                  <Form.Item
                    name={['designElements', 'innerBorder1Width']}
                    label={<span className="font-semibold text-gray-700">ความหนาขอบใน 1</span>}
                    rules={[{ required: true, message: 'กรุณากรอกความหนาขอบใน 1!', type: 'number', min: 0 }]}
                  >
                    <InputNumber min={0} className="w-full rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'innerBorder1Color']}
                    label={<span className="font-semibold text-gray-700">สีขอบใน 1</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกสีขอบใน 1!' }]}
                  >
                    <Input type="color" className="w-full h-10 rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'innerBorder1DashLength']}
                    label={<span className="font-semibold text-gray-700">ความยาว Dash ขอบใน 1</span>}
                    rules={[{ required: true, message: 'กรุณากรอกความยาว Dash!', type: 'number', min: 0 }]}
                  >
                    <InputNumber min={0} className="w-full rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'innerBorder1DashGap']}
                    label={<span className="font-semibold text-gray-700">ช่องว่าง Dash ขอบใน 1</span>}
                    rules={[{ required: true, message: 'กรุณากรอกช่องว่าง Dash!', type: 'number', min: 0 }]}
                  >
                    <InputNumber min={0} className="w-full rounded-lg" />
                  </Form.Item>

                  <Form.Item
                    name={['designElements', 'innerBorder2Width']}
                    label={<span className="font-semibold text-gray-700">ความหนาขอบใน 2</span>}
                    rules={[{ required: true, message: 'กรุณากรอกความหนาขอบใน 2!', type: 'number', min: 0 }]}
                  >
                    <InputNumber min={0} className="w-full rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name={['designElements', 'innerBorder2Color']}
                    label={<span className="font-semibold text-gray-700">สีขอบใน 2</span>}
                    rules={[{ required: true, message: 'กรุณาเลือกสีขอบใน 2!' }]}
                  >
                    <Input type="color" className="w-full h-10 rounded-lg" />
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </Col>

          {/* Right Column: Certificate Preview (65%) */}
          <Col xs={24} lg={16} className="h-full">
            <Card className="rounded-xl shadow-custom-light p-4 h-full flex flex-col">
              <AntdTitle level={4} className="text-gray-700 mb-6">ตัวอย่างเกียรติบัตร</AntdTitle>
              {/* Added overflow-x-auto for horizontal scrollbar */}
              <div className="flex-grow flex justify-center items-center min-h-[400px] w-full overflow-x-auto">
                <DynamicCertificateCanvas
                  certificateData={certificateTemplate.designElements}
                  onPositionChange={handlePositionChange}
                  stageRef={stageRef}
                  scale={0.95} // Explicitly set scale to 1 for fixed size, let overflow handle it
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Buttons wrapped in Row and Col with adjusted margin-top and gap */}
        <Row justify="end" gutter={[16, 16]} className="mt-8 w-full">
          <Col xs={24} sm={8} md={6} lg={4}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleCancel}
              className="rounded-lg shadow-md px-6 py-3 text-base w-full"
            >
              กลับ
            </Button>
          </Col>
          <Col xs={24} sm={8} md={6} lg={4}>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => handleSaveTemplate('Draft')}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base w-full"
            >
              บันทึกฉบับร่าง
            </Button>
          </Col>
          <Col xs={24} sm={8} md={6} lg={4}>
            <Button
              type='primary'
              icon={<SaveOutlined />}
              onClick={() => handleSaveTemplate('Published')}
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md px-6 py-3 text-base w-full"
            >
              เผยแพร่แม่แบบ
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
