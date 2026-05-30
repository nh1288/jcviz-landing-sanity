/**
 * Feature Project — full-width project-opener / cover spread (Phase 1).
 *
 * A full-bleed cinematic section (not a boxed container): top labels pinned
 * to the top, a large headline bottom-left, client/scope/year/location meta
 * bottom-right, with a faint architectural massing placeholder behind.
 * Content is hardcoded for concept review; a CMS-backed version is a planned
 * follow-up. Static -> server component.
 */

export function FeatureProject() {
	return (
		<section className="feature-project" id="feature-project" data-reveal>
			<div className="fp-bg" aria-hidden="true" />

			<div className="fp-inner">
				<div className="fp-top">
					<span className="fp-label">Feature Project / 001</span>
					<span className="fp-reel">Real Estate Visual Reel &middot; 2026</span>
				</div>

				<div className="fp-body">
					<h2 className="fp-headline display">
						The <span className="gold it">Crescent Bay</span>
						<br />
						Masterplan — a
						<br />
						<span className="gold it">142-hectare</span>
						<br />
						riverside
						<br />
						township.
					</h2>

					<dl className="fp-meta">
						<div className="fp-meta-row">
							<dt>Client</dt>
							<dd>Confidential Real Estate Developer</dd>
						</div>
						<div className="fp-meta-row">
							<dt>Scope</dt>
							<dd>Masterplan &middot; Still Images &middot; Brand Film</dd>
						</div>
						<div className="fp-meta-row">
							<dt>Year</dt>
							<dd>2025 — 2026</dd>
						</div>
						<div className="fp-meta-row">
							<dt>Location</dt>
							<dd>Việt Nam</dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	);
}
