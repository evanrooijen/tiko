import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        hostname: "tiko-convex-1e6072-45-9-190-212.traefik.me",
      },
    ],
  },
};

export default nextConfig;
