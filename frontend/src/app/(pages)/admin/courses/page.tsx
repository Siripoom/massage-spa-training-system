// src/app/(pages)/(admin)/courses/page.tsx
"use client";
import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageHeader from "@/components/common/PageHeader";

export default function CoursesPage() {
  return (
    <div>
      <PageHeader
        title="Course"
        description="จัดการหลักสูตรฝึกอบรมนวดและสปา"
        showAddButton
        addButtonText="เพิ่มหลักสูตรใหม่"
        onAddClick={() => console.log("Add course clicked")}
      />

      <div className="text-center py-20">
        <h3 className="text-lg text-gray-500">หน้า Course กำลังพัฒนา</h3>
        <p className="text-gray-400 mt-2">จะพัฒนาในขั้นตอนถัดไป</p>
      </div>
    </div>
  );
}
