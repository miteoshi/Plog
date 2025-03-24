import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.tenor.com",
      },
      {
        protocol: "https",
        hostname: "wgucfadukzconobkkbwd.supabase.co",
        pathname: "/storage/v1/object/public/images/**",
      },
    ],
  },
  // async redirects() {
  //   return isDev
  //     ? []
  //     : [
  //         { source: "/manage", destination: "/", permanent: false },
  //         { source: "/create", destination: "/", permanent: false },
  //         { source: "/edit", destination: "/", permanent: false },
  //       ];
  // },
};

export default nextConfig;
