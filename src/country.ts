import { Client } from './client'
import type { Pagination, PaginationRequest } from './utils/models'

export type Country = {
  name: string
}

export type CountryResponse = Country & {
  id: string
}

export class CountryService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getCountryById = this.getCountryById.bind(this)
    this.findAllCountries = this.findAllCountries.bind(this)
    this.createCountry = this.createCountry.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.deleteCountry = this.deleteCountry.bind(this)
  }

  async getCountryById(id: string, jwt: string): Promise<CountryResponse> {
    const response = await this.client.get({
      url: `/country/${id}`,
      jwt,
    })
    return response as unknown as CountryResponse
  }

  async findAllCountries(
    { page = 1, limit = 10 }: PaginationRequest,
    jwt: string,
  ): Promise<Pagination<CountryResponse>> {
    const response = await this.client.get({
      url: '/country',
      params: { page, limit },
      jwt,
    })
    return response as Pagination<CountryResponse>
  }

  async createCountry(country: Country, jwt: string): Promise<CountryResponse> {
    const response = await this.client.post({
      url: '/country',
      data: country,
      jwt,
    })
    return response as unknown as CountryResponse
  }

  async updateCountry(
    id: string,
    partialCountry: Partial<Country>,
    jwt: string,
  ): Promise<CountryResponse> {
    const response = await this.client.patch({
      url: `/country/${id}`,
      data: partialCountry,
      jwt,
    })
    return response as unknown as CountryResponse
  }

  async deleteCountry(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/country/${id}`,
      jwt,
    })
  }
}
