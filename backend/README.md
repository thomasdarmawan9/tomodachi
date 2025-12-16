# Tomodachi Backend (Go/Gin/Gorm/Postgres)

API server that matches the existing frontend flows (auth, profile/onboarding, tracks/units, practice engine, SRS).

## Quick start
```bash
cd backend
go mod tidy   # needs network to fetch gin/gorm/jwt/bcrypt
export DATABASE_URL="postgres://postgres:123456@localhost:5432/tomodachi?sslmode=disable"
export JWT_SECRET="change-me"
go run .
```

If you prefer using a `.env` file locally:
- `cp .env.example .env` and tweak values
- `source .env` (or use `direnv`)

Config envs (defaults in `internal/config/config.go`):
- `PORT` (default 8080)
- `DATABASE_URL` Postgres DSN
- Or use split vars: `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`, `DATABASE_PORT` (default 5432), `DATABASE_SSLMODE` (default `require`)
- `JWT_SECRET` signing key
- `TOKEN_TTL` token lifetime (e.g. `24h`)
- `AUTO_MIGRATE` (`true`/`false`)
- `SEED_DEMO` (`true`/`false`) seeds sample tracks/questions/kanji/flashcards
- `SEED_KANJI_PATH` path to kanji JSON (default `backend/data/kanji_n5.json` when running from repo root; use `data/kanji_n5.json` if your workdir is `backend/`)
- `SEED_HIRAGANA_PATH` path to hiragana practice questions JSON (default `backend/data/hiragana_questions.json`; use `data/hiragana_questions.json` if your workdir is `backend/`)
- `SEED_KATAKANA_PATH` path to katakana practice questions JSON (default `backend/data/katakana_questions.json`; use `data/katakana_questions.json` if your workdir is `backend/`)
- `SEED_PLACEMENT_PATH` path to placement beginner questions JSON (default `backend/data/placement_beginner_questions.json`; use `data/placement_beginner_questions.json` if your workdir is `backend/`)
- `SEED_FLASHCARD_PATH` path to flashcard seed JSON (default `backend/data/flashcards_seed.json`); applied on user signup

## Endpoints (prefixed `/api/v1`)
- Auth: `POST /auth/signup`, `POST /auth/login`, `GET /auth/me`
- Profile: `GET /profile`, `PUT /profile`, `POST /profile/complete-onboarding`, `POST /profile/track`
- Tracks/units: `GET /tracks`, `GET /tracks/:id/units`, `POST /units/:id/status`
- Practice: `GET /practice/questions?mode=beginner|n5|kanji`, `POST /practice/submit` (body: `mode`, `answers[{questionId,selected}]`)
- SRS: `GET /srs/due`, `POST /srs/:id/grade` (body: `quality=again|good|easy`)
- Dashboard: `GET /dashboard/summary`

## Notes
- `AUTO_MIGRATE` runs `gorm.AutoMigrate` for all models on boot; `SEED_DEMO` inserts minimal sample content matching the frontend question bank.
- Auth uses JWT Bearer tokens; passwords hashed with bcrypt.
- Practice submit stores attempts + per-question answers; score/pass returned for the frontend result page.
- SRS grading mirrors frontend SM-lite logic (`internal/srs/engine.go`) and adds XP via profile update.

## Deploy to Koyeb
- Use workdir `backend`, build `go build -o app .`, start `./app`, expose port `8080`, and set HTTP health check to `/healthz`.
- Env vars to set in Koyeb: `DATABASE_URL`, `JWT_SECRET`, optionally `AUTO_MIGRATE=true`, `SEED_DEMO=true`, `TOKEN_TTL=24h`, and seed paths (`SEED_KANJI_PATH=data/kanji_n5.json`, etc.).
- Example `DATABASE_URL` for the provided Koyeb Postgres instance:  
  `user=koyeb-adm password=npg_s6kHlczqBTJ3 host=ep-late-field-a1efh5mb.ap-southeast-1.pg.koyeb.app dbname=tomodachi sslmode=require`
- If you deploy via the Koyeb CLI:  
  `koyeb service deploy github thomasdarmawan/tomodachi --name tomodachi-backend --branch main --build-command "cd backend && go build -o app ." --run-command "./app" --port 8080 --env DATABASE_URL="user=..." --env JWT_SECRET="your-prod-secret"`
