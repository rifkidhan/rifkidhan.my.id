const { url } = require("./src/libs/siteConfig");

/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: url,
  changefreq: "hourly",
  generateRobotsTxt: true,
  priority: 0.7,
  sitemapSize: 5000,
};
