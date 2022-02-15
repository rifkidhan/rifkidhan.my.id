/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const webPA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
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

module.exports = withPlugins([webPA], nextConfig);
