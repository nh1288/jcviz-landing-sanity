/**
 * Positioning — manifesto statement (Portable Text with `dim` and `gold`
 * decorators) plus a positioning detail block (eyebrow + headline + body).
 *
 * The manifesto uses Portable Text so editors can highlight individual
 * words and apply the `dim` or `gold` decorator. The frontend maps:
 *   strong → <strong>
 *   dim    → <span class="dim">
 *   gold   → <span class="gold it">
 */

import { defineField, defineType } from 'sanity';

export const positioningSection = defineType({
	name: 'positioningSection',
	title: 'Positioning Section',
	type: 'document',
	fields: [
		defineField({
			name: 'manifestoNumber',
			title: 'Manifesto number label',
			type: 'string',
			description: 'e.g. "— 01 / Positioning"',
			initialValue: '— 01 / Positioning',
		}),
		defineField({
			name: 'manifesto',
			title: 'Manifesto statement',
			description:
				'Use the toolbar to mark words as Dim or Gold. Use Shift+Enter for in-line breaks, Enter for new paragraphs.',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
					marks: {
						decorators: [
							{ title: 'Bold', value: 'strong' },
							{ title: 'Dim', value: 'dim' },
							{ title: 'Gold accent', value: 'gold' },
						],
						annotations: [],
					},
				},
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'detailEyebrow',
			title: 'Detail — eyebrow',
			type: 'string',
		}),
		defineField({
			name: 'detailHeadline',
			title: 'Detail — headline',
			type: 'headlineWithAccent',
		}),
		defineField({
			name: 'detailParagraphs',
			title: 'Detail — body paragraphs',
			type: 'array',
			of: [{ type: 'text' }],
			description: 'One entry per paragraph. Typically 1–2 paragraphs.',
		}),
	],
	preview: {
		prepare: () => ({ title: 'Positioning Section' }),
	},
});
