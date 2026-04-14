import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ProfileShellProps = {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export function ProfileShell({
  eyebrow,
  title,
  description,
  actions,
  children,
  className
}: ProfileShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_26%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--secondary)/0.28))] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35" />
      <div className={cn('relative mx-auto flex w-full max-w-6xl flex-col gap-6', className)}>
        <header className="rounded-3xl border border-border/70 bg-card/95 p-6 shadow-lg shadow-slate-950/5 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                {eyebrow}
              </p>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                  {description}
                </p>
              </div>
            </div>

            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </header>

        {children}
      </div>
    </main>
  )
}
