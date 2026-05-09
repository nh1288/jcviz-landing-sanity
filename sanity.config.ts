/**
 * Sanity Studio config — used by the embedded Studio mounted at /studio
 * inside the Next.js app, and by the `sanity` CLI.
 *
 * Singleton enforcement (replaces the old `__experimental_actions` field
 * which was removed from Sanity v3 typings in 3.40+):
 *
 *   1. `document.actions` strips `delete` + `duplicate` from any document
 *      whose schema type is in SINGLETON_TYPES — editors can update and
 *      publish but not remove or clone the document.
 *
 *   2. `schema.templates` removes singleton types from the global
 *      "+ Create new" menu, so editors can't accidentally spawn a second
 *      copy of siteSettings, heroSection, etc.
 *
 * The first instance of each singleton is created via the seed script
 * in Phase 4 (programmatically, bypassing the Studio UI restrictions).
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemas';

const SINGLETON_TYPES = new Set([
	'siteSettings',
	'heroSection',
	'positioningSection',
	'finalCta',
	'contactInfo',
	'seoSettings',
]);

const SINGLETON_DISALLOWED_ACTIONS = new Set(['delete', 'duplicate']);

export default defineConfig({
	basePath: '/studio',
	name: 'jcviz-landing-studio',
	title: 'JCVIZ Landing Studio',
	projectId,
	dataset,
	plugins: [
		structureTool(),
		visionTool({ defaultApiVersion: apiVersion }),
	],
	schema: {
		types: schemaTypes,
		// Hide singletons from "+ Create new" menu.
		templates: (templates) =>
			templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
	},
	document: {
		// Strip delete + duplicate buttons on singleton documents.
		actions: (prev, context) => {
			if (SINGLETON_TYPES.has(context.schemaType)) {
				return prev.filter(
					({ action }) => !action || !SINGLETON_DISALLOWED_ACTIONS.has(action),
				);
			}
			return prev;
		},
	},
});
