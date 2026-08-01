import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/financial-os' : '',
  assetPrefix: isProd ? '/financial-os/' : '',
};

export default nextConfig;
