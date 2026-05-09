/**
 * Sanity read client — used by Next.js server components to fetch content.
 * `useCdn: true` because for v1 we serve published content only and we
 * want CDN caching. Switch to `useCdn: false` for preview / draft mode
 * later if needed.
 */

import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
});
