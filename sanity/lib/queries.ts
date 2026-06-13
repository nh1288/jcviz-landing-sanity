/**
 * GROQ queries for the JCVIZ landing.
 *
 * Each query targets one schema type and projects only the fields the
 * landing page actually consumes. Image fields are flattened into
 * { src, alt, caption } so they slot directly into ImageWithAlt.
 *
 * Fragments are inlined as template literals — kept here so the GROQ
 * the runtime sends matches what's in the file 1:1 (easier to debug
 * with `groq` CLI or Sanity Vision tool).
 */

const HEADLINE_FRAGMENT = `{
	partA, accentA, partB, accentB, suffix
}`;

const CTA_FRAGMENT = `{
	label, mode, href
}`;

const IMAGE_FRAGMENT = `{
	"src": asset->url,
	alt,
	caption
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
	siteTitle,
	tagline,
	brandName,
	brandSub,
	navItems[]{label, href},
	footerDescription,
	footerColumns[]{
		heading,
		links[]{label, href}
	}
}`;

export const HERO_QUERY = `*[_type == "heroSection"][0]{
	eyebrow,
	headline${HEADLINE_FRAGMENT},
	subheadline,
	primaryCta${CTA_FRAGMENT},
	secondaryCta${CTA_FRAGMENT},
	topMeta{studioLocation, studioBuilding, reelLabel, reelVolume},
	marqueeAriaLabel,
	marqueeItems,
	scrollText,
	creditsText
}`;

export const POSITIONING_QUERY = `*[_type == "positioningSection"][0]{
	manifestoNumber,
	manifesto,
	detailEyebrow,
	detailHeadline${HEADLINE_FRAGMENT},
	detailParagraphs
}`;

export const STUDIO_SECTION_QUERY = `*[_type == "studioSection"][0]{
	sectionNumber,
	tagline,
	headline${HEADLINE_FRAGMENT},
	paragraphs
}`;

export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember" && visible != false] | order(orderRank asc, order asc){
	name,
	role,
	focus,
	image${IMAGE_FRAGMENT},
	order
}`;

export const FINAL_CTA_QUERY = `*[_type == "finalCta"][0]{
	eyebrow,
	headline${HEADLINE_FRAGMENT},
	body,
	primaryCta${CTA_FRAGMENT},
	secondaryCta${CTA_FRAGMENT}
}`;

export const CONTACT_INFO_QUERY = `*[_type == "contactInfo"][0]{
	email,
	phone,
	address,
	bookingStatus
}`;

export const SEO_SETTINGS_QUERY = `*[_type == "seoSettings"][0]{
	defaultTitle,
	titleTemplate,
	defaultDescription,
	"ogImageUrl": ogImage.asset->url,
	twitterHandle,
	robots
}`;

export const SERVICES_QUERY = `*[_type == "service" && visible != false] | order(orderRank asc, order asc){
	title,
	accent,
	description,
	chips,
	tagLabel,
	visualVariant,
	image${IMAGE_FRAGMENT},
	order
}`;

export const VALUE_POINTS_QUERY = `*[_type == "valuePoint" && visible != false] | order(orderRank asc, order asc){
	eyebrow,
	title,
	description,
	order
}`;

export const PROJECT_TYPES_QUERY = `*[_type == "projectType" && visible != false] | order(orderRank asc, order asc){
	title,
	numberLabel,
	description,
	visualVariant,
	image${IMAGE_FRAGMENT},
	order
}`;

export const PROCESS_STEPS_QUERY = `*[_type == "processStep" && visible != false] | order(orderRank asc, order asc){
	roman,
	title,
	description,
	duration,
	order
}`;

export const PORTFOLIO_ITEMS_QUERY = `*[_type == "portfolioItem" && visible != false] | order(orderRank asc, order asc){
	title,
	subLabel,
	image${IMAGE_FRAGMENT},
	placeholderVariant,
	gridSpan,
	order
}`;
