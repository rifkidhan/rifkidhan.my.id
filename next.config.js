const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cms-rifkidhan.koyeb.app',
        port: '',
        pathname: '/api/files/**'
      }
    ]
  },
  experimental: {
    webpackBuildWorker: true
  }
}

module.exports = (_phase) => {
  const plugins = [withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}
