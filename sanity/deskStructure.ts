/**
 * Custom Studio desk structure.
 *
 * The default structureTool lists every schema type in registration order,
 * mixing singletons (which then need a two-click "list of one" detour) with
 * collections. This structure instead:
 *
 *   1. Orders the sidebar to match the page top-to-bottom (Hero → … → Final CTA).
 *   2. Opens each singleton directly in one click (no intermediate list).
 *   3. Renders every collection as a drag-to-reorder list (orderable-document-list),
 *      so admins reorder by dragging instead of editing `order` numbers by hand.
 *   4. Splits a "Settings" group (site / contact / SEO) below a divider.
 *
 * Every editable type is listed explicitly — a custom structure replaces the
 * default, so anything omitted here would disappear from the sidebar.
 */

import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type {
	StructureResolver,
	StructureResolverContext,
	StructureBuilder,
} from 'sanity/structure';

/** Single-click editor for a singleton whose document _id equals its type. */
function singleton(S: StructureBuilder, type: string, title: string) {
	return S.listItem()
		.title(title)
		.id(type)
		.child(S.document().schemaType(type).documentId(type).title(title));
}

/** Drag-to-reorder list for a collection type. */
function orderable(
	S: StructureBuilder,
	context: StructureResolverContext,
	type: string,
	title: string,
) {
	return orderableDocumentListDeskItem({ type, title, S, context });
}

export const structure: StructureResolver = (S, context) =>
	S.list()
		.title('JCVIZ Landing')
		.items([
			// Page sections, in scroll order.
			singleton(S, 'heroSection', 'Hero'),
			singleton(S, 'positioningSection', 'Positioning'),
			orderable(S, context, 'service', 'Services'),
			orderable(S, context, 'valuePoint', 'Value Pillars'),
			orderable(S, context, 'projectType', 'Project Types'),
			orderable(S, context, 'processStep', 'Process Steps'),
			orderable(S, context, 'portfolioItem', 'Portfolio'),
			singleton(S, 'studioSection', 'Studio'),
			orderable(S, context, 'teamMember', 'Team'),
			singleton(S, 'finalCta', 'Final CTA'),

			S.divider(),

			// Site-wide settings.
			singleton(S, 'siteSettings', 'Site Settings'),
			singleton(S, 'contactInfo', 'Contact Info'),
			singleton(S, 'seoSettings', 'SEO Settings'),
		]);
