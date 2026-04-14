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

export default async function PublicIdeasPage({ params, searchParams }: PublicIdeasPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return (
    <Suspense fallback={null}>
      <ProfileModule
        mode="public-ideas"
        userId={resolvedParams.userId}
        initialPage={Number(resolvedSearchParams?.page ?? 1)}
        initialPageSize={Number(resolvedSearchParams?.pageSize ?? 20)}
      />
    </Suspense>
  )
}
