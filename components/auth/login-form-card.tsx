import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authCardBaseClass, authLinkClass } from '@/components/auth/styles'

export function LoginFormCard() {
  return (
    <Card className={`${authCardBaseClass} max-w-md`}>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in with your username or email and password.</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" action="#" method="post">
          <div className="space-y-2">
            <Label htmlFor="identifier">Username or email</Label>
            <Input
              id="identifier"
              name="identifier"
              type="text"
              required
              minLength={3}
              placeholder="tom123"
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          No account yet?{' '}
          <Link href="/signup" className={authLinkClass}>
            Create one
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
