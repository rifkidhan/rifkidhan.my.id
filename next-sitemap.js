const { url } = require("./src/libs/siteConfig");

/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: url,
  changefreq: "hourly",
  generateRobotsTxt: true,
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => [await config.transform(config, "/blog")],
};
