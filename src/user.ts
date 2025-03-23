import { Client } from './client'
import axios from 'axios'
import type {
  BaseModel,
  Pagination,
  PaginationRequest,
  UUIDModel,
} from './utils/models'

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
  constructor(isDevMode: boolean) {
    this.client = new Client(isDevMode)
    this.getProfile = this.getProfile.bind(this)
  }

  async getProfile(userId: string): Promise<ProfileResponse> {
    try {
      const response = await this.client.get({
        url: `/user/${userId}`,
      })
      return response as unknown as ProfileResponse
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }
      throw new Error('Error al obtener el perfil del usuario.')
    }
  }

  async getUsers({
    page,
    limit = 10,
  }: PaginationRequest): Promise<Pagination<UserList>> {
    try {
      const response = await this.client.get({
        url: '/user',
        params: { page, limit },
      })

      if ('results' in response) {
        return response as unknown as Pagination<UserList>
      }

      throw new Error('La respuesta del servidor no es válida.')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }
      throw new Error('Error inesperado al obtener los usuarios.')
    }
  }
}
