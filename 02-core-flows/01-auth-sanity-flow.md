# Auth and Sanity Author Flow

The login path creates a durable Sanity author for the GitHub user.

```txt
GitHub OAuth success
  -> signIn callback
  -> fresh Sanity read by githubId
  -> create author if missing
  -> jwt callback fresh-read author
  -> session callback exposes author _id as session.id
```

## Why Fresh Reads Matter

Auth callbacks use:

```ts
client.withConfig({ useCdn: false })
```

This avoids the read-after-write cache bug where the author exists in Sanity but
the next callback reads a stale CDN response.

## Security

- GitHub OAuth secrets are server-side.
- Sanity write token is server-side.
- `write-client.ts` imports `server-only`.
- Client UI receives only the safe `session.id` and public user fields.

