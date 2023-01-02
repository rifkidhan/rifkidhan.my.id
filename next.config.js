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

module.exports = nextConfig
