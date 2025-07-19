/** @type {import('next').NextConfig} */
const config = {
	compress: process.env.NODE_ENV === "production",
	reactStrictMode: false,
	trailingSlash: false,
	experimental: {
		optimizeCss: process.env.NODE_ENV === "production",
	},
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
	experimental: {
		typedRoutes: false,
	},
	// used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === "standalone"
			? "standalone"
			: process.env.NEXT_OUTPUT === "export"
				? "export"
				: undefined,
};

export default config;
