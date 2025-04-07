import type { CityResponse } from './city'
import type { BaseModel, PaginationRequest } from './utils'

export type Branch = {
  name: string
  address: string
  latitude: number
  longitude: number
}

export type CreateBranchRequest = Branch & {
  cityId: string
}

export type BranchResponse = Branch &
  BaseModel & {
    city: CityResponse
  }

export type PaginationBranchRequest = PaginationRequest & {
  stateId?: string
}
