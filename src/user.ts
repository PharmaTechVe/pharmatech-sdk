import { Client } from './client'
import type { BaseModel, Pagination, PaginationRequest } from './utils/models'

export type ProfileResponse = {
  firstName: string
  lastName: string
  email: string
  documentId: string
  phoneNumber: string
  birthDate: Date
  gender: string
  profilePicture: string
  role: string
}

export type Profile = {
  profilePicture: string
  birthDate: Date
  gender: string
}

export type UserList = BaseModel & {
  firstName: string
  lastName: string
  email: string
  documentId: string
  phoneNumber: string
  lastOrderDate: Date
  role: string
  isValidated: boolean
  profile: Profile
}

export class UserService {
  private client: Client
  constructor(client: Client) {
    this.client = client
    this.getProfile = this.getProfile.bind(this)
    this.findAll = this.findAll.bind(this)
  }

  async getProfile(userId: string): Promise<ProfileResponse> {
    const response = await this.client.get({
      url: `/user/${userId}`,
    })
    return response as unknown as ProfileResponse
  }

  async findAll({
    page,
    limit = 10,
  }: PaginationRequest): Promise<Pagination<UserList>> {
    const response = await this.client.get({
      url: '/user',
      params: { page, limit },
    })
    return response as unknown as Pagination<UserList>
  }
}
