/**
 * Feature Project — editorial case-study block (Phase 1, hardcoded).
 *
 * Replaces the old positioning-detail copy with a "feature project" panel:
 * top labels, a large headline, and a client/scope/year/location meta column.
 * Content is intentionally hardcoded for concept review — a CMS-backed
 * version (new Sanity fields) is a planned follow-up phase.
 *
 * Static content -> server component (no client JS).
 */

export function FeatureProject() {
	return (
		<section className="feature-project block" id="feature-project" data-reveal>
			<div className="fp-top">
				<span className="fp-label">Feature Project / 001</span>
				<span className="fp-reel">Real Estate Visual Reel &middot; 2026</span>
			</div>

			<div className="fp-wrap">
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
		</section>
	);
}
