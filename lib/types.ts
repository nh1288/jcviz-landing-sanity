/**
 * Shared content types — used by section components and matched by the
 * Sanity GROQ queries we'll wire up in Phase 4.
 *
 * Keeping these in `lib/` rather than `sanity/` so components don't have
 * to know they're talking to Sanity. The data layer (Sanity client +
 * queries) lives under `sanity/lib/` and returns objects of these shapes.
 */

export type CtaMode = 'url' | 'mailto' | 'tel';

export type Cta = {
	label: string;
	mode: CtaMode;
	href: string;
};

export type HeadlineWithAccent = {
	partA: string;
	accentA?: string;
	partB?: string;
	accentB?: string;
	suffix?: string;
};

export type ImageWithAlt = {
	src: string;
	alt: string;
	caption?: string;
};

export type NavItem = {
	label: string;
	href: string;
};

export type FooterColumn = {
	heading: string;
	links: NavItem[];
};

export type SiteSettings = {
	siteTitle: string;
	tagline?: string;
	brandName: string;
	brandSub?: string;
	navItems: NavItem[];
	footerDescription?: string;
	footerColumns: FooterColumn[];
};

export type HeroData = {
	eyebrow?: string;
	headline: HeadlineWithAccent;
	subheadline?: string;
	primaryCta?: Cta;
	secondaryCta?: Cta;
	topMeta?: {
		studioLocation?: string;
		studioBuilding?: string;
		reelLabel?: string;
		reelVolume?: string;
	};
	marqueeAriaLabel?: string;
	marqueeItems: string[];
	scrollText?: string;
	creditsText?: string;
};

export type ManifestoTone = 'normal' | 'dim' | 'gold';

export type ManifestoSegment = {
	text: string;
	tone: ManifestoTone;
};

export type ManifestoLine = {
	segments: ManifestoSegment[];
};

export type PositioningData = {
	manifestoNumber?: string;
	manifestoLines: ManifestoLine[];
	detailEyebrow?: string;
	detailHeadline?: HeadlineWithAccent;
	detailParagraphs: string[];
};

export type ServiceVisual = 'master' | 'apt' | 'land' | 'camp';

export type Service = {
	title: string;
	accent?: string;
	description: string;
	chips?: string[];
	tagLabel?: string;
	visualVariant?: ServiceVisual;
	image?: ImageWithAlt;
	order: number;
};

export type ValuePoint = {
	eyebrow?: string;
	title: string;
	description: string;
	order: number;
};

export type ProjectTypeVisual =
	| 'pt-master'
	| 'pt-mixed'
	| 'pt-villa'
	| 'pt-shop'
	| 'pt-apt'
	| 'pt-resort'
	| 'pt-land'
	| 'pt-club';

export type ProjectType = {
	title: string;
	numberLabel?: string;
	description: string;
	visualVariant?: ProjectTypeVisual;
	image?: ImageWithAlt;
	order: number;
};

export type ProcessStep = {
	roman?: string;
	title: string;
	description: string;
	duration?: string;
	order: number;
};

export type GridSpan = 'g-1' | 'g-2' | 'g-3' | 'g-4' | 'g-5' | 'g-6';

export type PortfolioPlaceholder =
	| 'ph-master'
	| 'ph-villa'
	| 'ph-shop'
	| 'ph-apt'
	| 'ph-land'
	| 'ph-camp';

export type PortfolioItem = {
	title: string;
	subLabel?: string;
	image?: ImageWithAlt;
	placeholderVariant?: PortfolioPlaceholder;
	gridSpan?: GridSpan;
	order: number;
};

export type FinalCtaData = {
	eyebrow?: string;
	headline: HeadlineWithAccent;
	body?: string;
	primaryCta?: Cta;
	secondaryCta?: Cta;
};

export type StudioData = {
	sectionNumber?: string;
	tagline?: string;
	headline: HeadlineWithAccent;
	paragraphs: string[];
};

export type TeamMember = {
	name: string;
	role: string;
	focus?: string;
	image?: ImageWithAlt;
	order: number;
};

export type ContactInfo = {
	email: string;
	phone: string;
	address: string;
	bookingStatus?: string;
};

export type SeoSettings = {
	defaultTitle: string;
	titleTemplate: string;
	defaultDescription: string;
	ogImageUrl?: string;
	twitterHandle?: string;
	robots?: string;
};

export type LandingContent = {
	site: SiteSettings;
	hero: HeroData;
	positioning: PositioningData;
	services: Service[];
	valuePoints: ValuePoint[];
	projectTypes: ProjectType[];
	processSteps: ProcessStep[];
	portfolioItems: PortfolioItem[];
	studio: StudioData;
	team: TeamMember[];
	finalCta: FinalCtaData;
	contact: ContactInfo;
	seo: SeoSettings;
};
