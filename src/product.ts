import axios from 'axios'
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
  constructor(isDevMode: boolean) {
    this.client = new Client(isDevMode)
    this.getProducts = this.getProducts.bind(this)
  }

  async getProducts({
    page,
    limit = 10,
  }: PaginationRequest): Promise<Pagination<ProductPresentation>> {
    try {
      const response = await this.client.get({
        url: '/product',
        params: { page, limit },
      })

      if ('results' in response) {
        return response as unknown as Pagination<ProductPresentation>
      }

      throw new Error('La respuesta del servidor no es válida.')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }
      throw new Error('Error inesperado al obtener los productos.')
    }
  }
}
