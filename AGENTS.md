# AGENTS.md

This is the public YC Directory style Next.js project repo.

If the private `workspace` hub is available, read this first:

- `workspace/context/repos/nextjs-yc-directory/CONTEXT.md`
- `workspace/context/repos/nextjs-yc-directory/CHANGELOG.md`

Rules:

- Do not commit secrets, `.env` values, raw transcripts, or private notes.
- Keep the app runnable without real service credentials by using safe fixture fallbacks where possible.
- Keep production code paths explicit: Auth.js, Sanity read/write split, Zod validation, AI SDK structured output.
- Do not disable TypeScript or lint checks as a default deployment strategy.

