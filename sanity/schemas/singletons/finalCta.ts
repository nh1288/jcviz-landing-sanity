/**
 * Final CTA section — closing call-to-action at the bottom of the landing.
 */

import { defineField, defineType } from 'sanity';

export const finalCta = defineType({
	name: 'finalCta',
	title: 'Final CTA Section',
	type: 'document',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'buttons', title: 'Buttons' },
	],
	fields: [
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string',
			description: 'e.g. "— Now booking · Q3 2026". Falls back to contactInfo.bookingStatus if empty.',
			group: 'content',
		}),
		defineField({
			name: 'headline',
			title: 'Headline',
			type: 'headlineWithAccent',
			validation: (Rule) => Rule.required(),
			group: 'content',
		}),
		defineField({
			name: 'body',
			title: 'Body paragraph',
			type: 'text',
			rows: 4,
			group: 'content',
		}),
		defineField({
			name: 'primaryCta',
			title: 'Primary CTA (gold)',
			type: 'cta',
			group: 'buttons',
		}),
		defineField({
			name: 'secondaryCta',
			title: 'Secondary CTA (ghost)',
			type: 'cta',
			group: 'buttons',
		}),
	],
	preview: {
		prepare: () => ({ title: 'Final CTA Section' }),
	},
});
