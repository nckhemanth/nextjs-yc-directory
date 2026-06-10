import { createClient } from 'next-sanity'
import { apiVersion, dataset, hasSanityConfig, projectId } from './env'

export { hasSanityConfig }

export const client = createClient({
  projectId: projectId || 'demo-project',
  dataset,
  apiVersion,
  useCdn: true,
})

