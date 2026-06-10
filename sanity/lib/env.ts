export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = process.env.SANITY_API_VERSION ?? '2026-03-31'
export const writeToken = process.env.SANITY_WRITE_TOKEN

export const hasSanityConfig = Boolean(projectId && dataset)

