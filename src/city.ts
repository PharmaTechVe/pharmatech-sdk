import { Client } from './client'
import type { StateResponse } from './state'
import type { Pagination, PaginationRequest } from './utils/models'

export type City = {
  name: string
  stateId: string
}

export type CityResponse = {
  id: string
  name: string
  state: StateResponse
}

type CityPaginationRequest = PaginationRequest & {
  stateId?: string
}

export class CityService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string, jwt: string): Promise<CityResponse> {
    const response = await this.client.get({
      url: `/city/${id}`,
      jwt,
    })
    return response as unknown as CityResponse
  }

  async findAll(
    { page = 1, limit = 10, stateId }: CityPaginationRequest,
    jwt: string,
  ): Promise<Pagination<CityResponse>> {
    const response = await this.client.get({
      url: '/city',
      params: { page, limit, stateId },
      jwt,
    })
    return response as Pagination<CityResponse>
  }

  async create(city: City, jwt: string): Promise<CityResponse> {
    const response = await this.client.post({
      url: '/city',
      data: city,
      jwt,
    })
    return response as unknown as CityResponse
  }

  async update(
    id: string,
    partialCity: Partial<City>,
    jwt: string,
  ): Promise<CityResponse> {
    const response = await this.client.patch({
      url: `/city/${id}`,
      data: partialCity,
      jwt,
    })
    return response as unknown as CityResponse
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/city/${id}`,
      jwt,
    })
  }
}
