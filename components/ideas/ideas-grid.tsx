'use client'

import { useMemo } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import { IdeaCard } from './idea-card'
import { getIdeas } from '@/lib/api/ideas'
import { getUserById } from '@/lib/api/users'
import { getCategories } from '@/lib/api/categories'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function IdeasGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ideas'],
    queryFn: () => getIdeas()
  })

  const ideaUserIds = useMemo(
    () =>
      Array.from(
        new Set(
          data?.items?.map((idea) => idea.userId).filter(Boolean) ?? [],
        ),
      ),
    [data?.items],
  )

  const userQueries = useQueries({
    queries: ideaUserIds.map((userId) => ({
      queryKey: ['user', userId],
      queryFn: () => getUserById(userId),
      enabled: !!data?.items,
      staleTime: 1000 * 60 * 5,
    })),
  })

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    enabled: !!data?.items,
    staleTime: 1000 * 60 * 5,
  })

  const authorMap = useMemo(
    () =>
      Object.fromEntries(
        userQueries
          .map((query) => query.data)
          .filter((user): user is { id: string; nickname: string; name: string | null } => Boolean(user))
          .map((user) => [user.id, user] as const),
      ),
    [userQueries],
  )

  const categoryMap = useMemo(
    () =>
      Object.fromEntries(
        (categoriesQuery.data ?? []).map((category) => [category.id, category] as const),
      ),
    [categoriesQuery.data],
  )

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load ideas</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (!data?.items || data.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No ideas yet</h3>
        <p className="text-muted-foreground mb-6">Be the first to share your idea!</p>
        <Link href="/ideas/create">
          <Button>Create Your First Idea</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.items.map((idea) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          authorName={
            authorMap[idea.userId]?.name || authorMap[idea.userId]?.nickname || idea.userId
          }
          categoryName={categoryMap[idea.categoryId ?? '']?.name}
        />
      ))}
    </div>
  )
}
