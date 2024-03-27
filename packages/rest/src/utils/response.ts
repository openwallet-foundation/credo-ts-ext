import type { ApiError } from '../error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function alternativeResponse<T>(input: T): any {
  return input
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function apiErrorResponse(error: string | Error | unknown, details?: unknown): any {
  const message = typeof error === 'string' ? error : error instanceof Error ? error.message : 'Unknown error'

  return {
    message,
    details,
  } satisfies ApiError
}
