import type { CategoryResponse } from './category'
import type { ManufacturerResponse } from './manufacturer'
import type { BaseModel, PaginationRequest } from './utils'

export type GenericProduct = {
  name: string
  genericName: string
  priority: number
  description?: string
}

export type CreateGenericProduct = GenericProduct & {
  manufacturerId: string
}

export type UpdateGenericProduct = Partial<CreateGenericProduct>

export type GenericProductResponse = GenericProduct &
  BaseModel & {
    manufacturer: ManufacturerResponse
    categories: CategoryResponse[]
  }

export type PaginationProductRequest = PaginationRequest & {
  categoryId?: string
}
