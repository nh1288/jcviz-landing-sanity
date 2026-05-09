/**
 * Manifesto ↔ Portable Text conversion.
 *
 * The Sanity schema stores the positioning manifesto as Portable Text
 * with two custom decorators (`dim`, `gold`). The frontend wants a
 * structured `ManifestoLine[]` shape so each segment can be rendered
 * with the matching CSS class. These helpers translate both ways:
 *
 *   manifestoLinesToPortableText  — used by the seed script (write).
 *   portableTextToManifestoLines  — used by the fetch helper (read).
 */

import type { ManifestoLine, ManifestoTone } from '@/lib/types';

type PortableTextSpan = {
	_type: 'span';
	_key: string;
	text: string;
	marks: string[];
};

type PortableTextBlock = {
	_type: 'block';
	_key: string;
	style: 'normal';
	markDefs: never[];
	children: PortableTextSpan[];
};

export function manifestoLinesToPortableText(
	lines: ManifestoLine[],
): PortableTextBlock[] {
	return lines.map((line, lineIdx) => ({
		_type: 'block',
		_key: `manifesto-block-${lineIdx}`,
		style: 'normal',
		markDefs: [],
		children: line.segments.map((seg, segIdx) => ({
			_type: 'span',
			_key: `manifesto-block-${lineIdx}-span-${segIdx}`,
			text: seg.text,
			marks: seg.tone === 'normal' ? [] : [seg.tone],
		})),
	}));
}

export function portableTextToManifestoLines(
	pt: unknown,
): ManifestoLine[] {
	if (!Array.isArray(pt)) return [];
	const lines: ManifestoLine[] = [];
	for (const block of pt) {
		if (
			!block ||
			typeof block !== 'object' ||
			(block as { _type?: string })._type !== 'block'
		) {
			continue;
		}
		const children = (block as { children?: unknown[] }).children;
		if (!Array.isArray(children)) {
			lines.push({ segments: [] });
			continue;
		}
		const segments = children
			.filter(
				(c): c is { text?: string; marks?: string[] } =>
					!!c && typeof c === 'object',
			)
			.map((span) => ({
				text: typeof span.text === 'string' ? span.text : '',
				tone: pickTone(span.marks),
			}));
		lines.push({ segments });
	}
	return lines;
}

function pickTone(marks: string[] | undefined): ManifestoTone {
	if (!Array.isArray(marks)) return 'normal';
	if (marks.includes('gold')) return 'gold';
	if (marks.includes('dim')) return 'dim';
	return 'normal';
}
