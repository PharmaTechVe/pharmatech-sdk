import type { Client } from './client'
import type { BaseModel, Pagination, PaginationRequest } from './utils/models'

export type Promo = {
  productPresentationId: string
  name: string
  discount: number
  expiredAt: Date
}

export type PromoResponse = Promo & BaseModel

export class PromoService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string, jwt: string): Promise<PromoResponse> {
    const response = await this.client.get({
      url: `/promo/${id}`,
      jwt,
    })
    return response as unknown as PromoResponse
  }

  async findAll(
    { page = 1, limit = 10 }: PaginationRequest,
    jwt: string,
  ): Promise<Pagination<PromoResponse>> {
    const response = await this.client.get({
      url: '/promo',
      params: { page, limit },
      jwt,
    })
    return response as Pagination<PromoResponse>
  }

  async create(promo: Promo, jwt: string): Promise<PromoResponse> {
    const response = await this.client.post({
      url: '/promo',
      data: promo,
      jwt,
    })
    return response as unknown as PromoResponse
  }

  async update(
    id: string,
    partialPromo: Partial<Promo>,
    jwt: string,
  ): Promise<PromoResponse> {
    const response = await this.client.patch({
      url: `/promo/${id}`,
      data: partialPromo,
      jwt,
    })
    return response as unknown as PromoResponse
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/promo/${id}`,
      jwt,
    })
  }
}
