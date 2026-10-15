# CLAUDE.md — blackhawkss-frontend

Public website + owner admin panel for **Black Hawk Security Solution** (blackhawkss.in).

## Stack
Next.js 16 (App Router, Turbopack, `cacheComponents: true`, `output: "standalone"`), React 19, TypeScript, Tailwind v4 (tokens in `src/app/globals.css`), shadcn (radix-nova preset, components in `src/components/ui`), `motion/react`, react-hook-form + zod v4, @tanstack/react-query (admin only), lucide-react, sonner.

## Commands
```bash
npm run dev          # http://localhost:3000 (needs backend on BACKEND_URL, default http://localhost:8080)
npm run typecheck    # tsc
npm run lint         # eslint src
npm run build        # production build (also validates Cache Components rules)
npm run typegen      # regenerate route types after adding routes (PageProps/LayoutProps/RouteContext)
```

## Layout
- `src/app/(site)/*` public pages (static, prerendered). `src/app/admin/*` owner panel (client components + react-query). `src/app/api/backend/[...path]` proxies to the Spring backend and injects the admin JWT from httpOnly cookies. `src/app/api/auth/*` login/logout/session. `src/proxy.ts` guards `/admin`.
- `src/content/*` is the single source of truth for copy and verified facts (`site.ts`: contacts, address, GSTIN; `services.ts`, `industries.ts`, `clients.ts`, `cities.ts`, `leadership.ts`, `legal.ts`, `seo.ts`, `careers.ts`). Edit copy there, not in components.
- `src/components/site` shared site chrome (Header, Footer, FloatingActions, CallSheet, SectionHeading, Reveal, CtaBand…), `src/components/home` home sections, `src/components/forms` quote/contact/application forms, `src/components/brand` logo/hawk watermark/eyebrow rule accent (ClawMark), `src/components/admin` panel widgets.
- `src/lib/seo.ts` metadata + JSON-LD builders (verified fields only). Every page: `buildMetadata` (keywords merged with site targets, canonical, OG locale/image, robots) + `<PageSeo>` (one `@graph`: WebPage, BreadcrumbList, page nodes such as Service/FAQPage/Person) + visible `<Breadcrumbs>`. WebSite + Organization nodes live in `app/(site)/layout.tsx`. Default share image is `public/og-default.png` (rendered copy of `app/opengraph-image.tsx`). No reviews/ratings/aggregate schema — the brief forbids fabricated trust signals. `src/lib/whatsapp.ts` wa.me/tel links. `src/lib/analytics.ts` conversion events (`quote_submit`, `whatsapp_click`, `call_click`, …).

## Rules (from the owners' brief)
- No invented facts: no 24/7, "leading", staff counts, licence numbers, awards, testimonials, logos. `verifiedStats` in `site.ts` lists what may be shown as numbers, with sources.
- Red = action, gold = emphasis, never both on one element. Dark-first; `theme-sand` class flips a band to the light palette.
- Respect reduced motion (Reveal/StatCounter already do). No scroll hijacking.
- Cache Components: never read `cookies()`/`headers()`/`searchParams` outside a `<Suspense>`; no `new Date()`/`Math.random()` in server-rendered output (use a client component).
- Secrets only in env; `NEXT_PUBLIC_*` are public. See `.env.example`.

## Lead mode
`NEXT_PUBLIC_LEAD_MODE=whatsapp` makes the three forms open WhatsApp instead of calling the API (see `src/lib/lead-mode.ts`); `backendGet` short-circuits to null. Default is `api`.

## Backend contract
Envelope `{ success, data }` / `{ success:false, error:{ code, message, fields } }`. Paging `{ items, page, size, totalItems, totalPages }`. Booleans are `published`, `exServiceman` (no `is` prefix). Types in `src/lib/api/types.ts`.
