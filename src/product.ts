import { Client } from './client'
import type {
  BaseModel,
  Pagination,
  PaginationRequest,
  UUIDModel,
} from './utils/models'

export type Manufacturer = BaseModel & { name: string; description: string }
export type Image = BaseModel & { url: string }
export type Category = UUIDModel & { name: string; description: string }
export type Presentation = BaseModel & {
  name: string
  description: string
  quantity: number
  measurementUnit: string
}

export type Product = BaseModel & {
  name: string
  genericName: string
  description: string
  priority: number
  manufacturer: Manufacturer
  images: Image[]
  categories: Category[]
}

export type ProductPresentation = BaseModel & {
  price: number
  presentation: Presentation
  product: Product
}

export class ProductService {
  private client: Client
  constructor(client: Client) {
    this.client = client
    this.getProducts = this.getProducts.bind(this)
  }

  async getProducts({
    page,
    limit = 10,
  }: PaginationRequest): Promise<Pagination<ProductPresentation>> {
    const response = await this.client.get({
      url: '/product',
      params: { page, limit },
    })

    return response as unknown as Pagination<ProductPresentation>
  }
}
