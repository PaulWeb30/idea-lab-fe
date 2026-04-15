import { Suspense } from 'react'

import { ProfileModule } from '@/components/profile/profile-module'

type PublicIdeasPageProps = {
  params: Promise<{
    userId: string
  }>
  searchParams?: Promise<{
    page?: string
    pageSize?: string
  }>
}

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? '', 10)

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback
  }

  return parsed
}

export default async function PublicIdeasPage({ params, searchParams }: PublicIdeasPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const initialPage = parsePositiveInt(resolvedSearchParams?.page, 1)
  const initialPageSize = parsePositiveInt(resolvedSearchParams?.pageSize, 20)

  return (
    <Suspense fallback={null}>
      <ProfileModule
        mode="public-ideas"
        userId={resolvedParams.userId}
        initialPage={initialPage}
        initialPageSize={initialPageSize}
      />
    </Suspense>
  )
}
