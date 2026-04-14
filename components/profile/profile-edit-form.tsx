'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { CheckCircle2, Loader2, PencilLine } from 'lucide-react'

import { authFieldErrorClass } from '@/components/auth/styles'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { profileQueryKeys, updateMeProfile } from '@/lib/api/profile'
import { cn } from '@/lib/utils'
import type { ApiErrorResponse } from '@/types/auth'
import type { MeProfile } from '@/types/profile'

type UpdateProfileValues = {
  nickname: string
  name: string
}

function getErrorMessage(error: unknown, fallback: string) {
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

export function ProfileEditForm({
  profile,
  onSuccess
}: {
  profile: MeProfile
  onSuccess?: () => void
}) {
  const queryClient = useQueryClient()
  const [requestError, setRequestError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UpdateProfileValues>({
    defaultValues: {
      nickname: profile.nickname,
      name: profile.name ?? ''
    }
  })

  useEffect(() => {
    reset({
      nickname: profile.nickname,
      name: profile.name ?? ''
    })
  }, [profile.nickname, profile.name, reset])

  const updateMutation = useMutation({
    mutationFn: updateMeProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(profileQueryKeys.me, data)
      setRequestError(null)
      setSuccessMessage('Profile updated successfully.')
      onSuccess?.()
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message = getErrorMessage(error, 'Unable to update profile.')

      if (error.response?.status === 409) {
        setError('nickname', { type: 'server', message: 'That nickname is already in use.' })
        setRequestError(null)
        return
      }

      if (error.response?.status === 400 && message.toLowerCase().includes('nickname')) {
        setError('nickname', { type: 'server', message })
        setRequestError(null)
        return
      }

      setRequestError(message)
    }
  })

  const onSubmit = async (values: UpdateProfileValues) => {
    setRequestError(null)
    setSuccessMessage(null)

    const payload = {
      nickname: values.nickname.trim() || undefined,
      name: values.name.trim() || undefined
    }

    await updateMutation.mutateAsync(payload)
  }

  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <PencilLine className="h-5 w-5 text-primary" />
          Edit profile
        </CardTitle>
        <CardDescription>
          Update your public nickname and display name. Empty values keep the current profile.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              autoComplete="nickname"
              placeholder="anna_2026"
              aria-invalid={Boolean(errors.nickname)}
              className={cn(errors.nickname && 'border-destructive focus-visible:ring-destructive')}
              {...register('nickname', {
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
            {errors.nickname ? (
              <p className={authFieldErrorClass}>{errors.nickname.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Anna K"
              aria-invalid={Boolean(errors.name)}
              className={cn(errors.name && 'border-destructive focus-visible:ring-destructive')}
              {...register('name', {
                minLength: {
                  value: 1,
                  message: 'Name must be at least 1 character'
                }
              })}
            />
            {errors.name ? <p className={authFieldErrorClass}>{errors.name.message}</p> : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isSubmitting || updateMutation.isPending}>
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Save changes
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                reset({
                  nickname: profile.nickname,
                  name: profile.name ?? ''
                })
              }
            >
              Reset
            </Button>
          </div>

          {requestError ? <p className={authFieldErrorClass}>{requestError}</p> : null}
          {successMessage ? (
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {successMessage}
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  )
}
