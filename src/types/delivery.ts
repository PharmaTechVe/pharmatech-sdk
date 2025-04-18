import type { PaginationRequest } from './utils'

export enum OrderDeliveryStatus {
  PAYMENT_PENDING = 'payment_pending',
  PAYMENT_VALIDATED = 'payment_validated',
  TO_ASSIGN = 'to_assign',
  ASSIGNED = 'assigned',
  WAITING_CONFIRMATION = 'waiting_confirmation',
  PICKED_UP = 'picked_up',
  IN_ROUTE = 'in_route',
  DELIVERED = 'delivered',
}

export type OrderDeliveryPaginationRequest = PaginationRequest & {
  status?: string
  branchId?: string
  employeeId?: string
}

export type OrderDeliveryDetailResponse = {
  user: string[]
  address: string[]
}

export type OrderDeliveryResponse = {
  id: string
  orderId: string
  deliveryStatus: OrderDeliveryStatus
  estimatedTime: string
  branchId: string
  employeeId: string
}

export type UpdateOrderDelivery = {
  deliveryStatus: OrderDeliveryStatus
  employeeId: string
}

export type OrderDeliveryDetailedResponse = OrderDeliveryResponse & {
  details: OrderDeliveryDetailResponse[]
}
