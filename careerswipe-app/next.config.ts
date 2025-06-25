import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export so CareerSwipe can run without a web server
  output: 'export',
  // Use relative paths so exported files work when opened directly
  assetPrefix: './',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
