"use client";
import React from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout userRole="teacher">{children}</AppLayout>;
}
