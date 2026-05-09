/**
 * Hero block — headline, subheadline, two CTAs, top meta strip,
 * marquee items, and the bottom scroll/credits row.
 */

import { defineField, defineType } from 'sanity';

export const heroSection = defineType({
	name: 'heroSection',
	title: 'Hero Section',
	type: 'document',
	fields: [
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string',
			description: 'Mono-uppercase label above the headline.',
			initialValue: 'Architectural Visualization Studio',
		}),
		defineField({
			name: 'headline',
			title: 'Headline',
			type: 'headlineWithAccent',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'subheadline',
			title: 'Subheadline',
			type: 'text',
			rows: 4,
			description: 'Right-aligned paragraph next to the headline on desktop.',
		}),
		defineField({
			name: 'primaryCta',
			title: 'Primary CTA (gold button)',
			type: 'cta',
		}),
		defineField({
			name: 'secondaryCta',
			title: 'Secondary CTA (ghost button)',
			type: 'cta',
		}),
		defineField({
			name: 'topMeta',
			title: 'Top meta strip',
			description:
				'The two-column meta in the hero top corners (Studio location · Reel info).',
			type: 'object',
			fields: [
				defineField({ name: 'studioLocation', type: 'string' }),
				defineField({ name: 'studioBuilding', type: 'string' }),
				defineField({ name: 'reelLabel', type: 'string' }),
				defineField({ name: 'reelVolume', type: 'string' }),
			],
		}),
		defineField({
			name: 'marqueeAriaLabel',
			title: 'Marquee aria-label',
			type: 'string',
			initialValue: 'Who we work with',
		}),
		defineField({
			name: 'marqueeItems',
			title: 'Marquee items',
			type: 'array',
			of: [{ type: 'string' }],
			description:
				'Phrases shown in the looping marquee. Use neutral role categories — avoid third-party brand names.',
		}),
		defineField({
			name: 'scrollText',
			title: 'Scroll caption',
			type: 'string',
			description: 'Bottom-left "Scroll · Reel 04 · Selected Works" copy.',
		}),
		defineField({
			name: 'creditsText',
			title: 'Credits caption',
			type: 'string',
			description: 'Bottom-right credits text.',
		}),
	],
	preview: {
		prepare: () => ({ title: 'Hero Section' }),
	},
});
