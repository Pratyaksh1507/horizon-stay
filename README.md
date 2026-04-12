# The Wild Oasis

A React + Vite hotel management dashboard for managing cabins, bookings, settings, and staff access.

## What was completed

- Added a proper login screen and protected routes
- Wired Supabase authentication helpers for login, logout, signup, and profile updates
- Finished the account and user-management pages with working forms
- Fixed the check-in route and completed the check-in flow
- Replaced placeholder header/dashboard content with production-ready UI
- Removed the sample-data uploader from the shipped sidebar
- Added deployment support for SPA routing on both Vercel and Netlify
- Added environment variable support with a `.env.example`

## Tech stack

- React 18
- Vite
- React Router
- TanStack Query
- Styled Components
- Supabase

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example`.

3. Start the app:

```bash
npm run dev
```

## Environment variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The project currently includes fallback values in `src/services/supabase.js`, but using a local `.env` file is the safer deployment setup.

## Quality checks

```bash
npm run lint
npm run build
```

## Deploy

### Vercel

1. Import the project into Vercel.
2. Add the two `VITE_SUPABASE_*` environment variables in the Vercel dashboard.
3. Deploy.

`vercel.json` is already included so React Router routes will resolve correctly.

### Netlify

1. Create a new site from this project.
2. Set build command to `npm run build`.
3. Set publish directory to `dist`.
4. Add the two `VITE_SUPABASE_*` environment variables.
5. Deploy.

`public/_redirects` is already included for SPA routing.

## Notes

- Authentication depends on your Supabase project allowing email/password sign-in.
- Avatar updates currently store a browser object URL in user metadata for a lightweight demo-friendly profile flow. If you want, we can turn that into real Supabase Storage uploads next.
