import { AuthService } from './auth'
import { ProductService } from './product'
import { UserService } from './user'

export class PharmaTech {
  auth: AuthService
  product: ProductService
  user: UserService

  constructor(isDevMode: boolean) {
    this.auth = new AuthService(isDevMode)
    this.product = new ProductService(isDevMode)
    this.user = new UserService(isDevMode)
  }

  version(): string {
    return '0.2.1'
  }
}
