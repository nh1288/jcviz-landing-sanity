/**
 * Services — 4 service cards in a 2-col grid.
 *
 * Each card uses a CSS gradient placeholder (.ph + .ph-{variant}) plus an
 * inline SVG silhouette so the layout looks composed before any real
 * imagery is uploaded. Real images can replace the placeholder later.
 */

import type { Service } from '@/lib/types';

type ServicesProps = {
	items: Service[];
};

export function Services({ items }: ServicesProps) {
	const sorted = [...items].sort((a, b) => a.order - b.order);

	return (
		<section className="block services-section" id="services">
			<div className="section-head" data-reveal>
				<div className="meta-col">
					<span className="num">&mdash; 02 / Services</span>
					<span className="lbl">Four disciplines · One studio</span>
				</div>
				<div>
					<h2>
						Imagery that sells <span className="gold it">before</span> ground is
						broken.
					</h2>
					<p className="lede">
						We work with developers, marketing teams, sales teams and
						architectural partners to translate plans, models and intent into
						images that move. Cinematic. Editorial. Commercially relentless.
					</p>
				</div>
			</div>

			<div className="services">
				{sorted.map((service, idx) => {
					const visual = service.visualVariant ?? 'master';
					return (
						<article className="service" data-reveal key={idx}>
							<div className="visual">
								<div className={`ph ph-${visual}`}>
									<ServiceSilhouette />
								</div>
								{service.tagLabel ? (
									<span className="tag">{service.tagLabel}</span>
								) : null}
							</div>
							<div className="body">
								<h3>
									{service.title}
									{service.accent ? (
										<>
											{' '}
											<span className="gold it">{service.accent}</span>
										</>
									) : null}
								</h3>
								<p>{service.description}</p>
							</div>
							{service.chips && service.chips.length > 0 ? (
								<div className="deliv">
									{service.chips.map((chip, ci) => (
										<span className="chip" key={ci}>
											{chip}
										</span>
									))}
								</div>
							) : null}
						</article>
					);
				})}
			</div>
		</section>
	);
}

function ServiceSilhouette() {
	return (
		<svg
			className="ph-svg"
			viewBox="0 0 800 500"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
		>
			<g
				fill="rgba(212,177,115,.18)"
				stroke="rgba(212,177,115,.5)"
				strokeWidth="0.6"
			>
				<rect x="120" y="200" width="80" height="180" />
				<rect x="220" y="160" width="120" height="220" />
				<rect x="360" y="220" width="100" height="160" />
				<rect x="480" y="140" width="140" height="240" />
				<rect x="640" y="200" width="100" height="180" />
			</g>
			<g fill="rgba(212,177,115,.45)">
				<rect x="240" y="190" width="80" height="2" />
				<rect x="240" y="240" width="80" height="2" />
				<rect x="240" y="290" width="80" height="2" />
				<rect x="240" y="340" width="80" height="2" />
				<rect x="500" y="170" width="100" height="2" />
				<rect x="500" y="220" width="100" height="2" />
				<rect x="500" y="270" width="100" height="2" />
				<rect x="500" y="320" width="100" height="2" />
			</g>
			<line
				x1="0"
				y1="380"
				x2="800"
				y2="380"
				stroke="rgba(212,177,115,.4)"
				strokeWidth="0.6"
			/>
		</svg>
	);
}
