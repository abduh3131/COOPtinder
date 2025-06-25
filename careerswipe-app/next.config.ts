import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export so CareerSwipe can run without a web server
  output: 'export',
};

export default nextConfig;
