/**
 * Sanity read client — used by Next.js server components to fetch content.
 *
 * `useCdn: false` is intentional in App Router: Next.js handles caching
 * via fetch cache + tags, so an extra CDN layer just adds staleness.
 * After a `revalidateTag('sanity')` fires from the webhook, the next
 * request reads fresh data straight from the Sanity API.
 *
 * For preview/draft content (Phase 5D+), a separate client with the
 * read token would live alongside this one — keep this one anonymous.
 */

import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	perspective: 'published',
});
