import { Client } from './client'
import axios from 'axios'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export type SignUpRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  documentId: string
  phoneNumber: string
}

export type SignUpResponse = {
  firstName: string
  lastName: string
  email: string
  documentId: string
  phoneNumber: string
}

export class AuthService {
  private client: Client
  constructor(isDevMode: boolean) {
    this.client = new Client(isDevMode)
    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.client.post({
        url: '/auth/login',
        data: {
          email,
          password,
        },
      })

      if ('accessToken' in response) {
        return response as unknown as LoginResponse
      }

      throw new Error('La respuesta del servidor no es válida.')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          throw new Error(
            'Error usuario/credenciales no validas. Verifique su usuario y contraseña ingresadas.',
          )
        }

        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }

      throw new Error(
        'Error usuario/credenciales no validas. Verifique su usuario y contraseña ingresadas.',
      )
    }
  }

  async signUp(signUpData: SignUpRequest): Promise<SignUpResponse> {
    try {
      const response = await this.client.post({
        url: '/auth/signup',
        data: signUpData,
      })
      return response as SignUpResponse
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }
      throw new Error(
        'Error registrando el usuario. Verifique la información ingresada.',
      )
    }
  }
}
