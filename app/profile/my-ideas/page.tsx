import { Suspense } from 'react'

import { ProfileModule } from '@/components/profile/profile-module'

export default function MyIdeasPage() {
  return (
    <Suspense fallback={null}>
      <ProfileModule mode="me-ideas" />
    </Suspense>
  )
}
