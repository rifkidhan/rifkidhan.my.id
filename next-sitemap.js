const { url } = require("./src/libs/siteConfig");

/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: url,
  changefreq: "weekly",
  generateRobotsTxt: true,
  priority: 0.7,
  sitemapSize: 1000,
};
