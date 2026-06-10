import 'server-only'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, writeToken } from './env'

export function assertWriteToken(): string {
  if (!writeToken) {
    throw new Error('SANITY_WRITE_TOKEN is required for write operations')
  }
  return writeToken
}

export const writeClient = createClient({
  projectId: projectId || 'demo-project',
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
})

