/**
 * Service offering — 4 documents expected (Masterplan & Urban,
 * Real Estate Product, Landscape & Amenity, Marketing & Campaign).
 *
 * Frontend renders cards in a 2-col grid, sorted by `order` ascending.
 */

import { orderRankField } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export const service = defineType({
	name: 'service',
	title: 'Service',
	type: 'document',
	fields: [
		orderRankField({ type: 'service' }),
		defineField({
			name: 'title',
			title: 'Title (plain)',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'accent',
			title: 'Accent (gold italic suffix)',
			type: 'string',
			description: 'Italic gold word(s) appended to the title — e.g. "Visualization".',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'chips',
			title: 'Chip tags',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'Short uppercase labels at the bottom of the card (e.g. "Aerial · Bird-eye").',
		}),
		defineField({
			name: 'tagLabel',
			title: 'Visual tag',
			type: 'string',
			description: 'Top-left tag overlaid on the visual (e.g. "— 01 Masterplan").',
		}),
		defineField({
			name: 'visualVariant',
			title: 'Placeholder visual',
			type: 'string',
			options: {
				list: [
					{ title: 'Masterplan grid', value: 'master' },
					{ title: 'Apartment / high-rise', value: 'apt' },
					{ title: 'Landscape / amenity', value: 'land' },
					{ title: 'Campaign / marketing', value: 'camp' },
				],
				layout: 'radio',
			},
		}),
		defineField({
			name: 'image',
			title: 'Image (optional)',
			type: 'imageWithAlt',
			description: 'When present, replaces the placeholder gradient.',
		}),
		defineField({
			name: 'order',
			title: 'Display order',
			type: 'number',
			validation: (Rule) => Rule.required().integer().min(0),
			description: 'Lower numbers appear first.',
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
			accent: 'accent',
			order: 'order',
			visible: 'visible',
			media: 'image',
		},
		prepare(selection) {
			const { title, accent, order, visible, media } = selection as {
				title?: string;
				accent?: string;
				order?: number;
				visible?: boolean;
				media?: unknown;
			};
			return {
				title: `${order ?? '?'}. ${title ?? '(untitled)'}${accent ? ' ' + accent : ''}`,
				subtitle: visible === false ? 'hidden' : 'visible',
				media: media as never,
			};
		},
	},
});
