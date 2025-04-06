import { Client } from '../client'
import type {
  Pagination,
  ProductPaginationRequest,
  ProductPresentation,
} from '../types'

export class ProductService {
  private client: Client
  constructor(client: Client) {
    this.client = client
    this.getProducts = this.getProducts.bind(this)
  }

  async getProducts({
    page,
    limit,
    q,
  }: ProductPaginationRequest): Promise<Pagination<ProductPresentation>> {
    const response = await this.client.get({
      url: '/product',
      params: { page, limit, q },
    })

    return response as unknown as Pagination<ProductPresentation>
  }
}
