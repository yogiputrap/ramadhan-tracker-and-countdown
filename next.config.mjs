/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' for server deployment
  // Use standalone for Docker/server deployment
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Disable static optimization for dynamic features
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
