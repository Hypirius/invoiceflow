import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any HTTPS website
      },
      {
        protocol: "http",
        hostname: "**", // Optional: Allows any HTTP website
      },
    ],
  },
};

export default nextConfig;
