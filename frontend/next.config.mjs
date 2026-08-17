/** @type {import('next').NextConfig} */
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      // Backend Express API & Asset Proxies
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${BACKEND_URL}/uploads/:path*`,
      },
      {
        source: '/admin',
        destination: `${process.env.ADMIN_URL || 'http://localhost:5173'}`,
      },
      {
        source: '/admin/:path*',
        destination: `${process.env.ADMIN_URL || 'http://localhost:5173'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
