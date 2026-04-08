import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { SignupFormCard } from '@/components/auth/signup-form-card'

export default function SignupPage() {
  return (
    <AuthPageShell backgroundClassName="bg-auth-signup">
      <SignupFormCard />
    </AuthPageShell>
  )
}
