import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // this repo lives inside a larger workspace folder — pin the root here
    root: __dirname,
  },
};

export default nextConfig;
