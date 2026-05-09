/**
 * Site shell — async server component.
 *
 * Fetches landing content once per request via the cached helper; the
 * homepage page calls the same helper and gets the deduplicated result
 * (React `cache()` plus Sanity client's own per-request cache).
 *
 * Mounts persistent header, footer, ambient/grain decorations, and the
 * client-side ScrollFx controller.
 */

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollFx } from '@/components/layout/ScrollFx';
import { getLandingContent } from '@/sanity/lib/getLandingContent';

export default async function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { site, contact, hero } = await getLandingContent();

	return (
		<>
			<a className="skip-link" href="#main">
				Skip to content
			</a>

			<div className="ambient" aria-hidden="true"></div>
			<div className="grain" aria-hidden="true"></div>

			<Header site={site} primaryCta={hero.primaryCta} />
			{children}
			<Footer site={site} contact={contact} />
			<ScrollFx />
		</>
	);
}
