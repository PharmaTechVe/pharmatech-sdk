import type { BranchResponse } from './branch'
import { Client } from './client'
import type { ProductPresentation } from './product'
import type { StateResponse } from './state'
import type { BaseModel, Pagination, PaginationRequest } from './utils/models'

export type Inventory = {
  stockQuantity: number
  branchId: string
  productPresentationId: string
}

export type InventoryResponse = BaseModel & {
  stockQuantity: number
  branch: BranchResponse
  productPresentation: ProductPresentation
}

export type InventoryPaginationRequest = PaginationRequest & {
  branchId?: string
  productPresentationId?: string
}

export class InventoryService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string): Promise<InventoryResponse> {
    const response = await this.client.get({
      url: `/inventory/${id}`,
    })
    return response as unknown as InventoryResponse
  }

  async findAll({
    page = 1,
    limit = 10,
    branchId,
    productPresentationId,
  }: InventoryPaginationRequest): Promise<Pagination<InventoryResponse>> {
    const response = await this.client.get({
      url: '/inventory',
      params: { page, limit, branchId, productPresentationId },
    })
    return response as Pagination<InventoryResponse>
  }

  async create(inventory: Inventory, jwt: string): Promise<InventoryResponse> {
    const response = await this.client.post({
      url: '/inventory',
      data: inventory,
      jwt,
    })
    return response as unknown as InventoryResponse
  }

  async update(
    id: string,
    partialInventory: Partial<Inventory>,
    jwt: string,
  ): Promise<InventoryResponse> {
    const response = await this.client.patch({
      url: `/inventory/${id}`,
      data: partialInventory,
      jwt,
    })
    return response as unknown as InventoryResponse
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/inventory/${id}`,
      jwt,
    })
  }
}
