# Next.js YC Directory Project

YC Directory style startup pitch application built with the Next.js App Router.

- App Router pages and route groups.
- GitHub auth configuration with author creation hooks.
- Sanity read/write clients, schema types, and GROQ queries.
- Server Action for creating startup pitches.
- Zod validation for forms and AI requests/responses.
- AI SDK 6 structured output route using `generateText` + `Output.object`.
- Cache Components-oriented data functions and Suspense-ready dynamic islands.

## Run

```bash
npm install
npm run typecheck
npm run dev
```

The app has fixture fallbacks so it can typecheck and render without real Sanity
credentials. Real auth, writes, and AI calls require `.env.local` based on
`.env.example`.

## Core Route Tree

```txt
app/
  layout.tsx
  globals.css
  (root)/
    layout.tsx
    page.tsx
    startup/
      [id]/page.tsx
      create/page.tsx
    user/
      [id]/page.tsx
  api/
    ai/pitch-analysis/route.ts
```

## Production Setup

1. Create GitHub OAuth app.
2. Add local callback: `http://localhost:3000/api/auth/callback/github`.
3. Add production callback after deploy.
4. Create Sanity project and dataset.
5. Add deployed URL to Sanity CORS.
6. Create a Sanity write token and keep it server-only.
7. Add AI Gateway/provider key for the AI route.
8. Add Sentry with the official Next.js wizard if monitoring is needed.

## Quality Rule

Do not keep `ignoreBuildErrors` or `ignoreDuringBuilds` as a default. This
project is meant to typecheck cleanly.

## License

MIT

## Connect

GitHub: [@nckhemanth0](https://github.com/nckhemanth0)
