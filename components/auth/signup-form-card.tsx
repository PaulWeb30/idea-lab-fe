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

export function SignupFormCard() {
  return (
    <Card className={`${authCardBaseClass} max-w-lg`}>
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Fill in all fields to register. Password must include one uppercase letter and one number.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" action="#" method="post">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                minLength={1}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                required
                minLength={3}
                pattern="^[a-zA-Z0-9_]+$"
                title="Nickname can only contain letters, numbers, and underscores"
                placeholder="for example: pasha_01"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
              title="Password must contain at least one uppercase letter and one number"
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className={authLinkClass}>
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
