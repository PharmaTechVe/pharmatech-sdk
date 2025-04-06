export type UserAddressResponse = {
  adress: string
  zipCode: string
  latitude: number | null
  longitude: number | null
  cityId: string
  id: string
  additionalInformation: string | null
  referencePoint: string | null
  nameCity: string
  nameState: string
  nameCountry: string
}

export type CreateUserAddressRequest = {
  adress: string
  zipCode: string
  latitude: number | null
  longitude: number | null
  cityId: string
  additionalInformation: string | null
  referencePoint: string | null
}
