import type { BaseModel, PaginationRequest } from './utils'

export type Promo = {
  name: string
  discount: number
  startAt: Date
  expiredAt: Date
}

export type PromoResponse = Promo & BaseModel

export type PromoPaginationRequest = PaginationRequest & {
  expirationBetween?: {
    start: Date
    end: Date
  }
}
