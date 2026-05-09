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
import { Value } from '@/components/sections/Value';
import { getLandingContent } from '@/sanity/lib/getLandingContent';

export async function generateMetadata(): Promise<Metadata> {
	const { seo } = await getLandingContent();

	const robotsValue = seo.robots ?? 'index,follow';
	const robotsMeta = {
		index: !robotsValue.includes('noindex'),
		follow: !robotsValue.includes('nofollow'),
	};

	return {
		title: seo.defaultTitle,
		description: seo.defaultDescription,
		openGraph: seo.ogImageUrl
			? {
					title: seo.defaultTitle,
					description: seo.defaultDescription,
					images: [{ url: seo.ogImageUrl }],
				}
			: undefined,
		twitter: seo.twitterHandle
			? {
					card: 'summary_large_image',
					site: seo.twitterHandle,
				}
			: undefined,
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
			<FinalCta data={c.finalCta} />
		</main>
	);
}
