import type { Client } from '../client'
import type { Product } from '../types'

export class ProductCategoryService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
  }

  async create(productId: string, categoryId: string): Promise<Product> {
    const response = await this.client.post({
      url: `/product/${productId}/category`,
      data: { categoryId },
    })

    return response as unknown as Product
  }

  async delete(productId: string, categoryId: string): Promise<void> {
    await this.client.delete({
      url: `/product/${productId}/category/${categoryId}`,
    })
  }
}
