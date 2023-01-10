const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.storjshare.io',
        pathname: '/raw/**'
      }
    ]
  },

  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client', 'prisma', 'sharp']
  }
}

// module.exports = nextConfig

module.exports = (_phase) => {
  const plugins = [withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}
