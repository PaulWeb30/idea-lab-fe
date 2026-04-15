'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { IdeaWithUser } from '@/types/ideas'
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/ideas-utils'
import { addIdeaView, voteIdea } from '@/lib/api/ideas'

interface IdeaCardProps {
  idea: IdeaWithUser
  authorName?: string
  categoryName?: string | null
}

export function IdeaCard({ idea, authorName, categoryName }: IdeaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasSentView, setHasSentView] = useState(false)
  const [localViewsCount, setLocalViewsCount] = useState(idea.viewsCount)
  const [localVotesCount, setLocalVotesCount] = useState(idea.votesCount)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const author = idea.user ?? idea.author
  const resolvedAuthorName = authorName ?? (author ? author.name || author.nickname : undefined)
  const resolvedCategoryName = categoryName ?? idea.category?.name
  const finalAuthorName = resolvedAuthorName || idea.userId || 'Unknown'

  const viewMutation = useMutation<{ viewsCount: number }, unknown, void>({
    mutationFn: () => addIdeaView(idea.id),
    onSuccess: (data) => {
      setLocalViewsCount(data.viewsCount)
      setHasSentView(true)
    },
  })

  const voteMutation = useMutation<{ votesCount: number }, unknown, void>({
    mutationFn: () => voteIdea(idea.id),
    onSuccess: (data) => {
      setLocalVotesCount(data.votesCount)
      setHasVoted(true)
    },
  })

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken')
      setIsAuthorized(Boolean(token))
    }

    checkAuth()

    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    const startTimer = () => {
      clearTimer()
      timerRef.current = setTimeout(() => {
        if (document.visibilityState === 'visible' && !hasSentView) {
          viewMutation.mutate()
        }
        timerRef.current = null
      }, 10000)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        clearTimer()
      } else if (isExpanded && !hasSentView) {
        startTimer()
      }
    }

    if (isExpanded && !hasSentView && document.visibilityState === 'visible') {
      startTimer()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearTimer()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isExpanded, hasSentView, viewMutation])

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
        <CardTitle className="line-clamp-2">
          {idea.title}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          by {finalAuthorName}
          {resolvedCategoryName ? ` • ${resolvedCategoryName}` : ''}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow pb-4">
        <div className="mb-3">
          {isExpanded ? (
            <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2 px-0 text-primary"
            onClick={() => setIsExpanded((value) => !value)}
          >
            {isExpanded ? 'Show less' : 'More'}
          </Button>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>👍 {localVotesCount} votes</span>
          <span>👁️ {localViewsCount} views</span>
        </div>
      </CardContent>

      <div className="border-t px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">{formatDate(idea.createdAt)}</span>
        {isAuthorized ? (
          <Button
            type="button"
            size="sm"
            disabled={voteMutation.status === 'pending' || hasVoted}
            onClick={() => voteMutation.mutate()}
          >
            {hasVoted ? 'Voted' : 'Vote'}
          </Button>
        ) : (
          <Link href="/login">
            <Button size="sm" variant="outline">
              Login to vote
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}
