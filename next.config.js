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
        hostname: 'www.notion.so',
        port: '',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'next-mdx-remote']
  }
}

module.exports = (_phase) => {
  const plugins = [withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}
