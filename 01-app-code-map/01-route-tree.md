# Route Tree

This repo is the application code companion to the `Next.js` learning repo.

```txt
app/
  layout.tsx
  globals.css
  global-error.tsx
  (root)/
    layout.tsx
    loading.tsx
    error.tsx
    not-found.tsx
    page.tsx
    startup/
      [id]/page.tsx
      create/page.tsx
    user/
      [id]/page.tsx
  api/
    auth/[...nextauth]/route.ts
    ai/pitch-analysis/route.ts
```

## What Each Route Demonstrates

| Route | Demonstrates |
|---|---|
| `/` | Server-rendered feed, URL search params, cached reads |
| `/startup/[id]` | Dynamic params, metadata, parallel fetching, Suspense view counter |
| `/startup/create` | Auth gate, Client Component form, Server Action mutation |
| `/user/[id]` | Profile page, author-specific dynamic content |
| `/api/auth/[...nextauth]` | Auth.js route handler |
| `/api/ai/pitch-analysis` | AI SDK structured output with Zod |

## Read Order

1. `app/(root)/page.tsx`
2. `components/search-form.tsx`
3. `lib/data.ts`
4. `app/(root)/startup/[id]/page.tsx`
5. `components/startup-form.tsx`
6. `lib/actions.ts`
7. `app/api/ai/pitch-analysis/route.ts`

