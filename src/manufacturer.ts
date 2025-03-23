import type { Client } from './client'
import type { CountryResponse } from './country'
import type { BaseModel, Pagination, PaginationRequest } from './utils/models'

export type Manufacturer = {
  name: string
  description: string
}

export type CreateManufacturerRequest = Manufacturer & {
  countryId: string
}

export type ManufacturerResponse = Manufacturer &
  BaseModel & { country: CountryResponse }

export class ManufacturerService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string, jwt: string): Promise<ManufacturerResponse> {
    const response = await this.client.get({
      url: `/manufacturer/${id}`,
      jwt,
    })
    return response as unknown as ManufacturerResponse
  }

  async findAll(
    { page = 1, limit = 10 }: PaginationRequest,
    jwt: string,
  ): Promise<Pagination<ManufacturerResponse>> {
    const response = await this.client.get({
      url: '/manufacturer',
      params: { page, limit },
      jwt,
    })
    return response as Pagination<ManufacturerResponse>
  }

  async create(
    manufacturer: CreateManufacturerRequest,
    jwt: string,
  ): Promise<ManufacturerResponse> {
    const response = await this.client.post({
      url: '/manufacturer',
      data: manufacturer,
      jwt,
    })
    return response as unknown as ManufacturerResponse
  }

  async update(
    id: string,
    partialManufacturer: Partial<Manufacturer>,
    jwt: string,
  ): Promise<ManufacturerResponse> {
    const response = await this.client.patch({
      url: `/manufacturer/${id}`,
      data: partialManufacturer,
      jwt,
    })
    return response as unknown as ManufacturerResponse
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/manufacturer/${id}`,
      jwt,
    })
  }
}
