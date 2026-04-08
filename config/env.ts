import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .url('NEXT_PUBLIC_API_URL must be a valid URL')
    .transform((value) => value.replace(/\/+$/, ''))
})

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
})

if (!parsedEnv.success) {
  throw new Error(
    `Invalid environment configuration: ${parsedEnv.error.issues
      .map((issue) => issue.message)
      .join(', ')}`
  )
}

export const env = parsedEnv.data
