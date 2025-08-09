// src/app/(pages)/(admin)/setting/page.tsx
"use client";
import React, { useState } from "react";
import {
  Tabs,
  Card,
  Row,
  Col,
  Button,
  ColorPicker,
  Select,
  Typography,
  Divider,
  Space,
  InputNumber,
  Upload,
  Tooltip,
} from "antd";
import {
  // PaletteOutlined,
  FontSizeOutlined,
  FileTextOutlined,
  // SchoolOutlined,
  SaveOutlined,
  ReloadOutlined,
  DownloadOutlined,
  UploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import PageHeader from "@/components/common/PageHeader";
import ThemePreview from "@/components/common/ThemePreview";
import { useThemeSettings } from "@/hooks/useThemeSettings";
import {
  fontFamilyOptions,
  fontWeightOptions,
  shadowLevelOptions,
  borderRadiusOptions,
  colorPresets,
} from "@/utils/themeUtils";
import type { Color } from "antd/es/color-picker";
import type { UploadProps } from "antd";
import "./setting.css";
import '@ant-design/v5-patch-for-react-19';

const { Title, Text } = Typography;
const { Option } = Select;
// const { Dragger } = Upload;

export default function SettingPage() {
  const {
    settings,
    saving,
    updateSettings,
    saveSettings,
    resetSettings,
    exportSettings,
    importSettings,
  } = useThemeSettings();

  const [previewMode, setPreviewMode] = useState(false);

  // Handle color change
  const handleColorChange = (type: string, color: Color) => {
    const colorValue = typeof color === "string" ? color : color.toHexString();
    updateSettings({
      theme: {
        ...settings.theme,
        [type]: colorValue,
      },
    });
  };

  // Handle theme settings (non-color)
  const handleThemeChange = (field: string, value: string | number) => {
    updateSettings({
      theme: {
        ...settings.theme,
        [field]: value,
      },
    });
  };

  // Handle typography change
  const handleTypographyChange = (field: string, value: string | number | null) => {
    if (value !== null) {
      updateSettings({
        typography: {
          ...settings.typography,
          [field]: value,
        },
      });
    }
  };

  // Handle layout change
  const handleLayoutChange = (field: string, value: number | null) => {
    if (value !== null) {
      updateSettings({
        layout: {
          ...settings.layout,
          [field]: value,
        },
      });
    }
  };

  // Handle preset colors
  const handlePresetColor = (preset: keyof typeof colorPresets) => {
    const colors = colorPresets[preset];
    updateSettings({
      theme: {
        ...settings.theme,
        primaryColor: colors.primary,
        secondaryColor: colors.secondary,
      },
    });
  };

  // Handle file import
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".json",
    beforeUpload: (file) => {
      importSettings(file);
      return false; // Prevent upload
    },
    showUploadList: false,
  };

  const tabItems = [
    {
      key: "template",
      label: (
        <span>
          {/* <PaletteOutlined /> */}
          ตั้งค่าเทมเพลต
        </span>
      ),
      children: (
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="setting-card">
            <div className="flex justify-between items-center">
              <div>
                <Title level={4} className="!m-0">
                  การจัดการการตั้งค่า
                </Title>
                <Text type="secondary">ส่งออก นำเข้า หรือรีเซ็ตการตั้งค่า</Text>
              </div>
              <Space>
                <Tooltip title="ส่งออกการตั้งค่า">
                  <Button icon={<DownloadOutlined />} onClick={exportSettings}>
                    ส่งออก
                  </Button>
                </Tooltip>
                <Tooltip title="นำเข้าการตั้งค่า">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>นำเข้า</Button>
                  </Upload>
                </Tooltip>
                <Tooltip title="ดูตัวอย่างแบบเต็มจอ">
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => setPreviewMode(!previewMode)}
                    type={previewMode ? "primary" : "default"}
                  >
                    {previewMode ? "ออกจากตัวอย่าง" : "ตัวอย่าง"}
                  </Button>
                </Tooltip>
              </Space>
            </div>
          </Card>

          {!previewMode && (
            <>
              {/* Color Presets */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    {/* <PaletteOutlined className="text-purple-500" /> */}
                    <span>ชุดสีแนะนำ</span>
                  </div>
                }
                className="setting-card"
              >
                <Row gutter={[16, 16]}>
                  {Object.entries(colorPresets).map(([key, preset]) => (
                    <Col xs={12} sm={8} md={6} lg={4} key={key}>
                      <div
                        className="cursor-pointer p-3 rounded-lg border-2 transition-all hover:shadow-md"
                        style={{
                          borderColor:
                            settings.theme.primaryColor === preset.primary
                              ? preset.primary
                              : "#e5e7eb",
                        }}
                        onClick={() =>
                          handlePresetColor(key as keyof typeof colorPresets)
                        }
                      >
                        <div className="flex gap-2 mb-2">
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: preset.secondary }}
                          />
                        </div>
                        <Text className="text-xs">{preset.name}</Text>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>

              {/* Theme Colors Section */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    {/* <PaletteOutlined className="text-blue-500" /> */}
                    <span>ธีมสี</span>
                  </div>
                }
                className="setting-card"
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <div className="space-y-4">
                      <div>
                        <Text strong>สีหลัก (Primary Color)</Text>
                        <div className="mt-2 flex items-center gap-3">
                          <ColorPicker
                            value={settings.theme.primaryColor}
                            onChange={(color) =>
                              handleColorChange("primaryColor", color)
                            }
                            showText
                            size="large"
                            presets={[
                              {
                                label: "สีแนะนำ",
                                colors: Object.values(colorPresets).map(
                                  (p) => p.primary
                                ),
                              },
                            ]}
                          />
                          <Text type="secondary" className="font-mono">
                            {settings.theme.primaryColor}
                          </Text>
                        </div>
                      </div>

                      <div>
                        <Text strong>สีรอง (Secondary Color)</Text>
                        <div className="mt-2 flex items-center gap-3">
                          <ColorPicker
                            value={settings.theme.secondaryColor}
                            onChange={(color) =>
                              handleColorChange("secondaryColor", color)
                            }
                            showText
                            size="large"
                            presets={[
                              {
                                label: "สีแนะนำ",
                                colors: Object.values(colorPresets).map(
                                  (p) => p.secondary
                                ),
                              },
                            ]}
                          />
                          <Text type="secondary" className="font-mono">
                            {settings.theme.secondaryColor}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="space-y-4">
                      <div>
                        <Text strong>สีพื้นหลัง (Background)</Text>
                        <div className="mt-2 flex items-center gap-3">
                          <ColorPicker
                            value={settings.theme.backgroundColor}
                            onChange={(color) =>
                              handleColorChange("backgroundColor", color)
                            }
                            showText
                            size="large"
                          />
                          <Text type="secondary" className="font-mono">
                            {settings.theme.backgroundColor}
                          </Text>
                        </div>
                      </div>

                      <div>
                        <Text strong>สีตัวอักษร (Text Color)</Text>
                        <div className="mt-2 flex items-center gap-3">
                          <ColorPicker
                            value={settings.theme.textColor}
                            onChange={(color) =>
                              handleColorChange("textColor", color)
                            }
                            showText
                            size="large"
                          />
                          <Text type="secondary" className="font-mono">
                            {settings.theme.textColor}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Divider />

                <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}>
                    <div>
                      <Text strong>ความโค้งของมุม (Border Radius)</Text>
                      <div className="mt-2">
                        <Select
                          value={settings.theme.borderRadius}
                          onChange={(value) =>
                            handleThemeChange("borderRadius", value)
                          }
                          className="w-full"
                          size="large"
                        >
                          {borderRadiusOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </Col>

                  <Col xs={24} md={12}>
                    <div>
                      <Text strong>ระดับเงา (Shadow Level)</Text>
                      <div className="mt-2">
                        <Select
                          value={settings.theme.shadowLevel}
                          onChange={(value) =>
                            handleThemeChange("shadowLevel", value)
                          }
                          className="w-full"
                          size="large"
                        >
                          {shadowLevelOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>

              {/* Typography Section */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <FontSizeOutlined className="text-green-500" />
                    <span>รูปแบบตัวอักษร</span>
                  </div>
                }
                className="setting-card"
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <div className="space-y-4">
                      <div>
                        <Text strong>แบบอักษร (Font Family)</Text>
                        <div className="mt-2">
                          <Select
                            value={settings.typography.fontFamily}
                            onChange={(value) =>
                              handleTypographyChange("fontFamily", value)
                            }
                            className="w-full"
                            size="large"
                          >
                            {fontFamilyOptions.map((option) => (
                              <Option key={option.value} value={option.value}>
                                <span style={{ fontFamily: option.value }}>
                                  {option.label}
                                </span>
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Text strong>ขนาดตัวอักษรหลัก</Text>
                        <div className="mt-2">
                          <InputNumber
                            value={settings.typography.fontSize}
                            onChange={(value) =>
                              handleTypographyChange("fontSize", value)
                            }
                            min={12}
                            max={20}
                            addonAfter="px"
                            className="w-full"
                            size="large"
                          />
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="space-y-4">
                      <div>
                        <Text strong>ขนาดหัวข้อ</Text>
                        <div className="mt-2">
                          <InputNumber
                            value={settings.typography.headingFontSize}
                            onChange={(value) =>
                              handleTypographyChange("headingFontSize", value)
                            }
                            min={18}
                            max={36}
                            addonAfter="px"
                            className="w-full"
                            size="large"
                          />
                        </div>
                      </div>

                      <div>
                        <Text strong>ความหนาตัวอักษร</Text>
                        <div className="mt-2">
                          <Select
                            value={settings.typography.fontWeight}
                            onChange={(value) =>
                              handleTypographyChange("fontWeight", value)
                            }
                            className="w-full"
                            size="large"
                          >
                            {fontWeightOptions.map((option) => (
                              <Option key={option.value} value={option.value}>
                                <span style={{ fontWeight: option.weight }}>
                                  {option.label}
                                </span>
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Divider />

                <div>
                  <Text strong>ระยะห่างบรรทัด (Line Height)</Text>
                  <div className="mt-2">
                    <InputNumber
                      value={settings.typography.lineHeight}
                      onChange={(value) =>
                        handleTypographyChange("lineHeight", value)
                      }
                      min={1.2}
                      max={2.0}
                      step={0.1}
                      className="w-full max-w-xs"
                      size="large"
                    />
                  </div>
                </div>
              </Card>

              {/* Layout Section */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <FileTextOutlined className="text-purple-500" />
                    <span>การจัดเลย์เอาท์</span>
                  </div>
                }
                className="setting-card"
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={8}>
                    <div>
                      <Text strong>ความกว้าง Sidebar</Text>
                      <div className="mt-2">
                        <InputNumber
                          value={settings.layout.sidebarWidth}
                          onChange={(value) =>
                            handleLayoutChange("sidebarWidth", value)
                          }
                          min={240}
                          max={320}
                          addonAfter="px"
                          className="w-full"
                          size="large"
                        />
                      </div>
                    </div>
                  </Col>

                  <Col xs={24} md={8}>
                    <div>
                      <Text strong>ความสูง Header</Text>
                      <div className="mt-2">
                        <InputNumber
                          value={settings.layout.headerHeight}
                          onChange={(value) =>
                            handleLayoutChange("headerHeight", value)
                          }
                          min={60}
                          max={100}
                          addonAfter="px"
                          className="w-full"
                          size="large"
                        />
                      </div>
                    </div>
                  </Col>

                  <Col xs={24} md={8}>
                    <div>
                      <Text strong>ระยะห่าง Content</Text>
                      <div className="mt-2">
                        <InputNumber
                          value={settings.layout.contentPadding}
                          onChange={(value) =>
                            handleLayoutChange("contentPadding", value)
                          }
                          min={16}
                          max={48}
                          addonAfter="px"
                          className="w-full"
                          size="large"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </>
          )}

          {/* Preview Section */}
          <Card title="ตัวอย่างธีม" className="setting-card">
            <ThemePreview settings={settings} />
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              icon={<ReloadOutlined />}
              onClick={resetSettings}
              size="large"
            >
              รีเซ็ต
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={saving}
              onClick={saveSettings}
              size="large"
            >
              บันทึกการตั้งค่า
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "school",
      label: (
        <span>
          {/* <SchoolOutlined /> */}
          ตั้งค่าข้อมูลโรงเรียน
        </span>
      ),
      children: (
        <div className="text-center py-20">
          {/* <SchoolOutlined className="text-6xl text-gray-300 mb-4" /> */}
          <Title level={3} type="secondary">
            หน้าตั้งค่าข้อมูลโรงเรียน
          </Title>
          <Text type="secondary" className="text-base">
            จะพัฒนาในขั้นตอนถัดไป - รวมถึงการตั้งค่าใบประกาศนียบัตรและเกียติบัตร
          </Text>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Setting"
        description="ตั้งค่าระบบและปรับแต่งรูปแบบการแสดงผล"
      />

      <Tabs
        defaultActiveKey="template"
        items={tabItems}
        size="large"
        className="bg-white rounded-lg p-6 shadow-sm"
      />
    </div>
  );
}
