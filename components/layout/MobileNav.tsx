'use client';

/**
 * MobileNav — hamburger toggle + slide-down panel shown at <=1100px.
 *
 * Header stays a server component; this small client island owns the open
 * state, Escape-to-close, body scroll-lock while open, and basic focus
 * handling. Uses the same CMS-driven nav items as the desktop nav so the
 * two stay in sync. No new dependencies.
 */

import { useEffect, useId, useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import type { Cta, NavItem } from '@/lib/types';

type MobileNavProps = {
	items: NavItem[];
	primaryCta?: Cta;
};

export function MobileNav({ items, primaryCta }: MobileNavProps) {
	const [open, setOpen] = useState(false);
	const panelId = useId();
	const toggleRef = useRef<HTMLButtonElement>(null);
	const firstLinkRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (!open) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpen(false);
				toggleRef.current?.focus();
			}
		};

		document.addEventListener('keydown', onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		firstLinkRef.current?.focus();

		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [open]);

	return (
		<div className="mobile-nav">
			<button
				ref={toggleRef}
				type="button"
				className={`mobile-nav-toggle${open ? ' open' : ''}`}
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((v) => !v)}
			>
				<span className="bar" aria-hidden="true" />
				<span className="bar" aria-hidden="true" />
			</button>

			<div
				id={panelId}
				className={`mobile-nav-panel${open ? ' open' : ''}`}
				aria-label="Mobile navigation"
			>
				<ul className="mobile-nav-list">
					{items.map((item, i) => (
						<li key={item.href + item.label}>
							<a
								ref={i === 0 ? firstLinkRef : undefined}
								href={item.href}
								onClick={() => setOpen(false)}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>

				<div className="mobile-nav-foot">
					<span className="lang" aria-hidden="true">
						<b>VI</b> &middot; EN
					</span>
					{primaryCta ? (
						<span
							className="mobile-nav-cta"
							onClick={() => setOpen(false)}
						>
							<Button cta={primaryCta} variant="gold" />
						</span>
					) : null}
				</div>
			</div>
		</div>
	);
}
