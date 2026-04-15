import type { IdeaStatus } from '@/types/ideas'

export function getStatusLabel(status: IdeaStatus): string {
  const labels: Record<IdeaStatus, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    solved: 'Solved'
  }
  return labels[status]
}

export function getStatusColor(status: IdeaStatus): string {
  const colors: Record<IdeaStatus, string> = {
    open: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    solved: 'bg-green-100 text-green-800'
  }
  return colors[status]
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}d ago`
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}
