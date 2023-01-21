import nextBundle from '@next/bundle-analyzer'

const withBundleAnalyzer = nextBundle({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.storjshare.io',
        pathname: '/raw/**'
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com'
      }
    ]
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      '@prisma/client',
      'prisma',
      'sharp',
      'next-mdx-remote'
    ]
  }
}

const config = (_phase) => {
  const plugins = [withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}

export default config
