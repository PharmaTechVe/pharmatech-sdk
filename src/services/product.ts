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
    manufacturerId,
    categoryId,
    branchId,
    presentationId,
    priceRange,
  }: ProductPaginationRequest): Promise<Pagination<ProductPresentation>> {
    const params = {
      page: page || 1,
      limit: limit || 10,
      q,
      manufacturerId: manufacturerId?.join(','),
      categoryId: categoryId?.join(','),
      branchId: branchId?.join(','),
      presentationId: presentationId?.join(','),
      priceRange: [priceRange?.min, priceRange?.max].join(','),
    }
    const response = await this.client.get({
      url: '/product',
      params,
    })

    return response as unknown as Pagination<ProductPresentation>
  }
}
