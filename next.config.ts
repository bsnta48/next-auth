import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,  // Set to true to ignore ESLint errors
    dirs: ['pages', 'src'],      // Directories to lint
  },
  typescript: {
    ignoreBuildErrors: false,   // Set to true to ignore TypeScript errors
  },
};

export default nextConfig;
