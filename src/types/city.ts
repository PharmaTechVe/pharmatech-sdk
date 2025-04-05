import type { StateResponse } from './state'
import type { PaginationRequest } from './utils'

export type City = {
  name: string
  stateId: string
}

export type CityResponse = {
  id: string
  name: string
  state: StateResponse
}

export type CityPaginationRequest = PaginationRequest & {
  stateId?: string
}
