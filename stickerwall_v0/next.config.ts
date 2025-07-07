import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath isGithubPages ? '/repo-name': '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig;
