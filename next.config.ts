import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.cnn.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.cnn.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
