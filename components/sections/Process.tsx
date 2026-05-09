/**
 * Process — 5-step timeline.
 *
 * Frontend renders 5 columns (process-grid-5 modifier in globals.css).
 */

import type { ProcessStep } from '@/lib/types';

type ProcessProps = {
	items: ProcessStep[];
};

export function Process({ items }: ProcessProps) {
	const sorted = [...items].sort((a, b) => a.order - b.order);

	return (
		<section className="block process-section" id="process">
			<div className="section-head" data-reveal>
				<div className="meta-col">
					<span className="num">&mdash; 05 / Process</span>
					<span className="lbl">From brief to final delivery</span>
				</div>
				<div>
					<h2>
						Five steps. Like <span className="gold it">a film crew</span>.
					</h2>
					<p className="lede">
						Every project moves through the same disciplined sequence. Quietly,
						on schedule. You see thumbnails before pixels, mood before render,
						and never a surprise.
					</p>
				</div>
			</div>

			<div className="process-wrap">
				<div className="process-grid process-grid-5">
					{sorted.map((step, idx) => (
						<div className="pstep" data-reveal key={idx}>
							{step.roman ? <div className="pn it">{step.roman}</div> : null}
							<h4>{step.title}</h4>
							<p>{step.description}</p>
							{step.duration ? (
								<div className="dur">{step.duration}</div>
							) : null}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
