import { Suspense } from 'react'

import { ProfileModule } from '@/components/profile/profile-module'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/profile/pagination'
import { parsePositiveInteger } from '@/lib/profile/utils/number'

type PublicIdeasPageProps = {
  params: Promise<{
    userId: string
  }>
  searchParams?: Promise<{
    page?: string
    pageSize?: string
  }>
}

export default async function PublicIdeasPage({ params, searchParams }: PublicIdeasPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const initialPage = parsePositiveInteger(resolvedSearchParams?.page, DEFAULT_PAGE)
  const initialPageSize = parsePositiveInteger(resolvedSearchParams?.pageSize, DEFAULT_PAGE_SIZE)

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
