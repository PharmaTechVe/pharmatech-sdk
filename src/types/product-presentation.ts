import type { PresentationResponse } from './presentation'
import type { GenericProductResponse } from './generic-product'
import type { BaseModel } from './utils'

export type ProductPresentationResponse = BaseModel & {
  price: number
  presentation: PresentationResponse
}

export type ProductPresentationDetailResponse = ProductPresentationResponse & {
  product: GenericProductResponse
}
