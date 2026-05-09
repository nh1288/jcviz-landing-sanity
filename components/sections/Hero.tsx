/**
 * Hero — cinematic dark-burgundy with breathing amber bloom.
 *
 * Atmospheric layers (bloom, haze, grid lines, diagonal pattern, motes,
 * grain, vignette) are static markup; CSS keyframes drive the animation.
 * Motes spawn + mouse parallax come from <ScrollFx /> mounted higher up.
 *
 * The marquee strip below the hero is rendered here so the ARIA label
 * sits next to the section it announces.
 */

import { Button } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import type { HeroData } from '@/lib/types';

type HeroProps = {
	data: HeroData;
};

export function Hero({ data }: HeroProps) {
	const h = data.headline;
	const meta = data.topMeta;

	return (
		<>
			<section className="hero" id="hero">
				<div className="hero-media">
					<div className="frame"></div>
					<div className="haze"></div>
					<div className="bloom"></div>
					<div className="bloom b2"></div>
					<div className="bloom b3"></div>
					<div className="horizon"></div>
					<div className="hero-grid-lines"></div>
					<div className="hero-diag"></div>
					<div className="motes" id="motes"></div>
				</div>
				<div className="hero-scrim"></div>
				<div className="hero-grain"></div>
				<div className="hero-vignette"></div>

				{meta ? (
					<div className="hero-top-meta">
						<div className="col">
							{meta.studioLocation ? <span>{meta.studioLocation}</span> : null}
							{meta.studioBuilding ? (
								<span className="v">{meta.studioBuilding}</span>
							) : null}
						</div>
						<div className="col" style={{ textAlign: 'right' }}>
							{meta.reelLabel ? <span>{meta.reelLabel}</span> : null}
							{meta.reelVolume ? (
								<span className="v">{meta.reelVolume}</span>
							) : null}
						</div>
					</div>
				) : null}

				<div className="hero-content">
					<div className="hero-grid">
						<div>
							{data.eyebrow ? (
								<div className="hero-tag">
									<span className="ln"></span>
									<span className="eyebrow">{data.eyebrow}</span>
								</div>
							) : null}

							<h1 className="display">
								{h.partA}
								{h.accentA ? (
									<>
										{' '}
										<span className="gold">{h.accentA}</span>
									</>
								) : null}
								{h.partB ? (
									<>
										<br />
										{h.partB}
									</>
								) : null}
								{h.accentB ? (
									<>
										{' '}
										<span className="gold">{h.accentB}</span>
									</>
								) : null}
								{h.suffix ?? ''}
							</h1>

							<div className="hero-actions">
								<Button cta={data.primaryCta} variant="gold" />
								<Button cta={data.secondaryCta} variant="ghost" arrow={false} />
							</div>
						</div>

						<div className="hero-meta-r">
							{meta?.reelLabel ? (
								<span className="eyebrow gold-text">
									&mdash; {meta.reelLabel}
								</span>
							) : null}
							{data.subheadline ? <p>{data.subheadline}</p> : null}
						</div>
					</div>
				</div>

				<div className="hero-foot">
					<div className="scroll">
						<span>Scroll</span>
						<span className="ln"></span>
						<span>{data.scrollText ?? 'Selected Works'}</span>
					</div>
					<div className="credits">
						{data.creditsText ?? '© JCVIZ · All Imagery'}
					</div>
				</div>
			</section>

			<Marquee
				items={data.marqueeItems}
				ariaLabel={data.marqueeAriaLabel ?? 'Who we work with'}
			/>
		</>
	);
}
