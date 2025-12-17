import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["drive.google.com"], // разрешаем Google Drive
  },
};

export default nextConfig;
