/**
 * Marquee — looping horizontal text track shown below the hero.
 *
 * The CSS animation is defined in globals.css (.marquee-track @keyframes).
 * For a seamless loop, the items are rendered twice (the CSS shifts the
 * track by -50% which lines up with the duplicated half).
 */

import { Fragment } from 'react';

type MarqueeProps = {
	items: string[];
	ariaLabel?: string;
};

export function Marquee({ items, ariaLabel }: MarqueeProps) {
	if (!items || items.length === 0) return null;

	const star = <span className="star">&#x2726;</span>;

	return (
		<div className="marquee" aria-label={ariaLabel}>
			<div className="marquee-track">
				{[0, 1].map((copy) => (
					<span className="marquee-item" key={copy} aria-hidden={copy === 1}>
						{items.map((item, idx) => (
							<Fragment key={idx}>
								{item}
								{idx < items.length - 1 ? star : null}
							</Fragment>
						))}
						{star}
					</span>
				))}
			</div>
		</div>
	);
}
