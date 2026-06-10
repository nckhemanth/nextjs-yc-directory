import type { PitchActionState } from '@/types'

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function parseServerActionResponse<T>(response: T): T {
  return JSON.parse(JSON.stringify(response)) as T
}

export function actionError(
  error: string,
  extra: Omit<PitchActionState, 'status' | 'error'> = {},
): PitchActionState {
  return parseServerActionResponse({
    status: 'ERROR',
    error,
    ...extra,
  })
}

