/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.cdn-files-a.com",
      },
      {
        protocol: "https",
        hostname: "images.cdn-files-a.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
