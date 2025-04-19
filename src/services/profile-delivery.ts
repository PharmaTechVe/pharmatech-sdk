import type { Client } from '../client'
import type { UpdateProfileDelivery } from '../types'

export class ProfileDeliveryService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.update = this.update.bind(this)
  }

  async update(
    id: string,
    partialUserAddress: Partial<UpdateProfileDelivery>,
    jwt: string,
  ): Promise<UpdateProfileDelivery> {
    const response = await this.client.patch({
      url: `/user/${id}/moto`,
      data: partialUserAddress,
      jwt,
    })
    return response as unknown as UpdateProfileDelivery
  }
}
