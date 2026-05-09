# JCVIZ Landing — Next.js + Sanity

Single-page landing for **JCVIZ** (architectural visualization studio in Hanoi). Next.js 15 App Router + Sanity v3 with Studio embedded at `/studio`. On-demand revalidation wired through a Sanity webhook so admin Publishes go live within seconds — no redeploy needed.

| | |
|---|---|
| **Production** | https://jcviz-landing-sanity.vercel.app |
| **Studio (admin)** | https://jcviz-landing-sanity.vercel.app/studio |
| **GitHub** | https://github.com/nh1288/jcviz-landing-sanity |
| **Vercel project** | `jcviz/jcviz-landing-sanity` (team `jcviz`, owner `nh1288`) |
| **Sanity project** | `zuo7iazu` (dataset `production`) |

For non-developer admins: see [ADMIN_GUIDE.md](./ADMIN_GUIDE.md).

---

## 1. Stack

- **Next.js 15** (App Router, RSC, TypeScript) — Node 20+/22+ recommended on Vercel.
- **Sanity v3** — schemas + Studio in the same repo.
- **next-sanity** — `<NextStudio>` mount + GROQ client.
- **@sanity/webhook** — HMAC verification for revalidation route.
- **Pure CSS** — design system ported verbatim from `../jcviz-landing-theme/assets/css/main.css` (no Tailwind, no CSS-in-JS for our own styles; Sanity Studio uses styled-components internally — that's fine).

---

## 2. Project structure

```
jcviz-landing-sanity/
├── app/
│   ├── layout.tsx                    ← root html+body, Google Fonts, metadata defaults
│   ├── globals.css                   ← cinematic design system (546 lines)
│   ├── (site)/
│   │   ├── layout.tsx                ← async; mounts Header + Footer + ScrollFx
│   │   └── page.tsx                  ← async; composes 8 sections + generateMetadata
│   ├── studio/[[...tool]]/           ← embedded Sanity Studio
│   │   ├── layout.tsx
│   │   └── page.tsx                  ← <NextStudio config={config} />
│   └── api/revalidate/
│       └── route.ts                  ← Sanity webhook → revalidateTag('sanity')
├── components/
│   ├── sections/                     ← Hero, Positioning, Services, Value,
│   │                                    ProjectTypes, Process, PortfolioPreview,
│   │                                    FinalCta
│   ├── layout/                       ← Header, Footer, ScrollFx (client)
│   └── ui/                           ← Button, Eyebrow, Marquee
├── sanity/
│   ├── env.ts                        ← assertValue(projectId / dataset / apiVersion)
│   ├── lib/
│   │   ├── client.ts                 ← createClient (useCdn:false, perspective:'published')
│   │   ├── queries.ts                ← 11 GROQ queries with 3 shared fragments
│   │   ├── getLandingContent.ts      ← cache()-wrapped fetch + per-section fallback
│   │   └── portableText.ts           ← manifesto ↔ Portable Text converters
│   └── schemas/
│       ├── singletons/  (siteSettings · heroSection · positioningSection ·
│       │                 finalCta · contactInfo · seoSettings)
│       ├── documents/   (service · valuePoint · projectType · processStep · portfolioItem)
│       ├── objects/     (cta · headlineWithAccent · imageWithAlt)
│       └── index.ts
├── lib/
│   ├── types.ts                      ← shared TS types
│   └── fallbackContent.ts            ← hard-coded copy (resilience + seed source)
├── scripts/
│   ├── seed-sanity.ts                ← idempotent seed (35 docs, deterministic _ids)
│   └── test-admin-workflow.ts        ← Phase 4.5 admin-flow probe
├── public/                           ← static assets (favicon, og-image, etc.)
├── sanity.config.ts                  ← Studio config + singleton enforcement
├── sanity.cli.ts                     ← `sanity` CLI config
└── ADMIN_GUIDE.md                    ← non-dev handoff
```

---

## 3. Environment variables

Three values are required everywhere; one is required only when seeding/admin-probing locally.

| Var | Required at | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID=zuo7iazu` | Vercel (Production), local dev | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET=production` | Vercel (Production), local dev | dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION=2024-12-01` | Vercel (Production), local dev | pinned API version for stable schemas |
| `SANITY_REVALIDATE_SECRET=<random-32-byte-hex>` | Vercel (Production) **only** | HMAC secret for the webhook handler. Same value must be set in Sanity webhook config. **Never commit.** |
| `SANITY_API_WRITE_TOKEN=<editor-token>` | local dev **only** | Required by `npm run seed:sanity` and `scripts/test-admin-workflow.ts`. **Never put on Vercel** — frontend should never write. |
| `SANITY_API_READ_TOKEN` | optional | For preview/draft mode (not used in v1). |

`.env.local.example` is the template. Copy → `.env.local` → fill values from your Sanity dashboard. `.env.local` is gitignored.

**Vercel currently has** (verified via `vercel env ls`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` (Production)
- `NEXT_PUBLIC_SANITY_DATASET` (Production)
- `NEXT_PUBLIC_SANITY_API_VERSION` (Production)
- `SANITY_REVALIDATE_SECRET` (Production)

Preview env vars are not set — preview deployments will read fallback content. Add via Vercel dashboard if you need PR previews to hit Sanity.

---

## 4. Local development

```bash
git clone https://github.com/nh1288/jcviz-landing-sanity.git
cd jcviz-landing-sanity
npm install
cp .env.local.example .env.local
# Fill the 3 NEXT_PUBLIC_ vars from sanity.io/manage; the write token only if seeding.
npm run dev
# → http://localhost:3000      (landing)
# → http://localhost:3000/studio (CMS)
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Next dev server (hot reload, Studio at /studio) |
| `npm run build` | Production build (static + server bundles) |
| `npm run start` | Run a production-built server locally |
| `npm run typecheck` | `tsc --noEmit` — gates CI |
| `npm run lint` | `next lint` |
| `npm run seed:sanity` | Idempotent seed of all 35 documents from `lib/fallbackContent.ts`. Requires `SANITY_API_WRITE_TOKEN` in `.env.local`. Deterministic `_id`s — re-running replaces, never duplicates. |

---

## 5. Re-seeding content

Sanity already has 35 documents. To reset everything to the canonical fallback content:

```bash
npm run seed:sanity
```

This won't delete existing documents — it `createOrReplace`s by deterministic `_id`. Documents added by hand in Studio with different IDs (extra services, portfolio items, etc.) will remain. To wipe and reseed, manually delete those in Studio first.

---

## 6. On-demand revalidation (how the webhook works)

```
Sanity Studio (admin Publish)
  → Sanity webhook: POST /api/revalidate
                    Header: sanity-webhook-signature: t=<ms>,v1=<base64url-hmac>
  → Vercel runs route.ts:
     1. Read SANITY_REVALIDATE_SECRET from env
     2. Verify signature via @sanity/webhook isValidSignature
     3. revalidateTag('sanity') + revalidatePath('/')
     4. Respond 200 { revalidated: true, now: <ts> }
  → Next request to /:
     - All cached fetches with tag 'sanity' purged
     - getLandingContent() refetches from Sanity API
     - Server component re-renders with fresh data
```

The Sanity webhook is configured at https://www.sanity.io/manage/personal/project/zuo7iazu/api → Webhooks → `Vercel Revalidate`.

End-to-end latency observed in Phase 5C: **< 8 seconds** between Publish and `/` reflecting the change.

---

## 7. Deployment

The Vercel project is wired to GitHub. Pushes to `main` auto-deploy to Production. PRs (when added) get Preview deploys. No manual `vercel deploy` needed for normal flow.

When env vars change, **a redeploy is required** for new values to take effect at runtime — Vercel does not auto-redeploy on env changes. Easiest: empty commit + push, or `vercel deploy --prod --force` from local.

---

## 8. Production cleanup status (as of Phase 5D)

| Item | Status | Notes |
|---|---|---|
| `/` HTTP 200 | ✅ | 71 KB, ~0.3s warm |
| `/studio` HTTP 200 | ✅ | 12 KB Studio shell |
| `/api/revalidate` | ✅ | GET 405, POST signed 200, POST unsigned 401 |
| `<title>` / `<meta description>` | ✅ | wired via `generateMetadata` from `seoSettings` |
| Twitter card meta | ✅ | `summary_large_image` + `@jcviz` |
| Robots meta | ✅ | `index, follow` |
| Mobile responsive | ✅ | media queries at 1100px and 640px breakpoints |
| **Favicon** | ⚠️ Missing | `/favicon.ico` returns 404. Add via **Studio → Site Settings → Favicon** (32×32 or 64×64) OR drop a `public/favicon.ico` into the repo. |
| **OG image** | ⚠️ Missing | `seoSettings.ogImage` not set in Sanity. Without it, Facebook/LinkedIn previews show no image. Upload via **Studio → SEO Settings → OG image** (1200×630 JPEG/PNG). |
| **Title doubling** | ⚠️ Cosmetic | Current rendered title is `JCVIZ — Architectural Visualization for Real Estate \| JCVIZ` (template `%s \| JCVIZ` appended to a value that already contains "JCVIZ"). Fix in **Studio → SEO Settings → Default page title** by removing the trailing "JCVIZ" — the template will add it. |

---

## 9. Custom domain (when ready)

To switch from `jcviz-landing-sanity.vercel.app` to a custom domain (e.g. `jcviz.vn` or `landing.jcviz.vn`):

1. **Vercel side**
   - Open Vercel project → **Settings → Domains** → **Add Domain**
   - Enter `jcviz.vn` (apex) or `landing.jcviz.vn` (subdomain)
   - Vercel shows DNS records to add (A / CNAME)

2. **DNS side** (registrar — Namecheap / GoDaddy / Cloudflare / Vinahost / etc.)
   - For apex `jcviz.vn`: add **A record** pointing to Vercel's IP (shown in dashboard) and **AAAA record** for IPv6
   - For subdomain `landing.jcviz.vn`: add **CNAME record** → `cname.vercel-dns.com`
   - Optional `www.jcviz.vn`: CNAME → `cname.vercel-dns.com` + redirect rule (next step)
   - Wait for DNS propagation (typically 5-60 min, sometimes hours)

3. **Vercel verifies + issues SSL**
   - Vercel automatically provisions Let's Encrypt cert once DNS is verified
   - Status `Valid Configuration` = ready

4. **Redirect www / non-www**
   - In Vercel **Settings → Domains** → click the redirect arrow next to one of the domain rows → set primary
   - All other domains will 308 redirect to primary

5. **Update Sanity webhook URL**
   - Sanity webhook URL (in dashboard) must be updated to the new domain: `https://<new-domain>/api/revalidate`
   - Otherwise webhook still hits `jcviz-landing-sanity.vercel.app` — works, but logs are confusing

6. **Update README + ADMIN_GUIDE links** in this repo

7. **Verify**
   - `curl -sI https://<new-domain>/` → 200
   - Studio at `https://<new-domain>/studio` loads
   - Test admin Publish → revalidation works on new domain

---

## 10. Don't list

- **Don't** put `SANITY_API_WRITE_TOKEN` on Vercel — the frontend never writes to Sanity. Production-side compromise of Vercel env should not let an attacker mutate the dataset.
- **Don't** commit `.env.local` (gitignored) or `.secret-local/` (gitignored).
- **Don't** echo `SANITY_REVALIDATE_SECRET` in logs or terminal output. The Vercel value and Sanity webhook value must match — never expose either.
- **Don't** redesign the visual direction without checking with Creative Director — the cinematic dark editorial palette is the brand.
- **Don't** use Tailwind / CSS-in-JS for new sections. Stay in `app/globals.css`.
- **Don't** seed via Studio's "Create new" UI for singletons — they're hidden by `sanity.config.ts` for a reason. Use `npm run seed:sanity` if you need to (re)create them.

---

## 11. Reference paths

| Looking for... | Path |
|---|---|
| Schemas | `sanity/schemas/` |
| GROQ queries | `sanity/lib/queries.ts` |
| Section React components | `components/sections/` |
| Page composition | `app/(site)/page.tsx` |
| Webhook route | `app/api/revalidate/route.ts` |
| Studio config + singleton enforcement | `sanity.config.ts` |
| Env contract | `.env.local.example` |
| Design system CSS | `app/globals.css` |
| Original WordPress theme (reference only — frozen) | `../jcviz-landing-theme/` |

---

## 12. Phase log

- **Phase 1** — project scaffolding (Next + Sanity skeleton)
- **Phase 2** — 14 schemas + singleton enforcement
- **Phase 3** — UI components ported from WordPress theme
- **Phase 4** — Seed 35 docs + GROQ + getLandingContent + generateMetadata
- **Phase 4.5** — Admin workflow probe (publish/visible-toggle/order verified)
- **Phase 5A** — Git init + push to `nh1288/jcviz-landing-sanity`
- **Phase 5B** — Vercel deploy
- **Phase 5C** — Sanity webhook revalidation (end-to-end <8s verified)
- **Phase 5D** — Production cleanup audit + admin/dev handoff docs (this commit)

---

## 13. Contact

Studio direction: studio@jcviz.vn · 0246 6868 006 · 4th Floor, AZ Sky Tower, Dinh Cong, Hanoi.
