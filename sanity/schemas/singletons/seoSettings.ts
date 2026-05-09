/**
 * Site-wide SEO defaults — used by app/layout.tsx metadata.
 * Page-specific overrides will live on individual page documents in
 * a future phase.
 */

import { defineField, defineType } from 'sanity';

export const seoSettings = defineType({
	name: 'seoSettings',
	title: 'SEO Settings',
	type: 'document',
	fields: [
		defineField({
			name: 'defaultTitle',
			title: 'Default page title',
			type: 'string',
			validation: (Rule) => Rule.required().max(70),
		}),
		defineField({
			name: 'titleTemplate',
			title: 'Title template',
			type: 'string',
			description: 'Use %s as the placeholder for page-specific titles. Example: "%s | JCVIZ".',
			initialValue: '%s | JCVIZ',
		}),
		defineField({
			name: 'defaultDescription',
			title: 'Default meta description',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.max(180),
		}),
		defineField({
			name: 'ogImage',
			title: 'OG image (1200×630)',
			type: 'imageWithAlt',
			description: 'Used when a page is shared on social media.',
		}),
		defineField({
			name: 'twitterHandle',
			title: 'Twitter handle',
			type: 'string',
			description: 'Including the @, e.g. @jcviz.',
		}),
		defineField({
			name: 'robots',
			title: 'Robots directive',
			type: 'string',
			options: {
				list: [
					{ title: 'index, follow (default)', value: 'index,follow' },
					{ title: 'noindex, nofollow (hide from search engines)', value: 'noindex,nofollow' },
				],
				layout: 'radio',
			},
			initialValue: 'index,follow',
		}),
	],
	preview: {
		prepare: () => ({ title: 'SEO Settings' }),
	},
});
