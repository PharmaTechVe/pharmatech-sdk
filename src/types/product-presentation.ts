import type { PresentationResponse } from './presentation'
import type {
  GenericProductResponse,
  OrderGenericProductResponse,
} from './generic-product'
import type { BaseModel } from './utils'
import type { PromoResponse } from './promo'

export type CreateProductPresentation = {
  presentationId: string
  price: number
  promoId?: string
}

export type ProductPresentationResponse = BaseModel & {
  price: number
  presentation: PresentationResponse
  stock: number
  promo?: PromoResponse
}

export type ProductPresentationDetailResponse = ProductPresentationResponse & {
  product: GenericProductResponse
}

export type OrderDetailProductPresentationResponse =
  ProductPresentationResponse & {
    product: OrderGenericProductResponse
  }
