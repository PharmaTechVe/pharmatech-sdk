import type { Client } from '../client'
import type {
  BulkDeletePromo,
  BulkUpdatePromo,
  Pagination,
  Promo,
  PromoPaginationRequest,
  PromoResponse,
} from '../types'

export class PromoService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.bulkUpdate = this.bulkUpdate.bind(this)
    this.bulkDelete = this.bulkDelete.bind(this)
  }

  async getById(id: string, jwt: string): Promise<PromoResponse> {
    const response = await this.client.get({
      url: `/promo/${id}`,
      jwt,
    })
    return response as unknown as PromoResponse
  }

  async findAll(
    { page = 1, limit = 10, q, expirationBetween }: PromoPaginationRequest,
    jwt: string,
  ): Promise<Pagination<PromoResponse>> {
    const params = {
      page,
      limit,
      q,
      expirationBetween: expirationBetween
        ? [expirationBetween.start, expirationBetween.end].join(',')
        : undefined,
    }
    const response = await this.client.get({
      url: '/promo',
      params,
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

  async bulkUpdate(data: BulkUpdatePromo, jwt: string): Promise<void> {
    await this.client.patch({
      url: '/promo/bulk',
      data,
      jwt,
    })
  }

  async bulkDelete(data: BulkDeletePromo, jwt: string): Promise<void> {
    await this.client.delete({
      url: '/promo/bulk',
      data,
      jwt,
    })
  }
}
