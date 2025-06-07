import type { Client } from '../client'
import type {
  BulkUpdateProductPresentation,
  CreateProductPresentation,
  ProductPresentationDetailResponse,
  ProductPresentationResponse,
} from '../types'

export class ProductPresentationService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getByProductId = this.getByProductId.bind(this)
    this.create = this.create.bind(this)
    this.getByPresentationId = this.getByPresentationId.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.bulkUpdate = this.bulkUpdate.bind(this)
  }

  async getByProductId(
    productId: string,
  ): Promise<ProductPresentationResponse[]> {
    const response = await this.client.get({
      url: `/product/${productId}/presentation`,
    })

    return response as unknown as ProductPresentationResponse[]
  }

  async create(
    productId: string,
    productPresentation: CreateProductPresentation,
    jwt: string,
  ): Promise<ProductPresentationResponse> {
    const response = await this.client.post({
      url: `/product/${productId}/presentation`,
      data: productPresentation,
      jwt,
    })

    return response as unknown as ProductPresentationResponse
  }

  async getByPresentationId(
    productId: string,
    presentationId: string,
  ): Promise<ProductPresentationDetailResponse> {
    const response = await this.client.get({
      url: `/product/${productId}/presentation/${presentationId}`,
    })

    return response as unknown as ProductPresentationDetailResponse
  }

  async update(
    productId: string,
    presentationId: string,
    productPresentation: Partial<CreateProductPresentation>,
    jwt: string,
  ): Promise<ProductPresentationResponse> {
    const response = await this.client.patch({
      url: `/product/${productId}/presentation/${presentationId}`,
      data: productPresentation,
      jwt,
    })

    return response as unknown as ProductPresentationResponse
  }
  async delete(
    productId: string,
    presentationId: string,
    jwt: string,
  ): Promise<void> {
    await this.client.delete({
      url: `/product/${productId}/presentation/${presentationId}`,
      jwt,
    })
  }

  async bulkUpdate(
    data: BulkUpdateProductPresentation,
    jwt: string,
  ): Promise<void> {
    await this.client.patch({
      url: '/product/presentation/bulk',
      data,
      jwt,
    })
  }
}
