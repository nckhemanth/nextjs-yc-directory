# Deployment Checklist

## Before Deploy

- `npm run typecheck`
- `npm run build`
- `.env.local` ignored
- `.env.example` has names only
- no raw transcript files
- no quality gates disabled

## External Config

GitHub OAuth:

```txt
http://localhost:3000/api/auth/callback/github
https://your-app.vercel.app/api/auth/callback/github
```

Sanity:

- add deployed domain to CORS
- keep write token server-side
- use `useCdn: false` for auth/read-after-write

AI SDK:

- set `AI_GATEWAY_API_KEY`
- keep model calls in route handlers or server actions

## Smoke Tests

1. Home page loads.
2. Search changes URL params.
3. Details page loads.
4. Login redirects to GitHub.
5. Create page redirects if unauthenticated.
6. Create action validates bad input.
7. AI route returns 400 for bad input.
8. AI route returns 503 when key is missing.

