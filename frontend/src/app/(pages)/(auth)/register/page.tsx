"use client";

import React from "react";
import { Card, Typography } from "antd";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

const { Title, Text } = Typography;

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>

            <Title
              level={2}
              className="text-gray-800 mb-2 !text-2xl !font-bold"
            >
              ลงทะเบียนเข้าร่วมหลักสูตร
            </Title>
            <Text className="text-gray-600 text-base md:text-lg">
              เริ่มต้นการเรียนรู้ด้านการนวดและสปาแบบมืออาชีพ
            </Text>
          </div>

          <RegisterForm />

          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <Text className="text-gray-600">
              มีบัญชีผู้ใช้แล้ว?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
            </Text>
          </div>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Steps styling */
        .ant-steps-item-process .ant-steps-item-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .ant-steps-item-finish .ant-steps-item-icon {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        /* Card hover effects */
        .ant-card:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        /* Radio card styling */
        .ant-radio-wrapper {
          border: none !important;
        }

        /* Upload styling */
        .avatar-uploader .ant-upload {
          width: 120px !important;
          height: 120px !important;
          border-radius: 12px !important;
          border: 2px dashed #d9d9d9 !important;
          transition: all 0.3s ease !important;
        }

        .avatar-uploader .ant-upload:hover {
          border-color: #667eea !important;
          background-color: #f8faff !important;
        }

        /* Form item spacing */
        .ant-form-item {
          margin-bottom: 20px;
        }

        /* Button gradient effects */
        .ant-btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          transition: all 0.3s ease;
        }

        .ant-btn-primary:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        /* Input focus effects */
        .ant-input:focus,
        .ant-input-password:focus,
        .ant-select-focused .ant-select-selector,
        .ant-picker:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .ant-steps {
            margin-bottom: 24px;
          }
          
          .ant-steps-item-title {
            font-size: 12px !important;
          }
          
          .ant-steps-item-description {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
