import type { Client } from '@/client'
import type { PredictedSale } from '@/types'

export class SalesPredictionService {
  client: Client
  constructor(client: Client) {
    this.client = client
    this.getPredictedSales = this.getPredictedSales.bind(this)
  }

  async getPredictedSales(
    { days }: { days: number },
    jwt: string,
  ): Promise<PredictedSale[]> {
    const response = await this.client.get({
      url: '/sales/predict',
      params: { days },
      jwt,
    })
    return response as unknown as PredictedSale[]
  }
}
