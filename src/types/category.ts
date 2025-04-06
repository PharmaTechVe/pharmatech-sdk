import type { UUIDModel } from './utils'

export type Category = {
  name: string
  description: string
}

export type CategoryResponse = Category & UUIDModel
