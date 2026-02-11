import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  experimental: {
    externalDir: true
  },
  transpilePackages: ["lecture-curriculum", "activity-engine", "activity-contract"],
};

export default nextConfig;
