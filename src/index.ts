import { AuthService } from './auth'

export class PharmaTech {
  public auth: AuthService

  constructor() {
    this.auth = new AuthService()
  }

  version(): string {
    return '0.0.3'
  }
}
