# Black Hawk Security Solution — website

Public website and owner panel for [blackhawkss.in](https://blackhawkss.in). Backend: [`blackhawkss-backend`](https://github.com/aryannbeniwal/blackhawkss-backend) (Spring Boot).

## Run locally
```bash
cp .env.example .env.local        # defaults work with the backend on :8080
npm ci
npm run dev                        # http://localhost:3000
```
Start the backend first (`SPRING_PROFILES_ACTIVE=dev,h2 ./gradlew bootRun` in the backend repo needs no Postgres).

Admin panel: http://localhost:3000/admin (dev seed login is in the backend README).

## Checks
```bash
npm run typecheck && npm run lint && npm run build
```

## Deploy
Built as a standalone Node server in `Dockerfile`; orchestrated by `deploy/docker-compose.yml` in the backend repo (nginx → web:3000, `/api` → api:8080, `/uploads` → volume). See `deploy/README.md` there.

## Structure
See `CLAUDE.md`.
