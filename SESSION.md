# SESSION.md — JCVIZ Landing Page

> Scratchpad bàn giao phiên. KHÔNG phải nguồn state chính thức (xem CLAUDE.md + CHANGELOG.md).
> Ghi đè mỗi phiên. Gitignored. KHÔNG chứa giá trị secret thật.

LAST UPDATED: 2026-05-30
PHIÊN: Migration workspace → JCVIZ-AI / JCVIZ-WEB

---

## 1. Project status
- Migration: **HOÀN TẤT 100%** (từ `D:\00 ANTIGRAVITY\04.JCVIZ Landing Page` → `D:\JCVIZ-AI\JCVIZ-WEB\jcviz-landing-sanity`).
- Stack hiện tại: **Next.js 15 + Sanity CMS v3 + Vercel + GitHub**.
- Production URL: https://jcviz-landing-sanity.vercel.app
- Studio URL: https://jcviz-landing-sanity.vercel.app/studio
- GitHub repo: https://github.com/nh1288/jcviz-landing-sanity (branch `main`)
- Sanity Project ID: lưu trong `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`) — KHÔNG in ở đây.
- Sanity Dataset: `production`
- Sanity API Version: `2024-12-01`
- Vercel project name: `jcviz-landing-sanity` (suy ra từ deploy URL; xác nhận lại trong Vercel dashboard nếu cần).

## 2. Architecture summary
- Public landing page: route `/`
- Sanity Studio (embedded): route `/studio`
- Content source: Sanity CMS (dataset `production`), query qua client trong `sanity/`.
- Revalidation route: `app/api/revalidate/route.ts`
- Webhook flow: Sanity Publish → gọi webhook → `/api/revalidate` (bảo vệ bằng `SANITY_REVALIDATE_SECRET`) → Next.js on-demand revalidate → site cập nhật.

## 3. Content workflow
Admin vào `/studio` → sửa nội dung → **Publish** → Sanity webhook bắn → Vercel `/api/revalidate` → website cập nhật trong vài giây. **KHÔNG cần redeploy.**

## 4. Folder structure summary
- `app/` — Next.js App Router (routes `/`, `/studio`, `/api/revalidate`).
- `components/` — UI components (Pure CSS).
- `sanity/` — schema, client, env, config CMS.
- `lib/` — helpers/utilities.
- `scripts/` — `seed-sanity.ts`, `test-admin-workflow.ts`.
- `ADMIN_GUIDE.md` — hướng dẫn admin sửa nội dung qua Studio.
- `README.md` — tổng quan project + setup.
- (Doc set JCVIZ-AI: `CLAUDE.md`, `CHANGELOG.md`, `VERSION.txt`.)

## 5. Environment variables
**Production (Vercel) cần:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_REVALIDATE_SECRET`

**Local only (KHÔNG đưa lên Vercel):**
- `SANITY_API_WRITE_TOKEN` (chỉ dùng để seed)
- `.env.local`
- `.secret-local/`

> ⚠️ KHÔNG ghi giá trị thật của bất kỳ token/secret nào vào file này hoặc git.

## 6. Current completed phases
- Phase 1: project structure
- Phase 2: Sanity schemas
- Phase 3: UI port
- Phase 4: seed Sanity data
- Phase 4.5: admin workflow test
- Phase 5A: GitHub push
- Phase 5B: Vercel deploy
- Phase 5C: webhook revalidation
- Phase 5D: production cleanup + admin handoff
- (Migration 2026-05-30: chuyển workspace sang JCVIZ-AI/JCVIZ-WEB — xong)

## 7. Verified status
- `/` → HTTP 200
- `/studio` → HTTP 200
- 35 Sanity documents
- Webhook revalidation verified end-to-end
- Admin publish cập nhật production KHÔNG cần redeploy
- TypeScript pass
- No token leak
- WordPress theme / backup: untouched (cold storage ở `../_legacy-wordpress/`)
- Post-migration: git `main` up-to-date với `origin/main`, remote `nh1288/jcviz-landing-sanity`, `.env.local` + `.secret-local/` còn nguyên.

## 8. Remaining non-blocking items
- favicon missing
- OG image chưa upload
- title doubling (cosmetic)
- npm audit: 26 vulnerabilities (22 moderate, 4 high) — để sau; **KHÔNG chạy `npm audit fix --force`** (phá dep).

## 9. Important warnings (DO NOT)
- KHÔNG commit `.env.local`
- KHÔNG commit `.secret-local/`
- KHÔNG đưa `SANITY_API_WRITE_TOKEN` lên Vercel
- KHÔNG xóa WordPress backup / theme (`../_legacy-wordpress/`)
- KHÔNG upload ảnh chưa được phép public / dữ liệu báo giá / NDA lên CMS
- KHÔNG rewrite visual / schema khi chưa có yêu cầu rõ

## 10. Next recommended actions
- Upload ảnh thật
- Upload OG image
- Add favicon
- Gắn custom domain nếu cần
- Update Sanity webhook URL nếu đổi domain
- Training admin bằng `ADMIN_GUIDE.md`

---

## DO NOT TOUCH (phiên này)
- App code · Sanity schema · visual direction
- `../_legacy-wordpress/` (WP theme + backup, cold storage)
- `.env.local` · `.secret-local/` · `.git`
