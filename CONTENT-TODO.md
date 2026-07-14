# Content TODO

Everything below is a placeholder in the codebase (search for `{{LIKE_THIS}}`)
that needs real content, figures, or legal copy from Rasheen before launch.
Nothing here is invented data — each is a clearly marked stand-in.

## Contact & business basics

- `{{PHONE_NUMBER}}` — main business phone. Used on: 813bnb.com Contact,
  tampabaylodgingco.com Contact, capability statement PDF.
- `{{CONTACT_EMAIL}}` — main business email. Same pages as above.
- `{{OFFICE_HOURS}}` — office hours. Same pages as above.
- `{{ZELLE_HANDLE}}` — the Zelle recipient (phone/email) guests should send
  payment to. Used in the "pay by Zelle" checkout instructions
  (`apps/booking/src/app/api/bookings/[id]/pay-by-zelle/route.ts`). Also set
  as `NEXT_PUBLIC_ZELLE_HANDLE` in env.

## Stats & claims (do not publish without verified numbers)

- `{{UNITS_UNDER_MANAGEMENT}}`, `{{YEARS_OPERATING}}`, `{{AVERAGE_GUEST_RATING}}`
  — 813bnb.com About page.
- `{{COST_OF_LIVING_STATS}}` — Tampa Relocation Guide. Needs a sourced,
  citable figure, not an estimate.
- `{{LEADERSHIP_BIO}}`, `{{MISSION_STATEMENT}}` — tampabaylodgingco.com About
  page.
- `{{WEEKLY_RATE_STARTING_AT}}` — 813bnb.com Weekly Rentals hero pricing
  anchor.

## Investors page (apps/corporate/src/app/investors/page.tsx)

Do not publish any investment claims, target returns, or track record
without Rasheen's sign-off and, likely, legal/compliance review —
investment marketing has real regulatory exposure.

- `{{INVESTMENT_THESIS_SUMMARY}}`
- `{{MARKET_THESIS_TAMPA_BAY}}`
- `{{DEAL_STRUCTURE_DETAILS}}` (minimum investment, hold period, distributions)

## Government capability statement (apps/corporate/src/app/api/capability-statement/route.ts)

Currently generates a real PDF with a real structure, but the following
fields are placeholders:

- `{{UEI_NUMBER}}`, `{{NAICS_CODES}}`, `{{CAGE_CODE}}`
- `{{CERTIFICATIONS}}` (e.g. minority/veteran/woman-owned, SAM.gov status)
- `{{PAST_PERFORMANCE_SUMMARY}}`

## FAQ policies (apps/corporate/src/app/faq/page.tsx)

- `{{SECURITY_DEPOSIT_POLICY}}`
- `{{BACKGROUND_CHECK_POLICY}}`

## Legal

- `{{FULL_RENTAL_AGREEMENT_LEGAL_TEXT}}` — the Client Portal e-signature flow
  (`apps/booking/src/app/portal/bookings/[id]/agreement/page.tsx`) currently
  shows a minimal placeholder agreement. Replace with real legal terms
  before any guest actually signs one.

## Photos & branding

- **Logo**: `packages/ui/src/components/Logo.tsx` and
  `packages/config/tailwind.preset.ts` / `packages/ui/src/styles/globals.css`
  use hex values (`#2C6E7F` teal, `#E08A3C` orange) eyeballed from the logo
  image shared in chat — not pixel-sampled from the source file. Confirm
  exact values with a color picker against the original logo asset (ideally
  an SVG/EPS/high-res PNG) and update both files together.
- **All listing photos** are Unsplash stock images marked with a visible
  "Sample Photo" badge (`PropertyCard`, property detail gallery) and
  `isPlaceholder: true` in the database. Replace via the seed data
  (`packages/db/prisma/seed.ts`) or an admin upload flow once real
  photography exists.
- **Sample listings**: all seeded properties except Old West Studio Lofts
  have `isSampleData: true` and a placeholder `{{ADDRESS_PLACEHOLDER}}`
  street address (`packages/db/prisma/seed.ts`). Replace with real inventory
  addresses or remove before launch — they exist only to populate the grid
  for demo purposes.

## Integrations not yet live (all pluggable, see `.env.example`)

- Stripe (checkout runs in sandbox/stub mode without `STRIPE_SECRET_KEY`)
- Twilio SMS (logs to console without credentials)
- DocuSign/HelloSign (stubs an envelope without `ESIGNATURE_API_KEY`)
- Live chat (renders a self-contained stub panel without a Crisp/Intercom
  widget ID — messages still land in the `leads` table)
- Google Maps (property/contact pages show a placeholder box without a key)
- Google Places Reviews (Reviews page shows sample testimonials without
  `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACES_PLACE_ID`)
- Transactional email — no provider is wired up yet at all (Resend,
  SendGrid, Postmark, etc.); lead notifications currently only log a stub
  to the server console. Pick a provider and implement
  `apps/corporate/src/lib/notifications.ts`.
