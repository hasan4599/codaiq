/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   
    typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  // Ensure proper script loading
  poweredByHeader: false,
  generateEtags: false,
  // Specify the base path and assetPrefix if needed
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite API requests to the correct port
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
