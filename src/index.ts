import { AuthService } from './auth'
import { ProductService } from './product'

export class PharmaTech {
  auth: AuthService
  product: ProductService

  constructor(isDevMode: boolean) {
    this.auth = new AuthService(isDevMode)
    this.product = new ProductService(isDevMode)
  }

  version(): string {
    return '0.1.0'
  }
}
