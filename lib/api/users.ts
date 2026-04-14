import { axiosClient } from '@/lib/api/axios-client'
import type { IdeaUser } from '@/types/ideas'

export async function getUserById(id: string) {
  const { data } = await axiosClient.get<IdeaUser>(`/users/${id}`)
  return data
}
