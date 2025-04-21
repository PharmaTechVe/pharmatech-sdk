import { Client } from '../client'
import type {
  OrderDeliveryPaginationRequest,
  OrderDeliveryResponse,
  OrderDeliveryDetailedResponse,
  UpdateOrderDelivery,
  Pagination,
} from '../types'

export class DeliveryService {
  private client: Client
  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.update = this.update.bind(this)
  }

  async getById(
    id: string,
    jwt: string,
  ): Promise<OrderDeliveryDetailedResponse> {
    const response = await this.client.get({
      url: `/delivery/${id}`,
      jwt,
    })
    return response as unknown as OrderDeliveryDetailedResponse
  }

  async findAll(
    {
      page = 1,
      limit = 10,
      q,
      status,
      branchId,
      employeeId,
    }: OrderDeliveryPaginationRequest,
    jwt: string,
  ): Promise<Pagination<OrderDeliveryResponse>> {
    const response = await this.client.get({
      url: '/delivery',
      params: { page, limit, q, status, branchId, employeeId },
      jwt,
    })
    return response as Pagination<OrderDeliveryResponse>
  }

  async update(
    id: string,
    partialOrder: Partial<UpdateOrderDelivery>,
    jwt: string,
  ): Promise<OrderDeliveryResponse> {
    const response = await this.client.patch({
      url: `/delivery/${id}`,
      data: partialOrder,
      jwt,
    })
    return response as unknown as OrderDeliveryResponse
  }
}
