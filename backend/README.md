# Eventra Backend

Local backend API for Eventra. It currently runs with local JSON storage until the Supabase schema is applied. Supabase credentials are configured in `.env`, and the production database migration is ready in `../supabase/migrations`.

## Run

```powershell
cd backend
node server.js
```

Default URL: `http://127.0.0.1:8787`

## Main endpoints

- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/events`
- `POST /api/events`
- `GET /api/events/:id`
- `PATCH /api/events/:id`
- `DELETE /api/events/:id`
- `GET /api/events/:id/budget-plan`
- `GET /api/vendors?category=Photography`
- `POST /api/vendors`
- `POST /api/quotes/analyze`
- `GET /api/quotes?eventId=sample-event-riya`
- `POST /api/quotes`
- `GET /api/events/:id/hidden-costs`
- `POST /api/events/:id/simulations`
- `GET /api/events/:id/tradeoffs`
- `POST /api/events/:id/tradeoffs`
- `GET /api/events/:id/payments`
- `POST /api/events/:id/payments`
- `PATCH /api/payments/:id`
- `GET /api/events/:id/dashboard`
- `GET /api/questions?category=Photography`

## Supabase Status

- Project URL and keys are configured locally.
- Migration file is ready at `../supabase/migrations/20260707000000_eventra_schema.sql`.
- Supabase project is reachable, but tables are not created yet.
- To apply the schema from here, provide the Supabase database password.
