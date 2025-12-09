import type { NextConfig } from "next";

const convexHostname = process.env.CONVEX_HOSTNAME;

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  output: "standalone",
  cacheComponents: true,
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        hostname: "tiko-convex-1e6072-45-9-190-212.traefik.me",
      },
      ...(convexHostname ? [{ hostname: convexHostname }] : []),
      {
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default nextConfig;
