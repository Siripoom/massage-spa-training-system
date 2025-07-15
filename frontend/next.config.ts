import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['placehold.co'], // *** ตรวจสอบให้แน่ใจว่าบรรทัดนี้มีอยู่และถูกต้อง ***
  },
  webpack: (config, { isServer }) => {
    // This log will appear in your terminal when Next.js builds
    console.log(`[next.config.js] Webpack config running. isServer: ${isServer}`);

    // Only apply the fallback for client-side builds
    if (!isServer) {
      console.log("[next.config.js] Applying canvas fallback for client-side bundle.");
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false, // Explicitly ignore 'canvas' module
      };
    }
    return config;
  },
};

export default nextConfig;
