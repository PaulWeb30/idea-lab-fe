export function parsePositiveInteger(value: string | null | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? '', 10)

  if (!Number.isFinite(parsed) || Number.isNaN(parsed) || parsed < 1) {
    return fallback
  }

  return parsed
}

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}
