import { IDEA_CATEGORY_ID_REGEX } from '@/constants/profile/idea'
import type { Idea } from '@/types/profile'

export function resolveCategory(idea: Idea): string {
  const candidates = [idea.categoryName?.trim(), idea.category?.name?.trim()]

  for (const candidate of candidates) {
    if (candidate && !IDEA_CATEGORY_ID_REGEX.test(candidate)) {
      return candidate
    }
  }

  return 'Uncategorized'
}
