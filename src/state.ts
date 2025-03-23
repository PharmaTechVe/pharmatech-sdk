import { Client } from './client'
import type { CountryResponse } from './country'
import type { Pagination, PaginationRequest } from './utils/models'

export type State = {
  name: string
  countryId: string
}

export type StateResponse = {
  id: string
  name: string
  country: CountryResponse
}

type StatePaginationRequest = PaginationRequest & {
  countryId?: string
}

export class StateService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string): Promise<StateResponse> {
    const response = await this.client.get({
      url: `/state/${id}`,
    })
    return response as unknown as StateResponse
  }

  async findAll({
    page = 1,
    limit = 10,
    countryId,
  }: StatePaginationRequest): Promise<Pagination<StateResponse>> {
    const response = await this.client.get({
      url: '/state',
      params: { page, limit, countryId },
    })
    return response as Pagination<StateResponse>
  }

  async create(state: State, jwt: string): Promise<StateResponse> {
    const response = await this.client.post({
      url: '/state',
      data: state,
      jwt,
    })
    return response as unknown as StateResponse
  }

  async update(
    id: string,
    partialState: Partial<State>,
    jwt: string,
  ): Promise<StateResponse> {
    const response = await this.client.patch({
      url: `/state/${id}`,
      data: partialState,
      jwt,
    })
    return response as unknown as StateResponse
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/states/${id}`,
      jwt,
    })
  }
}
