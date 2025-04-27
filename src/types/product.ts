import type { ProductImage } from './product-image'
import type { Manufacturer } from './manufacturer'
import type { BaseModel, PaginationRequest } from './utils'
import type { Category } from './category'
import type { PresentationResponse } from './presentation'

export type Product = BaseModel & {
  name: string
  genericName: string
  description: string
  priority: number
  manufacturer: Manufacturer
  images: ProductImage[]
  categories: Category[]
}

export type ProductPresentation = BaseModel & {
  price: number
  presentation: PresentationResponse
  product: Product
  stock: number
}

export type ProductPaginationRequest = PaginationRequest & {
  q?: string
  manufacturerId?: string[]
  categoryId?: string[]
  branchId?: string[]
  presentationId?: string[]
  genericProductId?: string[]
  priceRange?: { min: number; max: number }
  isVisible?: boolean
}
