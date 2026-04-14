import { ProfileModule } from '@/components/profile/profile-module'

type PublicIdeasPageProps = {
  params: {
    userId: string
  }
  searchParams?: {
    page?: string
    pageSize?: string
  }
}

export default function PublicIdeasPage({ params, searchParams }: PublicIdeasPageProps) {
  return (
    <ProfileModule
      mode="public-ideas"
      userId={params.userId}
      initialPage={Number(searchParams?.page ?? 1)}
      initialPageSize={Number(searchParams?.pageSize ?? 20)}
    />
  )
}
