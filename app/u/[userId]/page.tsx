import { ProfileModule } from '@/components/profile/profile-module'

type PublicProfilePageProps = {
  params: {
    userId: string
  }
  searchParams?: {
    page?: string
    pageSize?: string
  }
}

export default function PublicProfilePage({ params, searchParams }: PublicProfilePageProps) {
  return (
    <ProfileModule
      mode="public"
      userId={params.userId}
      initialPage={Number(searchParams?.page ?? 1)}
      initialPageSize={Number(searchParams?.pageSize ?? 20)}
    />
  )
}
