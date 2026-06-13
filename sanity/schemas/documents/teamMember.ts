/**
 * Team member — one document per person in the studio roster.
 * Renders in the portrait grid of the Studio section.
 *
 * Portrait is optional: until one is uploaded the frontend falls back to a
 * gold monogram built from the member's initials.
 */

import { orderRankField } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export const teamMember = defineType({
	name: 'teamMember',
	title: 'Team Member',
	type: 'document',
	fields: [
		orderRankField({ type: 'teamMember' }),
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'role',
			title: 'Role',
			type: 'string',
			description: 'e.g. "Founder · Creative Director".',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'focus',
			title: 'Focus line',
			type: 'text',
			rows: 3,
			description: 'Short one-line description of what this person does.',
		}),
		defineField({
			name: 'image',
			title: 'Portrait',
			type: 'imageWithAlt',
			description: 'Optional. Leave empty to show a gold monogram placeholder.',
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
		select: { title: 'name', role: 'role', order: 'order', visible: 'visible', media: 'image' },
		prepare(selection) {
			const { title, role, order, visible } = selection as {
				title?: string;
				role?: string;
				order?: number;
				visible?: boolean;
			};
			return {
				title: `${order ?? '?'}. ${title ?? '(unnamed)'}`,
				subtitle: `${role ?? ''}${visible === false ? ' · hidden' : ''}`.trim(),
				media: selection.media,
			};
		},
	},
});
