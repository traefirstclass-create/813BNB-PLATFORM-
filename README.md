# 813BNB Platform

Monorepo for two connected sites for Rasheen "Cuir" Castell's short-term
rental and real estate investment business:

- **`apps/booking`** → 813bnb.com — guest-facing booking/reservation platform.
- **`apps/corporate`** → tampabaylodgingco.com — corporate, investor, and
  lead-gen site for Tampa Bay Lodging Corporation.
- **`packages/ui`** — shared design system (brand tokens, header/footer,
  cards, forms) used by both apps.
- **`packages/db`** — shared Prisma schema and client, Neon Postgres.
- **`packages/config`** — shared tsconfig/eslint/Tailwind preset.

See [CONTENT-TODO.md](./CONTENT-TODO.md) for every placeholder (stats,
photos, legal copy, pricing) that needs real content before launch.

## Stack

- Next.js 14 (App Router) + TypeScript, one app per site
- Tailwind CSS with a shared brand preset (`packages/config/tailwind.preset.ts`)
- Neon Postgres + Prisma (`packages/db`)
- NextAuth.js (Credentials provider, JWT sessions) for the Client/Owner
  Portals in `apps/booking`
- Stripe for payments (card, Apple Pay, Google Pay, Cash App Pay); Zelle is
  a manual instruction + staff-reconciliation flow, not an automated
  integration
- Twilio for SMS, DocuSign/HelloSign for e-signature, a pluggable chat
  widget (Crisp/Intercom/self-contained stub) — all optional locally, see
  below
- pnpm workspaces + Turborepo

## Local setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up the database

Create a free [Neon](https://neon.tech) Postgres project, then:

```bash
cp .env.example .env
# fill in DATABASE_URL and DIRECT_URL from your Neon dashboard
# generate a NEXTAUTH_SECRET: openssl rand -base64 32

pnpm db:generate
pnpm db:push     # creates tables from packages/db/prisma/schema.prisma
pnpm db:seed     # seeds Old West Studio Lofts + demo listings + demo accounts
```

Seeded portal accounts (password `Demo1234!` for all): `guest@example.com`,
`owner@813bnb.com`, `staff@813bnb.com`.

### 3. Run both apps

```bash
pnpm dev              # runs both apps via Turborepo
# or individually:
pnpm dev:booking      # http://localhost:3000
pnpm dev:corporate    # http://localhost:3001
```

Every third-party integration (Stripe, Twilio, DocuSign, live chat, Google
Maps/Places) is optional locally — each falls back to a stubbed/sandbox mode
when its env var is unset, so the full app runs and is clickable without any
live credentials. See `.env.example` for the full list and what each stub
does.

### 4. Typecheck, lint, test

```bash
pnpm typecheck
pnpm lint
pnpm test          # unit tests (Vitest)
pnpm test:e2e       # Playwright — requires both dev servers running, or
                     # configure Playwright's webServer to start them
```

## Deployment

Two separate Vercel projects point at this one repo, each with a different
**Root Directory**:

| Vercel project | Root Directory   | Domain (once connected) |
| -------------- | ---------------- | ------------------------ |
| booking        | `apps/booking`   | 813bnb.com                |
| corporate      | `apps/corporate` | tampabaylodgingco.com     |

For now, both projects deploy on their default `*.vercel.app` domains —
custom domains are intentionally not connected yet. Set
`NEXT_PUBLIC_CORPORATE_SITE_URL` (on the booking project) and
`NEXT_PUBLIC_BOOKING_SITE_URL` (on the corporate project) to each other's
live Vercel URL so cross-site links resolve correctly, and update
`NEXT_PUBLIC_SITE_URL` on each project to its own URL (used for sitemaps and
structured data). Set the rest of the variables from `.env.example` per
project in Vercel's dashboard — the same `DATABASE_URL`/`DIRECT_URL` should
be shared by both projects since they read the same database.

## Monorepo notes

- Both apps import shared components from `@813bnb/ui` and the Prisma
  client from `@813bnb/db` — see `pnpm-workspace.yaml` and each app's
  `package.json` (`workspace:*` deps).
- Brand colors live in one place: `packages/config/tailwind.preset.ts` and
  `packages/ui/src/styles/globals.css`. They're currently a best-effort
  extraction from the logo shared in chat — see CONTENT-TODO.md before
  treating them as final.
- `packages/db/prisma/schema.prisma` is the single source of truth for the
  data model (properties, units, bookings, payments, leads, portal
  accounts, etc.) — both apps read/write the same database.
