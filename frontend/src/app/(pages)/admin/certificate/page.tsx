"use client";


import '@ant-design/v5-patch-for-react-19';
import React, { useState, useEffect } from 'react';
import { Tabs, Table, Button, Space, Modal, Input, message, Tag, Typography, Breadcrumb, Card } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, DeleteOutlined, HomeOutlined, TrophyOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // Import Thai locale for dayjs
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

dayjs.locale('th');

const { Text, Title: AntdTitle } = Typography;

// --- Interfaces for Certificate Templates ---
interface CertificateTemplate {
  id: string;
  templateName: string;
  description: string;
  status: 'Draft' | 'Published';
  createdAt: string;
  updatedAt: string;
  designElements: { // Added this to match manage page, though not fully used here
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    fontSize: number;
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
  };
}

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
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this certificate template? This action cannot be undone.',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk() {
        setCertificateTemplates(prevTemplates => {
          const updatedTemplates = prevTemplates.filter(template => template.id !== templateId);
          localStorage.setItem('certificateTemplates', JSON.stringify(updatedTemplates));
          message.success('Certificate template deleted successfully!');
          return updatedTemplates;
        });
      },
    });
  };

  const handleViewTemplate = (record: CertificateTemplate) => {
    setViewingTemplate(record);
    setIsTemplateDetailModalVisible(true);
  };

  const handleTemplateDetailModalCancel = () => {
    setIsTemplateDetailModalVisible(false);
    setViewingTemplate(null);
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
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this issued certificate record? This action cannot be undone.',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk() {
        setIssuedCertificates(prevIssued => {
          const updatedIssued = prevIssued.filter(issued => issued.id !== issuedId);
          message.success('Issued certificate record deleted successfully!');
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
              placeholder="Search Templates"
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
            title="Certificate Template Details"
            open={isTemplateDetailModalVisible}
            onCancel={handleTemplateDetailModalCancel}
            footer={null}
            className="rounded-xl"
            centered
          >
            {viewingTemplate ? (
              <div className="p-4">
                <p className="mb-2"><Text strong>Template Name:</Text> {viewingTemplate.templateName}</p>
                <p className="mb-2"><Text strong>Description:</Text> {viewingTemplate.description}</p>
                <p className="mb-2"><Text strong>Status:</Text> <Tag color={viewingTemplate.status === 'Published' ? 'green' : 'blue'}>{viewingTemplate.status}</Tag></p>
                <p className="mb-2"><Text strong>Created At:</Text> {dayjs(viewingTemplate.createdAt).format('DD/MM/YYYY, HH:mm')}</p>
                <p className="mb-2"><Text strong>Updated At:</Text> {dayjs(viewingTemplate.updatedAt).format('DD/MM/YYYY, HH:mm')}</p>
                {/* Display design elements in a structured way with safe access */}
                <div className="mt-4">
                  <Text strong className="text-lg">Design Elements:</Text>
                  <ul className="list-disc list-inside ml-4">
                    <li><Text strong>Background Color:</Text> {viewingTemplate.designElements?.backgroundColor ?? 'N/A'}</li>
                    <li><Text strong>Text Color:</Text> {viewingTemplate.designElements?.textColor ?? 'N/A'}</li>
                    <li><Text strong>Font Family:</Text> {viewingTemplate.designElements?.fontFamily ?? 'N/A'}</li>
                    <li><Text strong>Font Size:</Text> {viewingTemplate.designElements?.fontSize ?? 'N/A'}</li>
                    <li><Text strong>Title Text:</Text> {viewingTemplate.designElements?.titleText ?? 'N/A'}</li>
                    <li><Text strong>Student Name Placeholder:</Text> {viewingTemplate.designElements?.studentNamePlaceholder ?? 'N/A'}</li>
                    <li><Text strong>Course Name Placeholder:</Text> {viewingTemplate.designElements?.courseNamePlaceholder ?? 'N/A'}</li>
                    <li><Text strong>Issue Date Placeholder:</Text> {viewingTemplate.designElements?.issueDatePlaceholder ?? 'N/A'}</li>
                    <li><Text strong>Signature Text:</Text> {viewingTemplate.designElements?.signatureText ?? 'N/A'}</li>
                    <li><Text strong>Signature Line 2:</Text> {viewingTemplate.designElements?.signatureLine2 ?? 'N/A'}</li>
                    {viewingTemplate.designElements?.logoUrl && (
                      <li>
                        <Text strong>Logo URL:</Text> <a href={viewingTemplate.designElements.logoUrl} target="_blank" rel="noopener noreferrer">{viewingTemplate.designElements.logoUrl}</a>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={viewingTemplate.designElements.logoUrl} alt="Logo Preview" className="h-12 mt-2 border border-gray-200" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/100x50/cccccc/ffffff?text=Logo'; }} />
                      </li>
                    )}
                    <li><Text strong>Title Pos:</Text> ({viewingTemplate.designElements?.titlePosX?.toFixed(0) ?? 'N/A'}, {viewingTemplate.designElements?.titlePosY?.toFixed(0) ?? 'N/A'})</li>
                    <li><Text strong>Student Name Pos:</Text> ({viewingTemplate.designElements?.studentNamePosX?.toFixed(0) ?? 'N/A'}, {viewingTemplate.designElements?.studentNamePosY?.toFixed(0) ?? 'N/A'})</li>
                    <li><Text strong>Course Name Pos:</Text> ({viewingTemplate.designElements?.courseNamePosX?.toFixed(0) ?? 'N/A'}, {viewingTemplate.designElements?.courseNamePosY?.toFixed(0) ?? 'N/A'})</li>
                    <li><Text strong>Issue Date Text Pos:</Text> ({viewingTemplate.designElements?.issueDateTextPosX?.toFixed(0) ?? 'N/A'}, {viewingTemplate.designElements?.issueDateTextPosY?.toFixed(0) ?? 'N/A'})</li>
                    <li><Text strong>Issue Date Value Pos:</Text> ({viewingTemplate.designElements?.issueDateValuePosX?.toFixed(0) ?? 'N/A'}, {viewingTemplate.designElements?.issueDateValuePosY?.toFixed(0) ?? 'N/A'})</li>
                    <li><Text strong>Signature Block Pos:</Text> ({viewingTemplate.designElements?.signatureBlockPosX?.toFixed(0) ?? 'N/A'}, {viewingTemplate.designElements?.signatureBlockPosY?.toFixed(0) ?? 'N/A'})</li>
                    <li><Text strong>Main Border Width:</Text> {viewingTemplate.designElements?.mainBorderWidth ?? 'N/A'}</li>
                    <li><Text strong>Main Border Color:</Text> {viewingTemplate.designElements?.mainBorderColor ?? 'N/A'}</li>
                    <li><Text strong>Main Border Radius:</Text> {viewingTemplate.designElements?.mainBorderRadius ?? 'N/A'}</li>
                    <li><Text strong>Main Border Style:</Text> {viewingTemplate.designElements?.mainBorderStyle ?? 'N/A'}</li>
                    {viewingTemplate.designElements?.mainBorderStyle === 'dashed' && (
                      <>
                        <li><Text strong>Main Border Dash Length:</Text> {viewingTemplate.designElements?.mainBorderDashLength ?? 'N/A'}</li>
                        <li><Text strong>Main Border Dash Gap:</Text> {viewingTemplate.designElements?.mainBorderDashGap ?? 'N/A'}</li>
                      </>
                    )}
                    <li><Text strong>Inner Border 1 Width:</Text> {viewingTemplate.designElements?.innerBorder1Width ?? 'N/A'}</li>
                    <li><Text strong>Inner Border 1 Color:</Text> {viewingTemplate.designElements?.innerBorder1Color ?? 'N/A'}</li>
                    <li><Text strong>Inner Border 1 Dash Length:</Text> {viewingTemplate.designElements?.innerBorder1DashLength ?? 'N/A'}</li>
                    <li><Text strong>Inner Border 1 Dash Gap:</Text> {viewingTemplate.designElements?.innerBorder1DashGap ?? 'N/A'}</li>
                    <li><Text strong>Inner Border 2 Width:</Text> {viewingTemplate.designElements?.innerBorder2Width ?? 'N/A'}</li>
                    <li><Text strong>Inner Border 2 Color:</Text> {viewingTemplate.designElements?.innerBorder2Color ?? 'N/A'}</li>
                  </ul>
                </div>
              </div>
            ) : (
              <p>No data found</p>
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
              placeholder="Search Issued Certificates"
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
            title="Issued Certificate Details"
            open={isIssuedDetailModalVisible}
            onCancel={handleIssuedDetailModalCancel}
            footer={null}
            className="rounded-xl"
            centered
          >
            {viewingIssued ? (
              <div className="p-4">
                <p className="mb-2"><Text strong>Template Name:</Text> {viewingIssued.templateName}</p>
                <p className="mb-2"><Text strong>Student Name:</Text> {viewingIssued.studentName}</p>
                <p className="mb-2"><Text strong>Course Title:</Text> {viewingIssued.courseTitle}</p>
                <p className="mb-2"><Text strong>Issue Date:</Text> {dayjs(viewingIssued.issueDate).format('DD/MM/YYYY')}</p>
                <p className="mb-2"><Text strong>Status:</Text> <Tag color={viewingIssued.status === 'Issued' ? 'green' : 'red'}>{viewingIssued.status}</Tag></p>
              </div>
            ) : (
              <p>No data found</p>
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

      <AntdTitle level={1} className="text-3xl font-bold mb-8 text-gray-800">Certificate Management</AntdTitle>

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
