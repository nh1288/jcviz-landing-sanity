/**
 * Header — sticky top nav with brand mark, links, lang toggle, and primary CTA.
 *
 * Sticky-shrink behavior on scroll is handled by the client component
 * <ScrollFx />. The CSS in globals.css drives the visual transition.
 */

import { Button } from '@/components/ui/Button';
import { MobileNav } from '@/components/layout/MobileNav';
import type { Cta, SiteSettings } from '@/lib/types';

type HeaderProps = {
	site: SiteSettings;
	primaryCta?: Cta;
};

export function Header({ site, primaryCta }: HeaderProps) {
	return (
		<nav className="top" aria-label="Primary">
			<div className="brand">
				<div className="brand-mark" aria-hidden="true"></div>
				<div>
					<div className="brand-name">{site.brandName}</div>
				</div>
				{site.brandSub ? (
					<div className="brand-sub">{site.brandSub}</div>
				) : null}
			</div>

			<div className="nav-links">
				{site.navItems.map((item) => (
					<a key={item.href + item.label} href={item.href}>
						{item.label}
					</a>
				))}
			</div>

			<div className="nav-cta">
				<span className="lang">
					<b>VI</b> · EN
				</span>
				<Button cta={primaryCta} variant="gold" />
			</div>

			<MobileNav items={site.navItems} primaryCta={primaryCta} />
		</nav>
	);
}
