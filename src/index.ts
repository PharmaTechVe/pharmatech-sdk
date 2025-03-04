import { AuthService } from './auth'

export class PharmaTech {
  auth: AuthService

  constructor(isDevMode: boolean) {
    this.auth = new AuthService(isDevMode)
  }

  version(): string {
    return '0.1.0'
  }
}
