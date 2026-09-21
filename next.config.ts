import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // Use repository name for GitHub Pages in production or when building
  const repoName = "blackrhino";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (!isDev ? `/${repoName}` : "");

  return {
    reactStrictMode: true,
    output: "export",
    basePath: basePath || undefined,
    assetPrefix: basePath ? `${basePath}/` : undefined,
    trailingSlash: true,
    images: {
      loader: "custom",
      loaderFile: "./src/lib/imageLoader.ts",
      formats: ["image/avif", "image/webp"],
    },
  };
};

export default nextConfig;
