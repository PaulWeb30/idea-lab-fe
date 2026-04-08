import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { LoginFormCard } from '@/components/auth/login-form-card'

export default function LoginPage() {
  return (
    <AuthPageShell backgroundClassName="bg-auth-login">
      <LoginFormCard />
    </AuthPageShell>
  )
}
