# AI SDK Structured Output Flow

This project intentionally treats AI output like API data, not prose.

## Flow

```txt
client/editor
  -> POST /api/ai/pitch-analysis
  -> Zod validates request
  -> AI SDK generateText uses Output.object({ schema })
  -> SDK validates model output
  -> route returns typed JSON
```

## Input Contract

Defined in `schemas/ai.ts`:

```ts
export const pitchAnalysisRequestSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().min(20).max(500),
  category: z.string().trim().min(2).max(40),
  pitch: z.string().trim().min(20).max(8000),
})
```

## Output Contract

```ts
export const pitchAnalysisSchema = z.object({
  score: z.number().int().min(1).max(10),
  summary: z.string().min(20),
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
```

## Current API

AI SDK 6 uses:

```ts
import { generateText, Output } from 'ai'

const { output } = await generateText({
  model: 'openai/gpt-4.1-mini',
  output: Output.object({ schema: pitchAnalysisSchema }),
  prompt,
})
```

Older examples may use `generateObject`. The core idea is the same: schema-first
structured generation with runtime validation.

