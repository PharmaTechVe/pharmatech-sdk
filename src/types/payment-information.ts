import type { BaseModel } from './utils'

export enum PaymentMethod {
  CARD = 'card',
  MOBILE_PAYMENT = 'mobile_payment',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
}

export interface PaymentInformationBase {
  bank: string
  accountType: string
  account: string
  documentId: string
  phoneNumber: string
  paymentMethod: PaymentMethod
}

export type PaymentInformation = PaymentInformationBase

export type PaymentInfoResponse = BaseModel & PaymentInformationBase
