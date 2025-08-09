"use client";
import React from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout userRole="student">{children}</AppLayout>;
}
