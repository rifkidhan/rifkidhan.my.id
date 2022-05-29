/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const webPA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  webpack: (config) => {
    const rules = config.module.rules.find((r) => !!r.oneOf);

    rules.oneOf.forEach((loaders) => {
      if (Array.isArray(loaders.use)) {
        loaders.use.forEach((l) => {
          if (
            typeof l !== 'string' &&
            typeof l.loader === 'string' &&
            /(?<!post)css-loader/.test(l.loader)
          ) {
            if (!l.options.modules) return;
            const { getLocalIdent, ...others } = l.options.modules;

            l.options = {
              ...l.options,
              modules: {
                ...others,
                getLocalIdent: (ctx, localIdentName, localName) => {
                  if (localName === 'dark') return localName;
                  return getLocalIdent(ctx, localIdentName, localName);
                }
              }
            };
          }
        });
      }
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['rifkidhan.herokuapp.com']
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: `X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version`
          }
        ]
      }
    ];
  },
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    runtimeCaching,
    cacheOnFrontEndNav: true
  },
  publicRuntimeConfig: {
    url: process.env.NEXT_PUBLIC_DIRECTUS_URL
  },
  serverRuntimeConfig: {
    email: process.env.DIRECTUS_EMAIL,
    password: process.env.DIRECTUS_PASSWORD
    // token: process.env.DIRECTUS_STATIC_TOKEN,
  }
};

module.exports = withPlugins([webPA, withBundleAnalyzer], nextConfig);
