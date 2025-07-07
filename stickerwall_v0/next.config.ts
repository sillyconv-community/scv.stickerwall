import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGithubPages ? "/v0" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/v0" : "",
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig;
