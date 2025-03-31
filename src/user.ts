import type { UserGender } from './auth'
import { Client } from './client'
import type { BaseModel, Pagination, PaginationRequest } from './utils/models'

export enum UserRole {
  ADMIN = 'admin',
  BRANCH_ADMIN = 'branch_admin',
  CUSTOMER = 'customer',
  DELIVERY = 'delivery',
}

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

type UpdateUser = {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  profilePicture?: string
  birthDate?: string
  gender?: UserGender
  role?: UserRole
}

type CreateUser = {
  firstName: string
  lastName: string
  email: string
  documentId: string
  phoneNumber: string
  birthDate: string
  gender: UserGender
  role: UserRole
}

export class UserService {
  private client: Client
  constructor(client: Client) {
    this.client = client
    this.getProfile = this.getProfile.bind(this)
    this.findAll = this.findAll.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getProfile(userId: string, jwt: string): Promise<UserList> {
    const response = await this.client.get({
      url: `/user/${userId}`,
      jwt,
    })
    return response as unknown as UserList
  }

  async findAll(
    { page, limit = 10 }: PaginationRequest,
    jwt: string,
  ): Promise<Pagination<UserList>> {
    const response = await this.client.get({
      url: '/user',
      params: { page, limit },
      jwt,
    })
    return response as unknown as Pagination<UserList>
  }

  async create(user: CreateUser, jwt: string) {
    const response = await this.client.post({
      url: `/user`,
      data: user,
      jwt,
    })
    return response as unknown as UserList
  }

  async update(
    userId: string,
    partialUser: Partial<UpdateUser>,
    jwt: string,
  ): Promise<UserList> {
    const response = await this.client.patch({
      url: `/user/${userId}`,
      data: partialUser,
      jwt,
    })
    return response as unknown as UserList
  }

  async delete(userId: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/user/${userId}`,
      jwt,
    })
  }
}
