import type { Client } from './client'
import type { ManufacturerResponse } from './manufacturer'
import type { BaseModel, Pagination, PaginationRequest } from './utils/models'

export type GenericProduct = {
  name: string
  genericName: string
  priority: number
  description?: string
}

export type CreateGenericProduct = GenericProduct & {
  manufacturerId: string
}

export type UpdateGenericProduct = Partial<CreateGenericProduct>
export type ResponseGenericProduct = GenericProduct &
  BaseModel & {
    manufacturer: ManufacturerResponse
  }

export class GenericProductService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string): Promise<ResponseGenericProduct> {
    const response = await this.client.get({
      url: `/product/generic/${id}`,
    })
    return response as unknown as ResponseGenericProduct
  }

  async findAll({
    page = 1,
    limit = 10,
  }: PaginationRequest): Promise<Pagination<ResponseGenericProduct>> {
    const response = await this.client.get({
      url: '/product/generic',
      params: { page, limit },
    })
    return response as Pagination<ResponseGenericProduct>
  }

  async create(
    genericProduct: CreateGenericProduct,
    jwt: string,
  ): Promise<ResponseGenericProduct> {
    const response = await this.client.post({
      url: '/product/generic',
      data: genericProduct,
      jwt,
    })
    return response as unknown as ResponseGenericProduct
  }

  async update(
    id: string,
    partialGenericProduct: UpdateGenericProduct,
    jwt: string,
  ): Promise<ResponseGenericProduct> {
    const response = await this.client.patch({
      url: `/product/generic/${id}`,
      data: partialGenericProduct,
      jwt,
    })
    return response as unknown as ResponseGenericProduct
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/product/generic/${id}`,
      jwt,
    })
  }
}
