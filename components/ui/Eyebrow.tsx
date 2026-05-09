/**
 * Eyebrow — JetBrains Mono uppercase label used above section headlines.
 */

type EyebrowProps = {
	children: React.ReactNode;
	gold?: boolean;
	className?: string;
};

export function Eyebrow({ children, gold, className }: EyebrowProps) {
	const cls = ['eyebrow', gold ? 'gold-text' : null, className]
		.filter(Boolean)
		.join(' ');
	return <span className={cls}>{children}</span>;
}
