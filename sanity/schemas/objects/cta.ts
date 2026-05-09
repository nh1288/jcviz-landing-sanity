/**
 * Reusable call-to-action object — embedded in heroSection, finalCta, etc.
 *
 * `mode` decides how the frontend renders the link:
 *   - url    → renders as <a href={href}>
 *   - mailto → renders as <a href={`mailto:${href}`}>
 *   - tel    → renders as <a href={`tel:${href}`}>
 *
 * The `href` field stays a plain string in all three modes; the rendering
 * component adds the prefix. Editors only fill in the raw destination.
 */

import { defineField, defineType } from 'sanity';

export const cta = defineType({
	name: 'cta',
	title: 'Call to Action',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Button label',
			type: 'string',
			validation: (Rule) => Rule.required().min(1).max(60),
		}),
		defineField({
			name: 'mode',
			title: 'Link type',
			type: 'string',
			options: {
				list: [
					{ title: 'URL (web link)', value: 'url' },
					{ title: 'Email (mailto:)', value: 'mailto' },
					{ title: 'Phone (tel:)', value: 'tel' },
				],
				layout: 'radio',
			},
			initialValue: 'url',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'href',
			title: 'Destination',
			description:
				'URL: full URL or anchor (e.g. https://… or #contact). Email: just the address. Phone: digits, spaces or +country code.',
			type: 'string',
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: { label: 'label', mode: 'mode', href: 'href' },
		prepare(selection) {
			const { label, mode, href } = selection as {
				label?: string;
				mode?: string;
				href?: string;
			};
			return {
				title: label || '(no label)',
				subtitle: mode && href ? `${mode} → ${href}` : '(no destination)',
			};
		},
	},
});
