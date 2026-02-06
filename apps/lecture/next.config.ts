import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  experimental: {
    externalDir: true
  },
  transpilePackages: ["lecture-curriculum"],
};

export default nextConfig;
