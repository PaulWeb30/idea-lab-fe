'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { ArrowLeft, LayoutGrid, Loader2, LogOut, PencilLine, UserRound } from 'lucide-react'

import { IdeasList } from '@/components/profile/ideas-list'
import { ProfileEditForm } from '@/components/profile/profile-edit-form'
import { ProfileOverviewCard } from '@/components/profile/profile-overview-card'
import { ProfileShell } from '@/components/profile/profile-shell'
import { ErrorState, LoadingState } from '@/components/profile/profile-states'
import { Button } from '@/components/ui/button'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE,
  MAX_PAGE_SIZE,
  MIN_PAGE,
  MIN_PAGE_SIZE
} from '@/constants/profile/pagination'
import {
  fetchMeIdeas,
  fetchMeProfile,
  fetchPublicIdeas,
  fetchPublicProfile,
  logoutFromBackend,
  profileQueryKeys
} from '@/lib/api/profile'
import { getErrorMessage, getErrorStatus } from '@/lib/profile/utils/error'
import { clamp, parsePositiveInteger } from '@/lib/profile/utils/number'
import type { MeProfile, PublicProfile } from '@/types/profile'

type ProfileMode = 'me' | 'edit' | 'me-ideas' | 'public' | 'public-ideas'

type ProfileModuleProps = {
  mode: ProfileMode
  userId?: string
  initialPage?: number
  initialPageSize?: number
}

export function ProfileModule({
  mode,
  userId,
  initialPage = DEFAULT_PAGE,
  initialPageSize = DEFAULT_PAGE_SIZE
}: ProfileModuleProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isPublicMode = mode === 'public' || mode === 'public-ideas'
  const needsIdeas = mode === 'me-ideas' || mode === 'public-ideas'
  const page = clamp(
    parsePositiveInteger(searchParams.get('page'), initialPage),
    MIN_PAGE,
    MAX_PAGE
  )
  const pageSize = clamp(
    parsePositiveInteger(searchParams.get('pageSize'), initialPageSize),
    MIN_PAGE_SIZE,
    MAX_PAGE_SIZE
  )

  const profileQuery = useQuery({
    queryKey: isPublicMode ? profileQueryKeys.public(userId ?? '') : profileQueryKeys.me,
    queryFn: () => {
      if (isPublicMode) {
        return fetchPublicProfile(userId ?? '')
      }

      return fetchMeProfile()
    },
    enabled: isPublicMode ? Boolean(userId) : true,
    retry: false
  })

  const ideasQuery = useQuery({
    queryKey: isPublicMode
      ? profileQueryKeys.publicIdeas(userId ?? '', page, pageSize)
      : profileQueryKeys.meIdeas(page, pageSize),
    queryFn: () => {
      if (isPublicMode) {
        return fetchPublicIdeas(userId ?? '', { page, pageSize })
      }

      return fetchMeIdeas({ page, pageSize })
    },
    enabled: needsIdeas && (isPublicMode ? Boolean(userId) : true),
    retry: false
  })

  const logoutMutation = useMutation({
    mutationFn: logoutFromBackend,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['profile'] })
      router.push('/login')
    }
  })

  const publicProfile = isPublicMode ? (profileQuery.data as PublicProfile | undefined) : undefined
  const privateProfile = !isPublicMode ? (profileQuery.data as MeProfile | undefined) : undefined
  const currentProfile = (publicProfile ?? privateProfile) as PublicProfile | MeProfile | undefined

  const updateSearchParams = (nextPage: number, nextPageSize: number) => {
    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.set('page', String(nextPage))
    nextParams.set('pageSize', String(nextPageSize))
    router.replace(`${pathname}?${nextParams.toString()}`)
  }

  const pageTitle = useMemo(() => {
    if (mode === 'edit') {
      return 'Edit your profile'
    }

    if (mode === 'me-ideas') {
      return 'My profile'
    }

    if (mode === 'public-ideas') {
      return publicProfile ? `${publicProfile.nickname}'s ideas` : 'Public ideas'
    }

    if (mode === 'public') {
      return publicProfile ? `${publicProfile.nickname}'s profile` : 'Public profile'
    }

    return 'Your profile'
  }, [mode, publicProfile])

  const pageDescription = useMemo(() => {
    if (mode === 'edit') {
      return 'Change the nickname and display name that appear across the app.'
    }

    if (mode === 'me-ideas') {
      return 'Your profile with your ideas, votes, and visibility settings.'
    }

    if (mode === 'public-ideas') {
      return 'Browse the selected user ideas with shareable pagination.'
    }

    if (mode === 'public') {
      return 'A public profile view that can be embedded anywhere in the app.'
    }

    return 'Account overview, profile stats, and quick actions.'
  }, [mode])

  if (!isPublicMode && profileQuery.error) {
    const status = getErrorStatus(profileQuery.error)

    if (status === 401) {
      return (
        <ErrorState
          title="Sign in required"
          description="Your session is missing or expired. Log in again to access profile data."
          action={
            <Button asChild>
              <Link href="/login">Go to login</Link>
            </Button>
          }
        />
      )
    }

    return (
      <ErrorState
        title="Unable to load profile"
        description={getErrorMessage(profileQuery.error, 'Please try again.')}
        action={
          <Button variant="outline" onClick={() => profileQuery.refetch()}>
            Try again
          </Button>
        }
      />
    )
  }

  if (isPublicMode && profileQuery.error) {
    const status = getErrorStatus(profileQuery.error)

    if (status === 404) {
      return (
        <ErrorState
          title="User not found"
          description="The requested public profile does not exist or is unavailable."
          action={
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          }
        />
      )
    }

    return (
      <ErrorState
        title="Unable to load public profile"
        description={getErrorMessage(profileQuery.error, 'Please try again.')}
        action={
          <Button variant="outline" onClick={() => profileQuery.refetch()}>
            Try again
          </Button>
        }
      />
    )
  }

  if (profileQuery.isPending || (needsIdeas && ideasQuery.isPending && !ideasQuery.data)) {
    return <LoadingState />
  }

  if (!currentProfile) {
    return <LoadingState />
  }

  const heroActionButtons =
    mode === 'edit' ? (
      <Button asChild variant="outline">
        <Link href="/profile">
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>
      </Button>
    ) : mode === 'me-ideas' ? (
      <>
        <Button asChild variant="outline">
          <Link href="/profile/edit">
            <PencilLine className="h-4 w-4" />
            Edit profile
          </Link>
        </Button>
        <Button
          variant="destructive"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Logging out
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4" />
              Log out
            </>
          )}
        </Button>
      </>
    ) : mode === 'public-ideas' ? (
      <Button asChild variant="outline">
        <Link href={`/u/${userId ?? ''}`}>
          <UserRound className="h-4 w-4" />
          Profile
        </Link>
      </Button>
    ) : mode === 'public' ? (
      <Button asChild variant="outline">
        <Link href={`/u/${userId ?? ''}/ideas`}>
          <LayoutGrid className="h-4 w-4" />
          View ideas
        </Link>
      </Button>
    ) : (
      <>
        <Button asChild variant="outline">
          <Link href="/profile/edit">
            <PencilLine className="h-4 w-4" />
            Edit profile
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/profile/my-ideas">
            <LayoutGrid className="h-4 w-4" />
            My ideas
          </Link>
        </Button>
        <Button
          variant="destructive"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Logging out
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4" />
              Log out
            </>
          )}
        </Button>
      </>
    )

  return (
    <ProfileShell
      eyebrow={mode.startsWith('public') ? 'Profile directory' : 'Account hub'}
      title={pageTitle}
      description={pageDescription}
      actions={heroActionButtons}
    >
      <section className="space-y-6">
        <ProfileOverviewCard
          currentProfile={currentProfile}
          isPublicMode={isPublicMode}
          privateProfile={privateProfile}
        />

        {mode === 'edit' && privateProfile ? (
          <ProfileEditForm profile={privateProfile} onSuccess={() => router.refresh()} />
        ) : null}

        {needsIdeas ? (
          <IdeasList
            data={ideasQuery.data}
            page={page}
            pageSize={pageSize}
            pathname={pathname}
            currentSearch={searchParams.toString()}
            onPageSizeChange={(nextPageSize) => updateSearchParams(1, nextPageSize)}
            isLoading={ideasQuery.isPending}
          />
        ) : null}

        {needsIdeas && ideasQuery.error ? (
          <ErrorState
            title="Unable to load ideas"
            description={getErrorMessage(ideasQuery.error, 'Please try again.')}
            action={
              <Button variant="outline" onClick={() => ideasQuery.refetch()}>
                Try again
              </Button>
            }
          />
        ) : null}
      </section>
    </ProfileShell>
  )
}
