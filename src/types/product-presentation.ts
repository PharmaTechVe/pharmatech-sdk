import type { PresentationResponse } from './presentation'
import type {
  GenericProductResponse,
  OrderGenericProductResponse,
} from './generic-product'
import type { BaseModel } from './utils'
import type { PromoResponse } from './promo'

export type ProductPresentationResponse = BaseModel & {
  price: number
  presentation: PresentationResponse
}

export type ProductPresentationDetailResponse = ProductPresentationResponse & {
  product: GenericProductResponse
}

export type OrderDetailProductPresentationResponse =
  ProductPresentationResponse & {
    product: OrderGenericProductResponse
    promo: PromoResponse
  }
