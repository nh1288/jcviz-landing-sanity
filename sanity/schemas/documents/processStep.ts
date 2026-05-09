/**
 * Process step — 5 documents expected
 * (Brief & Visual Direction → Camera & Storyline → Lighting & Mood Development
 *  → Render Production → Post-production & Final Delivery).
 */

import { defineField, defineType } from 'sanity';

export const processStep = defineType({
	name: 'processStep',
	title: 'Process Step',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'roman',
			title: 'Roman numeral',
			type: 'string',
			description: 'Lowercase roman shown as a large outlined label — i, ii, iii, iv, v.',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'duration',
			title: 'Duration label',
			type: 'string',
			description: 'e.g. "~3 days", "~1 week".',
		}),
		defineField({
			name: 'order',
			title: 'Display order',
			type: 'number',
			validation: (Rule) => Rule.required().integer().min(0),
		}),
		defineField({
			name: 'visible',
			title: 'Visible on site',
			type: 'boolean',
			initialValue: true,
		}),
	],
	orderings: [
		{
			title: 'Display order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }],
		},
	],
	preview: {
		select: {
			title: 'title',
			roman: 'roman',
			dur: 'duration',
			order: 'order',
			visible: 'visible',
		},
		prepare(selection) {
			const { title, roman, dur, order, visible } = selection as {
				title?: string;
				roman?: string;
				dur?: string;
				order?: number;
				visible?: boolean;
			};
			const subtitle = [dur, visible === false ? 'hidden' : null]
				.filter(Boolean)
				.join(' · ');
			return {
				title: `${order ?? '?'}. ${roman ? '(' + roman + ') ' : ''}${title ?? '(untitled)'}`,
				subtitle: subtitle || undefined,
			};
		},
	},
});
