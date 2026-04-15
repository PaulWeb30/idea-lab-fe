export function buildIdeasUrl(pathname: string, page: number, pageSize: number) {
  const searchParams = new URLSearchParams()
  searchParams.set('page', String(page))
  searchParams.set('pageSize', String(pageSize))
  return `${pathname}?${searchParams.toString()}`
}

export function buildIdeasUrlWithCurrentSearch(
  pathname: string,
  currentSearch: string,
  page: number,
  pageSize: number
) {
  const searchParams = new URLSearchParams(currentSearch)
  searchParams.set('page', String(page))
  searchParams.set('pageSize', String(pageSize))
  return `${pathname}?${searchParams.toString()}`
}
