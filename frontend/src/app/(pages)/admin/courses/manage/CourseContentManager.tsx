// src/app/(pages)/admin/courses/manage/CourseContentManager.tsx
'use client';

import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { Button, Input, Form, Typography, Collapse, Space, Popconfirm, Card } from 'antd';
import { PlusOutlined, DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import type { CollapseProps } from 'antd';

// Import the new CourseContentEditor component
import CourseContentEditor from './CourseContentEditor';

const { Text } = Typography;

// Interfaces for Course Content Structure (kept here as they are exported)
export interface CourseContentModule {
  id: string;
  moduleName: string;
  contents: CourseContentItem[];
}

export interface CourseContentItem {
  id: string;
  itemTitle: string;
  itemDescription: string; // This will now hold HTML content from TipTap
  itemType: 'text' | 'video' | 'quiz' | 'document'; // Example types
}

interface CourseContentManagerProps {
  modules: CourseContentModule[];
  onModulesChange: (newModules: CourseContentModule[]) => void;
}

const CourseContentManager: React.FC<CourseContentManagerProps> = ({ modules, onModulesChange }) => {

  // --- Module Management Functions ---
  const addModule = () => {
    const newModule: CourseContentModule = {
      id: uuidv4(),
      moduleName: `โมดูลใหม่ ${modules.length + 1}`,
      contents: [],
    };
    onModulesChange([...modules, newModule]);
  };

  const updateModule = (moduleId: string, newName: string) => {
    const updatedModules = modules.map(mod =>
      mod.id === moduleId ? { ...mod, moduleName: newName } : mod
    );
    onModulesChange(updatedModules);
  };

  const deleteModule = (moduleId: string) => {
    const updatedModules = modules.filter(mod => mod.id !== moduleId);
    onModulesChange(updatedModules);
  };

  const moveModule = (moduleId: string, direction: 'up' | 'down') => {
    const currentIndex = modules.findIndex(mod => mod.id === moduleId);
    if (currentIndex === -1) return;

    const newModules = [...modules];
    let newIndex = currentIndex;

    if (direction === 'up') {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(modules.length - 1, currentIndex + 1);
    }

    // Swap elements
    const [movedModule] = newModules.splice(currentIndex, 1);
    newModules.splice(newIndex, 0, movedModule);
    onModulesChange(newModules);
  };

  // --- Content Item Management Functions ---
  const addContentItem = (moduleId: string) => {
    const updatedModules = modules.map(mod =>
      mod.id === moduleId
        ? {
            ...mod,
            contents: [
              ...mod.contents,
              {
                id: uuidv4(),
                itemTitle: `เนื้อหาใหม่ ${mod.contents.length + 1}`,
                itemDescription: '',
                itemType: 'text',
              } as CourseContentItem,
            ],
          }
        : mod
    );
    onModulesChange(updatedModules);
  };

  const updateContentItem = (moduleId: string, itemId: string, updatedItem: Partial<CourseContentItem>) => {
    const updatedModules = modules.map(mod =>
      mod.id === moduleId
        ? {
            ...mod,
            contents: mod.contents.map(item =>
              item.id === itemId
                ? ({ ...item, ...updatedItem } as CourseContentItem)
                : item
            ),
          }
        : mod
    );
    onModulesChange(updatedModules);
  };

  const deleteContentItem = (moduleId: string, itemId: string) => {
    const updatedModules = modules.map(mod =>
      mod.id === moduleId
        ? {
            ...mod,
            contents: mod.contents.filter(item => item.id !== itemId),
          }
        : mod
    );
    onModulesChange(updatedModules);
  };

  const moveContentItem = (moduleId: string, itemId: string, direction: 'up' | 'down') => {
    const updatedModules = modules.map(mod => {
      if (mod.id === moduleId) {
        const currentIndex = mod.contents.findIndex(item => item.id === itemId);
        if (currentIndex === -1) return mod;

        const newContents = [...mod.contents];
        let newIndex = currentIndex;

        if (direction === 'up') {
          newIndex = Math.max(0, currentIndex - 1);
        } else {
          newIndex = Math.min(mod.contents.length - 1, currentIndex + 1);
        }

        // Swap elements
        const [movedItem] = newContents.splice(currentIndex, 1);
        newContents.splice(newIndex, 0, movedItem);
        return { ...mod, contents: newContents };
      }
      return mod;
    });
    onModulesChange(updatedModules);
  };

  // Prepare items for Ant Design Collapse component
  const collapseItems: CollapseProps['items'] = modules.map((module, moduleIndex) => ({
    key: module.id,
    label: (
      <div className="flex items-center justify-between w-full pr-4">
        <Text strong className="text-base text-gray-800">{module.moduleName}</Text>
        <Space size="small">
          <Button
            icon={<UpOutlined />}
            onClick={(e) => { e.stopPropagation(); moveModule(module.id, 'up'); }}
            disabled={moduleIndex === 0}
            className="rounded-full flex items-center justify-center p-1"
          />
          <Button
            icon={<DownOutlined />}
            onClick={(e) => { e.stopPropagation(); moveModule(module.id, 'down'); }}
            disabled={moduleIndex === modules.length - 1}
            className="rounded-full flex items-center justify-center p-1"
          />
          <Popconfirm
            title="คุณแน่ใจหรือไม่ที่จะลบโมดูลนี้?"
            onConfirm={(e) => {
              e?.stopPropagation();
              deleteModule(module.id);
            }}
            okText="ใช่"
            cancelText="ไม่"
            placement="left"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()}
              className="rounded-full flex items-center justify-center p-1"
            />
          </Popconfirm>
        </Space>
      </div>
    ),
    children: (
      <div className="p-4 bg-gray-50 rounded-lg">
        <Form.Item label={<span className="font-semibold text-gray-700">ชื่อโมดูล</span>}>
          <Input
            value={module.moduleName}
            onChange={(e) => updateModule(module.id, e.target.value)}
            placeholder="ชื่อโมดูล เช่น บทนำ, การนวดไทยเบื้องต้น"
            className="rounded-lg"
          />
        </Form.Item>

        <Text strong className="text-md text-gray-700 mb-2 block">รายการเนื้อหาในโมดูล</Text>
        {module.contents.length === 0 && (
          <div className="text-center text-gray-400 p-4 border border-dashed rounded-lg mb-4">
            <Text>ยังไม่มีเนื้อหาในโมดูลนี้</Text>
          </div>
        )}

        {module.contents.map((item, itemIndex) => (
          <Card key={item.id} size="small" className="mb-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <Text strong className="text-sm text-gray-800">{item.itemTitle}</Text>
              <Space size="small">
                <Button
                  icon={<UpOutlined />}
                  onClick={() => moveContentItem(module.id, item.id, 'up')}
                  disabled={itemIndex === 0}
                  className="rounded-full flex items-center justify-center p-1"
                />
                <Button
                  icon={<DownOutlined />}
                  onClick={() => moveContentItem(module.id, item.id, 'down')}
                  disabled={itemIndex === module.contents.length - 1}
                  className="rounded-full flex items-center justify-center p-1"
                />
                <Popconfirm
                  title="คุณแน่ใจหรือไม่ที่จะลบเนื้อหานี้?"
                  onConfirm={(e) => {
                    e?.stopPropagation();
                    deleteContentItem(module.id, item.id);
                  }}
                  okText="ใช่"
                  cancelText="ไม่"
                  placement="left"
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    className="rounded-full flex items-center justify-center p-1"
                  />
                </Popconfirm>
              </Space>
            </div>
            <Form.Item label={<span className="font-semibold text-gray-700">ชื่อเนื้อหา</span>} className="mb-2">
              <Input
                value={item.itemTitle}
                onChange={(e) => updateContentItem(module.id, item.id, { itemTitle: e.target.value })}
                placeholder="ชื่อเนื้อหา เช่น วิดีโอแนะนำ, เอกสารประกอบ"
                className="rounded-lg"
              />
            </Form.Item>
            <Form.Item label={<span className="font-semibold text-gray-700">คำอธิบายเนื้อหา</span>} className="mb-2">
              {/* Use the new CourseContentEditor component here */}
              <CourseContentEditor
                item={item}
                onContentChange={(newDescription) => updateContentItem(module.id, item.id, { itemDescription: newDescription })}
              />
            </Form.Item>
            {/* Future expansion: Add Select for itemType (video, quiz, document) and conditional inputs */}
            {/* <Form.Item label="ประเภทเนื้อหา" className="mb-2">
              <Select
                value={item.itemType}
                onChange={(value) => updateContentItem(module.id, item.id, { itemType: value })}
                className="rounded-lg"
              >
                <Option value="text">ข้อความ</Option>
                <Option value="video">วิดีโอ</Option>
                <Option value="quiz">แบบทดสอบ</Option>
                <Option value="document">เอกสาร</Option>
              </Select>
            </Form.Item> */}
          </Card>
        ))}

        <Button
          type="dashed"
          onClick={() => addContentItem(module.id)}
          block
          icon={<PlusOutlined />}
          className="mt-4 rounded-lg border-dashed border-gray-300 text-gray-600 hover:text-blue-500 hover:border-blue-500"
        >
          เพิ่มเนื้อหาในโมดูล
        </Button>
      </div>
    ),
    className: "mb-2 rounded-lg",
  }));

  return (
    <div className="course-content-manager">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center mb-4">
          <Text strong className="text-lg text-gray-700">เนื้อหาหลักสูตรและโมดูล</Text>
          <Button type="primary" icon={<PlusOutlined />} onClick={addModule} className="rounded-lg bg-blue-500 hover:bg-blue-600">
            เพิ่มโมดูล
          </Button>
        </div>

        {modules.length === 0 && (
          <div className="text-center text-gray-500 p-8 border rounded-lg bg-gray-50">
            <Text>ยังไม่มีโมดูลเนื้อหา กรุณากด &quot;เพิ่มโมดูล&quot; เพื่อเริ่มต้น</Text>
          </div>
        )}

        <Collapse accordion className="rounded-lg shadow-sm" expandIconPosition="end" items={collapseItems} />
      </div>
    </div>
  );
};

export default CourseContentManager;
