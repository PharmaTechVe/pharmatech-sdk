import type { Client } from '@/client'
import type { ActivePrinciple, Pagination, PaginationRequest } from '@/types'

export class ActivePrincipleService {
  client: Client
  constructor(client: Client) {
    this.client = client
    this.findAll = this.findAll.bind(this)
  }

  async findAll(
    { page = 1, limit = 10, q }: PaginationRequest,
    jwt: string,
  ): Promise<Pagination<ActivePrinciple>> {
    const response = await this.client.get({
      url: '/active-principle',
      params: { page, limit, q },
      jwt,
    })
    return response as Pagination<ActivePrinciple>
  }
}
