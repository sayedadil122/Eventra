# Supabase Setup

Project ref: `tqtdvhqnmntxbbyghxyt`

The backend has the Supabase URL and keys in `backend/.env`. The database tables still need to be created in the Supabase project.

## Apply Schema

Use either option:

```powershell
supabase db push --db-url "postgresql://postgres.tqtdvhqnmntxbbyghxyt:<DATABASE_PASSWORD>@aws-0-ap-south-1.pooler.supabase.com:6543/postgres" --yes
```

Or paste `supabase/migrations/20260707000000_eventra_schema.sql` into the Supabase SQL editor and run it.

## Required Secret

I still need the Supabase database password to push the migration directly from this workspace.
