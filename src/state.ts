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
    this.getStateById = this.getStateById.bind(this)
    this.findAllStates = this.findAllStates.bind(this)
    this.createState = this.createState.bind(this)
    this.updateState = this.updateState.bind(this)
    this.deleteState = this.deleteState.bind(this)
  }

  async getStateById(id: string, jwt: string): Promise<StateResponse> {
    const response = await this.client.get({
      url: `/state/${id}`,
      jwt,
    })
    return response as unknown as StateResponse
  }

  async findAllStates(
    { page = 1, limit = 10, countryId }: StatePaginationRequest,
    jwt: string,
  ): Promise<Pagination<StateResponse>> {
    const response = await this.client.get({
      url: '/state',
      params: { page, limit, countryId },
      jwt,
    })
    return response as Pagination<StateResponse>
  }

  async createState(state: State, jwt: string): Promise<StateResponse> {
    const response = await this.client.post({
      url: '/state',
      data: state,
      jwt,
    })
    return response as unknown as StateResponse
  }

  async updateState(
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

  async deleteState(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/states/${id}`,
      jwt,
    })
  }
}
