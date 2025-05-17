import type { BaseModel, PaginationRequest } from './utils'

export type Coupon = {
  code: string
  discount: number
  minPurchase: number
  maxUses: number
  expirationDate: Date
}

export type CouponResponse = Coupon & BaseModel

export type CouponPaginationRequest = PaginationRequest & {
  expirationBetween?: {
    start: Date
    end: Date
  }
}

export type BulkCouponData = {
  expirationDate?: Date
  maxUses?: number
}

export type BulkUpdateCoupon = {
  ids: string[]
  data: BulkCouponData
}

export type BulkDeleteCoupon = {
  ids: string[]
}
