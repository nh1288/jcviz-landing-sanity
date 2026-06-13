/**
 * Project type — 8 documents expected.
 * Renders in a 4-column grid showing the eight product categories.
 */

import { orderRankField } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export const projectType = defineType({
	name: 'projectType',
	title: 'Project Type',
	type: 'document',
	fields: [
		orderRankField({ type: 'projectType' }),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'numberLabel',
			title: 'Number label',
			type: 'string',
			description: 'Two-digit string shown above the visual (e.g. "01").',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'visualVariant',
			title: 'Placeholder visual',
			type: 'string',
			options: {
				list: [
					{ title: 'Masterplan', value: 'pt-master' },
					{ title: 'Mixed-use', value: 'pt-mixed' },
					{ title: 'Villa', value: 'pt-villa' },
					{ title: 'Shophouse', value: 'pt-shop' },
					{ title: 'Apartment', value: 'pt-apt' },
					{ title: 'Resort', value: 'pt-resort' },
					{ title: 'Landscape', value: 'pt-land' },
					{ title: 'Clubhouse', value: 'pt-club' },
				],
			},
		}),
		defineField({
			name: 'image',
			title: 'Image (optional)',
			type: 'imageWithAlt',
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
			num: 'numberLabel',
			order: 'order',
			visible: 'visible',
			media: 'image',
		},
		prepare(selection) {
			const { title, num, order, visible, media } = selection as {
				title?: string;
				num?: string;
				order?: number;
				visible?: boolean;
				media?: unknown;
			};
			return {
				title: `${order ?? '?'}. ${num ? num + ' · ' : ''}${title ?? '(untitled)'}`,
				subtitle: visible === false ? 'hidden' : 'visible',
				media: media as never,
			};
		},
	},
});
