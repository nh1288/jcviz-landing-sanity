/**
 * Contact info — email, phone, address, booking status.
 * Surfaced in the footer and (optionally) the final CTA's eyebrow.
 */

import { defineField, defineType } from 'sanity';

export const contactInfo = defineType({
	name: 'contactInfo',
	title: 'Contact Info',
	type: 'document',
	fields: [
		defineField({
			name: 'email',
			title: 'Studio email',
			type: 'string',
			validation: (Rule) =>
				Rule.required().email().error('Enter a valid email address.'),
		}),
		defineField({
			name: 'phone',
			title: 'Studio phone',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'address',
			title: 'Studio address',
			type: 'text',
			rows: 3,
			description: 'Multi-line address. Each newline becomes a line break in the footer.',
		}),
		defineField({
			name: 'bookingStatus',
			title: 'Booking status eyebrow',
			type: 'string',
			description: 'e.g. "— Now booking · Q3 2026". Used by the final CTA section if its own eyebrow is empty.',
		}),
	],
	preview: {
		prepare: () => ({ title: 'Contact Info' }),
	},
});
