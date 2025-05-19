import type { BranchResponse } from './branch'
import type { OrderDeliveryDetail } from './delivery'
import type { PaymentConfirmationResponse } from './payment-confirmation'
import type { PaymentMethod } from './payment-information'
import type { OrderDetailProductPresentationResponse } from './product-presentation'
import type { BaseModel, PaginationRequest } from './utils'

export enum OrderType {
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
}

export enum OrderStatus {
  REQUESTED = 'requested',
  APPROVED = 'approved',
  READY_FOR_PICKUP = 'ready_for_pickup',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export type CreateOrderDetail = {
  productPresentationId: string
  quantity: number
}

export type OrderDetailResponse = BaseModel & {
  productPresentation: OrderDetailProductPresentationResponse
  quantity: number
  price: number
  subtotal: number
  paymentConfirmation: PaymentConfirmationResponse
}

export type CreateOrder = {
  type: OrderType
  products: CreateOrderDetail[]
  paymentMethod: PaymentMethod
  branchId?: string
  userAddressId?: string
  couponCode?: string
}

export type OrderResponse = BaseModel & {
  type: OrderType
  paymentMethod: PaymentMethod
  status: OrderStatus
  totalPrice: number
}

export type OrderDetailedResponse = OrderResponse & {
  details: OrderDetailResponse[]
  branch?: BranchResponse
  orderDeliveries?: OrderDeliveryDetail[]
}

export type OrderPaginationRequest = PaginationRequest & {
  userId?: string
  branchId?: string
  type?: OrderType
  status?: OrderStatus
}

export type UpdateOrder = {
  status: OrderStatus
}

export type BulkUpdateOrder = {
  orders: string[]
  status: OrderStatus
}
