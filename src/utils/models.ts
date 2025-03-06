export type PaginationRequest = {
  page?: number
  limit?: number
}
export type Pagination = {
  results: object[]
  count: number
  next: string | null
  previous: string | null
}
