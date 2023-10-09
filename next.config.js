const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'shiki']
  }
}

module.exports = withContentlayer(nextConfig)
