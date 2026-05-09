/**
 * Image with required alt text and optional caption.
 *
 * Built on Sanity's native image type so we keep hotspot/crop UI for free.
 * Alt text is enforced as a warning (not an error) — uploads with missing
 * alt still publish, but the editor sees a yellow flag.
 */

import { defineField, defineType } from 'sanity';

export const imageWithAlt = defineType({
	name: 'imageWithAlt',
	title: 'Image (with alt text)',
	type: 'image',
	options: {
		hotspot: true,
		storeOriginalFilename: true,
	},
	fields: [
		defineField({
			name: 'alt',
			title: 'Alt text',
			description:
				'Describes the image for screen readers and SEO. Strongly recommended for every image.',
			type: 'string',
			validation: (Rule) =>
				Rule.required()
					.min(3)
					.warning('Add a short alt text describing the image.'),
		}),
		defineField({
			name: 'caption',
			title: 'Caption',
			description: 'Optional caption shown beneath the image.',
			type: 'string',
		}),
	],
});
