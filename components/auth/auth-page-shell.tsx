import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type AuthPageShellProps = {
  children: ReactNode
  backgroundClassName: string
}

export function AuthPageShell({ children, backgroundClassName }: AuthPageShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className={cn('pointer-events-none absolute inset-0', backgroundClassName)} />
      {children}
    </main>
  )
}
