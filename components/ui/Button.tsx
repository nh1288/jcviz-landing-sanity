/**
 * Button — renders a `<a>` styled as one of the JCVIZ button variants.
 *
 * Resolves the href based on Cta.mode:
 *   url    → href is used as-is
 *   mailto → "mailto:" prefix added
 *   tel    → "tel:" prefix added, whitespace stripped
 */

import type { Cta } from '@/lib/types';

type ButtonProps = {
	cta?: Cta | null;
	variant?: 'gold' | 'ghost' | 'line';
	arrow?: boolean;
	className?: string;
};

export function Button({
	cta,
	variant = 'gold',
	arrow = true,
	className,
}: ButtonProps) {
	if (!cta || !cta.label || !cta.href) return null;

	const href = resolveCtaHref(cta);
	const cls = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ');

	return (
		<a href={href} className={cls}>
			{cta.label}
			{arrow && variant !== 'line' && <span className="arr">&rarr;</span>}
		</a>
	);
}

function resolveCtaHref(cta: Cta): string {
	if (cta.mode === 'mailto') {
		return `mailto:${cta.href}`;
	}
	if (cta.mode === 'tel') {
		return `tel:${cta.href.replace(/\s+/g, '')}`;
	}
	return cta.href;
}
