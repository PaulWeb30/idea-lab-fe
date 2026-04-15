import type { UpdateProfilePayload } from '@/types/api/profile'

export function getInitials(name: string | null, nickname: string) {
  const source = name?.trim() || nickname

  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
    .slice(0, 2)
}

export function normalizeProfileValue(value: string | null | undefined) {
  const normalized = (value ?? '').trim()
  return normalized.length > 0 ? normalized : null
}

export function buildProfileUpdatePayload({
  nextNickname,
  nextName,
  currentNickname,
  currentName
}: {
  nextNickname: string | null
  nextName: string | null
  currentNickname: string | null
  currentName: string | null
}): UpdateProfilePayload {
  const payload: UpdateProfilePayload = {}

  if (nextNickname !== currentNickname && nextNickname !== null) {
    payload.nickname = nextNickname
  }

  if (nextName !== currentName && nextName !== null) {
    payload.name = nextName
  }

  return payload
}
