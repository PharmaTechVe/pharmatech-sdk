import type { Client } from '../client'
import type { CreateProductImage, ProductImage } from '../types'

export class ProductImageService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getByProductId = this.getByProductId.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async create(
    productId: string,
    productImage: CreateProductImage,
    jwt: string,
  ): Promise<void> {
    await this.client.post({
      url: `/product/${productId}/image`,
      data: productImage,
      jwt,
    })
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

  async update(
    productId: string,
    imageId: string,
    productImage: CreateProductImage,
    jwt: string,
  ): Promise<ProductImage> {
    const response = await this.client.patch({
      url: `/product/${productId}/image/${imageId}`,
      data: productImage,
      jwt,
    })
    return response as unknown as ProductImage
  }

  async delete(productId: string, imageId: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/product/${productId}/image/${imageId}`,
      jwt,
    })
  }
}
