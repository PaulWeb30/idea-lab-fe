import { axiosClient } from '@/lib/api/axios-client'
import type { IdeaCategory } from '@/types/ideas'

export async function getCategories() {
  const { data } = await axiosClient.get<IdeaCategory[]>('/categories')
  return data
}
