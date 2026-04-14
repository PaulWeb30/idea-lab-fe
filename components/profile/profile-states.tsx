import { RefreshCcw } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export function LoadingState() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div className="h-6 w-28 animate-pulse rounded-full bg-muted" />
          <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-muted/70" />
          <div className="h-4 w-full animate-pulse rounded-full bg-muted/70" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-muted/70" />
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="h-24 animate-pulse rounded-2xl bg-muted/70" />
            <div className="h-24 animate-pulse rounded-2xl bg-muted/70" />
            <div className="h-24 animate-pulse rounded-2xl bg-muted/70" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardContent className="space-y-3 p-6">
          <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-full bg-muted/70" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-muted/70" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted/70" />
        </CardContent>
      </Card>
    </div>
  )
}

export function ErrorState({
  title,
  description,
  action
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardContent className="flex flex-col items-start gap-4 p-6">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-3 text-destructive">
          <RefreshCcw className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
        {action}
      </CardContent>
    </Card>
  )
}
