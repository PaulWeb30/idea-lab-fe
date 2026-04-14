import { axiosClient } from '@/lib/api/axios-client'
import type { GetIdeasResponse, IdeaWithUser } from '@/types/ideas'

export async function getIdeas(params?: { page?: number; limit?: number }) {
  const { data } = await axiosClient.get<GetIdeasResponse>('/ideas', {
    params: {
      page: params?.page || 1,
      pageSize: params?.limit || 10
    }
  })
  return data
}

export async function getIdeaById(id: string) {
  const { data } = await axiosClient.get<IdeaWithUser>(`/ideas/${id}`)
  return data
}
