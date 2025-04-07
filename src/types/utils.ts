export type PaginationRequest = {
  page?: number
  limit?: number
  q?: string
}

export type Pagination<T> = {
  results: T[]
  count: number
  next: string | null
  previous: string | null
}

export type UUIDModel = {
  id: string
}

export type BaseModel = UUIDModel & {
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
