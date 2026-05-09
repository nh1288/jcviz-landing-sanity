/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: '/images/**',
			},
		],
	},
	// Sanity Studio uses styled-components internally — Next supports it via swc plugin.
	compiler: {
		styledComponents: true,
	},
};

export default nextConfig;
