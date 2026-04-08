'use client'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { authCardBaseClass, authFieldErrorClass, authLinkClass } from '@/components/auth/styles'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signupRequest } from '@/lib/api/auth'
import { cn } from '@/lib/utils'
import type { ApiErrorResponse, SignupFormValues } from '@/types/auth'

export function SignupFormCard() {
  const [requestError, setRequestError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormValues>()

  const signupMutation = useMutation({
    mutationFn: signupRequest,
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message = error.response?.data?.message
      setRequestError(Array.isArray(message) ? message.join(', ') : (message ?? 'Signup failed'))
    },
    onSuccess: () => {
      setRequestError(null)
    }
  })

  const onSubmit = async (data: SignupFormValues) => {
    setRequestError(null)
    await signupMutation.mutateAsync(data)
  }

  return (
    <Card className={`${authCardBaseClass} max-w-lg`}>
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Fill in all fields to register. Password must include one uppercase letter and one number.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                className={cn(errors.name && 'border-destructive focus-visible:ring-destructive')}
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 1,
                    message: 'Name is required'
                  }
                })}
              />
              {errors.name && <p className={authFieldErrorClass}>{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="for example: tom_01"
                autoComplete="username"
                aria-invalid={Boolean(errors.nickname)}
                className={cn(
                  errors.nickname && 'border-destructive focus-visible:ring-destructive'
                )}
                {...register('nickname', {
                  required: 'Nickname is required',
                  minLength: {
                    value: 3,
                    message: 'Nickname must be at least 3 characters'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'Nickname can only contain letters, numbers, and underscores'
                  }
                })}
              />
              {errors.nickname && <p className={authFieldErrorClass}>{errors.nickname.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address'
                }
              })}
            />
            {errors.email && <p className={authFieldErrorClass}>{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              className={cn(errors.password && 'border-destructive focus-visible:ring-destructive')}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[0-9])/,
                  message: 'Password must contain at least one uppercase letter and one number'
                }
              })}
            />
            {errors.password && <p className={authFieldErrorClass}>{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Create account
          </Button>

          {requestError && <p className={authFieldErrorClass}>{requestError}</p>}
          {signupMutation.isSuccess && !requestError && (
            <p className="text-sm font-medium text-green-600">Registration successful.</p>
          )}
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className={authLinkClass}>
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
