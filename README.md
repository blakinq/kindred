# kindred

A lightweight planning hub for small gatherings — invites, RSVPs, budgets, food, and tasks in one shared workspace.

This scaffold implements the product spec in [`kindred.md`](./kindred.md): a modular monolith with a separate authenticated host app (`/app/*`) and a public guest invite page (`/e/:slug`), as recommended in §24.1.4 of the PRD.

---

## Stack

- **Next.js 15** (App Router, React Server Components, server actions)
- **TypeScript** strict mode
- **Supabase** — Postgres + Auth (session cookies)
- **shadcn/ui** style components + Tailwind CSS
- **Zod** for input validation

## What's wired up

Phase 1 features from the PRD are fully working:

- Email/password signup & login (Supabase auth)
- Create & list events
- Event dashboard with live RSVP, budget, food, and task summaries
- Guest list: add one, bulk paste, filter, search, change RSVP, delete
- Public invite page (`/e/:slug`) with RSVP submit + confirmation
- Event settings (privacy, plus-ones, guest interactions)

These tabs are scaffolded with empty states and PRD-derived feature lists, ready to be filled in:

- Budget
- Food & Supplies
- Tasks

## Architecture notes

- **RLS:** host-side tables enforce membership through an `is_event_member(event_id)` helper. The public invite surface uses two `SECURITY DEFINER` RPCs (`get_public_event`, `submit_public_rsvp`) so anonymous visitors never read or write arbitrary columns. Budget data is never exposed to the public surface (PRD §9.6, §24.1.5).
- **Money** is stored in integer cents (`*_cents` columns) per PRD §24.1.5.
- **Invite slugs** are URL-safe random strings (10 chars, unambiguous alphabet) generated in app code; uniqueness enforced by a DB constraint.
- **Plus-one validation** happens in the RPC, not the client, so the server is the source of truth (PRD §13.5).

---

## Setup

### 1. Install dependencies

```powershell
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com/) → New project.
2. Choose a region close to you. Save the database password somewhere safe.
3. Project Settings → API: copy the **Project URL**, the **anon public** key, and (optionally) the **service_role** key.

### 3. Run the schema

In the Supabase dashboard → SQL Editor:

1. Open and run [`db/schema.sql`](./db/schema.sql) — creates tables, enums, triggers.
2. Open and run [`db/policies.sql`](./db/policies.sql) — enables RLS and creates the public RPCs.

### 4. Configure env vars

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Disable email confirmation (for local development)

In the Supabase dashboard → Authentication → Providers → Email:

- Toggle **Confirm email** OFF so signup → dashboard works without verifying first.
- (Re-enable for production.)

### 6. Run it

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
├── app/
│   ├── (auth)/                 → /login, /signup (route group)
│   ├── app/                    → authenticated host app
│   │   ├── events/
│   │   │   ├── page.tsx        → event list
│   │   │   ├── new/            → create event
│   │   │   └── [eventId]/      → dashboard + tabs
│   │   └── layout.tsx          → requires auth
│   ├── e/[slug]/               → public invite page
│   ├── layout.tsx
│   └── page.tsx                → marketing homepage
├── components/
│   ├── ui/                     → shadcn-style primitives
│   └── …                       → feature components
├── lib/
│   ├── supabase/               → browser + server clients, middleware
│   ├── types.ts                → DB-aligned TS types
│   ├── validation.ts           → Zod schemas
│   └── utils.ts                → cn(), slug, formatters
db/
├── schema.sql
└── policies.sql
middleware.ts                   → Supabase session refresh
```

## Next steps

Pick a Phase 2 tab and replace its `StubTab` with real CRUD:

- **Budget** — `src/app/app/events/[eventId]/budget/page.tsx` + a `BudgetService` against the `expenses` table.
- **Food & Supplies** — same, against `food_supply_items`. Extend `submit_public_rsvp` or add a separate `claim_food_item` RPC.
- **Tasks** — same, against `tasks`. Watch for the guest-completion path requiring its own RPC.

The schema, types, RLS, and dashboard widgets are all already in place — adding a tab is mostly server-action + page work.
