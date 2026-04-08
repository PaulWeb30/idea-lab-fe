export type LoginRequest = {
  identifier: string
  password: string
}

export type LoginFormValues = LoginRequest

export type SignupRequest = {
  email: string
  nickname: string
  name: string
  password: string
}

export type SignupFormValues = SignupRequest

export type LoginResponse = {
  accessToken: string
}

export type SignupResponse = {
  message: string
}

export type ApiErrorResponse = {
  message?: string | string[]
}
