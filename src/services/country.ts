import { Client } from '../client'
import type {
  Country,
  CountryResponse,
  Pagination,
  PaginationRequest,
} from '../types'

export class CountryService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string): Promise<CountryResponse> {
    const response = await this.client.get({
      url: `/country/${id}`,
    })
    return response as unknown as CountryResponse
  }

  async findAll({
    page = 1,
    limit = 10,
  }: PaginationRequest): Promise<Pagination<CountryResponse>> {
    const response = await this.client.get({
      url: '/country',
      params: { page, limit },
    })
    return response as Pagination<CountryResponse>
  }

  async create(country: Country, jwt: string): Promise<CountryResponse> {
    const response = await this.client.post({
      url: '/country',
      data: country,
      jwt,
    })
    return response as unknown as CountryResponse
  }

  async update(
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

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/country/${id}`,
      jwt,
    })
  }
}
