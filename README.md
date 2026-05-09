# JCVIZ Landing — Next.js + Sanity

A single-page landing for **JCVIZ** (architectural visualization studio in Hanoi) built on **Next.js 15** with **Sanity v3** as the headless CMS and the Studio embedded at `/studio`.

This is the parallel CMS-first rewrite of the WordPress theme that lives at `../jcviz-landing-theme`. The WordPress version stays online and unchanged — switching domains only happens after this version is verified.

---

## 1. Stack

- **Next.js 15** (App Router, React Server Components, TypeScript)
- **Sanity v3** — schemas + Studio in the same repo
- **next-sanity** — `<NextStudio>` mount + GROQ helpers
- **Pure CSS** — design system ported verbatim from `assets/css/main.css` of the WordPress theme; no Tailwind, no styled-components for our own code (Sanity Studio uses styled-components internally)
- **No build step** beyond Next's own bundler

---

## 2. Project structure (current — phase 1, project scaffolding)

```
jcviz-landing-sanity/
├── app/
│   ├── layout.tsx                    ← root html+body, fonts/CSS imports
│   ├── globals.css                   ← placeholder; design system ported in next steps
│   ├── (site)/                       ← public site route group
│   │   ├── layout.tsx                ← header + footer slot (stub now)
│   │   └── page.tsx                  ← homepage (stub now)
│   └── studio/[[...tool]]/           ← embedded Sanity Studio
│       ├── layout.tsx                ← bypasses site shell
│       └── page.tsx                  ← <NextStudio config={config} />
├── components/
│   ├── sections/                     ← Hero, Positioning, Services, Value,
│   │                                    ProjectTypes, Process, PortfolioPreview,
│   │                                    FinalCta — written in step 3
│   ├── layout/                       ← Header, Footer
│   └── ui/                           ← Button, Marquee, Eyebrow, headline helpers
├── sanity/
│   ├── env.ts                        ← env var assertions (projectId, dataset, apiVersion)
│   ├── lib/client.ts                 ← read client (CDN-cached)
│   └── schemas/                      ← schemas land in step 2
│       ├── singletons/               ← siteSettings, heroSection, positioningSection,
│       │                                finalCta, contactInfo, seoSettings
│       ├── documents/                ← service, valuePoint, projectType, processStep,
│       │                                portfolioItem
│       ├── objects/                  ← cta, imageWithAlt, headlineWithAccent
│       └── index.ts                  ← schemaTypes registry (empty for now)
├── public/                           ← favicon, fallback OG image
├── sanity.config.ts                  ← Studio config (basePath /studio)
├── sanity.cli.ts                     ← `sanity` CLI config
├── next.config.mjs
├── tsconfig.json
├── package.json
├── .env.local.example                ← copy → .env.local, fill from sanity.io
├── .gitignore
└── README.md (this file)
```

What is **not** in here yet (deliberate — comes in later phases):
- Sanity schema definitions
- React components for the 8 sections + header + footer
- The cinematic CSS port
- GROQ queries
- Seed content
- Sanity webhook → Vercel revalidate route

---

## 3. Local setup

> **Prerequisite:** Node.js 18.18+ and a Sanity project (`projectId` + `dataset`). If you don't have a Sanity project yet, see section 4 below.

### 3.1 Install dependencies

This step has not been run yet. Pick a package manager and run once:

```bash
npm install
# or
pnpm install
# or
yarn install
```

This pulls down ~250 MB of `node_modules/` (Next, React, Sanity, etc.). All of it is in `.gitignore`.

### 3.2 Create `.env.local`

```bash
cp .env.local.example .env.local
```

Fill the values from your Sanity dashboard (see section 4).

### 3.3 Run the dev server

```bash
npm run dev
```

- Homepage: http://localhost:3000
- Studio: http://localhost:3000/studio

The Studio is empty until schemas are added in the next phase.

### 3.4 Type-check

```bash
npm run typecheck
```

---

## 4. Sanity setup (do this before `npm run dev`)

If you haven't created a Sanity project yet:

1. Go to https://www.sanity.io and sign up (Google / GitHub / email).
2. Open https://www.sanity.io/manage and click **Create new project**.
3. Project name: `jcviz-landing` (or whatever you prefer — the name is for your dashboard, not user-facing).
4. Dataset: keep the default `production` (Public dataset is fine for a landing site).
5. Note down the **Project ID** at the top of the dashboard.
6. Add yourself as the only member for now; invite the team later when the Studio is wired up.

Then put the values into `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<project id from dashboard>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-01
```

The two server-side tokens (`SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`) are **not required for v1** — leave them empty until the preview / webhook features are wired up.

---

## 5. Phasing — what gets built next

Following the agreed step-by-step roll-out:

| Phase | Status | What lands |
|---|---|---|
| 1. Project structure | ✅ done — this commit | Folder tree, configs, Studio mount, README, .gitignore, env example |
| 2. Sanity schemas | ⏳ next | All singletons, collections, reusable objects |
| 3. UI components | ⏳ pending | Port 8 sections + header + footer; CSS port |
| 4. Seed content | ⏳ pending | Initial content matching current WordPress copy |
| 5. Local test | ⏳ pending | `npm run dev`, verify visual parity with WordPress version |
| 6. Deploy | ⏳ pending | Vercel project, env vars, Sanity → Vercel webhook |

Each phase is reviewed before the next begins.

---

## 6. Things this project deliberately does NOT do

- **No Tailwind / no CSS-in-JS** for our own styles — the design system is in `app/globals.css` as plain CSS variables + selectors.
- **No App Router server actions for content writes** — content writes happen in Studio, never from the public site.
- **No multi-locale (i18n)** — single English locale for v1. Vietnamese can be added later via `@sanity/document-internationalization`.
- **No replacement of the WordPress theme** until this version is fully verified. Both run in parallel during cutover.
- **No build step beyond Next.js**. No Sass, no PostCSS plugins, no custom Webpack config.

---

## 7. Pointers

| Looking for... | Path |
|---|---|
| Schema definitions | `sanity/schemas/` (added in phase 2) |
| GROQ queries | `sanity/lib/queries.ts` (added in phase 3) |
| Section React components | `components/sections/` |
| Page composition | `app/(site)/page.tsx` |
| Studio config | `sanity.config.ts` |
| Env contract | `.env.local.example` |
| Design system CSS (port target) | `app/globals.css` |
| Original design system reference | `../jcviz-landing-theme/assets/css/main.css` |

---

## 8. License / contact

Internal JCVIZ project. For studio direction:
- Email: studio@jcviz.vn
- Phone: 0246 6868 006
