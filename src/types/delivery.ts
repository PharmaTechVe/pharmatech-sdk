import type { PaginationRequest, BaseModel } from './utils'

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

export type UserOrderDeliveryDetailResponse = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  profilePicture: string
}

export type AddressOrderDeliveryDetailResponse = {
  adress: string
  additionalInformation: string
  referencePoint: string
  latitude: number
  longitude: number
}

export type OrderDeliveryResponse = BaseModel & {
  orderId: string
  branchId: string
  employeeId: string
  deliveryStatus: OrderDeliveryStatus
  estimatedTime: Date
}

export type UpdateOrderDelivery = {
  deliveryStatus: OrderDeliveryStatus
  employeeId: string
}

export type OrderDeliveryDetailedResponse = OrderDeliveryResponse & {
  user: UserOrderDeliveryDetailResponse
  address: AddressOrderDeliveryDetailResponse
}

export type OrderDeliveryDetail = BaseModel & {
  deliveryStatus: OrderDeliveryStatus
  estimatedTime: Date
  employee: UserOrderDeliveryDetailResponse
}
