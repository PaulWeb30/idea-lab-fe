import { Suspense } from 'react'

import { ProfileModule } from '@/components/profile/profile-module'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/profile/pagination'
import { parsePositiveInteger } from '@/lib/profile/utils/number'

type PublicProfilePageProps = {
  params: Promise<{
    userId: string
  }>
  searchParams?: Promise<{
    page?: string
    pageSize?: string
  }>
}

export default async function PublicProfilePage({ params, searchParams }: PublicProfilePageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const initialPage = parsePositiveInteger(resolvedSearchParams?.page, DEFAULT_PAGE)
  const initialPageSize = parsePositiveInteger(resolvedSearchParams?.pageSize, DEFAULT_PAGE_SIZE)

  return (
    <Suspense fallback={null}>
      <ProfileModule
        mode="public"
        userId={resolvedParams.userId}
        initialPage={initialPage}
        initialPageSize={initialPageSize}
      />
    </Suspense>
  )
}
