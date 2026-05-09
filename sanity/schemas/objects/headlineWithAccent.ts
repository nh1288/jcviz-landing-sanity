/**
 * Multi-part headline with optional gold-italic accents.
 *
 * Used by heroSection and finalCta. The frontend renders:
 *
 *   {partA} {accentA && <span class="gold">{accentA}</span>}
 *   {partB && <><br/>{partB} {accentB && <span class="gold">{accentB}</span>}</>}
 *   {suffix}
 *
 * Hero typically uses partA + accentA + partB + accentB.
 * Final CTA typically uses partA + (br) + accentB + suffix '?'.
 */

import { defineField, defineType } from 'sanity';

export const headlineWithAccent = defineType({
	name: 'headlineWithAccent',
	title: 'Headline (with gold-italic accent)',
	type: 'object',
	description:
		'Build the headline by alternating plain words with gold-italic accents.',
	fields: [
		defineField({
			name: 'partA',
			title: 'Part 1 (plain text)',
			type: 'string',
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			name: 'accentA',
			title: 'Accent 1 (gold italic, same line)',
			type: 'string',
			description: 'Optional. Renders in gold italic right after Part 1.',
		}),
		defineField({
			name: 'partB',
			title: 'Part 2 (plain, second line)',
			type: 'string',
			description: 'Optional. If set, the headline breaks to a new line.',
		}),
		defineField({
			name: 'accentB',
			title: 'Accent 2 (gold italic, second line)',
			type: 'string',
			description: 'Optional. Renders in gold italic on the second line.',
		}),
		defineField({
			name: 'suffix',
			title: 'Suffix (e.g. "?", ".")',
			type: 'string',
			description: 'Optional trailing text after the last accent.',
		}),
	],
	preview: {
		select: {
			a: 'partA',
			acc: 'accentA',
			b: 'partB',
			accB: 'accentB',
			s: 'suffix',
		},
		prepare(selection) {
			const { a, acc, b, accB, s } = selection as {
				a?: string;
				acc?: string;
				b?: string;
				accB?: string;
				s?: string;
			};
			const line1 = [a, acc].filter(Boolean).join(' ');
			const line2 = [b, accB].filter(Boolean).join(' ');
			return {
				title: line1 + (s ?? '') || '(empty)',
				subtitle: line2 || undefined,
			};
		},
	},
});
