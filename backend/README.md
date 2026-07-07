# Eventra Backend

Eventra backend API for auth, events, budgets, vendors, quote analysis, hidden costs, simulations, trade-offs, payments, dashboard data, and vendor questions.

The production backend is deployed on Netlify Functions and uses Supabase when these environment variables are present:

- `DATA_BACKEND=supabase`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

## Local Run

```powershell
cd backend
node server.js
```

Default URL: `http://127.0.0.1:8787`

## Netlify API Route

Netlify rewrites:

```text
/api/* -> /.netlify/functions/api/:splat
```

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
- `POST /api/quotes/analyze`
- `GET /api/events/:id/hidden-costs`
- `POST /api/events/:id/simulations`
- `GET /api/events/:id/tradeoffs`
- `GET /api/events/:id/dashboard`
