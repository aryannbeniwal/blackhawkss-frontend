# Handover — Black Hawk Security Solution website (phase 1)

Date: 2026-10-15 · Repos: `blackhawkss-frontend`, `blackhawkss-backend` (both committed locally on `main`, **not pushed**).

## 1. What was built

**Public site (Next.js 16)** — Home · About · Services (+6 detail pages) · Industries · Our Clients (24 organisations by city) · Gallery (backend-fed, empty-state ready) · Careers (Hindi-assisted application form) · Contact (3 contact cards, map slot) · Request a Quote (validated, event-aware form, reference code on success) · Compliance · Privacy · Terms · 9 city SEO landing pages (`/security-services-in/{panipat,samalkha,sonipat,karnal,kurukshetra,gurugram,delhi,noida,faridabad}`) · 404. Sitemap, robots, manifest, Open Graph image, JSON-LD (LocalBusiness, Service, FAQ, Breadcrumb), floating WhatsApp + mobile Call/WhatsApp/Quote bar, "Talk to our team" sheet with all three numbers, analytics events (GA4/GTM via env).

**Owner panel (`/admin`)** — login, dashboard, enquiries (filter/search/paginate, status pipeline NEW → CONTACTED → REQUIREMENT_CONFIRMED → QUOTATION_SENT → WON/LOST, follow-up date, internal notes, call/WhatsApp/email quick actions), applications, gallery upload/publish/sort/delete, clients CRUD, announcements CRUD. Session = httpOnly cookies; backend authorises every call by JWT.

**API (Spring Boot 4.1.1, Java 25, Postgres 17/Flyway)** — public enquiry/contact/application endpoints with honeypot, IP + phone rate limiting and server-side validation; owner + prospect emails (Thymeleaf, branded) with `notifyFailed` flag when SMTP is down; 24 h / 72 h follow-up reminder job (09:00 IST); JWT auth with rotating refresh tokens; admin CRUD; image resize (1600 px + 480 px thumb); OpenAPI UI in dev; uniform JSON envelope.

**Infra (prepared, not deployed)** — `blackhawkss-backend/deploy/`: docker-compose (postgres, api, web, nginx, certbot; arm64; memory limits + JVM flags for the 2 OCPU / 12 GB Oracle VM), nginx config, step-by-step `deploy/README.md`; Dockerfiles in both repos; GitHub Actions CI in both; manual deploy workflow gated on a secret.

## 2. Stack actually used
Next 16.4.1 · React 19.3 · TypeScript 5 · Tailwind 4 · shadcn CLI 4 (radix-nova) · motion 14 · react-hook-form 7 + zod 4 · @tanstack/react-query 5 · Spring Boot 4.1.1 · Java 25 (Temurin, auto-provisioned by Gradle foojay plugin) · Gradle 9.8 Kotlin DSL · PostgreSQL driver + Flyway · Spring Security 7 + jjwt 0.12 · bucket4j · Thumbnailator · springdoc 3.1.1 · H2 (dev/test only).

## 3. Run locally
```bash
# backend (no Postgres needed for a first look)
cd blackhawkss-backend && SPRING_PROFILES_ACTIVE=dev,h2 ./gradlew bootRun      # http://localhost:8080  (Swagger: /swagger-ui.html)
# backend with Postgres: brew install postgresql@17; create db/user blackhawkss/blackhawkss; ./gradlew bootRun
# frontend
cd blackhawkss-frontend && npm ci && npm run dev                                  # http://localhost:3000
```
Dev admin login: `admin@blackhawkss.in` / `admin12345` (dev profile only; set `ADMIN_SEED_EMAIL/PASSWORD` in prod).

## 4. Environment variables
Frontend `.env.example`: `NEXT_PUBLIC_SITE_URL`, `BACKEND_URL`, `NEXT_PUBLIC_UPLOADS_HOST`, `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_MAPS_EMBED_URL`.
Backend `.env.example`: DB (`DB_URL/USER/PASS`, `POSTGRES_*`), `JWT_SECRET` (≥32 bytes), `CORS_ALLOWED_ORIGINS`, `ADMIN_SEED_*`, `PUBLIC_BASE_URL`, `ADMIN_BASE_URL`, mail (`MAIL_ENABLED`, `SMTP_HOST/PORT/USER/PASS/SSL/STARTTLS`, `MAIL_FROM`, `MAIL_OWNER_TO`, `MAIL_REPLY_TO`), `UPLOADS_DIR`, `RATE_LIMIT_IP_HOUR`, `RATE_LIMIT_PHONE_DAY`, `REMINDERS_ENABLED`, `DOCS_ENABLED`.

## 5. Integrations still required (owner actions)
1. **Email**: create a Resend account, add domain `blackhawkss.in` (3 DNS records), put SMTP creds in `.env`. Fallback: Gmail app password for helloblackhawkss@gmail.com (`SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`).
2. **Analytics**: create a GA4 property, set `NEXT_PUBLIC_GA_ID`.
3. **Google Maps**: done — the office pin (29.243607, 77.010575, confirmed 2026-10-15) drives the contact-page embed, directions link and LocalBusiness `geo` JSON-LD. `NEXT_PUBLIC_MAPS_EMBED_URL` is only an optional override.
4. **Photos**: real photos received 2026-10-15 (PRISMA Fest 2026 team ×4 + clip, industrial gate, uniform gate, founders) and used on the hero, services, project highlight, About and Gallery. Both founder portraits are owner-supplied photos (`leaders[].portrait`). More gallery images via `/admin/gallery`.
5. **Licence wording** for `/compliance` (number is deliberately not shown).
6. **Hosting**: Oracle VM, DNS A record, GitHub secrets for the deploy workflow — see `blackhawkss-backend/deploy/README.md`.

## 6. Tests performed (actual results)
- Frontend: `npm run typecheck` ✔ · `npm run lint` ✔ (0 errors, 4 React-Compiler warnings about react-hook-form `watch`) · `npm run build` ✔ (49 routes, static/PPR).
- Backend: `./gradlew test build` ✔ — 10 tests, 0 failures (context load, enquiry controller incl. honeypot + validation, auth flow, reference-code concurrency).
- End-to-end on localhost (H2 profile): quote → `BH-2026-0001` persisted · admin login sets cookies · dashboard/enquiries list via proxy · PATCH status + follow-up · add note · careers application · contact message · 6th POST within an hour → `429 RATE_LIMITED` · honeypot → fake 200 without persisting · invalid phone → `VALIDATION_ERROR`.
- Lighthouse (mobile emulation, production build via `next start`):

  | Page | Perf (mobile) | Accessibility | Best practices | SEO | LCP (mobile) |
  |---|---|---|---|---|---|
  | `/` | 87 (desktop 99) | 100 | 100 | 100 | 4.1 s (desktop 1.0 s) |
  | `/services/security-guards` | 87 | 100 | 100 | 100 | 4.0 s |
  | `/quote` | 91 | 100 | 100 | 100 | 3.4 s |
  | `/careers` | 86 | 100 | 100 | 100 | 4.1 s |
  | `/clients` | 86 | 100 | 100 | 100 | 4.2 s |

  Mobile performance sits just under the 90 target on simulated slow-4G because of the render-blocking stylesheet + web fonts on the critical path (CLS 0, TBT ≈ 0). Real-device scores will be higher; the remaining lever is inlining critical CSS / self-hosting a single display weight, deferred.
- Visual check: headless Chrome screenshots of home (desktop + 390 px mobile), services, service detail, quote, about, admin login.

## 7. Known limitations / not verified
- Real Postgres, Docker images and SMTP sending were **not** exercised locally (no Postgres/Docker/credentials on this machine); migrations are plain ANSI SQL and pass on H2-in-Postgres-mode.
- Gallery images are served from `/uploads` (nginx in prod, Next rewrite in dev); `thumbUrl`/`url` are site-relative.
- All site photography is now genuine (owner-supplied). The project-highlight clip is the original 3.4 MB WhatsApp MP4, loaded only when scrolled into view; a re-encoded ~1 MB version would be nicer (no ffmpeg on this machine).
- Client register has **24** organisations (the PDF numbering skips 17).
- No automated UI tests for the admin panel.

## 8. Deferred to phase 2 (see plan §6)
Indicative-quote estimator (needs rate cards), Google Business Profile reviews, full Hindi toggle, event-security planner + seasonal pages, guard verification QR, client portal / `bhssinsider` integration, downloadable company-profile PDF (slot exists in nav plan; file not yet designed).
