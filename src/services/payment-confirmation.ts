import type { Client } from '@/client'
import type { PaymentConfirmation, PaymentConfirmationResponse } from '../types'

export class PaymentConfirmationService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.create = this.create.bind(this)
  }

  async create(
    paymentConfirmation: PaymentConfirmation,
    jwt: string,
  ): Promise<PaymentConfirmationResponse> {
    const response = await this.client.post({
      url: '/payment-confirmation',
      data: paymentConfirmation,
      jwt,
    })
    return response as unknown as PaymentConfirmationResponse
  }
}
