import type { BaseModel } from './utils'
import type { OrderResponse } from './order'

export type CreateNotification = {
  orderId: string
  message: string
  isRead?: boolean
}

export type NotificationResponse = BaseModel & {
  order: OrderResponse
  message: string
  isRead: boolean
}
