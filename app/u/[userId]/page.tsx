import { Suspense } from 'react'

import { ProfileModule } from '@/components/profile/profile-module'

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

  return (
    <Suspense fallback={null}>
      <ProfileModule
        mode="public"
        userId={resolvedParams.userId}
        initialPage={Number(resolvedSearchParams?.page ?? 1)}
        initialPageSize={Number(resolvedSearchParams?.pageSize ?? 20)}
      />
    </Suspense>
  )
}
