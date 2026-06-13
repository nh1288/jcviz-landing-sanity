# CHANGELOG - JCVIZ Landing Page

## [2026-06-13] Them section Studio / Team (CMS-backed)
- Section moi "Studio" (the people behind the frames) chen giua Portfolio va Final CTA, route `/` id `#studio`.
- CMS-backed day du: singleton `studioSection` (so + tagline + headline + paragraphs) + collection `teamMember` (name, role, focus, portrait, order, visible). Admin sua qua /studio.
- Portrait optional -> fallback monogram gold tu initials (giong placeholder cua portfolio/projectType).
- Tang tich hop: lib/types.ts (StudioData + TeamMember) · fallbackContent (1 studio + 4 member mau) · sanity schema (2 file moi + index + singleton enforcement) · queries (STUDIO_SECTION + TEAM_MEMBERS) · getLandingContent (fetch + fallback buildStudio) · component Studio.tsx · globals.css (.studio-roster grid 4/2/1 + monogram) · seed-sanity.ts (studio + team seedable).
- Visual giu nguyen brand cinematic dark editorial (Cormorant + JetBrains Mono + gold), reuse .section-head + data-reveal.
- Verify: tsc --noEmit pass; dev server `/` + `/studio` HTTP 200, render section + roster + monogram, khong loi compile. (next build local van skip vi exFAT.)
- CHUA push -> chua deploy production (cho user OK). Neu seed lai noi dung: chay `npm run seed:sanity`.

## [2026-05-30] SEO / a11y / security quick wins (audit Nhom 1)
- SEO: them metadataBase, canonical, day du Open Graph + Twitter card.
- OG image: them public/og-default.png (branded dark-premium 1200x630) lam fallback; anh Sanity (seo.ogImageUrl) van uu tien khi co.
- Favicon: them public/icon.svg + metadata.icons (truoc day tab trinh duyet trong).
- SEO crawl: them public/robots.txt (chan /studio, /api) + public/sitemap.xml.
- A11y: them :focus-visible (gold ring) cho moi element tuong tac.
- Mobile: fix marquee bi vo o <=640px (scale font/gap).
- Security: them security headers trong next.config.mjs (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS). Chua bat CSP (Studio can inline script — can lam rieng).
- Verify: tsc --noEmit pass; dev server render dung <head> + phuc vu static assets 200. (Luu y: `next build` local KHONG chay duoc vi o D: la exFAT -> readlink fail; Vercel/Linux build binh thuong.)
- KHONG dung: Sanity schema (imageWithAlt .warning->.error van pending, can xac nhan).

## [Migration 2026-05-30]
Chuyen workspace tu D:\00 ANTIGRAVITY\04.JCVIZ Landing Page -> D:\JCVIZ-AI\JCVIZ-WEB.
WP theme cu + backup chuyen sang _legacy-wordpress\ (cold storage).
Production (Vercel/GitHub) khong doi.

## [History]
Migration WordPress theme -> Next.js + Sanity CMS. 35 docs seeded.
Webhook revalidation live (<8s). Routes / + /studio HTTP 200.
