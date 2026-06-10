import { generateText, Output } from 'ai'
import { pitchAnalysisRequestSchema, pitchAnalysisSchema } from '@/schemas/ai'

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = pitchAnalysisRequestSchema.safeParse(json)

  if (!parsed.success) {
    return Response.json(
      {
        error: 'Invalid pitch input.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json(
      {
        error: 'AI_GATEWAY_API_KEY is not configured.',
        hint: 'Add the key server-side in .env.local or the deployment environment.',
      },
      { status: 503 },
    )
  }

  const { title, description, category, pitch } = parsed.data

  const { output } = await generateText({
    model: 'openai/gpt-4.1-mini',
    output: Output.object({
      name: 'PitchAnalysis',
      description: 'Structured analysis for a startup pitch submission.',
      schema: pitchAnalysisSchema,
    }),
    prompt: `
You are reviewing a startup pitch for a YC-style directory.

Title: ${title}
Category: ${category}
Description: ${description}

Pitch:
${pitch}

Return a concise, specific analysis. Do not invent traction or facts that are
not present in the pitch.
    `.trim(),
  })

  return Response.json(output)
}

