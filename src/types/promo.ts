import type { BaseModel } from './utils'

export type Promo = {
  name: string
  discount: number
  startAt: Date
  expiredAt: Date
}

export type PromoResponse = Promo & BaseModel
