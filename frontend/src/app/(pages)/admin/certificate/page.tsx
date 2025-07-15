"use client";


import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Table, Button, Space, Modal, Input, message, Tag, Typography, Breadcrumb, Card } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, DeleteOutlined, HomeOutlined, TrophyOutlined, PrinterOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // Import Thai locale for dayjs
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import dynamic from 'next/dynamic'; // Import dynamic for client-side rendering
import type Konva from 'konva'; // Import Konva as a type only to avoid SSR issues

dayjs.locale('th');

const { Text, Title: AntdTitle } = Typography;

// Dynamically import CertificateCanvas to ensure it's client-side rendered
// This is crucial for Konva to work in the browser environment
const DynamicCertificateCanvas = dynamic(
  () => import('./manage/certificateCanvas'), // Path to the canvas component
  { ssr: false }
);

// Base dimensions for the certificate design (A4 landscape ratio) - must match CertificateCanvas
const DESIGN_WIDTH = 720;
const DESIGN_HEIGHT = 508.5;

// --- Interfaces for Certificate Templates ---
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

// Default design elements for a Thai formal certificate template (copied from manage/page.tsx)
// This is crucial for ensuring all design properties are present when viewing older templates
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


// --- Interfaces for Issued Certificates ---
interface IssuedCertificate {
  id: string;
  templateName: string;
  studentName: string;
  courseTitle: string;
  issueDate: string; // YYYY-MM-DD
  status: 'Issued' | 'Revoked';
}

export default function CertificatePage() {
  const [activeTab, setActiveTab] = useState('templates'); // Default to templates tab

  // --- State for Certificate Templates Tab ---
  const [certificateTemplates, setCertificateTemplates] = useState<CertificateTemplate[]>([]);
  const [searchTermTemplates, setSearchTermTemplates] = useState('');
  const [isTemplateDetailModalVisible, setIsTemplateDetailModalVisible] = useState(false);
  const [viewingTemplate, setViewingTemplate] = useState<CertificateTemplate | null>(null);
  const [hasLoadedTemplates, setHasLoadedTemplates] = useState(false); // New state for hydration

  // Ref for the Konva Stage in the preview modal
  const stageRefForPreview = useRef<Konva.Stage | null>(null);

  // --- State for Issued Certificates Tab ---
  const [issuedCertificates, setIssuedCertificates] = useState<IssuedCertificate[]>([
    {
      id: uuidv4(),
      templateName: 'ใบประกาศนวดแผนไทย',
      studentName: 'สมชาย ใจดี',
      courseTitle: 'หลักสูตรนวดแผนไทยเบื้องต้น',
      issueDate: '2023-07-15',
      status: 'Issued',
    },
    {
      id: uuidv4(),
      templateName: 'ประกาศนียบัตรสปา',
      studentName: 'สมหญิง รักเรียน',
      courseTitle: 'หลักสูตรสปาเพื่อสุขภาพ',
      issueDate: '2023-07-20',
      status: 'Issued',
    },
    {
      id: uuidv4(),
      templateName: 'ใบรับรองอโรมาเธอราพี',
      studentName: 'มานะ พากเพียร',
      courseTitle: 'หลักสูตรอโรมาเธอราพี',
      issueDate: '2023-07-25',
      status: 'Revoked',
    },
  ]);
  const [searchTermIssued, setSearchTermIssued] = useState('');
  const [isIssuedDetailModalVisible, setIsIssuedDetailModalVisible] = useState(false);
  const [viewingIssued, setViewingIssued] = useState<IssuedCertificate | null>(null);
  const [hasLoadedIssued, setHasLoadedIssued] = useState(false); // New state for hydration for issued

  // Load certificate templates from localStorage on component mount (client-side only)
  useEffect(() => {
    const loadTemplates = () => {
      try {
        const storedTemplates = JSON.parse(localStorage.getItem('certificateTemplates') || '[]') as CertificateTemplate[];
        setCertificateTemplates(storedTemplates);
        setHasLoadedTemplates(true); // Mark templates as loaded
      } catch (error) {
        console.error("Failed to parse certificateTemplates from localStorage", error);
        setCertificateTemplates([]);
        setHasLoadedTemplates(true); // Still mark as loaded to proceed
      }
    };
    loadTemplates();

    // Add event listener for 'storage' to update when localStorage changes from other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'certificateTemplates') {
        loadTemplates();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // --- Certificate Templates Handlers ---
  const handleCreateTemplate = () => {
    window.location.href = '/admin/certificate/manage';
  };

  const handleEditTemplate = (templateId: string) => {
    window.location.href = `/admin/certificate/manage?id=${templateId}`;
  };

  const handleDeleteTemplate = (templateId: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบแม่แบบเกียรติบัตรนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setCertificateTemplates(prevTemplates => {
          const updatedTemplates = prevTemplates.filter(template => template.id !== templateId);
          localStorage.setItem('certificateTemplates', JSON.stringify(updatedTemplates));
          message.success('ลบแม่แบบเกียรติบัตรเรียบร้อยแล้ว!');
          return updatedTemplates;
        });
      },
    });
  };

  const handleViewTemplate = (record: CertificateTemplate) => {
    // Ensure designElements has all default properties if some are missing from old data
    const mergedDesignElements = { ...defaultDesignElements, ...record.designElements };
    setViewingTemplate({ ...record, designElements: mergedDesignElements });
    setIsTemplateDetailModalVisible(true);
  };

  const handleTemplateDetailModalCancel = () => {
    setIsTemplateDetailModalVisible(false);
    setViewingTemplate(null);
  };

  // Helper function to draw elements onto a Konva Layer
  // This function is crucial for creating the high-resolution image for printing
  const drawCertificateElements = async (layer: Konva.Layer, design: DesignElements, width: number, height: number, KonvaRef: typeof Konva) => {
    // Background
    layer.add(new KonvaRef.Rect({
      x: 0, y: 0,
      width: width, height: height,
      fill: design.backgroundColor,
    }));

    // Main Border
    layer.add(new KonvaRef.Rect({
      x: 0,
      y: 0,
      width: width,
      height: height,
      stroke: design.mainBorderColor,
      strokeWidth: design.mainBorderWidth,
      cornerRadius: design.mainBorderRadius,
      dash: design.mainBorderStyle === 'dashed' ? [design.mainBorderDashLength, design.mainBorderDashGap] : [],
    }));

    // Inner Border 1
    layer.add(new KonvaRef.Rect({
      x: design.mainBorderWidth + design.innerBorder1Width / 2,
      y: design.mainBorderWidth + design.innerBorder1Width / 2,
      width: width - design.mainBorderWidth * 2 - design.innerBorder1Width,
      height: height - design.mainBorderWidth * 2 - design.innerBorder1Width,
      stroke: design.innerBorder1Color,
      strokeWidth: design.innerBorder1Width,
      dash: [design.innerBorder1DashLength, design.innerBorder1DashGap],
    }));

    // Inner Border 2
    layer.add(new KonvaRef.Rect({
      x: design.mainBorderWidth + design.innerBorder1Width + design.innerBorder2Width / 2,
      y: design.mainBorderWidth + design.innerBorder1Width + design.innerBorder2Width / 2,
      width: width - design.mainBorderWidth * 2 - design.innerBorder1Width * 2 - design.innerBorder2Width,
      height: height - design.mainBorderWidth * 2 - design.innerBorder1Width * 2 - design.innerBorder2Width,
      stroke: design.innerBorder2Color,
      strokeWidth: design.innerBorder2Width,
    }));

    // Title Text
    layer.add(new KonvaRef.Text({
      text: design.titleText,
      x: 0, // Set x to 0 for center alignment
      y: design.titlePosY,
      fontSize: design.fontSize + 10,
      fontFamily: design.fontFamily,
      fill: design.textColor,
      align: "center",
      width: width, // Use full width for centering
    }));
    // "มอบให้แก่" - Fixed text, centered
    layer.add(new KonvaRef.Text({
      text: "มอบให้แก่",
      x: 0, // Set x to 0 for center alignment
      y: DESIGN_HEIGHT * 0.30,
      fontSize: design.fontSize,
      fontFamily: design.fontFamily,
      fill: design.textColor,
      align: "center",
      width: width,
    }));
    // Student Name
    layer.add(new KonvaRef.Text({
      text: design.studentNamePlaceholder,
      x: 0, // Set x to 0 for center alignment
      y: design.studentNamePosY,
      fontSize: design.fontSize + 6,
      fontFamily: design.fontFamily,
      fill: design.textColor,
      align: "center",
      width: width,
    }));
    // "เพื่อแสดงว่าได้สำเร็จหลักสูตร" - Fixed text, centered
    layer.add(new KonvaRef.Text({
      text: "เพื่อแสดงว่าได้สำเร็จหลักสูตร",
      x: 0, // Set x to 0 for center alignment
      y: DESIGN_HEIGHT * 0.55,
      fontSize: design.fontSize,
      fontFamily: design.fontFamily,
      fill: design.textColor,
      align: "center",
      width: width,
    }));
    // Course Name
    layer.add(new KonvaRef.Text({
      text: design.courseNamePlaceholder,
      x: 0, // Set x to 0 for center alignment
      y: design.courseNamePosY,
      fontSize: design.fontSize + 6,
      fontFamily: design.fontFamily,
      fill: design.textColor,
      align: "center",
      width: width,
    }));
    // "ณ วันที่" - Text, left-aligned relative to its X
    layer.add(new KonvaRef.Text({
      text: "ณ วันที่",
      x: design.issueDateTextPosX,
      y: design.issueDateTextPosY,
      fontSize: design.fontSize - 8,
      fontFamily: design.fontFamily,
      fill: design.textColor,
      align: 'left'
    }));
    // Issue Date Value - Text, left-aligned relative to its X
    layer.add(new KonvaRef.Text({
      text: design.issueDatePlaceholder || dayjs().format('DD MMMM YYYY'),
      x: design.issueDateValuePosX,
      y: design.issueDateValuePosY,
      fontSize: design.fontSize - 8,
      fontFamily: design.fontFamily,
      fill: design.textColor,
      align: 'left'
    }));
    // Signature Lines - Text block, right-aligned relative to its X
    layer.add(new KonvaRef.Text({
      text: `(_________________________)\n\n${design.signatureText}\n${design.signatureLine2}`,
      x: design.signatureBlockPosX,
      y: design.signatureBlockPosY,
      fontSize: design.fontSize - 12,
      fontFamily: design.fontFamily,
      fill: design.textColor,
      align: 'right',
      width: 200, // Fixed width for signature block
    }));

    // Handle logo asynchronously
    if (design.logoUrl) {
      const img = new window.Image();
      img.src = design.logoUrl;
      img.crossOrigin = 'Anonymous'; // Important for CORS if image is external
      await new Promise<void>((resolve) => {
        img.onload = () => {
          layer.add(new KonvaRef.Image({
            image: img,
            x: 20, // Example position
            y: 20, // Example position
            width: 100, // Example size
            height: 50, // Example size
          }));
          layer.batchDraw(); // Redraw after image loads
          resolve();
        };
        img.onerror = () => {
          console.error("Failed to load logo image for printing:", design.logoUrl);
          resolve(); // Resolve even on error to not block the promise
        };
      });
    }
  };


  const handlePrintCertificate = async () => {
    // Crucial check to ensure this code only runs on the client-side
    if (typeof window === 'undefined') {
      console.warn("Attempted to print certificate on server, skipping.");
      return;
    }

    if (!viewingTemplate || !viewingTemplate.designElements) {
      message.error('ไม่พบข้อมูลแม่แบบสำหรับพิมพ์');
      return;
    }

    const design = viewingTemplate.designElements;

    // Dynamically import Konva here to ensure it's only loaded client-side when needed
    const KonvaModule = await import('konva');
    const KonvaRef: typeof Konva = KonvaModule.default; // Get the default export and type it

    // Create a temporary Konva Stage in memory
    const tempStage = new KonvaRef.Stage({
      container: document.createElement('div'), // Needs a dummy container
      width: DESIGN_WIDTH,
      height: DESIGN_HEIGHT,
    });

    const tempLayer = new KonvaRef.Layer();
    tempStage.add(tempLayer);

    // Draw all elements onto the temporary layer, awaiting for async elements like images
    await drawCertificateElements(tempLayer, design, DESIGN_WIDTH, DESIGN_HEIGHT, KonvaRef);

    // Use a Promise to ensure all elements (especially async images) are drawn before converting to DataURL
    const renderPromise = new Promise<string>((resolve) => {
      // Small delay to allow Konva to render, especially for async image loading
      // This delay might need adjustment based on image loading times
      setTimeout(() => {
        const dataURL = tempStage.toDataURL({
          mimeType: 'image/jpeg',
          quality: 1,
          pixelRatio: 2, // High pixel ratio for print quality
        });
        tempStage.destroy(); // Destroy the temporary stage to free memory
        resolve(dataURL);
      }, 500); // Increased delay slightly to ensure image loads
    });

    renderPromise.then(dataURL => {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
              <title>พิมพ์เกียรติบัตร - ${viewingTemplate.templateName}</title>
              <style>
                  /* CSS for A4 landscape printing */
                  @page {
                      size: A4 landscape;
                      margin: 0;
                  }
                  body {
                      margin: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh; /* Ensure it takes full viewport height */
                      background-color: #f0f0f0; /* Light background for visual separation */
                  }
                  img {
                      max-width: 100vw;
                      max-height: 100vh;
                      display: block;
                      margin: auto;
                      box-shadow: 0 0 10px rgba(0,0,0,0.1); /* Optional: for screen preview */
                  }
                  /* Print-specific styles */
                  @media print {
                      body {
                          background-color: white;
                      }
                      img {
                          width: 100%; /* Ensure image fills the printable area */
                          height: auto;
                          max-width: unset;
                          max-height: unset;
                          box-shadow: none;
                      }
                  }
              </style>
          </head>
          <body>
              <img src="${dataURL}" alt="Certificate for Print" />
              <script>
                  window.onload = function() {
                      window.print();
                      // Optional: Close window after printing, but sometimes users want to save as PDF
                      // window.onafterprint = function() { window.close(); };
                  };
              </script>
          </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        message.error('ไม่สามารถเปิดหน้าต่างพิมพ์ได้ กรุณาอนุญาต Pop-ups');
      }
    }).catch(error => {
      console.error("Error generating certificate for print:", error);
      message.error('เกิดข้อผิดพลาดในการเตรียมเกียรติบัตรสำหรับพิมพ์');
    });
  };


  // --- Issued Certificates Handlers ---
  useEffect(() => {
    setHasLoadedIssued(true);
  }, []);

  const handleViewIssued = (record: IssuedCertificate) => {
    setViewingIssued(record);
    setIsIssuedDetailModalVisible(true);
  };

  const handleIssuedDetailModalCancel = () => {
    setIsIssuedDetailModalVisible(false);
    setViewingIssued(null);
  };

  const handleDeleteIssued = (issuedId: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลเกียรติบัตรที่ออกแล้วนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setIssuedCertificates(prevIssued => {
          const updatedIssued = prevIssued.filter(issued => issued.id !== issuedId);
          message.success('ลบข้อมูลเกียรติบัตรที่ออกแล้วเรียบร้อยแล้ว!');
          return updatedIssued;
        });
      },
    });
  };

  // --- Filtered Data ---
  const filteredTemplates = certificateTemplates.filter(template =>
    template.templateName.toLowerCase().includes(searchTermTemplates.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTermTemplates.toLowerCase()) ||
    template.status.toLowerCase().includes(searchTermTemplates.toLowerCase())
  );

  const filteredIssued = issuedCertificates.filter(issued =>
    issued.templateName.toLowerCase().includes(searchTermIssued.toLowerCase()) ||
    issued.studentName.toLowerCase().includes(searchTermIssued.toLowerCase()) ||
    issued.courseTitle.toLowerCase().includes(searchTermIssued.toLowerCase()) ||
    issued.issueDate.includes(searchTermIssued) ||
    issued.status.toLowerCase().includes(searchTermIssued.toLowerCase())
  );

  // --- Columns for Certificate Templates Tab ---
  const templateColumns = [
    {
      title: '#',
      render: (_: unknown, __: unknown, index: number) => index + 1,
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'TEMPLATE NAME',
      dataIndex: 'templateName',
      key: 'templateName',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'Draft' | 'Published') => (
        <Tag color={status === 'Published' ? 'green' : 'blue'} className="rounded-full px-3 py-1 text-xs font-semibold">
          {status}
        </Tag>
      ),
      className: 'text-center',
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY, HH:mm'),
      className: 'text-gray-700',
    },
    {
      title: 'UPDATED AT',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY, HH:mm'),
      className: 'text-gray-700',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_: unknown, record: CertificateTemplate) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewTemplate(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button icon={<EditOutlined />} onClick={() => handleEditTemplate(record.id)} className="text-blue-500 border-none shadow-none hover:bg-blue-50" />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteTemplate(record.id)}
            className="text-red-500 border-none shadow-none hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];

  // --- Columns for Issued Certificates Tab ---
  const issuedColumns = [
    {
      title: '#',
      render: (_: unknown, __: unknown, index: number) => index + 1,
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'TEMPLATE',
      dataIndex: 'templateName',
      key: 'templateName',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'STUDENT NAME',
      dataIndex: 'studentName',
      key: 'studentName',
      className: 'text-gray-700',
    },
    {
      title: 'COURSE TITLE',
      dataIndex: 'courseTitle',
      key: 'courseTitle',
      className: 'text-gray-700',
    },
    {
      title: 'ISSUE DATE',
      dataIndex: 'issueDate',
      key: 'issueDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'Issued' | 'Revoked') => (
        <Tag color={status === 'Issued' ? 'green' : 'red'} className="rounded-full px-3 py-1 text-xs font-semibold">
          {status}
        </Tag>
      ),
      className: 'text-center',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_: unknown, record: IssuedCertificate) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewIssued(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteIssued(record.id)}
            className="text-red-500 border-none shadow-none hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: 'templates',
      label: 'จัดการแม่แบบเกียรติบัตร',
      children: (
        <Card className="rounded-xl shadow-custom-light p-4">
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="ค้นหาแม่แบบ"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-80 rounded-lg shadow-sm table-search-input"
              value={searchTermTemplates}
              onChange={(e) => setSearchTermTemplates(e.target.value)}
            />
            <Button
              type="primary"
              onClick={handleCreateTemplate}
              icon={<PlusOutlined />}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
            >
              สร้างแม่แบบใหม่
            </Button>
          </div>
          {hasLoadedTemplates ? (
            <Table
              columns={templateColumns}
              dataSource={filteredTemplates}
              rowKey="id"
              className="rounded-xl shadow-custom-light"
              pagination={{ pageSize: 10 }}
              bordered={false}
            />
          ) : (
            <div className="flex justify-center items-center h-40">
              <Text>กำลังโหลดแม่แบบเกียรติบัตร...</Text>
            </div>
          )}

          {/* Modal for Viewing Template Details */}
          <Modal
            title="รายละเอียดแม่แบบเกียรติบัตร"
            open={isTemplateDetailModalVisible}
            onCancel={handleTemplateDetailModalCancel}
            footer={
              viewingTemplate?.status === 'Published' ? (
                <Button
                  type="primary"
                  icon={<PrinterOutlined />}
                  onClick={handlePrintCertificate}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
                >
                  พิมพ์เกียรติบัตร
                </Button>
              ) : null
            }
            className="rounded-xl"
            centered
            width={800} // Adjust width to accommodate the preview
          >
            {viewingTemplate ? (
              <div className="p-4 flex flex-col space-y-6">
                {/* Text Details Section */}
                <div>
                  <p className="mb-2"><Text strong>Template Name:</Text> {viewingTemplate.templateName}</p>
                  <p className="mb-2"><Text strong>Description:</Text> {viewingTemplate.description}</p>
                  <p className="mb-2"><Text strong>Status:</Text> <Tag color={viewingTemplate.status === 'Published' ? 'green' : 'blue'}>{viewingTemplate.status}</Tag></p>
                  <p className="mb-2"><Text strong>Created At:</Text> {dayjs(viewingTemplate.createdAt).format('DD/MM/YYYY, HH:mm')}</p>
                  <p className="mb-2"><Text strong>Updated At:</Text> {dayjs(viewingTemplate.updatedAt).format('DD/MM/YYYY, HH:mm')}</p>
                </div>

                {/* Certificate Preview Section */}
                <div className="mt-4 border p-4 rounded-lg bg-gray-50 flex flex-col items-center">
                  <Text strong className="text-lg block mb-4 text-center">ตัวอย่างเกียรติบัตร</Text>
                  {viewingTemplate.designElements ? (
                    <div className="w-full flex justify-center">
                      <DynamicCertificateCanvas
                        certificateData={viewingTemplate.designElements}
                        onPositionChange={() => {}} // No-op function as dragging is not needed here
                        stageRef={stageRefForPreview} // Pass ref to get image for printing
                        scale={0.7} // Scale down for preview in modal
                      />
                    </div>
                  ) : (
                    <p className="text-center text-red-500">ไม่สามารถแสดงตัวอย่างได้: ข้อมูลการออกแบบไม่สมบูรณ์</p>
                  )}
                </div>
              </div>
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </Modal>
        </Card>
      ),
    },
    {
      key: 'issued',
      label: 'เกียรติบัตรที่ออกแล้ว',
      children: (
        <Card className="rounded-xl shadow-custom-light p-4">
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="ค้นหาเกียรติบัตรที่ออกแล้ว"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-80 rounded-lg shadow-sm table-search-input"
              value={searchTermIssued}
              onChange={(e) => setSearchTermIssued(e.target.value)}
            />
          </div>
          {hasLoadedIssued ? (
            <Table
              columns={issuedColumns}
              dataSource={filteredIssued}
              rowKey="id"
              className="rounded-xl shadow-custom-light"
              pagination={{ pageSize: 10 }}
              bordered={false}
            />
          ) : (
            <div className="flex justify-center items-center h-40">
              <Text>กำลังโหลดเกียรติบัตรที่ออกแล้ว...</Text>
            </div>
          )}
          {/* Modal for Viewing Issued Certificate Details */}
          <Modal
            title="รายละเอียดเกียรติบัตรที่ออกแล้ว"
            open={isIssuedDetailModalVisible}
            onCancel={handleIssuedDetailModalCancel}
            footer={null}
            className="rounded-xl"
            centered
          >
            {viewingIssued ? (
              <div className="p-4">
                <p className="mb-2"><Text strong>Template Name:</Text> {viewingIssued.templateName}</p>
                {/* Removed description as it's not part of IssuedCertificate */}
                <p className="mb-2"><Text strong>Student Name:</Text> {viewingIssued.studentName}</p>
                <p className="mb-2"><Text strong>Course Title:</Text> {viewingIssued.courseTitle}</p>
                <p className="mb-2"><Text strong>Issue Date:</Text> {dayjs(viewingIssued.issueDate).format('DD/MM/YYYY')}</p>
                <p className="mb-2"><Text strong>Status:</Text> <Tag color={viewingIssued.status === 'Issued' ? 'green' : 'red'}>{viewingIssued.status}</Tag></p>
              </div>
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </Modal>
        </Card>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <a href="/admin/dashboard"><HomeOutlined /> หน้าหลัก</a>,
    },
    {
      title: <><TrophyOutlined /> เกียรติบัตร</>,
    },
    {
      title: activeTab === 'templates' ? 'จัดการแม่แบบเกียรติบัตร' : 'เกียรติบัตรที่ออกแล้ว',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6" items={breadcrumbItems} />

      <AntdTitle level={1} className="text-3xl font-bold mb-8 text-gray-800">การจัดการเกียรติบัตร</AntdTitle>

      <Tabs
        defaultActiveKey="templates"
        items={items}
        onChange={setActiveTab}
        activeKey={activeTab}
        className="rounded-xl shadow-custom-light bg-white"
      />
    </div>
  );
}
