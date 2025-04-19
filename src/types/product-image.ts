import type { BaseModel } from './utils'

export type CreateProductImage = {
  url: string
}

export type ProductImage = BaseModel & CreateProductImage
