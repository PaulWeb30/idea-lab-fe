export type IdeaStatus = 'open' | 'in_progress' | 'solved'

export type Idea = {
  id: string
  userId: string
  title: string
  description: string
  categoryId: string | null
  isContactable: boolean
  status: IdeaStatus
  votesCount: number
  viewsCount: number
  isPromoted: boolean
  createdAt: string
  updatedAt: string
}

export type IdeaUser = {
  id: string
  nickname: string
  name: string | null
}

export type IdeaCategory = {
  id: string
  name: string
  slug: string
}

export type IdeaWithUser = Idea & {
  user?: IdeaUser
  author?: IdeaUser
  category?: IdeaCategory | null
}

export type GetIdeasResponse = {
  items: IdeaWithUser[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
