"use client";
import React from "react";
import PageHeader from "@/components/common/PageHeader";

export default function CertificatePage() {
  return (
    <div>
      <PageHeader
        title="Certificate"
        description="จัดการใบประกาศนียบัตรและเอกสาร"
        showAddButton
        addButtonText="สร้างใบประกาศนียบัตร"
        onAddClick={() => console.log("Add certificate clicked")}
      />

      <div className="text-center py-20">
        <h3 className="text-lg text-gray-500">หน้า Certificate กำลังพัฒนา</h3>
        <p className="text-gray-400 mt-2">จะพัฒนาในขั้นตอนถัดไป</p>
      </div>
    </div>
  );
}
