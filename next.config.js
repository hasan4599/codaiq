/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'dummy_key',
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY || ''
  }
}

module.exports = nextConfig 