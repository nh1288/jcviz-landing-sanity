/**
 * Positioning — manifesto statement (Part 1), followed by the Feature
 * Project block (FeatureProject.tsx, hardcoded in Phase 1).
 *
 * Manifesto segments carry a `tone` (`normal` / `dim` / `gold`) so each
 * word can be marked editorially. The CSS classes `.dim` and `.gold`
 * (with `.it` for italic) come from globals.css.
 */

import { Fragment } from 'react';

import { FeatureProject } from '@/components/sections/FeatureProject';
import type { PositioningData } from '@/lib/types';

type PositioningProps = {
	data: PositioningData;
};

export function Positioning({ data }: PositioningProps) {
	return (
		<>
			<section className="intro-state" id="positioning" data-reveal>
				<div className="wrap">
					{data.manifestoNumber ? (
						<div className="num">{data.manifestoNumber}</div>
					) : null}
					<p>
						{data.manifestoLines.map((line, lineIdx) => (
							<Fragment key={lineIdx}>
								{line.segments.map((seg, segIdx) => {
									if (seg.tone === 'normal') {
										return <Fragment key={segIdx}>{seg.text}</Fragment>;
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

			<FeatureProject />
		</>
	);
}
