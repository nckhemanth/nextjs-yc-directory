import { z } from 'zod'

export const pitchAnalysisRequestSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().min(20).max(500),
  category: z.string().trim().min(2).max(40),
  pitch: z.string().trim().min(20).max(8000),
})

export const pitchAnalysisSchema = z.object({
  score: z.number().int().min(1).max(10).describe('Overall investment-readiness score'),
  summary: z.string().min(20).describe('Plain-English summary of the startup pitch'),
  strengths: z.array(z.string()).min(1).max(5),
  risks: z.array(z.string()).min(1).max(5),
  suggestedCategory: z.enum([
    'AI',
    'Developer Tools',
    'Healthcare',
    'Education',
    'Fintech',
    'Consumer',
    'Other',
  ]),
  founderQuestions: z.array(z.string()).min(1).max(5),
})

export type PitchAnalysisRequest = z.infer<typeof pitchAnalysisRequestSchema>
export type PitchAnalysis = z.infer<typeof pitchAnalysisSchema>

