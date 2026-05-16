# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```powershell
npm install                       # `.npmrc` sets legacy-peer-deps=true for Lenis's optional react peer
npm run dev                       # Next dev server on http://localhost:3000
npm run build                     # Production build
npm run start                     # Run the production build
npm run lint                      # next lint
npm run typecheck                 # tsc --noEmit (no `npm test` — no test runner is set up)
```

No test infrastructure exists. Don't add one unless explicitly asked.

## Product context

`kindred.md` is the full Product Requirements Document. Read it when scope or behavior is unclear — it defines features, edge cases, calculations (attendee count, hybrid projected total, etc.), and the permissions matrix. The PRD is authoritative; if code disagrees, ask which wins.

## Architecture

### Two runtime surfaces, one app

Per PRD §24.1.4, kindred is a modular monolith with **two intentionally separate surfaces**:

1. **Authenticated host app** at `/app/*` — host/co-host dashboard. Reads through standard Supabase queries; tables are protected by RLS.
2. **Public guest invite page** at `/e/[slug]` — RSVP without an account. **Does not use RLS** to read or write event data — it goes through `SECURITY DEFINER` RPCs (`get_public_event`, `submit_public_rsvp`, `get_public_food_items`, `claim_public_food_item`) defined in `db/policies.sql`. This keeps the public field surface tightly controlled in one place rather than spread across RLS row filters.

**Critical:** never widen RLS to cover the public surface. If you need to expose new data publicly, extend `get_public_event` to return more columns, or add another `SECURITY DEFINER` RPC. Budget data, host emails, and guest contact info must never leak to anonymous visitors.

### Permission helper

Host-side tables (`events`, `guests`, `expenses`, `food_supply_items`, `menu_items`, `tasks`, `event_cohosts`, `event_activities`) use one shared RLS predicate:

```sql
is_event_member(p_event_id uuid) -- true if auth.uid() is host OR a cohost
```

Adding a new event-scoped table means adding RLS that calls this helper, not re-implementing the host/cohost check.

### Server actions are colocated with their pages

Each route folder has an `actions.ts` next to `page.tsx`:

```
src/app/app/events/actions.ts                              # createEvent, updateEventSettings
src/app/app/events/[eventId]/guests/actions.ts             # addGuest, bulkAddGuests, updateGuestRsvp, deleteGuest
src/app/app/events/[eventId]/budget/actions.ts             # expense CRUD
src/app/app/events/[eventId]/food/actions.ts               # menu item CRUD
src/app/app/events/[eventId]/food-supplies/actions.ts      # "to bring" item CRUD
src/app/app/events/[eventId]/tasks/actions.ts              # task CRUD
src/app/(auth)/actions.ts                                  # signup, login, logout, forgot/reset password
src/app/e/[slug]/actions.ts                                # submitRsvp, claimFoodItem (call public RPCs)
```

There is no REST API layer. Pages use server actions; the public invite page is the only route that needs to mutate without an authenticated user, and it does so via the RPCs.

Server actions validate FormData with Zod schemas from `src/lib/validation.ts` — extend those rather than re-validating ad hoc.

### Supabase client surfaces (three of them, same name)

Three `createClient()` exports exist — **the import path determines which one you get**:

- `@/lib/supabase/server` — server components, server actions, route handlers. Uses cookies via `next/headers`.
- `@/lib/supabase/client` — browser/client components.
- `@/lib/supabase/middleware` — only used by `middleware.ts` for session refresh. Don't import elsewhere.

The root `middleware.ts` enforces auth redirects: `/app/*` requires a session; `/login`, `/signup`, and `/forgot-password` bounce logged-in users to `/app/events`. `/reset-password` stays accessible while authenticated because the email-link flow requires a session there.

### Password reset flow

`/forgot-password` → `resetPasswordForEmail({ redirectTo: '/auth/callback?next=/reset-password' })` → email link → `src/app/auth/callback/route.ts` exchanges the code for a session via `exchangeCodeForSession` → forwards to `/reset-password` → `updateUser({ password })`.

For this to work in any environment, `${NEXT_PUBLIC_APP_URL}/auth/callback` must be added to **Supabase dashboard → Authentication → URL Configuration → Redirect URLs**.

## Conventions to keep

### Money in integer cents

Per PRD §24.1.5: all monetary columns are `*_cents integer`. Never store decimals.

- `formatCurrency()` in `src/lib/utils.ts` divides by 100 at render time.
- `parseMoneyToCents()` in `src/lib/money.ts` is the canonical FormData → cents converter (strips currency symbols, rounds to the cent). Use it in server actions; don't re-roll the parsing.
- `centsToInput()` does the inverse for `defaultValue` on edit forms.
- Budget math (`hybrid projected total`, per-attendee cost) is also computed in cents.

### UI primitives are hand-rolled, not shadcn-installed

`src/components/ui/` looks shadcn-shaped but it isn't — components are hand-rolled in the "warm riso-print" aesthetic (cream paper, terracotta/mustard/olive/ocean, chunky `stamp` offset shadows, optional washi `tape` strip on cards). **Don't run `shadcn add ...`** — it will install components that clash with the design system. Write new primitives by copying the existing pattern (e.g. `Button`, `Card`, `Input`).

Design tokens live in `src/app/globals.css` (CSS variables) and `tailwind.config.ts` (named Tailwind colors: `paper`, `paper-deep`, `paper-light`, `ink`, `ink-soft`, `rule`, `terracotta`, `mustard`, `olive`, `plum`, `coral`, `ocean`). Use these names rather than the legacy shadcn `--primary`/`--muted` aliases when adding new code — the aliases exist only for back-compat with the original scaffold.

Fonts via `next/font/google` in `src/app/layout.tsx`: Bricolage Grotesque (display), Instrument Sans (body), Caveat (handwritten flourishes — use sparingly via `font-hand`).

### Date and time pickers

`DateInput`, `TimeInput`, and `DateTimeInput` accept an `icon` prop. **When `icon` is passed, the icon becomes a clickable button that opens a custom modal picker** (`CalendarPicker` / `TimePicker`) — both hand-rolled in the riso aesthetic. The text input still accepts typed input as a parallel path; the picker just sets the same internal ISO value. Don't reach for a third-party date library.

`TimeInput` reads/writes a process-wide format preference (`12h`/`24h`) stored under `kindred:timeFormat` in localStorage and broadcast between sibling inputs via the `useSharedTimeFormat` hook. Flipping the format on one input flips them all in the same render.

### Toasts and confirms

User-facing feedback uses one tiny global store in `src/lib/toast.ts`. Server-action handlers call `toast.success(title, description?)` or `toast.error(title, description?)` after every mutation; the `<Toaster />` mounted in the root layout renders them. Destructive actions go through `ConfirmDialog` in `src/components/ui/confirm-dialog.tsx`.

### Next.js 15 / React 19 quirks

This repo is on Next.js 15.5.x + React 19 stable. Notes:

- Form state hook is `useActionState` from `react`, not `useFormState` from `react-dom`.
- `npm install` works without flags because `.npmrc` sets `legacy-peer-deps=true` (Lenis declares an optional react peer that the strict resolver tries to satisfy with a separate copy of React, conflicting with the pinned version).
- `params` and `searchParams` are `Promise<...>` in App Router pages — await them.
- Client pages using `useSearchParams()` MUST be wrapped in `<Suspense>` (see `/login`) — otherwise static prerender bails to CSR and the build fails. `usePathname()` is exempt.

### Smooth scroll

`SmoothScroll` (Lenis) is mounted globally in the root layout. It exposes `window.__lenis` for components that need precise scroll control (`ScrollToTop` uses this). Respects `prefers-reduced-motion`. The `data-lenis-prevent` attribute opts an element out of smooth-scroll capture if you ever need a native-scroll container — the `Dialog` primitive sets this for you.

## Phase status

Per PRD §18 development phases:

- **Phase 1 wired**: auth, events CRUD, guest list with RSVP management, public RSVP submit, event settings.
- **Phase 2 wired**: Budget (`expenses`), Food/Menu planning (`menu_items` via `MenuList`), "To Bring" food & supplies (`food_supply_items` via `FoodList`), Tasks (`tasks` via `TaskList`). Each tab lives at `src/app/app/events/[eventId]/{tab}/page.tsx` with a sibling `actions.ts`. Public guest food-claim is also live via `claim_public_food_item`.
- **Phase 3 (co-hosts, email invites, reminders, guest task-complete RPC)**: partially started. The `event_cohosts` and `event_activities` tables exist but the host-side UI for cohost management and the activity audit log are not wired.

## Database changes

Schema lives in `db/schema.sql` (tables, enums, triggers, updated_at) and `db/policies.sql` (RLS + public RPCs). These are run manually in the Supabase SQL Editor. There is no migration tool. When changing schema:

1. Edit the SQL files so a fresh project still bootstraps correctly.
2. Also run the delta against existing dev databases by hand.
3. If a new table is event-scoped, add an `is_event_member`-based RLS policy.
4. If a new column is monetary, name it `*_cents` and store integers.
5. If a new field should be visible to public invite visitors, extend `get_public_event` (or add a new `SECURITY DEFINER` RPC) — do not relax RLS.

Domain TypeScript types in `src/lib/types.ts` are maintained by hand (no `supabase gen types` is wired up). Keep them in sync when columns or enums change.
