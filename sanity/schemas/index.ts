/**
 * Schema registry — fed into sanity.config.ts.
 *
 * Order matters: reusable objects (cta, headlineWithAccent, imageWithAlt)
 * must be registered before any document/singleton that consumes them,
 * otherwise Sanity throws "Unknown type" at Studio boot.
 */

import type { SchemaTypeDefinition } from 'sanity';

// Reusable inline objects.
import { cta } from './objects/cta';
import { headlineWithAccent } from './objects/headlineWithAccent';
import { imageWithAlt } from './objects/imageWithAlt';

// Singletons (one document each).
import { contactInfo } from './singletons/contactInfo';
import { finalCta } from './singletons/finalCta';
import { heroSection } from './singletons/heroSection';
import { positioningSection } from './singletons/positioningSection';
import { seoSettings } from './singletons/seoSettings';
import { siteSettings } from './singletons/siteSettings';

// Collections (multiple documents).
import { portfolioItem } from './documents/portfolioItem';
import { processStep } from './documents/processStep';
import { projectType } from './documents/projectType';
import { service } from './documents/service';
import { valuePoint } from './documents/valuePoint';

export const schemaTypes: SchemaTypeDefinition[] = [
	// objects first
	cta,
	headlineWithAccent,
	imageWithAlt,

	// singletons
	siteSettings,
	heroSection,
	positioningSection,
	finalCta,
	contactInfo,
	seoSettings,

	// collections
	service,
	valuePoint,
	projectType,
	processStep,
	portfolioItem,
];
