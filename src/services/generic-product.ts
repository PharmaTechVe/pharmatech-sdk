import type { Client } from '../client'
import type {
  CreateGenericProduct,
  Pagination,
  GenericProductResponse,
  UpdateGenericProduct,
  PaginationProductRequest,
} from '../types'

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

  async getById(id: string): Promise<GenericProductResponse> {
    const response = await this.client.get({
      url: `/product/generic/${id}`,
    })
    return response as unknown as GenericProductResponse
  }

  async findAll({
    page = 1,
    limit = 10,
    q,
    categoryId,
  }: PaginationProductRequest): Promise<Pagination<GenericProductResponse>> {
    const response = await this.client.get({
      url: '/product/generic',
      params: { page, limit, q, categoryId },
    })
    return response as Pagination<GenericProductResponse>
  }

  async create(
    genericProduct: CreateGenericProduct,
    jwt: string,
  ): Promise<GenericProductResponse> {
    const response = await this.client.post({
      url: '/product/generic',
      data: genericProduct,
      jwt,
    })
    return response as unknown as GenericProductResponse
  }

  async update(
    id: string,
    partialGenericProduct: UpdateGenericProduct,
    jwt: string,
  ): Promise<GenericProductResponse> {
    const response = await this.client.patch({
      url: `/product/generic/${id}`,
      data: partialGenericProduct,
      jwt,
    })
    return response as unknown as GenericProductResponse
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/product/generic/${id}`,
      jwt,
    })
  }
}
