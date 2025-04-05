import type { Client } from '../client'
import type { ProductImage } from '../types'

export class ProductImageService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getByProductId = this.getByProductId.bind(this)
  }

  async getByProductId(productId: string): Promise<ProductImage[]> {
    const response = await this.client.get({
      url: `/product/${productId}/image`,
    })

    return response as unknown as ProductImage[]
  }

  async getById(productId: string, imageId: string): Promise<ProductImage> {
    const response = await this.client.get({
      url: `/product/${productId}/image/${imageId}`,
    })

    return response as unknown as ProductImage
  }
}
