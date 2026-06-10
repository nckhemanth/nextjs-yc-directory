# AGENTS.md

This repo contains a public YC Directory style Next.js application skeleton.

Rules:

- Do not commit secrets, `.env` values, raw transcripts, or local notes.
- Keep the app runnable without real service credentials by using safe fixture fallbacks where possible.
- Keep production code paths explicit: Auth.js, Sanity read/write split, Zod validation, AI SDK structured output.
- Do not disable TypeScript or lint checks as a default deployment strategy.
