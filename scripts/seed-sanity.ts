/**
 * One-shot seed script — populates the Sanity dataset with the same
 * content that lives in `lib/fallbackContent.ts`.
 *
 * Idempotent: every document gets a deterministic `_id` and is written
 * via `createOrReplace`, so re-running this never produces duplicates.
 *
 * Run:
 *   npm run seed:sanity
 *
 * Requires the following env vars (in `.env.local`, loaded by Node's
 * native --env-file flag — see package.json):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN   (must have Editor / Admin role)
 */

import { createClient } from '@sanity/client';

import { fallbackContent } from '../lib/fallbackContent';
import type {
	Cta,
	HeadlineWithAccent,
	PortfolioItem,
	ProcessStep,
	ProjectType,
	Service,
	ValuePoint,
} from '../lib/types';
import { manifestoLinesToPortableText } from '../sanity/lib/portableText';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-12-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
	console.error(
		'❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.\n' +
			'   Make sure .env.local has these set, and the script is launched\n' +
			'   via `npm run seed:sanity` (which loads .env.local automatically).',
	);
	process.exit(1);
}

if (!token) {
	console.error(
		'❌ Missing SANITY_API_WRITE_TOKEN.\n' +
			'   Create one at https://www.sanity.io/manage → your project →\n' +
			'   API → Tokens → Add API token → Editor role.\n' +
			'   Then add the token to .env.local as:\n' +
			'     SANITY_API_WRITE_TOKEN=<token>\n' +
			'   and re-run `npm run seed:sanity`. The token never leaves\n' +
			'   .env.local (which is gitignored).',
	);
	process.exit(1);
}

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	token,
	useCdn: false,
});

// ---- helpers ---------------------------------------------------------

function slugify(input: string): string {
	return input
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function ord(n: number): string {
	return n.toString().padStart(2, '0');
}

function cleanCta(cta: Cta | undefined) {
	if (!cta) return undefined;
	return { label: cta.label, mode: cta.mode, href: cta.href };
}

function cleanHeadline(h: HeadlineWithAccent) {
	return {
		partA: h.partA,
		...(h.accentA !== undefined && { accentA: h.accentA }),
		...(h.partB !== undefined && { partB: h.partB }),
		...(h.accentB !== undefined && { accentB: h.accentB }),
		...(h.suffix !== undefined && { suffix: h.suffix }),
	};
}

// ---- documents -------------------------------------------------------

function buildSingletons() {
	const c = fallbackContent;

	const siteSettings = {
		_id: 'siteSettings',
		_type: 'siteSettings',
		siteTitle: c.site.siteTitle,
		tagline: c.site.tagline,
		brandName: c.site.brandName,
		brandSub: c.site.brandSub,
		navItems: c.site.navItems.map((item, i) => ({
			_key: `nav-${i}`,
			_type: 'navItem',
			label: item.label,
			href: item.href,
		})),
		footerDescription: c.site.footerDescription,
		footerColumns: c.site.footerColumns.map((col, i) => ({
			_key: `foot-col-${i}`,
			_type: 'footerColumn',
			heading: col.heading,
			links: col.links.map((link, j) => ({
				_key: `foot-col-${i}-link-${j}`,
				_type: 'footerLink',
				label: link.label,
				href: link.href,
			})),
		})),
	};

	const heroSection = {
		_id: 'heroSection',
		_type: 'heroSection',
		eyebrow: c.hero.eyebrow,
		headline: cleanHeadline(c.hero.headline),
		subheadline: c.hero.subheadline,
		primaryCta: cleanCta(c.hero.primaryCta),
		secondaryCta: cleanCta(c.hero.secondaryCta),
		topMeta: c.hero.topMeta,
		marqueeAriaLabel: c.hero.marqueeAriaLabel,
		marqueeItems: c.hero.marqueeItems,
		scrollText: c.hero.scrollText,
		creditsText: c.hero.creditsText,
	};

	const positioningSection = {
		_id: 'positioningSection',
		_type: 'positioningSection',
		manifestoNumber: c.positioning.manifestoNumber,
		manifesto: manifestoLinesToPortableText(c.positioning.manifestoLines),
		detailEyebrow: c.positioning.detailEyebrow,
		detailHeadline: c.positioning.detailHeadline
			? cleanHeadline(c.positioning.detailHeadline)
			: undefined,
		detailParagraphs: c.positioning.detailParagraphs,
	};

	const finalCta = {
		_id: 'finalCta',
		_type: 'finalCta',
		eyebrow: c.finalCta.eyebrow,
		headline: cleanHeadline(c.finalCta.headline),
		body: c.finalCta.body,
		primaryCta: cleanCta(c.finalCta.primaryCta),
		secondaryCta: cleanCta(c.finalCta.secondaryCta),
	};

	const contactInfo = {
		_id: 'contactInfo',
		_type: 'contactInfo',
		email: c.contact.email,
		phone: c.contact.phone,
		address: c.contact.address,
		bookingStatus: c.contact.bookingStatus,
	};

	const seoSettings = {
		_id: 'seoSettings',
		_type: 'seoSettings',
		defaultTitle: c.seo.defaultTitle,
		titleTemplate: c.seo.titleTemplate,
		defaultDescription: c.seo.defaultDescription,
		twitterHandle: c.seo.twitterHandle,
		robots: c.seo.robots,
	};

	return [
		siteSettings,
		heroSection,
		positioningSection,
		finalCta,
		contactInfo,
		seoSettings,
	];
}

function buildServices(items: Service[]) {
	return items.map((s) => ({
		_id: `service-${slugify(s.title)}`,
		_type: 'service',
		title: s.title,
		accent: s.accent,
		description: s.description,
		chips: s.chips,
		tagLabel: s.tagLabel,
		visualVariant: s.visualVariant,
		order: s.order,
		visible: true,
	}));
}

function buildValuePoints(items: ValuePoint[]) {
	return items.map((v) => ({
		_id: `value-point-${ord(v.order)}`,
		_type: 'valuePoint',
		title: v.title,
		eyebrow: v.eyebrow,
		description: v.description,
		order: v.order,
		visible: true,
	}));
}

function buildProjectTypes(items: ProjectType[]) {
	return items.map((p) => ({
		_id: `project-type-${slugify(p.title)}`,
		_type: 'projectType',
		title: p.title,
		numberLabel: p.numberLabel,
		description: p.description,
		visualVariant: p.visualVariant,
		order: p.order,
		visible: true,
	}));
}

function buildProcessSteps(items: ProcessStep[]) {
	return items.map((p) => ({
		_id: `process-step-${ord(p.order)}`,
		_type: 'processStep',
		title: p.title,
		roman: p.roman,
		description: p.description,
		duration: p.duration,
		order: p.order,
		visible: true,
	}));
}

function buildPortfolioItems(items: PortfolioItem[]) {
	return items.map((p) => ({
		_id: `portfolio-${slugify(p.title)}`,
		_type: 'portfolioItem',
		title: p.title,
		subLabel: p.subLabel,
		placeholderVariant: p.placeholderVariant,
		gridSpan: p.gridSpan,
		order: p.order,
		visible: true,
		// image: intentionally omitted — uploaded later via Studio.
	}));
}

// ---- runner ----------------------------------------------------------

type SanityDoc = { _id: string; _type: string };

async function commit(label: string, docs: SanityDoc[]) {
	const tx = client.transaction();
	for (const doc of docs) tx.createOrReplace(doc);
	await tx.commit();
	console.log(`  ✓ ${label.padEnd(18)} ${docs.length} doc(s)`);
}

async function main() {
	console.log(
		`\n→ Seeding Sanity dataset "${dataset}" on project "${projectId}"\n`,
	);

	const c = fallbackContent;

	await commit('singletons', buildSingletons());
	await commit('services', buildServices(c.services));
	await commit('valuePoints', buildValuePoints(c.valuePoints));
	await commit('projectTypes', buildProjectTypes(c.projectTypes));
	await commit('processSteps', buildProcessSteps(c.processSteps));
	await commit('portfolioItems', buildPortfolioItems(c.portfolioItems));

	const total =
		6 +
		c.services.length +
		c.valuePoints.length +
		c.projectTypes.length +
		c.processSteps.length +
		c.portfolioItems.length;

	console.log(
		`\n✓ Seed complete — ${total} documents written / replaced.\n` +
			'  Open http://localhost:3000/studio to verify.\n',
	);
}

main().catch((error) => {
	console.error('\n❌ Seed failed:\n', error);
	process.exit(1);
});
