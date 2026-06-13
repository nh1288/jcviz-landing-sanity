/**
 * Homepage — async server component.
 *
 * Fetches landing content from Sanity (cached per request, deduped with
 * the layout). If Sanity is unreachable or returns null for a section,
 * the matching slot from `fallbackContent` is used instead — see
 * `sanity/lib/getLandingContent.ts`.
 *
 * `generateMetadata` mirrors `seoSettings` for <title>, description,
 * Open Graph image and robots directive.
 */

import type { Metadata } from 'next';

import { FinalCta } from '@/components/sections/FinalCta';
import { Hero } from '@/components/sections/Hero';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { Positioning } from '@/components/sections/Positioning';
import { Process } from '@/components/sections/Process';
import { ProjectTypes } from '@/components/sections/ProjectTypes';
import { Services } from '@/components/sections/Services';
import { Studio } from '@/components/sections/Studio';
import { Value } from '@/components/sections/Value';
import { getLandingContent } from '@/sanity/lib/getLandingContent';

export async function generateMetadata(): Promise<Metadata> {
	const { seo } = await getLandingContent();

	const robotsValue = seo.robots ?? 'index,follow';
	const robotsMeta = {
		index: !robotsValue.includes('noindex'),
		follow: !robotsValue.includes('nofollow'),
	};

	// Use the Sanity-managed OG image when an editor uploads one; otherwise fall
	// back to the static branded default in public/og-default.png so social
	// previews (Facebook / LinkedIn / Zalo) always have an image.
	const ogImage = {
		url: seo.ogImageUrl ?? '/og-default.png',
		width: 1200,
		height: 630,
		alt: seo.defaultTitle,
	};

	return {
		title: seo.defaultTitle,
		description: seo.defaultDescription,
		alternates: { canonical: '/' },
		openGraph: {
			type: 'website',
			siteName: 'JCVIZ',
			locale: 'en_US',
			url: '/',
			title: seo.defaultTitle,
			description: seo.defaultDescription,
			images: [ogImage],
		},
		twitter: {
			card: 'summary_large_image',
			title: seo.defaultTitle,
			description: seo.defaultDescription,
			...(seo.twitterHandle
				? { site: seo.twitterHandle, creator: seo.twitterHandle }
				: {}),
			images: [ogImage.url],
		},
		robots: robotsMeta,
	};
}

export default async function HomePage() {
	const c = await getLandingContent();

	return (
		<main id="main">
			<Hero data={c.hero} />
			<Positioning data={c.positioning} />
			<Services items={c.services} />
			<Value items={c.valuePoints} />
			<ProjectTypes items={c.projectTypes} />
			<Process items={c.processSteps} />
			<PortfolioPreview items={c.portfolioItems} />
			<Studio data={c.studio} team={c.team} />
			<FinalCta data={c.finalCta} />
		</main>
	);
}
