/**
 * Studio — the people behind the frames (editorial portrait roster).
 *
 * Intro reuses the shared `section-head` pattern; the roster is a 4-up
 * portrait grid. Until a portrait is uploaded via Studio, each member
 * falls back to a gold monogram built from their initials. Static data
 * shape (Sanity-backed) -> server component.
 */

import type { StudioData, TeamMember } from '@/lib/types';

type StudioProps = {
	data: StudioData;
	team: TeamMember[];
};

function initials(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return '·';
	const first = parts[0][0] ?? '';
	const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
	return (first + last).toUpperCase();
}

export function Studio({ data, team }: StudioProps) {
	const sorted = [...team].sort((a, b) => a.order - b.order);
	const h = data.headline;

	return (
		<section className="studio-section block" id="studio">
			<div className="section-head" data-reveal>
				<div className="meta-col">
					<span className="num">{data.sectionNumber ?? '— Studio'}</span>
					{data.tagline ? <span className="lbl">{data.tagline}</span> : null}
				</div>
				<div>
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
								{' '}
								{h.partB}
							</>
						) : null}
						{h.accentB ? (
							<>
								{' '}
								<span className="gold it">{h.accentB}</span>
							</>
						) : null}
						{h.suffix ?? ''}
					</h2>
					{data.paragraphs.map((p, i) => (
						<p className="lede" key={i}>
							{p}
						</p>
					))}
				</div>
			</div>

			<div className="studio-roster">
				{sorted.map((member, idx) => (
					<article className="studio-card" data-reveal key={idx}>
						<div className="studio-portrait">
							{member.image?.src ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={member.image.src}
									alt={member.image.alt || member.name}
									loading="lazy"
								/>
							) : (
								<span className="studio-monogram" aria-hidden="true">
									{initials(member.name)}
								</span>
							)}
							<span className="studio-index mono">
								{String(idx + 1).padStart(2, '0')}
							</span>
						</div>
						<div className="studio-card-body">
							{member.role ? (
								<span className="eyebrow gold-text">{member.role}</span>
							) : null}
							<h4>{member.name}</h4>
							{member.focus ? <p>{member.focus}</p> : null}
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
