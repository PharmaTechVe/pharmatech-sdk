import type { Client } from '../client'
import type {
  ProductPresentationDetailResponse,
  ProductPresentationResponse,
} from '../types'

export class ProductPresentationService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getByProductId = this.getByProductId.bind(this)
  }

  async getByProductId(
    productId: string,
  ): Promise<ProductPresentationResponse[]> {
    const response = await this.client.get({
      url: `/product/${productId}/presentation`,
    })

    return response as unknown as ProductPresentationResponse[]
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
}
