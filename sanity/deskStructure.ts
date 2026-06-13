/**
 * Custom Studio desk structure.
 *
 * The default structureTool lists every schema type in registration order,
 * mixing singletons (which then need a two-click "list of one" detour) with
 * collections. This structure instead:
 *
 *   1. Orders the sidebar to match the page top-to-bottom (Hero → … → Final CTA).
 *   2. Opens each singleton directly in one click (no intermediate list).
 *   3. Splits a "Settings" group (site / contact / SEO) below a divider.
 *
 * Every editable type is listed explicitly — a custom structure replaces the
 * default, so anything omitted here would disappear from the sidebar.
 */

import type { StructureResolver, StructureBuilder } from 'sanity/structure';

/** Single-click editor for a singleton whose document _id equals its type. */
function singleton(S: StructureBuilder, type: string, title: string) {
	return S.listItem()
		.title(title)
		.id(type)
		.child(S.document().schemaType(type).documentId(type).title(title));
}

export const structure: StructureResolver = (S) =>
	S.list()
		.title('JCVIZ Landing')
		.items([
			// Page sections, in scroll order.
			singleton(S, 'heroSection', 'Hero'),
			singleton(S, 'positioningSection', 'Positioning'),
			S.documentTypeListItem('service').title('Services'),
			S.documentTypeListItem('valuePoint').title('Value Pillars'),
			S.documentTypeListItem('projectType').title('Project Types'),
			S.documentTypeListItem('processStep').title('Process Steps'),
			S.documentTypeListItem('portfolioItem').title('Portfolio'),
			singleton(S, 'studioSection', 'Studio'),
			S.documentTypeListItem('teamMember').title('Team'),
			singleton(S, 'finalCta', 'Final CTA'),

			S.divider(),

			// Site-wide settings.
			singleton(S, 'siteSettings', 'Site Settings'),
			singleton(S, 'contactInfo', 'Contact Info'),
			singleton(S, 'seoSettings', 'SEO Settings'),
		]);
