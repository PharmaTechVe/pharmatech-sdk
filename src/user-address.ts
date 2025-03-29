import { Client } from './client'

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

export type createAddresData = {
  adress: string
  zipCode: string
  latitude: number | null
  longitude: number | null
  cityId: string
}

export class UserAddressService {
  private client: Client
  constructor(client: Client) {
    this.client = client
    this.getAddress = this.getAddress.bind(this)
    this.getListAddresses = this.getListAddresses.bind(this)
    this.createAddress = this.createAddress.bind(this)
    this.deleteAddress = this.deleteAddress.bind(this)
  }

  async getAddress(
    userId: string,
    addressId: string,
  ): Promise<UserAddressResponse> {
    const response = await this.client.get({
      url: `/user/${userId}/address/${addressId}`,
    })
    return response as unknown as UserAddressResponse
  }

  async getListAddresses(userId: string): Promise<UserAddressResponse[]> {
    const response = await this.client.get({
      url: `/user/${userId}/address`,
    })
    return response as unknown as UserAddressResponse[]
  }

  async createAddress(
    userId: string,
    createAddresData: createAddresData,
  ): Promise<createAddresData> {
    const response = await this.client.post({
      url: `/user/${userId}/address`,
      data: createAddresData,
    })
    return response as unknown as createAddresData
  }

  async deleteAddress(userId: string, addressId: string): Promise<void> {
    await this.client.delete({
      url: `/user/${userId}/address/${addressId}`,
    })
  }

  async update(
    userId: string,
    partialUserAddress: Partial<createAddresData>,
    addressId: string,
  ): Promise<UserAddressResponse> {
    const response = await this.client.patch({
      url: `/user/${userId}/address/${addressId}`,
      data: partialUserAddress,
    })
    return response as unknown as UserAddressResponse
  }
}
