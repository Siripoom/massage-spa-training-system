"use client";

import React from "react";
import { Card, Typography } from "antd";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

const { Title, Text } = Typography;

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <Card
          className="shadow-2xl border-0 backdrop-blur-sm bg-white/95 fade-in-up"
          style={{ borderRadius: "20px" }}
        >
          <div className="text-center mb-8">
            {/* Logo or Icon */}
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center transform transition-transform hover:scale-110">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <Title
              level={2}
              className="text-gray-800 mb-2 !text-2xl !font-bold"
            >
              ระบบฝึกอบรมสปา
            </Title>
            <Text className="text-gray-600 text-base md:text-lg">
              เข้าสู่ระบบเพื่อเริ่มต้นการเรียนรู้
            </Text>
          </div>

          <LoginForm />

          {/* Register link
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <Text className="text-gray-600">
              ยังไม่มีบัญชีผู้ใช้?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                ลงทะเบียน
              </Link>
            </Text>
          </div> */}

          {/* Quick Access Info */}
          <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
            <Text className="text-gray-700 text-sm font-medium block text-center mb-3">
              🔑 บัญชีทดสอบ
            </Text>
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="font-medium">👨‍💼 ผู้ดูแลระบบ:</span>
                <span className="font-mono bg-white px-2 py-1 rounded text-xs">
                  admin@relaxplus.com
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium">👩‍🏫 อาจารย์:</span>
                <span className="font-mono bg-white px-2 py-1 rounded text-xs">
                  teacher@relaxplus.com
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium">👨‍🎓 นักเรียน:</span>
                <span className="font-mono bg-white px-2 py-1 rounded text-xs">
                  somchai@email.com
                </span>
              </div>
              <div className="text-center mt-3 p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-700 font-medium">🔐 รหัสผ่าน: </span>
                <span className="font-mono text-blue-800 font-bold">
                  password123
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <Text className="text-gray-500 text-sm">
            © 2025 ระบบฝึกอบรมนวดสปา. สงวนลิขสิทธิ์.
          </Text>
        </div>
      </div>
    </div>
  );
}
