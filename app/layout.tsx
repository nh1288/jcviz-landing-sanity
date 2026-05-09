/**
 * Root layout — the only place an <html> + <body> tag should live.
 * Both the public site (under app/(site)/) and the embedded Studio
 * (under app/studio/) inherit this shell.
 *
 * Fonts: matched to the WordPress theme (Cormorant Garamond display,
 * Inter body, JetBrains Mono eyebrow). Loaded via plain <link> for
 * 1:1 fidelity with the original. Could be migrated to next/font/google
 * later if we want self-hosted/optimized fonts.
 */

import type { Metadata, Viewport } from 'next';

import './globals.css';

const FONTS_HREF =
	'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400&display=swap';

export const metadata: Metadata = {
	title: {
		default: 'JCVIZ — Architectural Visualization for Real Estate',
		template: '%s | JCVIZ',
	},
	description:
		'Cinematic architectural imagery for property developers, marketing teams, and architectural partners across Southeast Asia.',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#080809',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link rel="stylesheet" href={FONTS_HREF} />
			</head>
			<body>{children}</body>
		</html>
	);
}
