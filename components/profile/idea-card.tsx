import { Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'
import { formatDate, formatDateTime } from '@/lib/profile/utils/date'
import { resolveCategory } from '@/lib/profile/utils/idea'
import type { Idea } from '@/types/profile'

export function IdeaCard({ idea }: { idea: Idea }) {
  const categoryLabel = resolveCategory(idea)

  return (
    <article className="rounded-2xl border border-border/70 bg-card/95 p-6 shadow-sm">
      {/* Header with title, promoted badge, and action button */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold tracking-tight">{idea.title}</h3>
          {idea.isPromoted ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
              <Sparkles className="h-3 w-3" />
              Promoted
            </span>
          ) : null}
        </div>

        {/* Status/Action Badge */}
        <div
          className={cn(
            'inline-flex w-fit items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
            idea.status === 'solved' &&
              'border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
            idea.status === 'in_progress' &&
              'border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300',
            idea.status === 'open' &&
              'border-blue-500/30 bg-blue-500/15 text-blue-700 dark:text-blue-300'
          )}
        >
          {idea.status === 'open' ? 'Open' : idea.status.replace('_', ' ')}
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {idea.description}
      </p>

      {/* Stats Grid */}
      <div className="mb-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Votes
          </p>
          <p className="mt-1 text-base font-bold text-foreground">{idea.votesCount}</p>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Views
          </p>
          <p className="mt-1 text-base font-bold text-foreground">{idea.viewsCount}</p>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Updated
          </p>
          <p
            className="mt-1 text-sm font-medium text-foreground"
            title={formatDateTime(idea.updatedAt)}
          >
            {formatDate(idea.updatedAt)}
          </p>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Created
          </p>
          <p
            className="mt-1 text-sm font-medium text-foreground"
            title={formatDateTime(idea.createdAt)}
          >
            {formatDate(idea.createdAt)}
          </p>
        </div>
      </div>

      {/* Footer with metadata */}
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border border-border/60 px-3 py-1">
          Contactable: {idea.isContactable ? 'Yes' : 'No'}
        </span>
        <span
          className="max-w-full truncate rounded-full border border-border/60 px-3 py-1"
          title={categoryLabel}
        >
          Category: {categoryLabel}
        </span>
      </div>
    </article>
  )
}
