import type { BaseModel } from './utils'

export type PaymentConfirmation = {
  bank: string
  reference: string
  documentId: string
  phoneNumber: string
  orderId: string
}

export type PaymentConfirmationResponse = PaymentConfirmation & BaseModel
