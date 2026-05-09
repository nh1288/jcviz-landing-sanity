/**
 * Site-wide chrome — brand info, primary nav, footer columns, logo, favicon.
 *
 * Singleton: `delete` and `duplicate` actions are stripped at the
 * sanity.config.ts level via `document.actions`. The schema type is
 * also hidden from the "Create new" menu via `schema.templates`.
 * First instance is created by the Phase 4 seed script.
 */

import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		defineField({
			name: 'siteTitle',
			title: 'Site title',
			type: 'string',
			description:
				'Used as the default browser tab title and the SEO fallback.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'tagline',
			title: 'Tagline',
			type: 'string',
		}),
		defineField({
			name: 'brandName',
			title: 'Brand name (header logotype)',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'brandSub',
			title: 'Brand sub-label',
			type: 'string',
			description: 'Small line after the brand mark, e.g. "Architectural Visualization · Est. 2025".',
		}),
		defineField({
			name: 'navItems',
			title: 'Primary navigation',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'navItem',
					fields: [
						defineField({
							name: 'label',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'href',
							type: 'string',
							description: 'Anchor (#services) or full URL.',
							validation: (Rule) => Rule.required(),
						}),
					],
					preview: {
						select: { title: 'label', subtitle: 'href' },
					},
				},
			],
		}),
		defineField({
			name: 'footerDescription',
			title: 'Footer brand description',
			type: 'text',
			rows: 3,
			description: 'Short paragraph under the brand block in the footer.',
		}),
		defineField({
			name: 'footerColumns',
			title: 'Footer link columns',
			description:
				'Columns next to the brand block (e.g. Studio · Services · Contact).',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'footerColumn',
					fields: [
						defineField({
							name: 'heading',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'links',
							type: 'array',
							of: [
								{
									type: 'object',
									name: 'footerLink',
									fields: [
										defineField({
											name: 'label',
											type: 'string',
											validation: (Rule) => Rule.required(),
										}),
										defineField({
											name: 'href',
											type: 'string',
											validation: (Rule) => Rule.required(),
										}),
									],
									preview: {
										select: { title: 'label', subtitle: 'href' },
									},
								},
							],
						}),
					],
					preview: { select: { title: 'heading' } },
				},
			],
		}),
		defineField({
			name: 'logo',
			title: 'Custom logo',
			type: 'imageWithAlt',
			description: 'Optional. If empty, the JCVIZ wordmark renders as text.',
		}),
		defineField({
			name: 'favicon',
			title: 'Favicon',
			type: 'image',
			description: 'Square 32×32 or 64×64.',
		}),
	],
	preview: {
		prepare: () => ({ title: 'Site Settings' }),
	},
});
