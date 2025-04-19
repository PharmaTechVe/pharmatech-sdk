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
  subtotal: number
}

export type CreateOrder = {
  type: OrderType
  products: CreateOrderDetail[]
  branchId?: string
  userAddressId?: string
}

export type OrderResponse = BaseModel & {
  type: OrderType
  status: OrderStatus
  totalPrice: number
}

export type OrderDetailedResponse = OrderResponse & {
  details: OrderDetailResponse[]
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
