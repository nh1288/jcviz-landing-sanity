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
	// Baseline security headers on every response. No strict Content-Security-Policy
	// here on purpose: the embedded Sanity Studio (/studio) needs inline scripts/eval
	// and external connections, so a CSP must be authored per-route before enabling.
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'X-DNS-Prefetch-Control', value: 'on' },
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=63072000; includeSubDomains; preload',
					},
				],
			},
		];
	},
};

export default nextConfig;
