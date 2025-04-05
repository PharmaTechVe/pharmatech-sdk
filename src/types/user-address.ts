export type UserAddressResponse = {
  adress: string
  zipCode: string
  latitude: number | null
  longitude: number | null
  cityId: string
  id: string
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
}
