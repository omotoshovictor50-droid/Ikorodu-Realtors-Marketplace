import type { NextConfig } from "next";

// On GitHub Pages the site lives at /<repo-name>/, so the workflow sets this.
// Locally it stays empty and the site runs at http://localhost:3000
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export", // static site, works on GitHub Pages
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
