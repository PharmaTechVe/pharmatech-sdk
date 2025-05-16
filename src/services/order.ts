import type {
  CreateOrder,
  UpdateOrder,
  OrderPaginationRequest,
  OrderResponse,
  OrderDetailedResponse,
  Pagination,
  BulkUpdateOrder,
} from '../types'
import type { Client } from '../client'

export class OrderService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.bulkUpdate = this.bulkUpdate.bind(this)
  }

  async getById(id: string, jwt: string): Promise<OrderDetailedResponse> {
    const response = await this.client.get({
      url: `/order/${id}`,
      jwt,
    })
    return response as unknown as OrderDetailedResponse
  }

  async findAll(
    {
      page = 1,
      limit = 10,
      q,
      userId,
      branchId,
      type,
      status,
    }: OrderPaginationRequest,
    jwt: string,
  ): Promise<Pagination<OrderResponse>> {
    const response = await this.client.get({
      url: '/order',
      params: { page, limit, q, userId, branchId, type, status },
      jwt,
    })
    return response as Pagination<OrderResponse>
  }

  async create(order: CreateOrder, jwt: string): Promise<OrderResponse> {
    const response = await this.client.post({
      url: '/order',
      data: order,
      jwt,
    })
    return response as unknown as OrderResponse
  }

  async update(
    id: string,
    partialOrder: Partial<UpdateOrder>,
    jwt: string,
  ): Promise<OrderDetailedResponse> {
    const response = await this.client.patch({
      url: `/order/${id}`,
      data: partialOrder,
      jwt,
    })
    return response as unknown as OrderDetailedResponse
  }

  async bulkUpdate(data: BulkUpdateOrder, jwt: string): Promise<void> {
    await this.client.patch({
      url: '/order/bulk',
      data,
      jwt,
    })
  }
}
