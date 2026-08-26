# NINETY V1 — Foundation Build

This is the first **real product foundation**, not another disposable PWA mockup.

## Included
- Next.js / React project structure
- NINETY design tokens and approved Apple-inspired light UI
- Fuchsia NINETY brand accent
- Real reusable Today screen components
- Progress rings
- Weight journey card
- Training, readiness, insight, BodyScan/Trend/Achievement widgets
- Typed data model
- Supabase-ready browser client
- SQL database schema for:
  - profiles/goals
  - daily check-ins
  - nutrition and water
  - workout templates and exercise sets
  - recovery logs
  - BodyScan metadata
  - tennis sessions
- Row-level security policies

## Important
The Today screen currently uses a mock-data adapter so the UI can run before a backend account is connected.
The architecture is deliberately set up so the adapter can be replaced by authenticated Supabase queries without rewriting the UI.

## Run locally
1. Install Node.js 20+
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`

## Connect a backend
1. Create a Supabase project.
2. Run `supabase/schema.sql` in Supabase SQL Editor.
3. Copy `.env.example` to `.env.local`.
4. Add your Supabase URL and anon key.
5. The next build phase replaces `lib/today.ts` mock data with real authenticated queries.

## Build sequence from here
1. Authentication + real Today data
2. Workout templates
3. Live workout logger + automatic rest timer
4. Workout summary + PR history
5. Nutrition
6. Recovery/readiness
7. BodyScan
8. Progress
9. Tennis
10. Secure coach-data endpoint

This repository is the base we expand instead of throwing away.
