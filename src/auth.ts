import { Client } from './client'
import axios from 'axios'

export enum UserGender {
  MALE = 'm',
  FEMALE = 'f',
}

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
  phoneNumber?: string | null
  birthDate: string
  gender?: UserGender | null
}

export type SignUpResponse = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  firstName: string
  lastName: string
  email: string
  documentId: string
  phoneNumber: string
  lastOrderDate: Date
  role: string
}

export class AuthService {
  private client: Client
  constructor(isDevMode: boolean) {
    this.client = new Client(isDevMode)
    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.forgotPassword = this.forgotPassword.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
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
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!birthDateRegex.test(signUpData.birthDate)) {
      throw new Error(
        'La fecha de nacimiento debe estar en el formato YYYY-MM-DD.',
      )
    }
    try {
      const response = await this.client.post({
        url: '/auth/signup',
        data: signUpData,
      })
      return response as unknown as SignUpResponse
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

  async forgotPassword(email: string): Promise<void> {
    try {
      await this.client.post({
        url: '/auth/forgot-password',
        data: {
          email,
        },
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }
      throw new Error('Error solicitando cambio de contraseña.')
    }
  }

  async resetPassword(otp: string): Promise<LoginResponse> {
    try {
      const response = await this.client.post({
        url: '/auth/reset-password',
        data: {
          otp,
        },
      })
      return response as unknown as LoginResponse
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }
      throw new Error('Error reseteando la contraseña.')
    }
  }

  async updatePassword(password: string, jwt: string): Promise<void> {
    try {
      await this.client.patch({
        url: '/auth/password',
        data: {
          password,
        },
        jwt,
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }
      throw new Error('Error actualizando la contraseña.')
    }
  }
}
