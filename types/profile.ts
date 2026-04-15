export type ProfileRole = 'user' | 'admin'

export type ProfilePlan = 'free' | 'pro'

export type ProfileStatus = 'open' | 'in_progress' | 'solved'

export type ProfileStats = {
  ideasCount: number
  totalVotes: number
}

export type MeProfile = {
  id: string
  email: string
  nickname: string
  name: string | null
  role: ProfileRole
  plan: ProfilePlan
  createdAt: string
  stats: ProfileStats
}

export type PublicProfile = {
  id: string
  nickname: string
  name: string | null
  createdAt: string
  stats: ProfileStats
}

export type Category = {
  id: string
  name: string
  slug: string
}

export type Idea = {
  id: string
  userId: string
  title: string
  description: string
  categoryId: string | null
  categoryName?: string
  category?: Category
  isContactable: boolean
  status: ProfileStatus
  votesCount: number
  viewsCount: number
  isPromoted: boolean
  createdAt: string
  updatedAt: string
}

export type PaginatedIdeas = {
  items: Idea[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
