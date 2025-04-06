import type { Client } from '../client'
import type {
  Category,
  CategoryResponse,
  Pagination,
  PaginationRequest,
} from '../types'

export class CategoryService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string): Promise<CategoryResponse> {
    const response = await this.client.get({
      url: `/category/${id}`,
    })
    return response as unknown as CategoryResponse
  }

  async findAll({
    page = 1,
    limit = 10,
  }: PaginationRequest): Promise<Pagination<CategoryResponse>> {
    const response = await this.client.get({
      url: '/category',
      params: { page, limit },
    })
    return response as Pagination<CategoryResponse>
  }

  async create(category: Category, jwt: string): Promise<CategoryResponse> {
    const response = await this.client.post({
      url: '/category',
      data: category,
      jwt,
    })
    return response as unknown as CategoryResponse
  }

  async update(
    id: string,
    partialCategory: Partial<Category>,
    jwt: string,
  ): Promise<CategoryResponse> {
    const response = await this.client.patch({
      url: `/category/${id}`,
      data: partialCategory,
      jwt,
    })
    return response as unknown as CategoryResponse
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/category/${id}`,
      jwt,
    })
  }
}
