import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubActions ? "/hyper-alerts-site" : "",
  assetPrefix: isGithubActions ? "/hyper-alerts-site/" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
