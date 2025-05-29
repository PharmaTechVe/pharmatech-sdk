import { Client } from '../client'
import type { LotPaginationRequest, LotResponse, Pagination } from '../types'

export class LotService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.findAll = this.findAll.bind(this)
  }

  async findAll({
    page = 1,
    limit = 10,
    branchId,
    productPresentationId,
  }: LotPaginationRequest): Promise<Pagination<LotResponse>> {
    const response = await this.client.get({
      url: '/lot',
      params: { page, limit, branchId, productPresentationId },
    })
    return response as Pagination<LotResponse>
  }
}
