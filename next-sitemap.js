const { url } = require("./src/libs/siteConfig");

/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: url,
	changefreq: "daily",
	generateRobotsTxt: true,
	priority: 0.7,
};
