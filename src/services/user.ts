import { Client } from '../client'
import type {
  BulkUpdateUser,
  CreateUser,
  Pagination,
  PaginationUserRequest,
  UpdateUser,
  UserList,
} from '../types'

export class UserService {
  private client: Client
  constructor(client: Client) {
    this.client = client
    this.getProfile = this.getProfile.bind(this)
    this.findAll = this.findAll.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.bulkUpdate = this.bulkUpdate.bind(this)
  }

  async getProfile(userId: string, jwt: string): Promise<UserList> {
    const response = await this.client.get({
      url: `/user/${userId}`,
      jwt,
    })
    return response as unknown as UserList
  }

  async findAll(
    { page, limit = 10, q, role }: PaginationUserRequest,
    jwt: string,
  ): Promise<Pagination<UserList>> {
    const response = await this.client.get({
      url: '/user',
      params: { page, limit, q, role },
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

  async bulkUpdate(data: BulkUpdateUser, jwt: string): Promise<void> {
    await this.client.patch({
      url: '/user/bulk',
      data,
      jwt,
    })
  }
}
