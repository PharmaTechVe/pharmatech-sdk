import type { OrderDetailProductPresentationResponse } from './product-presentation'
import type { BaseModel, PaginationRequest } from './utils'

export type OrderDeliveryPaginationRequest = PaginationRequest & {
  status?: string
  branchId?: string
  employeeId?: string
}

export type OrderDeliveryDetailResponse = {
  userName: string
  userPhone?: string
  address: string
  zipCode: string
  additionalInformation?: string
  referencePoint?: string
}

export type OrderDeliveryResponse = {
  id: string
  orderId: string
  deliveryStatus: string
  estimatedTime: string
  branchId: string
  employeeId: string
}

export type UpdateOrderDelivery = {
  deliveryStatus: string
  employeeId: string
}

export type OrderDeliveryDetailedResponse = OrderDeliveryResponse & {
  details: OrderDeliveryDetailResponse[]
}
