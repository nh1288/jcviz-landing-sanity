/**
 * Final CTA — closing call-to-action.
 */

import { Button } from '@/components/ui/Button';
import type { FinalCtaData } from '@/lib/types';

type FinalCtaProps = {
	data: FinalCtaData;
};

export function FinalCta({ data }: FinalCtaProps) {
	const h = data.headline;

	return (
		<section className="cta-final" id="contact">
			<div className="bg" aria-hidden="true"></div>
			<div className="content" data-reveal>
				{data.eyebrow ? (
					<div className="eyebrow">{data.eyebrow}</div>
				) : null}
				<h2>
					{h.partA}
					{h.accentA ? (
						<>
							{' '}
							<span className="gold it">{h.accentA}</span>
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
							{h.partB ? '' : <br />}{' '}
							<span className="gold it">{h.accentB}</span>
						</>
					) : null}
					{h.suffix ?? ''}
				</h2>
				{data.body ? <p>{data.body}</p> : null}
				<div className="actions">
					<Button cta={data.primaryCta} variant="gold" />
					<Button cta={data.secondaryCta} variant="ghost" arrow={false} />
				</div>
			</div>
		</section>
	);
}
