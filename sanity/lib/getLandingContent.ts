/**
 * Fetch + merge the entire landing content from Sanity, falling back
 * to local content for any singleton or collection that's missing.
 *
 * Wrapped in React's `cache()` so layout + page each call this once,
 * but the fetch only fires once per request.
 *
 * Failure mode: if the Sanity request throws (network down, bad token,
 * project paused), the whole fallback content is returned and the page
 * still renders. The error is logged server-side; nothing leaks to the
 * client beyond the rendered HTML.
 */

import { cache } from 'react';

import { fallbackContent } from '@/lib/fallbackContent';
import type {
	ContactInfo,
	FinalCtaData,
	HeroData,
	LandingContent,
	PortfolioItem,
	PositioningData,
	ProcessStep,
	ProjectType,
	SeoSettings,
	Service,
	SiteSettings,
	StudioData,
	TeamMember,
	ValuePoint,
} from '@/lib/types';

import { client } from './client';
import { portableTextToManifestoLines } from './portableText';
import {
	CONTACT_INFO_QUERY,
	FINAL_CTA_QUERY,
	HERO_QUERY,
	PORTFOLIO_ITEMS_QUERY,
	POSITIONING_QUERY,
	PROCESS_STEPS_QUERY,
	PROJECT_TYPES_QUERY,
	SEO_SETTINGS_QUERY,
	SERVICES_QUERY,
	SITE_SETTINGS_QUERY,
	STUDIO_SECTION_QUERY,
	TEAM_MEMBERS_QUERY,
	VALUE_POINTS_QUERY,
} from './queries';

type SanityPositioning = Omit<PositioningData, 'manifestoLines'> & {
	manifesto?: unknown;
};

/**
 * Cache-tag every fetch with `sanity` so the webhook's
 * `revalidateTag('sanity')` invalidates them all in one shot.
 */
const FETCH_OPTIONS = {
	next: { tags: ['sanity'] },
};

export const getLandingContent = cache(
	async (): Promise<LandingContent> => {
		try {
			const [
				site,
				hero,
				positioningRaw,
				services,
				valuePoints,
				projectTypes,
				processSteps,
				portfolioItems,
				studio,
				team,
				finalCta,
				contact,
				seo,
			] = await Promise.all([
				client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, FETCH_OPTIONS),
				client.fetch<HeroData | null>(HERO_QUERY, {}, FETCH_OPTIONS),
				client.fetch<SanityPositioning | null>(POSITIONING_QUERY, {}, FETCH_OPTIONS),
				client.fetch<Service[] | null>(SERVICES_QUERY, {}, FETCH_OPTIONS),
				client.fetch<ValuePoint[] | null>(VALUE_POINTS_QUERY, {}, FETCH_OPTIONS),
				client.fetch<ProjectType[] | null>(PROJECT_TYPES_QUERY, {}, FETCH_OPTIONS),
				client.fetch<ProcessStep[] | null>(PROCESS_STEPS_QUERY, {}, FETCH_OPTIONS),
				client.fetch<PortfolioItem[] | null>(PORTFOLIO_ITEMS_QUERY, {}, FETCH_OPTIONS),
				client.fetch<StudioData | null>(STUDIO_SECTION_QUERY, {}, FETCH_OPTIONS),
				client.fetch<TeamMember[] | null>(TEAM_MEMBERS_QUERY, {}, FETCH_OPTIONS),
				client.fetch<FinalCtaData | null>(FINAL_CTA_QUERY, {}, FETCH_OPTIONS),
				client.fetch<ContactInfo | null>(CONTACT_INFO_QUERY, {}, FETCH_OPTIONS),
				client.fetch<SeoSettings | null>(SEO_SETTINGS_QUERY, {}, FETCH_OPTIONS),
			]);

			return {
				site: site ?? fallbackContent.site,
				hero: hero
					? mergeHero(hero)
					: fallbackContent.hero,
				positioning: buildPositioning(positioningRaw),
				services: nonEmpty(services) ?? fallbackContent.services,
				valuePoints: nonEmpty(valuePoints) ?? fallbackContent.valuePoints,
				projectTypes: nonEmpty(projectTypes) ?? fallbackContent.projectTypes,
				processSteps: nonEmpty(processSteps) ?? fallbackContent.processSteps,
				portfolioItems:
					nonEmpty(portfolioItems) ?? fallbackContent.portfolioItems,
				studio: buildStudio(studio),
				team: nonEmpty(team) ?? fallbackContent.team,
				finalCta: finalCta ?? fallbackContent.finalCta,
				contact: contact ?? fallbackContent.contact,
				seo: seo ?? fallbackContent.seo,
			};
		} catch (error) {
			console.error(
				'[getLandingContent] Sanity fetch failed, using full fallback:',
				error,
			);
			return fallbackContent;
		}
	},
);

function nonEmpty<T>(arr: T[] | null | undefined): T[] | null {
	return Array.isArray(arr) && arr.length > 0 ? arr : null;
}

/**
 * Studio intro. Falls back to local content if the singleton is missing or
 * has no headline; otherwise backfills the section labels / paragraphs that
 * editors left blank.
 */
function buildStudio(raw: StudioData | null | undefined): StudioData {
	if (!raw || !raw.headline) return fallbackContent.studio;
	return {
		sectionNumber: raw.sectionNumber ?? fallbackContent.studio.sectionNumber,
		tagline: raw.tagline ?? fallbackContent.studio.tagline,
		headline: raw.headline,
		paragraphs:
			Array.isArray(raw.paragraphs) && raw.paragraphs.length > 0
				? raw.paragraphs
				: fallbackContent.studio.paragraphs,
	};
}

function buildPositioning(
	raw: SanityPositioning | null | undefined,
): PositioningData {
	if (!raw) return fallbackContent.positioning;
	const lines = portableTextToManifestoLines(raw.manifesto);
	if (lines.length === 0) return fallbackContent.positioning;
	return {
		manifestoNumber:
			raw.manifestoNumber ?? fallbackContent.positioning.manifestoNumber,
		manifestoLines: lines,
		detailEyebrow:
			raw.detailEyebrow ?? fallbackContent.positioning.detailEyebrow,
		detailHeadline:
			raw.detailHeadline ?? fallbackContent.positioning.detailHeadline,
		detailParagraphs:
			Array.isArray(raw.detailParagraphs) && raw.detailParagraphs.length > 0
				? raw.detailParagraphs
				: fallbackContent.positioning.detailParagraphs,
	};
}

/**
 * Hero comes back from Sanity with the same shape as fallback. The only
 * massaging needed is normalizing marqueeItems to an array so the
 * Marquee component's iteration is safe even when nothing is set.
 */
function mergeHero(hero: HeroData): HeroData {
	return {
		...hero,
		marqueeItems: Array.isArray(hero.marqueeItems) ? hero.marqueeItems : [],
	};
}
