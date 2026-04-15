import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/types/auth'

export function getErrorMessage(error: unknown, fallback: string) {
  if (!error || typeof error !== 'object' || !('response' in error)) {
    return fallback
  }

  const axiosError = error as AxiosError<ApiErrorResponse>
  const message = axiosError.response?.data?.message

  if (Array.isArray(message)) {
    return message.join(', ')
  }

  return message ?? fallback
}

export function getErrorStatus(error: unknown) {
  if (!error || typeof error !== 'object' || !('response' in error)) {
    return undefined
  }

  const axiosError = error as AxiosError<ApiErrorResponse>
  return axiosError.response?.status
}
