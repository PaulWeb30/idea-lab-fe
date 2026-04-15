import axios, { type AxiosResponse } from 'axios'

import { axiosClient } from '@/lib/api/axios-client'
import type { MeProfile, PaginatedIdeas, PublicProfile } from '@/types/profile'
import type { UpdateProfilePayload } from '@/types/api/profile'
import type { ApiErrorResponse, LoginResponse } from '@/types/auth'

export type ProfileErrorResponse = ApiErrorResponse

const ACCESS_TOKEN_KEY = 'accessToken'

export const profileQueryKeys = {
  me: ['profile', 'me'] as const,
  meIdeas: (page: number, pageSize: number) => ['profile', 'me', 'ideas', page, pageSize] as const,
  public: (userId: string) => ['profile', 'public', userId] as const,
  publicIdeas: (userId: string, page: number, pageSize: number) =>
    ['profile', 'public', userId, 'ideas', page, pageSize] as const
}

export function getStoredAccessToken() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setStoredAccessToken(accessToken: string) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

export function clearStoredAccessToken() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
}

function buildAuthHeaders(accessToken?: string) {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined
}

function isUnauthorizedError(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 401
}

async function refreshAccessToken() {
  const { data } = await axiosClient.post<LoginResponse>('/auth/refresh', undefined, {
    withCredentials: true
  })

  setStoredAccessToken(data.accessToken)
  return data.accessToken
}

async function requestWithRefresh<T>(
  requestFactory: (accessToken?: string) => Promise<AxiosResponse<T>>
) {
  const accessToken = getStoredAccessToken() ?? undefined

  try {
    const { data } = await requestFactory(accessToken)
    return data
  } catch (error) {
    if (!isUnauthorizedError(error)) {
      throw error
    }

    const refreshedAccessToken = await refreshAccessToken()
    const { data } = await requestFactory(refreshedAccessToken)
    return data
  }
}

export async function fetchMeProfile() {
  return requestWithRefresh<MeProfile>((accessToken) =>
    axiosClient.get<MeProfile>('/users/me', {
      headers: buildAuthHeaders(accessToken)
    })
  )
}

export async function updateMeProfile(payload: UpdateProfilePayload) {
  return requestWithRefresh<MeProfile>((accessToken) =>
    axiosClient.put<MeProfile>('/users/me', payload, {
      headers: buildAuthHeaders(accessToken)
    })
  )
}

export async function fetchMeIdeas(params: { page: number; pageSize: number }) {
  return requestWithRefresh<PaginatedIdeas>((accessToken) =>
    axiosClient.get<PaginatedIdeas>('/users/me/ideas', {
      params,
      headers: buildAuthHeaders(accessToken)
    })
  )
}

export async function fetchPublicProfile(userId: string) {
  const { data } = await axiosClient.get<PublicProfile>(`/users/${userId}`)
  return data
}

export async function fetchPublicIdeas(userId: string, params: { page: number; pageSize: number }) {
  const { data } = await axiosClient.get<PaginatedIdeas>(`/users/${userId}/ideas`, {
    params
  })

  return data
}

export async function logoutFromBackend() {
  const accessToken = getStoredAccessToken() ?? undefined

  try {
    const { data } = await axiosClient.post<{ message: string }>('/auth/logout', undefined, {
      headers: buildAuthHeaders(accessToken)
    })

    return data
  } finally {
    clearStoredAccessToken()
  }
}
