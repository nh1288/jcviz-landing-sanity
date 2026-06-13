/**
 * Studio — intro block for the "people behind the frames" section.
 *
 * Singleton: one section header (number label + tagline + headline + body
 * paragraphs). The team roster itself lives in the `teamMember` collection.
 */

import { defineField, defineType } from 'sanity';

export const studioSection = defineType({
	name: 'studioSection',
	title: 'Studio Section',
	type: 'document',
	fields: [
		defineField({
			name: 'sectionNumber',
			title: 'Section number label',
			type: 'string',
			description: 'Mono label in the left column, e.g. "— 06 / Studio".',
			initialValue: '— 06 / Studio',
		}),
		defineField({
			name: 'tagline',
			title: 'Tagline',
			type: 'string',
			description: 'Short mono line under the number, e.g. "The people behind the frames".',
		}),
		defineField({
			name: 'headline',
			title: 'Headline',
			type: 'headlineWithAccent',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'paragraphs',
			title: 'Body paragraphs',
			type: 'array',
			of: [{ type: 'text' }],
			description: 'One entry per paragraph. Typically 1–2 paragraphs.',
		}),
	],
	preview: {
		prepare: () => ({ title: 'Studio Section' }),
	},
});
