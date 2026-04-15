import Link from 'next/link'
import { Lightbulb } from 'lucide-react'

import { IdeaCard } from '@/components/profile/idea-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PROFILE_PAGE_SIZE_OPTIONS } from '@/constants/profile/pagination'
import { buildIdeasUrlWithCurrentSearch } from '@/lib/profile/utils/url'
import { cn } from '@/lib/utils'
import type { PaginatedIdeas } from '@/types/profile'

export function IdeasList({
  data,
  page,
  pageSize,
  pathname,
  currentSearch,
  onPageSizeChange,
  isLoading
}: {
  data?: PaginatedIdeas
  page: number
  pageSize: number
  pathname: string
  currentSearch: string
  onPageSizeChange: (nextPageSize: number) => void
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
          <div className="h-24 animate-pulse rounded-2xl bg-muted/70" />
          <div className="h-24 animate-pulse rounded-2xl bg-muted/70" />
          <div className="h-24 animate-pulse rounded-2xl bg-muted/70" />
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return null
  }

  const totalPages = Math.max(data.totalPages, 1)

  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-xl">Ideas</CardTitle>
          <CardDescription>
            Showing {data.items.length} of {data.total} ideas across {data.totalPages} pages.
          </CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <label className="text-sm font-medium text-muted-foreground" htmlFor="page-size">
            Page size
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="h-10 min-w-[128px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {PROFILE_PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 p-6 pt-0">
        {data.items.length > 0 ? (
          <div className="space-y-4">
            {data.items.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 bg-secondary/30 px-6 py-10 text-center">
            <Lightbulb className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">No ideas yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              This profile does not have any published ideas in the selected range.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              disabled={page <= 1}
              className={cn(page <= 1 && 'pointer-events-none opacity-50')}
            >
              <Link
                href={buildIdeasUrlWithCurrentSearch(
                  pathname,
                  currentSearch,
                  Math.max(page - 1, 1),
                  pageSize
                )}
              >
                Previous
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              className={cn(page >= totalPages && 'pointer-events-none opacity-50')}
            >
              <Link
                href={buildIdeasUrlWithCurrentSearch(
                  pathname,
                  currentSearch,
                  Math.min(page + 1, totalPages),
                  pageSize
                )}
              >
                Next
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
