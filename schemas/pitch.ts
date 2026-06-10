import { z } from 'zod'

export const startupPitchSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().min(20).max(500),
  category: z.string().trim().min(2).max(40),
  imageUrl: z.string().trim().url(),
  pitch: z.string().trim().min(20).max(8000),
})

export type StartupPitchInput = z.infer<typeof startupPitchSchema>

