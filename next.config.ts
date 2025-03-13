import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.tenor.com",
      },
    ],
  },
  async redirects() {
    return isDev
      ? []
      : [
          { source: "/manage", destination: "/", permanent: false },
          { source: "/create", destination: "/", permanent: false },
          { source: "/edit", destination: "/", permanent: false },
        ];
  },
};

export default nextConfig;
