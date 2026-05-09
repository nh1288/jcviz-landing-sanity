/**
 * Sanity webhook handler — revalidates landing content on Publish.
 *
 * Sanity is configured in dashboard (Manage → API → Webhooks) to send a
 * signed POST here on every Create / Update / Delete in the production
 * dataset. The HMAC signature in the `sanity-webhook-signature` header
 * is verified against `SANITY_REVALIDATE_SECRET` (server-side only).
 *
 * On valid signature:
 *   - revalidateTag('sanity') → invalidates every cached Sanity fetch
 *     (see sanity/lib/getLandingContent.ts FETCH_OPTIONS).
 *   - revalidatePath('/')     → invalidates the rendered homepage cache
 *     for any segments that don't go through the tag.
 *
 * The POST body (which Sanity uses for the projection) is read but
 * never inspected — we always revalidate the whole landing because
 * many of our singletons feed multiple sections.
 *
 * Failure modes return non-200:
 *   401 — missing or invalid signature
 *   500 — server is missing SANITY_REVALIDATE_SECRET
 */

import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidatePath, revalidateTag } from 'next/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
	const secret = process.env.SANITY_REVALIDATE_SECRET;
	if (!secret) {
		return Response.json(
			{
				revalidated: false,
				error: 'Server is missing SANITY_REVALIDATE_SECRET',
			},
			{ status: 500 },
		);
	}

	const signature = request.headers.get(SIGNATURE_HEADER_NAME);
	const body = await request.text();

	if (!signature) {
		return Response.json(
			{ revalidated: false, error: 'Missing signature header' },
			{ status: 401 },
		);
	}

	let valid = false;
	try {
		valid = await isValidSignature(body, signature, secret);
	} catch {
		valid = false;
	}

	if (!valid) {
		return Response.json(
			{ revalidated: false, error: 'Invalid signature' },
			{ status: 401 },
		);
	}

	revalidateTag('sanity');
	revalidatePath('/');

	return Response.json({ revalidated: true, now: Date.now() });
}
