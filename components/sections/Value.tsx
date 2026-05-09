/**
 * Value — six pillars in a 3-col grid.
 */

import type { ValuePoint } from '@/lib/types';

type ValueProps = {
	items: ValuePoint[];
};

export function Value({ items }: ValueProps) {
	const sorted = [...items].sort((a, b) => a.order - b.order);

	return (
		<section className="value-section block" id="value">
			<div className="section-head" data-reveal>
				<div className="meta-col">
					<span className="num">&mdash; 03 / Value</span>
					<span className="lbl">What we obsess over</span>
				</div>
				<div>
					<h2>
						Images that sell the <span className="gold it">vision</span>, not
						just the <span className="gold it">design.</span>
					</h2>
					<p className="lede">
						A render proves the design exists. A great image proves the project
						is worth buying into. We work in the second category.
					</p>
				</div>
			</div>

			<div className="value-grid">
				{sorted.map((pillar, idx) => (
					<article className="value-cell" data-reveal key={idx}>
						{pillar.eyebrow ? (
							<span className="eyebrow gold-text">{pillar.eyebrow}</span>
						) : null}
						<h4>{pillar.title}</h4>
						<p>{pillar.description}</p>
					</article>
				))}
			</div>
		</section>
	);
}
