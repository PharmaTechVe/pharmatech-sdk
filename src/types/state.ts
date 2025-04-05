import type { CountryResponse } from './country'
import type { PaginationRequest } from './utils'

export type State = {
  name: string
  countryId: string
}

export type StateResponse = {
  id: string
  name: string
  country: CountryResponse
}

export type StatePaginationRequest = PaginationRequest & {
  countryId?: string
}
