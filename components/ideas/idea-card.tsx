'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { IdeaWithUser } from '@/types/ideas'
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/ideas-utils'

interface IdeaCardProps {
  idea: IdeaWithUser
  authorName?: string
  categoryName?: string | null
}

export function IdeaCard({ idea, authorName, categoryName }: IdeaCardProps) {
  const author = idea.user ?? idea.author
  const resolvedAuthorName = authorName ?? (author ? author.name || author.nickname : undefined)
  const resolvedCategoryName = categoryName ?? idea.category?.name
  const finalAuthorName = resolvedAuthorName || idea.userId || 'Unknown'

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(idea.status)}`}>
            {getStatusLabel(idea.status)}
          </span>
          {idea.isPromoted && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800">
              ⭐ Promoted
            </span>
          )}
        </div>
        <Link href={`/ideas/${idea.id}`}>
          <CardTitle className="line-clamp-2 hover:text-primary cursor-pointer transition-colors">
            {idea.title}
          </CardTitle>
        </Link>
        <CardDescription className="text-xs text-muted-foreground">
          by {finalAuthorName}
          {resolvedCategoryName ? ` • ${resolvedCategoryName}` : ''}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow pb-4">
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{idea.description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>👍 {idea.votesCount} votes</span>
          <span>👁️ {idea.viewsCount} views</span>
        </div>
      </CardContent>

      <div className="border-t px-6 py-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{formatDate(idea.createdAt)}</span>
        <Link href={`/ideas/${idea.id}`}>
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  )
}
