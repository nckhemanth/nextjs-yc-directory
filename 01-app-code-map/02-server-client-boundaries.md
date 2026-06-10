# Server and Client Boundaries

Server by default:

- `app/(root)/page.tsx`
- `app/(root)/startup/[id]/page.tsx`
- `components/navbar.tsx`
- `components/views.tsx`
- `lib/data.ts`

Client only where needed:

- `components/startup-form.tsx`
- `app/(root)/error.tsx`
- `app/global-error.tsx`

## Why `startup-form.tsx` Is Client-side

It uses:

- `useActionState`
- `useEffect`
- `useRouter`
- form state after validation errors

The mutation itself stays server-side in `lib/actions.ts`.

## Why `navbar.tsx` Can Stay Server-side

It reads the session with `auth()` and uses server-action forms for login/logout.
No client state is needed for the basic auth controls.

