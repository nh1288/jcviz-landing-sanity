/**
 * Positioning — manifesto statement followed by a positioning detail.
 *
 * Manifesto segments carry a `tone` (`normal` / `dim` / `gold`) so each
 * word can be marked editorially. The CSS classes `.dim` and `.gold`
 * (with `.it` for italic) come from globals.css.
 */

import { Fragment } from 'react';

import type { PositioningData } from '@/lib/types';

type PositioningProps = {
	data: PositioningData;
};

export function Positioning({ data }: PositioningProps) {
	const headline = data.detailHeadline;

	return (
		<>
			<section className="intro-state" id="positioning" data-reveal>
				<div className="story-glow" aria-hidden="true"></div>
				<div className="wrap">
					{data.manifestoNumber ? (
						<div className="num">{data.manifestoNumber}</div>
					) : null}
					<p>
						{data.manifestoLines.map((line, lineIdx) => (
							<Fragment key={lineIdx}>
								{line.segments.map((seg, segIdx) => {
									if (seg.tone === 'normal') {
										return (
											<Fragment key={segIdx}>{seg.text}</Fragment>
										);
									}
									return (
										<span
											key={segIdx}
											className={seg.tone === 'gold' ? 'gold' : 'dim'}
										>
											{seg.text}
										</span>
									);
								})}
								{lineIdx < data.manifestoLines.length - 1 ? <br /> : null}
							</Fragment>
						))}
					</p>
				</div>
			</section>

			{headline || data.detailParagraphs.length > 0 ? (
				<section className="positioning-detail" data-reveal>
					<div className="positioning-detail-wrap">
						<div className="positioning-meta">
							{data.detailEyebrow ? (
								<span className="eyebrow gold-text">{data.detailEyebrow}</span>
							) : null}
						</div>
						<div className="positioning-body">
							{headline ? (
								<h2 className="display">
									{headline.partA}
									{headline.accentA ? (
										<>
											{' '}
											<span className="gold it">{headline.accentA}</span>
										</>
									) : null}
									{headline.partB ? <> {headline.partB}</> : null}
									{headline.accentB ? (
										<>
											{' '}
											<span className="gold it">{headline.accentB}</span>
										</>
									) : null}
									{headline.suffix ?? ''}
								</h2>
							) : null}
							<div className="positioning-cols">
								{data.detailParagraphs.map((p, i) => (
									<p key={i} className="body-lg">
										{p}
									</p>
								))}
							</div>
						</div>
					</div>
				</section>
			) : null}
		</>
	);
}
