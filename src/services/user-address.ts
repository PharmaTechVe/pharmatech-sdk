import { Client } from '../client'
import type { CreateUserAddressRequest, UserAddressResponse } from '../types'

export class UserAddressService {
  private client: Client
  constructor(client: Client) {
    this.client = client
    this.getAddress = this.getAddress.bind(this)
    this.getListAddresses = this.getListAddresses.bind(this)
    this.createAddress = this.createAddress.bind(this)
    this.deleteAddress = this.deleteAddress.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  async getAddress(
    userId: string,
    addressId: string,
    jwt: string,
  ): Promise<UserAddressResponse> {
    const response = await this.client.get({
      url: `/user/${userId}/address/${addressId}`,
      jwt,
    })
    return response as unknown as UserAddressResponse
  }

  async getListAddresses(
    userId: string,
    jwt: string,
  ): Promise<UserAddressResponse[]> {
    const response = await this.client.get({
      url: `/user/${userId}/address`,
      jwt,
    })
    return response as unknown as UserAddressResponse[]
  }

  async createAddress(
    userId: string,
    createAddresData: CreateUserAddressRequest,
    jwt: string,
  ): Promise<CreateUserAddressRequest> {
    const response = await this.client.post({
      url: `/user/${userId}/address`,
      data: createAddresData,
      jwt,
    })
    return response as unknown as CreateUserAddressRequest
  }

  async deleteAddress(
    userId: string,
    addressId: string,
    jwt: string,
  ): Promise<void> {
    await this.client.delete({
      url: `/user/${userId}/address/${addressId}`,
      jwt,
    })
  }

  async updateAddress(
    userId: string,
    partialUserAddress: Partial<CreateUserAddressRequest>,
    addressId: string,
    jwt: string,
  ): Promise<UserAddressResponse> {
    const response = await this.client.patch({
      url: `/user/${userId}/address/${addressId}`,
      data: partialUserAddress,
      jwt,
    })
    return response as unknown as UserAddressResponse
  }
}
