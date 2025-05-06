import type { Client } from '../client'
import type {
  PaymentInfoResponse,
  PaymentInformation,
  PaymentMethod,
} from '../types'

export class PaymentInformationService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string): Promise<PaymentInfoResponse> {
    const response = await this.client.get({
      url: `/payment-information/${id}`,
    })
    return response as unknown as PaymentInfoResponse
  }

  async findAll(paymentMethod?: PaymentMethod): Promise<PaymentInfoResponse[]> {
    const response = await this.client.get({
      url: '/payment-information',
      params: { paymentMethod },
    })
    return response as unknown as PaymentInfoResponse[]
  }

  async create(
    paymentInformation: PaymentInformation,
    jwt: string,
  ): Promise<PaymentInfoResponse> {
    const response = await this.client.post({
      url: '/payment-information',
      data: paymentInformation,
      jwt,
    })
    return response as unknown as PaymentInfoResponse
  }

  async update(
    id: string,
    partialPaymentInformation: Partial<PaymentInformation>,
    jwt: string,
  ): Promise<PaymentInfoResponse> {
    const response = await this.client.patch({
      url: `/payment-information/${id}`,
      data: partialPaymentInformation,
      jwt,
    })
    return response as unknown as PaymentInfoResponse
  }

  async delete(id: string, jwt: string): Promise<boolean> {
    const response = await this.client.delete({
      url: `/payment-information/${id}`,
      jwt,
    })
    return response as unknown as boolean
  }
}
