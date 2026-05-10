# AI Numerology Next.js (Scaffold)

This is a Next.js-ready version of your local AI Numerology project.

## Current blocker

Your machine currently has `node` but not `npm`/`npx`, so dependencies cannot be installed yet.

## 1) Install Node with npm

Install official Node.js LTS from:
- https://nodejs.org/

Then verify:

```bash
node -v
npm -v
```

## 2) Run this project

```bash
cd ~/Desktop/ai-numerology-next
npm install
npm run dev
```

Open:
- http://localhost:3000

## 3) Optional AI interpretation

```bash
cp .env.example .env.local
```

Set:

```env
OPENAI_API_KEY=your_key_here
```

Without this key, the app uses a local fallback interpretation.

## What is already implemented

- Next.js App Router scaffold
- API routes:
  - `POST /api/reading`
  - `POST /api/compare`
  - `GET /api/share/:shareId`
- Core numerology logic in `src/lib/numerology.ts`
- Optional AI interpretation hook in `src/lib/ai.ts`
- Frontend test UI in `src/app/page.tsx`

## Next upgrade phase

After this runs, we can add:
- Supabase auth + DB persistence
- Stripe subscription/paywall
- Share cards as social images
- Admin metrics dashboard
