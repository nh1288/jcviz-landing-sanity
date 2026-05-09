/**
 * Portfolio preview — 6-cell editorial gallery.
 *
 * Each cell uses one of the 6 grid spans (g-1..g-6) and either shows
 * an uploaded image or falls back to the gradient placeholder defined
 * by `placeholderVariant`.
 */

import type { PortfolioItem } from '@/lib/types';

type PortfolioPreviewProps = {
	items: PortfolioItem[];
};

export function PortfolioPreview({ items }: PortfolioPreviewProps) {
	const sorted = [...items].sort((a, b) => a.order - b.order);

	return (
		<section
			className="block portfolio-section"
			id="portfolio"
			style={{ paddingTop: 0 }}
		>
			<div className="section-head" data-reveal>
				<div className="meta-col">
					<span className="num">&mdash; 06 / Selected Frames</span>
					<span className="lbl">Reel 2024 &mdash; 2026</span>
				</div>
				<div>
					<h2>
						An <span className="gold it">image library</span> built one frame at
						a time.
					</h2>
					<p className="lede">
						Each frame is composed, lit and graded the way a film is. Below — a
						small selection from recent campaigns. Full case studies under NDA
						available on request.
					</p>
				</div>
			</div>

			<div className="gallery">
				{sorted.map((item, idx) => {
					const span = item.gridSpan ?? 'g-1';
					const placeholder = item.placeholderVariant ?? 'ph-master';
					const bgStyle: React.CSSProperties | undefined = item.image
						? {
								backgroundImage: `url(${item.image.src})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}
						: undefined;
					return (
						<div className={`g-item ${span}`} data-reveal key={idx}>
							<div
								className={`ph ${placeholder}`}
								style={bgStyle}
								aria-label={item.image?.alt}
							></div>
							<div className="label">
								<span className="ti">{item.title}</span>
								{item.subLabel ? (
									<span className="sub">{item.subLabel}</span>
								) : null}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
