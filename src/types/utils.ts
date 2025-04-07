import type { UserRole } from './user'

export type PaginationRequest = {
  page?: number
  limit?: number
  q?: string
}

export type PaginationBranchRequest = PaginationRequest & {
  stateId?: string
}

export type PaginationUserRequest = PaginationRequest & {
  role?: UserRole
}

export type PaginationProductRequest = PaginationRequest & {
  categoryId?: string
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
