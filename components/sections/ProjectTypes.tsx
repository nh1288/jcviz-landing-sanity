/**
 * Project Types — 8 product categories in a 4-col grid.
 */

import type { ProjectType } from '@/lib/types';

type ProjectTypesProps = {
	items: ProjectType[];
};

export function ProjectTypes({ items }: ProjectTypesProps) {
	const sorted = [...items].sort((a, b) => a.order - b.order);

	return (
		<section className="project-types block" id="project-types">
			<div className="section-head" data-reveal>
				<div className="meta-col">
					<span className="num">&mdash; 04 / Project Types</span>
					<span className="lbl">Eight product categories</span>
				</div>
				<div>
					<h2>
						Every product <span className="gold it">category</span> a developer
						launches.
					</h2>
					<p className="lede">
						From district-scale masterplans to a single sales-gallery hero shot
						— the studio handles the full breadth of a real estate portfolio.
					</p>
				</div>
			</div>

			<div className="types-grid">
				{sorted.map((type, idx) => {
					const variant = type.visualVariant ?? 'pt-master';
					return (
						<article className="type-cell" data-reveal key={idx}>
							{type.numberLabel ? (
								<div className="type-num">{type.numberLabel}</div>
							) : null}
							<div
								className={`type-visual ${variant}`}
								aria-hidden="true"
							></div>
							<h4>{type.title}</h4>
							<p>{type.description}</p>
						</article>
					);
				})}
			</div>
		</section>
	);
}
