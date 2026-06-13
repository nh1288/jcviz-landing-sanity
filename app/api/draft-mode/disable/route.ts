/**
 * Draft-mode disable endpoint — turns off Next.js draft mode and returns to
 * the published site. Linked from the VisualEditing toolbar overlay.
 */

import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	(await draftMode()).disable();
	return NextResponse.redirect(new URL('/', request.url));
}
