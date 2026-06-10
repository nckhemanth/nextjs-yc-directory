# Structured Output Route

`app/api/ai/pitch-analysis/route.ts` is the end-to-end AI SDK block.

## Input

Validated by `pitchAnalysisRequestSchema`:

- title
- description
- category
- pitch

## Output

Validated by AI SDK using `Output.object({ schema: pitchAnalysisSchema })`:

- score
- summary
- strengths
- risks
- suggested category
- founder questions

## Why Route Handler

This is a server-only HTTP boundary:

- AI key stays on the server.
- Request can be rate-limited.
- Errors can be monitored.
- UI receives typed JSON.

## Current API

AI SDK 6 structured output:

```ts
const { output } = await generateText({
  model: 'openai/gpt-4.1-mini',
  output: Output.object({ schema: pitchAnalysisSchema }),
  prompt,
})
```

