/**
 * Phase 4.5 admin-workflow probe — simulates "editor edits in Studio +
 * Publish" via the Sanity API, verifies the change reaches the dataset,
 * then reverts to the exact original value.
 *
 * Reads use `useCdn: false` for instant ground-truth (no edge cache lag).
 * The actual landing page renders through the CDN client — that path was
 * verified end-to-end in Phase 4. Here we focus on:
 *
 *   - hero subheadline edit + revert
 *   - service visible toggle (filter logic on the public side)
 *   - service order change (sort logic on the public side)
 *
 * Every test captures the original value before mutating, and asserts
 * the original is restored after the revert. Exit non-zero on any
 * mismatch so the report surfaces failures cleanly.
 */

import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-12-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
	console.error(
		'❌ Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, ' +
			'NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN in .env.local.',
	);
	process.exit(1);
}

const write = createClient({
	projectId,
	dataset,
	apiVersion,
	token,
	useCdn: false,
});

const read = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
});

let failures = 0;

function ok(label: string) {
	console.log(`  ✓ ${label}`);
}
function fail(label: string, detail?: unknown) {
	failures++;
	console.error(`  ✗ ${label}`);
	if (detail !== undefined) console.error(`    detail:`, detail);
}
function assertEqual<T>(label: string, actual: T, expected: T): boolean {
	const passes = JSON.stringify(actual) === JSON.stringify(expected);
	if (passes) ok(label);
	else fail(label, { actual, expected });
	return passes;
}

async function testHeroSubheadline() {
	console.log('\n[2] hero subheadline edit + revert');
	const original = await read.fetch<string | null>(
		`*[_id == "heroSection"][0].subheadline`,
	);
	if (typeof original !== 'string') {
		fail('precondition: hero subheadline must be a string', original);
		return;
	}

	const probe = `[ADMIN-TEST ${Date.now()}] short edit probe.`;
	await write.patch('heroSection').set({ subheadline: probe }).commit();
	const after = await read.fetch<string | null>(
		`*[_id == "heroSection"][0].subheadline`,
	);
	assertEqual('Sanity reflects edit', after, probe);

	await write.patch('heroSection').set({ subheadline: original }).commit();
	const reverted = await read.fetch<string | null>(
		`*[_id == "heroSection"][0].subheadline`,
	);
	assertEqual('Sanity reflects revert', reverted, original);
}

async function testServiceVisible() {
	console.log('\n[4] service visible toggle');
	const targetId = 'service-real-estate-product';

	const exists = await read.fetch<boolean>(
		`count(*[_id == $id]) > 0`,
		{ id: targetId },
	);
	if (!exists) {
		fail(`precondition: ${targetId} must exist`);
		return;
	}

	const baselineCount = await read.fetch<number>(
		`count(*[_type == "service" && visible != false])`,
	);
	if (baselineCount !== 4) {
		fail('precondition: visible service count should be 4', baselineCount);
		return;
	}

	await write.patch(targetId).set({ visible: false }).commit();
	const hiddenCount = await read.fetch<number>(
		`count(*[_type == "service" && visible != false])`,
	);
	assertEqual('hidden — visible service count drops to 3', hiddenCount, 3);

	await write.patch(targetId).set({ visible: true }).commit();
	const restoredCount = await read.fetch<number>(
		`count(*[_type == "service" && visible != false])`,
	);
	assertEqual('restored — visible service count back to 4', restoredCount, 4);
}

async function testProcessOrder() {
	console.log('\n[5] process step order change');
	const targetId = 'process-step-03';

	const original = await read.fetch<{ order: number; title: string } | null>(
		`*[_id == $id][0]{order, title}`,
		{ id: targetId },
	);
	if (!original || typeof original.order !== 'number') {
		fail('precondition: process-step-03 must exist with an order', original);
		return;
	}

	await write.patch(targetId).set({ order: 99 }).commit();
	const movedTitle = await read.fetch<string | null>(
		`*[_type == "processStep" && visible != false] | order(order asc)[-1].title`,
	);
	assertEqual('moved — last step is now the bumped one', movedTitle, original.title);

	await write.patch(targetId).set({ order: original.order }).commit();
	const restoredTitle = await read.fetch<string | null>(
		`*[_type == "processStep" && visible != false] | order(order asc)[2].title`,
	);
	assertEqual(
		'restored — original order restored at index 2 (3rd step)',
		restoredTitle,
		original.title,
	);
}

async function main() {
	console.log(
		`\n→ Probing admin workflow on dataset "${dataset}" / project "${projectId}"`,
	);
	await testHeroSubheadline();
	await testServiceVisible();
	await testProcessOrder();

	if (failures > 0) {
		console.error(`\n✗ ${failures} assertion(s) failed.\n`);
		process.exit(1);
	}
	console.log('\n✓ All admin workflow probes passed. Dataset is back to baseline.\n');
}

main().catch((error) => {
	console.error('\n❌ Probe crashed:\n', error);
	process.exit(1);
});
