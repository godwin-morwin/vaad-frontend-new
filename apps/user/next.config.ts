import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  turbopack: {
    root: path.resolve(process.cwd(), "../.."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vaad-media.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      // Add any other external image domains you use
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;