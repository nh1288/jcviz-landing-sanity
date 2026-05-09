/**
 * Footer — brand block, three link columns, giant JCVIZ wordmark, and bottom strip.
 */

import type { ContactInfo, SiteSettings } from '@/lib/types';

type FooterProps = {
	site: SiteSettings;
	contact: ContactInfo;
};

export function Footer({ site, contact }: FooterProps) {
	const phoneTel = `tel:${contact.phone.replace(/\s+/g, '')}`;
	const addressLines = contact.address.split('\n');

	return (
		<footer className="foot" id="contact-footer">
			<div className="foot-top">
				<div className="col brand">
					<div className="name">{site.brandName}</div>
					{site.footerDescription ? (
						<p className="desc">{site.footerDescription}</p>
					) : null}
					<address>
						{addressLines.map((line, i) => (
							<span key={i}>
								{line}
								{i < addressLines.length - 1 ? <br /> : null}
							</span>
						))}
						<br />
						Tel ·{' '}
						<a href={phoneTel}>{contact.phone}</a>
						<br />
						<a href={`mailto:${contact.email}`}>{contact.email}</a>
					</address>
				</div>

				{site.footerColumns.map((col) => (
					<div className="col" key={col.heading}>
						<h5>{col.heading}</h5>
						<ul>
							{col.links.map((link) => (
								<li key={link.label + link.href}>
									<a href={link.href}>{link.label}</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="foot-mark" aria-hidden="true">
				{site.brandName}
			</div>

			<div className="foot-bot">
				<span>
					&copy; {new Date().getFullYear()} {site.brandName} &middot; All Imagery
					Rendered In-house
				</span>
				<span>{site.tagline ?? 'Architectural Visualization · Hanoi'}</span>
			</div>
		</footer>
	);
}
