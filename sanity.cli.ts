/**
 * Sanity CLI config — read by `sanity` command-line tool.
 * The values come from .env.local at runtime; do not hard-code them here.
 */

import { defineCliConfig } from 'sanity/cli';
import { dataset, projectId } from './sanity/env';

export default defineCliConfig({
	api: { projectId, dataset },
});
