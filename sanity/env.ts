/**
 * Sanity environment variables, read once and asserted.
 * Throws clearly at startup if any required var is missing — better than
 * a silent runtime failure deep inside a query.
 */

export const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-01';

/**
 * Server-only read token for draft/preview (Presentation tool).
 * Never prefixed NEXT_PUBLIC_, so it is never inlined into the client
 * bundle. Empty when unset — the published site then works unchanged and
 * draft mode simply cannot be enabled.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN || '';

export const dataset = assertValue(
	process.env.NEXT_PUBLIC_SANITY_DATASET,
	'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
);

export const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
	if (v === undefined) {
		throw new Error(errorMessage);
	}
	return v;
}
