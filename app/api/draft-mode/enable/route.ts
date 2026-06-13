/**
 * Draft-mode enable endpoint for the Sanity Presentation tool.
 *
 * The Presentation tool calls this with a signed preview URL; next-sanity
 * validates it against the read-token-authenticated client, then turns on
 * Next.js draft mode so server components fetch the `drafts` perspective.
 *
 * With no SANITY_API_READ_TOKEN set, we return 401 instead of wiring the
 * validator (which requires a token) — so the public site is untouched and
 * the endpoint fails cleanly rather than throwing.
 */

import { defineEnableDraftMode } from 'next-sanity/draft-mode';

import { readToken } from '@/sanity/env';
import { client } from '@/sanity/lib/client';

export const GET = readToken
	? defineEnableDraftMode({
			client: client.withConfig({ token: readToken }),
		}).GET
	: async () =>
			new Response(
				'Draft mode unavailable: SANITY_API_READ_TOKEN is not configured.',
				{ status: 401 },
			);
