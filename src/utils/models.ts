export type Pagination = {
  results: object[]
  count: number
  next: string | null
  previous: string | null
}

export type UUIDModel = {
  id: string
}

export type TimestampModel = UUIDModel & {
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
