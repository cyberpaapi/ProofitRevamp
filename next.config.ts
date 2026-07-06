import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the tracing root — a stray package-lock.json higher up the drive
  // otherwise makes Next infer the wrong workspace root.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
