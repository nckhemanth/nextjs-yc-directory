# Create Pitch Flow

```txt
startup/create page
  -> auth() gate
  -> StartupForm client island
  -> createPitch Server Action
  -> Zod validation
  -> Sanity write client
  -> revalidate path/tag
  -> redirect to startup details
```

## Server Action Responsibilities

`lib/actions.ts` owns:

- session check
- form value extraction
- Zod validation
- slug creation
- Sanity document creation
- cache invalidation
- serializable response shape

## Validation Contract

`schemas/pitch.ts` is the source of truth. The UI should help users, but the
Server Action is the real boundary.

