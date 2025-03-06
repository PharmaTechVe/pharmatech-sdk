import axios from 'axios'
import { Client } from './client'
import type { Pagination, PaginationRequest } from './utils/models'

export class ProductService {
  private client: Client
  constructor(isDevMode: boolean) {
    this.client = new Client(isDevMode)
    this.getProducts = this.getProducts.bind(this)
  }

  async getProducts({
    page,
    limit,
  }: PaginationRequest): Promise<Pagination | void> {
    try {
      const response = await this.client.get({
        url: '/product',
        params: { page, limit },
      })

      if ('results' in response) {
        return response as unknown as Pagination
      }

      throw new Error('La respuesta del servidor no es válida.')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }
    }
  }
}
