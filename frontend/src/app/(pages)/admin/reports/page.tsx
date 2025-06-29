// src/app/(pages)/(admin)/reports/page.tsx
"use client";
import React from "react";
import PageHeader from "@/components/common/PageHeader";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="รายงานและสถิติการดำเนินงาน" />

      <div className="text-center py-20">
        <h3 className="text-lg text-gray-500">หน้า Reports กำลังพัฒนา</h3>
        <p className="text-gray-400 mt-2">จะพัฒนาในขั้นตอนถัดไป</p>
      </div>
    </div>
  );
}
