// src/app/(pages)/(admin)/users/page.tsx
"use client";
import React from "react";
import PageHeader from "@/components/common/PageHeader";

export default function UsersPage() {
  return (
    <div>
      <PageHeader
        title="Student"
        description="จัดการข้อมูลนักเรียนและผู้ใช้งาน"
        showAddButton
        addButtonText="เพิ่มนักเรียนใหม่"
        onAddClick={() => console.log("Add student clicked")}
      />

      <div className="text-center py-20">
        <h3 className="text-lg text-gray-500">หน้า Student กำลังพัฒนา</h3>
        <p className="text-gray-400 mt-2">จะพัฒนาในขั้นตอนถัดไป</p>
      </div>
    </div>
  );
}
