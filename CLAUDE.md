# CLAUDE.md - JCVIZ Landing Page

- Tool: JCVIZ Landing Page | Class: JCVIZ-WEB
- Stack: Next.js 15 + Sanity v3 + Vercel + GitHub

## Scope-lock
Claude Code CHI lam viec trong folder nay (JCVIZ-WEB\jcviz-landing-sanity). Khong dung tool khac.

## Conventions (BAT BUOC giu)
- Pure CSS - KHONG Tailwind.
- KHONG WordPress.
- KHONG page builder.
- KHONG dashboard noi bo.

## Security RULES
- KHONG bao gio push SANITY_API_WRITE_TOKEN hay SANITY_API_READ_TOKEN len Vercel.
- KHONG echo/dump secret ra terminal / report / git.
- .env.local + .secret-local/ luon gitignored.

## Content rule
KHONG upload anh khach hang chua duoc phep public / du lieu bao gia / NDA len CMS.

## Deploy
- Vercel auto-deploy tu branch main.
- Noi dung admin sua qua /studio -> webhook revalidate, KHONG can redeploy.

## Workflow rule
Fix bug cu the -> test -> commit. KHONG tu refactor / tao file thua / doi visual direction chinh.
