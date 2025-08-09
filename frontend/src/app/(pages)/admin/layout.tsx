"use client";
import React from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout userRole="admin">{children}</AppLayout>;
}
