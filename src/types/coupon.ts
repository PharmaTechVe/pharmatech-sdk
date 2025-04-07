import type { BaseModel } from './utils'

export type Coupon = {
  code: string
  discount: number
  minPurchase: number
  maxUses: number
  expirationDate: Date
}

export type CouponResponse = Coupon & BaseModel
