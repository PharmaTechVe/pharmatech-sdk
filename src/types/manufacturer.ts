import type { CountryResponse } from './country'
import type { BaseModel } from './utils'

export type Manufacturer = {
  name: string
  description: string
}

export type CreateManufacturerRequest = Manufacturer & {
  countryId: string
}

export type ManufacturerResponse = Manufacturer &
  BaseModel & { country: CountryResponse }
