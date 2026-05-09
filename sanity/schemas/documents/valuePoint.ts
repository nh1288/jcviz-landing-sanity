/**
 * Value pillar — 6 documents expected.
 * Renders in a 3-column grid in the value section.
 */

import { defineField, defineType } from 'sanity';

export const valuePoint = defineType({
	name: 'valuePoint',
	title: 'Value Pillar',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string',
			description: 'Short mono label, e.g. "— 01".',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required(),
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
		select: { title: 'title', eyebrow: 'eyebrow', order: 'order', visible: 'visible' },
		prepare(selection) {
			const { title, eyebrow, order, visible } = selection as {
				title?: string;
				eyebrow?: string;
				order?: number;
				visible?: boolean;
			};
			return {
				title: `${order ?? '?'}. ${title ?? '(untitled)'}`,
				subtitle: `${eyebrow ?? ''}${visible === false ? ' · hidden' : ''}`.trim(),
			};
		},
	},
});
