/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const webPA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  webpack: (config) => {
    // Find the base rule that contains nested rules (which contains css-loader)
    const rules = config.module.rules.find((r) => !!r.oneOf);

    // Interate over the found rules
    rules.oneOf.forEach((loaders) => {
      // Focus on the the loaders that have an array of `use` statements
      if (Array.isArray(loaders.use)) {
        // Iterate over each of the loaders
        loaders.use.forEach((l) => {
          // Only focus on loaders that are an object and have a `loader` property set to `css-loader`
          if (
            typeof l !== "string" &&
            typeof l.loader === "string" &&
            /(?<!post)css-loader/.test(l.loader)
          ) {
            // If there are no module options originally set, skip this loader
            if (!l.options.modules) return;
            const { getLocalIdent, ...others } = l.options.modules;

            // Create a new options object with the `getLocalIdent` property set to a function
            l.options = {
              ...l.options,
              modules: {
                ...others,
                getLocalIdent: (ctx, localIdentName, localName) => {
                  // If the class name is `dark`, return it instead of hashing it
                  if (localName === "dark") return localName;
                  // Otherwise, call the original function and return the value
                  return getLocalIdent(ctx, localIdentName, localName);
                },
              },
            };
          }
        });
      }
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ["rifkidhan.herokuapp.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: `X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version`,
          },
        ],
      },
    ];
  },
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    runtimeCaching,
    cacheOnFrontEndNav: true,
  },
};

module.exports = withPlugins([webPA, withBundleAnalyzer], nextConfig);
