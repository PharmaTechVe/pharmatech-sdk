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
    this.getDelivery = this.getDelivery.bind(this)
    this.findAllOD = this.findAllOD.bind(this)
    this.updateDelivery = this.updateDelivery.bind(this)
  }

  async getDelivery(id: string): Promise<OrderDeliveryDetailedResponse> {
    const response = await this.client.get({
      url: `/delivery/${id}`,
    })
    return response as unknown as OrderDeliveryDetailedResponse
  }

  async findAllOD({
    page = 1,
    limit = 10,
    q,
    status,
    branchId,
    employeeId,
  }: OrderDeliveryPaginationRequest): Promise<
    Pagination<OrderDeliveryResponse>
  > {
    const response = await this.client.get({
      url: '/delivery',
      params: { page, limit, q, status, branchId, employeeId },
    })
    return response as Pagination<OrderDeliveryResponse>
  }

  async updateDelivery(
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
