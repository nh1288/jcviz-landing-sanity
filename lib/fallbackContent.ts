/**
 * Fallback content — hard-coded copy that mirrors the WordPress theme
 * exactly. Used in Phase 3 so the landing renders end-to-end before any
 * Sanity content is seeded.
 *
 * In Phase 4, components stop importing this and start fetching the same
 * shapes from Sanity. The fallback file becomes a reference / safety net
 * for previews and missing-data states.
 */

import type { LandingContent } from './types';

export const fallbackContent: LandingContent = {
	site: {
		siteTitle: 'JCVIZ — Architectural Visualization for Real Estate',
		tagline: 'Architectural Visualization · Hanoi',
		brandName: 'JCVIZ',
		brandSub: 'Architectural Visualization · Est. 2025',
		navItems: [
			{ label: 'Work', href: '#portfolio' },
			{ label: 'Services', href: '#services' },
			{ label: 'Process', href: '#process' },
			{ label: 'Studio', href: '#positioning' },
			{ label: 'Contact', href: '#contact' },
		],
		footerDescription:
			'An architectural visualization studio for the real estate industry — building image systems for developers across Vietnam and Southeast Asia.',
		footerColumns: [
			{
				heading: '— Studio',
				links: [
					{ label: 'About', href: '#positioning' },
					{ label: 'Process', href: '#process' },
					{ label: 'Selected Work', href: '#portfolio' },
					{ label: 'Contact', href: '#contact' },
				],
			},
			{
				heading: '— Services',
				links: [
					{ label: 'Masterplan & Urban', href: '#services' },
					{ label: 'Real Estate Product', href: '#services' },
					{ label: 'Landscape & Amenity', href: '#services' },
					{ label: 'Marketing & Campaign', href: '#services' },
				],
			},
			{
				heading: '— Contact',
				links: [
					{ label: 'studio@jcviz.vn', href: 'mailto:studio@jcviz.vn' },
					{ label: '0246 6868 006', href: 'tel:02466868006' },
					{ label: 'AZ Sky Tower · Hanoi', href: '#contact' },
				],
			},
		],
	},

	hero: {
		eyebrow: 'Architectural Visualization Studio',
		headline: {
			partA: 'Where',
			accentA: 'light',
			partB: 'meets',
			accentB: 'place.',
		},
		subheadline:
			'We craft cinematic architectural imagery for property developers — from masterplan to first key. Trusted by leading real estate brands across Southeast Asia.',
		primaryCta: {
			label: 'Send Project Brief',
			mode: 'url',
			href: '#contact',
		},
		secondaryCta: {
			label: 'View Capabilities',
			mode: 'url',
			href: '#services',
		},
		topMeta: {
			studioLocation: 'Studio · Hanoi',
			studioBuilding: 'AZ Sky Tower · Dinh Cong',
			reelLabel: 'Reel · 2026',
			reelVolume: 'Vol. 04',
		},
		marqueeAriaLabel: 'Who we work with',
		marqueeItems: [
			'Leading real estate developers',
			'Investment groups',
			'Marketing teams',
			'Architecture partners',
			'Planning consultants',
			'Landscape studios',
		],
		scrollText: 'Reel 04 · Selected Works',
		creditsText: '© JCVIZ 2025 — 2026 · All Imagery',
	},

	positioning: {
		manifestoNumber: '— 01 / Positioning',
		manifestoLines: [
			{
				segments: [
					{ text: 'Real estate is sold', tone: 'dim' },
					{ text: ' long before', tone: 'normal' },
				],
			},
			{
				segments: [
					{ text: 'it is built. We make ', tone: 'normal' },
					{ text: 'the unbuilt', tone: 'gold' },
				],
			},
			{
				segments: [
					{ text: '', tone: 'normal' },
					{ text: 'feel', tone: 'dim' },
					{ text: ' inevitable.', tone: 'normal' },
				],
			},
		],
		detailEyebrow: '— Built for real estate marketing',
		detailHeadline: {
			partA: 'A visualization studio shaped by',
			accentA: 'sales-floor reality',
			partB: '— not by 3D habits.',
		},
		detailParagraphs: [
			'JCVIZ exists for one audience: property developers and the brand, marketing and sales teams who launch them. Every image we make is built to do a job — open an investor deck, convince a sales walk-in, anchor an OOH campaign, justify a price tier.',
			'We obsess over visual storytelling, not render technicalities. Atmosphere, lifestyle and the feeling of a place arriving — these are the levers we pull.',
		],
	},

	services: [
		{
			order: 1,
			title: 'Masterplan & Urban',
			accent: 'Visualization',
			description:
				'Aerial views, district plans and bird-eye renders that communicate scale, hierarchy and lifestyle at a glance — the foundation of any major launch campaign.',
			chips: ['Aerial', 'Bird-eye', 'Phasing', 'Day / Dusk'],
			tagLabel: '— 01 Masterplan',
			visualVariant: 'master',
		},
		{
			order: 2,
			title: 'Real Estate Product',
			accent: 'Visualization',
			description:
				'Tower exteriors, villa portraits, signature lobbies, unit interiors and twilight key frames — every product type rendered to marketing-grade photography standard.',
			chips: ['Tower', 'Villa', 'Lobby', 'Interior'],
			tagLabel: '— 02 Product',
			visualVariant: 'apt',
		},
		{
			order: 3,
			title: 'Landscape & Amenity',
			accent: 'Visualization',
			description:
				'Pools, parks, clubhouses, riversides and public realm — the lifestyle scenes that decide whether a buyer can imagine living there. Plant by plant, light by light.',
			chips: ['Park', 'Clubhouse', 'Pool', 'Promenade'],
			tagLabel: '— 03 Landscape',
			visualVariant: 'land',
		},
		{
			order: 4,
			title: 'Marketing & Campaign',
			accent: 'Visuals',
			description:
				'Hero key visuals, billboard-grade compositions, brochure layouts and a complete image system tuned for OOH, digital and sales-gallery use.',
			chips: ['Hero KV', 'OOH', 'Brochure', 'Digital'],
			tagLabel: '— 04 Campaign',
			visualVariant: 'camp',
		},
	],

	valuePoints: [
		{
			order: 1,
			eyebrow: '— 01',
			title: 'Cinematic Lighting',
			description:
				'Light is the first thing the eye reads. We script direction, mood and time-of-day frame by frame — never a flat ambient sky.',
		},
		{
			order: 2,
			eyebrow: '— 02',
			title: 'Realistic Materials',
			description:
				'Stone, glass, water, foliage, fabric — handled with the patience of a still-life shoot. Materials must feel touched by light, not painted on.',
		},
		{
			order: 3,
			eyebrow: '— 03',
			title: 'Premium Landscape',
			description:
				'Trees, planting, hardscape, water bodies — composed with restraint. Landscape carries the lifestyle promise of every premium development.',
		},
		{
			order: 4,
			eyebrow: '— 04',
			title: 'Atmosphere & Depth',
			description:
				'Haze, particulates, lens behaviour, atmospheric perspective — the difference between a render and a photograph is air.',
		},
		{
			order: 5,
			eyebrow: '— 05',
			title: 'Lifestyle Storytelling',
			description:
				'Every frame answers a question the buyer is asking — "what does life feel like here?" Composition, figures, time-of-day all serve the answer.',
		},
		{
			order: 6,
			eyebrow: '— 06',
			title: 'Marketing Composition',
			description:
				'Frames are pre-thought for crop variants — billboard, brochure cover, social hero. Marketing teams should not have to re-edit our work.',
		},
	],

	projectTypes: [
		{
			order: 1,
			numberLabel: '01',
			title: 'Urban Masterplan',
			description:
				'Whole-district aerial and bird-eye imagery — phasing diagrams, axonometric studies, dawn-to-dusk hero frames.',
			visualVariant: 'pt-master',
		},
		{
			order: 2,
			numberLabel: '02',
			title: 'Mixed-use Development',
			description:
				'Residential + retail + office + amenity stitched into one cohesive visual narrative for the launch campaign.',
			visualVariant: 'pt-mixed',
		},
		{
			order: 3,
			numberLabel: '03',
			title: 'Villa Compound',
			description:
				'Low-rise and luxury villa portraits — twilight exteriors, courtyard atmospheres, garden and pool moments.',
			visualVariant: 'pt-villa',
		},
		{
			order: 4,
			numberLabel: '04',
			title: 'Shophouse Street',
			description:
				'Frontage rows, evening commerce, atmospheric streets — selling the rhythm of a future district, not just one façade.',
			visualVariant: 'pt-shop',
		},
		{
			order: 5,
			numberLabel: '05',
			title: 'Apartment & Residential',
			description:
				'High-rise tower portraits, signature lobbies, view-from-balcony moments and unit interiors at marketing scale.',
			visualVariant: 'pt-apt',
		},
		{
			order: 6,
			numberLabel: '06',
			title: 'Resort & Hospitality',
			description:
				'Resort masterplans, beachfront villas, spa and wellness scenes — visuals for hospitality investment decks and brand books.',
			visualVariant: 'pt-resort',
		},
		{
			order: 7,
			numberLabel: '07',
			title: 'Landscape & Public Realm',
			description:
				'Parks, plazas, riverfront promenades, public art moments — the connective lifestyle layer between buildings.',
			visualVariant: 'pt-land',
		},
		{
			order: 8,
			numberLabel: '08',
			title: 'Sales Gallery / Clubhouse',
			description:
				'Show-floor visuals, oversized sales-gallery prints, clubhouse hero shots and amenity walkthrough imagery.',
			visualVariant: 'pt-club',
		},
	],

	processSteps: [
		{
			order: 1,
			roman: 'i',
			title: 'Brief & Visual Direction',
			description:
				'We listen. Project DNA, target buyer, tone of campaign, deliverables, deadlines. We agree the visual direction before any 3D opens.',
			duration: '~3 days',
		},
		{
			order: 2,
			roman: 'ii',
			title: 'Camera & Storyline',
			description:
				'Shot list, framing, narrative beats. We treat the project like a feature, not a plan — every frame earns its place in the story.',
			duration: '~5 days',
		},
		{
			order: 3,
			roman: 'iii',
			title: 'Lighting & Mood Development',
			description:
				"Color script, time of day, weather, materiality — every frame's emotional intent is locked before we commit to final render.",
			duration: '~5 days',
		},
		{
			order: 4,
			roman: 'iv',
			title: 'Render Production',
			description:
				'Final-resolution renders. Patient, layered, lit the way an architectural photographer would shoot — no shortcuts in the master pass.',
			duration: '~10 days',
		},
		{
			order: 5,
			roman: 'v',
			title: 'Post-production & Delivery',
			description:
				'Compositing, grading, atmosphere, fine retouching — the frame becomes a photograph. Then masters, crops, brochure, OOH and digital variants.',
			duration: '~7 days',
		},
	],

	portfolioItems: [
		{
			order: 1,
			title: "Riverbend Heights — Bird's Eye",
			subLabel: 'Masterplan · 2026',
			gridSpan: 'g-1',
			placeholderVariant: 'ph-master',
		},
		{
			order: 2,
			title: 'Villa Aria — Twilight',
			subLabel: 'Villa & Low-rise · 2025',
			gridSpan: 'g-2',
			placeholderVariant: 'ph-villa',
		},
		{
			order: 3,
			title: 'Boulevard 88 — Evening',
			subLabel: 'Commercial Street · 2025',
			gridSpan: 'g-3',
			placeholderVariant: 'ph-shop',
		},
		{
			order: 4,
			title: 'Crescent Park — Clubhouse',
			subLabel: 'Landscape & Amenity · 2026',
			gridSpan: 'g-4',
			placeholderVariant: 'ph-land',
		},
		{
			order: 5,
			title: 'Aurora Bay — Resort',
			subLabel: 'Resort / Hospitality · 2026',
			gridSpan: 'g-5',
			placeholderVariant: 'ph-camp',
		},
		{
			order: 6,
			title: 'The Spire — Night View',
			subLabel: 'Night View · 2025',
			gridSpan: 'g-6',
			placeholderVariant: 'ph-apt',
		},
	],

	studio: {
		sectionNumber: '— 06 / Studio',
		tagline: 'The people behind the frames',
		headline: {
			partA: 'A compact studio of directors, artists and',
			accentA: 'light-obsessives.',
		},
		paragraphs: [
			'JCVIZ is deliberately small. The people who scope your project are the same people who light, render and grade it — no account layer, no hand-off that loses the intent.',
			'We come from architecture, film and photography. That mix is the point: every frame is judged as an image first and a render second.',
		],
	},

	team: [
		{
			order: 1,
			name: 'Khoa Nguyễn',
			role: 'Founder · Creative Director',
			focus:
				'Sets the visual direction for every launch — from first mood reference to final grade.',
		},
		{
			order: 2,
			name: 'Linh Trần',
			role: 'Lead Visualization Artist',
			focus:
				'Turns masterplans into frames buyers remember — camera, composition and story.',
		},
		{
			order: 3,
			name: 'Marco Belli',
			role: 'Lighting & Look Development',
			focus:
				'Scripts light and atmosphere so a render breathes like a photograph.',
		},
		{
			order: 4,
			name: 'Vy Phạm',
			role: 'Studio & Client Lead',
			focus:
				'Keeps briefs, timelines and developers aligned from kickoff to delivery.',
		},
	],

	finalCta: {
		eyebrow: '— Now booking · Q3 2026',
		headline: {
			partA: 'Ready to turn your project vision into',
			accentB: 'market-ready visuals',
			suffix: '?',
		},
		body: "Tell us what you're launching — masterplan, tower, township, brochure or full campaign. We respond within 48 hours with a proposed approach, scope and timeline.",
		primaryCta: {
			label: 'Send Project Brief',
			mode: 'mailto',
			href: 'studio@jcviz.vn',
		},
		secondaryCta: {
			label: 'Book a Visual Consultation',
			mode: 'tel',
			href: '0246 6868 006',
		},
	},

	contact: {
		email: 'studio@jcviz.vn',
		phone: '0246 6868 006',
		address: '4th Floor · AZ Sky Tower\nDinh Cong Ward · Hanoi',
		bookingStatus: '— Now booking · Q3 2026',
	},

	seo: {
		defaultTitle: 'JCVIZ — Architectural Visualization for Real Estate',
		titleTemplate: '%s | JCVIZ',
		defaultDescription:
			'Cinematic architectural imagery for property developers, marketing teams, and architectural partners across Southeast Asia.',
		twitterHandle: '@jcviz',
		robots: 'index,follow',
	},
};
