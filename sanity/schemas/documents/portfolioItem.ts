/**
 * Portfolio item — 6 documents expected.
 * Renders in a 12-column editorial gallery grid.
 *
 * If `image` is missing, the frontend falls back to the gradient defined
 * by `placeholderVariant` so the layout never collapses.
 */

import { defineField, defineType } from 'sanity';

export const portfolioItem = defineType({
	name: 'portfolioItem',
	title: 'Portfolio Item',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'subLabel',
			title: 'Sub-label',
			type: 'string',
			description: 'Mono uppercase line under the title — e.g. "Masterplan · 2026".',
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'imageWithAlt',
			description: 'Final render. Recommended 1600×1000+ JPEG. Optional during build-out.',
		}),
		defineField({
			name: 'placeholderVariant',
			title: 'Placeholder gradient (fallback)',
			type: 'string',
			description: 'Used as background until an image is uploaded.',
			options: {
				list: [
					{ title: 'Masterplan', value: 'ph-master' },
					{ title: 'Villa', value: 'ph-villa' },
					{ title: 'Shophouse / streetscape', value: 'ph-shop' },
					{ title: 'Apartment / high-rise', value: 'ph-apt' },
					{ title: 'Landscape', value: 'ph-land' },
					{ title: 'Campaign', value: 'ph-camp' },
				],
			},
		}),
		defineField({
			name: 'gridSpan',
			title: 'Grid span (editorial layout)',
			description: 'Position in the 12-column gallery. Mix sizes for visual rhythm.',
			type: 'string',
			options: {
				list: [
					{ title: 'Wide hero (span 7, 7:5)', value: 'g-1' },
					{ title: 'Square (span 5, 1:1)', value: 'g-2' },
					{ title: 'Tall portrait (span 4, 4:5)', value: 'g-3' },
					{ title: 'Wide (span 8, 8:5)', value: 'g-4' },
					{ title: 'Half-wide (span 6, 3:2)', value: 'g-5' },
					{ title: 'Half-wide alt (span 6, 3:2)', value: 'g-6' },
				],
			},
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
			sub: 'subLabel',
			order: 'order',
			visible: 'visible',
			media: 'image',
		},
		prepare(selection) {
			const { title, sub, order, visible, media } = selection as {
				title?: string;
				sub?: string;
				order?: number;
				visible?: boolean;
				media?: unknown;
			};
			const subtitle = [sub, visible === false ? 'hidden' : null]
				.filter(Boolean)
				.join(' · ');
			return {
				title: `${order ?? '?'}. ${title ?? '(untitled)'}`,
				subtitle: subtitle || undefined,
				media: media as never,
			};
		},
	},
});
