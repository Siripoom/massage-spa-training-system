// src/app/(pages)/(admin)/quiz/page.tsx
"use client";
import React from "react";
import PageHeader from "@/components/common/PageHeader";

export default function QuizPage() {
  return (
    <div>
      <PageHeader
        title="Quiz"
        description="จัดการข้อสอบและแบบทดสอบ"
        showAddButton
        addButtonText="สร้างข้อสอบใหม่"
        onAddClick={() => console.log("Add quiz clicked")}
      />

      <div className="text-center py-20">
        <h3 className="text-lg text-gray-500">หน้า Quiz กำลังพัฒนา</h3>
        <p className="text-gray-400 mt-2">จะพัฒนาในขั้นตอนถัดไป</p>
      </div>
    </div>
  );
}
