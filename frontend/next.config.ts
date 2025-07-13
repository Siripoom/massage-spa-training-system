import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['placehold.co'], // *** ตรวจสอบให้แน่ใจว่าบรรทัดนี้มีอยู่และถูกต้อง ***
  },
  webpack: (config, { isServer }) => {
    // แก้ไขปัญหา Module not found: Can't resolve 'canvas' สำหรับ Konva ใน SSR environment
    if (isServer) {
      config.externals = {
        ...config.externals,
        canvas: 'commonjs canvas', // หรือจะใช้ 'commonjs2 canvas' หรือ 'amd canvas' ก็ได้ตามโครงสร้างโปรเจกต์
      };
    }
    return config;
  },
};

export default nextConfig;
