import type { PresentationResponse } from './presentation'
import type { ResponseGenericProduct } from './generic-product'
import type { Client } from './client'
import type { BaseModel } from './utils/models'

export type ProductPresentationDTO = BaseModel & {
  price: number
  presentation: PresentationResponse
}

export type ProductPresentationDetailDTO = ProductPresentationDTO & {
  product: ResponseGenericProduct
}

export class ProductPresentationService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getByProductId = this.getByProductId.bind(this)
  }

  async getByProductId(productId: string): Promise<ProductPresentationDTO[]> {
    const response = await this.client.get({
      url: `/product/${productId}/presentation`,
    })

    return response as unknown as ProductPresentationDTO[]
  }

  async getByPresentationId(
    productId: string,
    presentationId: string,
  ): Promise<ProductPresentationDetailDTO> {
    const response = await this.client.get({
      url: `/product/${productId}/presentation/${presentationId}`,
    })

    return response as unknown as ProductPresentationDetailDTO
  }
}
