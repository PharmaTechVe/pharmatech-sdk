import { Client } from '../client'
import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from '../types'

export class AuthService {
  private client: Client
  constructor(client: Client) {
    this.client = client
    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.forgotPassword = this.forgotPassword.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.validateOtp = this.validateOtp.bind(this)
    this.resendOtp = this.resendOtp.bind(this)
  }

  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post({
      url: '/auth/login',
      data: {
        email,
        password,
      },
    })
    return response as unknown as LoginResponse
  }

  async signUp(signUpData: SignUpRequest): Promise<SignUpResponse> {
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!birthDateRegex.test(signUpData.birthDate)) {
      throw new Error(
        'La fecha de nacimiento debe estar en el formato YYYY-MM-DD.',
      )
    }
    const response = await this.client.post({
      url: '/auth/signup',
      data: signUpData,
    })
    return response as unknown as SignUpResponse
  }

  async forgotPassword(email: string): Promise<void> {
    await this.client.post({
      url: '/auth/forgot-password',
      data: {
        email,
      },
    })
  }

  async resetPassword(otp: string): Promise<LoginResponse> {
    const response = await this.client.post({
      url: '/auth/reset-password',
      data: {
        otp,
      },
    })
    return response as unknown as LoginResponse
  }

  async updatePassword(password: string, jwt: string): Promise<void> {
    await this.client.patch({
      url: '/auth/password',
      data: {
        password,
      },
      jwt,
    })
  }

  async validateOtp(otp: string, jwt: string): Promise<void> {
    await this.client.post({
      url: '/user/otp',
      data: { otp },
      jwt,
    })
  }

  async resendOtp(jwt: string): Promise<void> {
    await this.client.post({
      url: '/auth/otp',
      jwt,
    })
  }
}
