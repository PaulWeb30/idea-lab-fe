'use client'

import Link from 'next/link'
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
import { cn } from '@/lib/utils'

type LoginFormValues = {
  identifier: string
  password: string
}

export function LoginFormCard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>()

  const onSubmit = async () => {
    // todo connect to API
  }

  return (
    <Card className={`${authCardBaseClass} max-w-md`}>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in with your username or email and password.</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <Label htmlFor="identifier">Username or email</Label>
            <Input
              id="identifier"
              type="text"
              placeholder="tom123"
              autoComplete="username"
              aria-invalid={Boolean(errors.identifier)}
              className={cn(
                errors.identifier && 'border-destructive focus-visible:ring-destructive'
              )}
              {...register('identifier', {
                required: 'Username or email is required',
                minLength: {
                  value: 3,
                  message: 'Identifier must be at least 3 characters'
                }
              })}
            />
            {errors.identifier && (
              <p className={authFieldErrorClass}>{errors.identifier.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              className={cn(errors.password && 'border-destructive focus-visible:ring-destructive')}
              {...register('password', {
                required: 'Password is required'
              })}
            />
            {errors.password && <p className={authFieldErrorClass}>{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Log in
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          No account yet?{' '}
          <Link href="/signup" className={authLinkClass}>
            Create one
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
