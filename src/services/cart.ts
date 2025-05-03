import { Client } from '../client'
import type {
  CreateCart,
  CartDetailedResponse,
  CartDetailResponse,
} from '../types'

export class CartService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
  }

  async create(cart: CreateCart, jwt: string): Promise<CartDetailedResponse> {
    const response = await this.client.post({
      url: '/cart',
      data: cart,
      jwt,
    })
    return response as unknown as CartDetailedResponse
  }

  async get(jwt: string): Promise<CartDetailResponse[]> {
    const response = await this.client.get({
      url: '/cart',
      jwt,
    })
    return response as unknown as CartDetailResponse[]
  }

  async update(
    partialCart: Partial<CreateCart>,
    jwt: string,
  ): Promise<CartDetailedResponse> {
    const response = await this.client.patch({
      url: '/order',
      data: partialCart,
      jwt,
    })
    return response as unknown as CartDetailedResponse
  }
}
