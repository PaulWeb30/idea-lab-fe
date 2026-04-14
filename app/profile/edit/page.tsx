import { Suspense } from 'react'

import { ProfileModule } from '@/components/profile/profile-module'

export default function EditProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileModule mode="edit" />
    </Suspense>
  )
}
