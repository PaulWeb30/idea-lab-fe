import { type ComponentType } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function ProfileStateCard({
  icon: Icon,
  title,
  description,
  action
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {action}
      </CardContent>
    </Card>
  )
}

export function ProfileStatCard({
  icon: Icon,
  label,
  value,
  accent = 'default'
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string | number
  accent?: 'default' | 'soft'
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5',
        accent === 'default' ? 'border-border/70 bg-card/95' : 'border-primary/15 bg-primary/5'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}

export function ProfileMetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-secondary/30 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium leading-5">{value}</p>
    </div>
  )
}
