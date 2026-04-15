import { Suspense } from 'react'

import { ProfileModule } from '@/components/profile/profile-module'

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileModule mode="me" />
    </Suspense>
  )
}
