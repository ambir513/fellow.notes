import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b289a32534284964b865f90fc9d138d6.r2.dev",
      },
    ],
  },
};

export default nextConfig;
