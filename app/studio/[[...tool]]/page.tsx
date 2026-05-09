/**
 * Sanity Studio mount point — embedded inside the Next.js app at /studio.
 *
 * `force-static` makes Studio routing handled by the client; the server
 * just delivers the shell. `force-dynamic` is also valid but slower.
 */

'use client';

import { NextStudio } from 'next-sanity/studio';

import config from '../../../sanity.config';

export default function StudioPage() {
	return <NextStudio config={config} />;
}
