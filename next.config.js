const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  runtimeCaching,
  cacheOnFrontEndNav: true
});
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
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
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: true
  },
};

module.exports = (_phase) => {
  const plugins = [withPWA, withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
