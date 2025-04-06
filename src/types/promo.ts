import type { BaseModel } from './utils'

export type Promo = {
  productPresentationId: string
  name: string
  discount: number
  expiredAt: Date
}

export type PromoResponse = Promo & BaseModel
