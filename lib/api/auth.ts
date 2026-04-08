import { axiosClient } from '@/lib/api/axios-client'
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/types/auth'

export async function loginRequest(payload: LoginRequest) {
  const { data } = await axiosClient.post<LoginResponse>('/auth/login', payload)
  return data
}

export async function signupRequest(payload: SignupRequest) {
  const { data } = await axiosClient.post<SignupResponse>('/auth/register', payload)
  return data
}
