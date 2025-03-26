import { AuthService } from './auth'
import { BranchService } from './branch'
import { CategoryService } from './category'
import { Client } from './client'
import { CountryService } from './country'
import { InventoryService } from './inventory'
import { ManufacturerService } from './manufacturer'
import { PresentationService } from './presentation'
import { ProductService } from './product'
import { StateService } from './state'
import { UserService } from './user'

export class PharmaTech {
  private static instance: PharmaTech
  private client: Client
  auth: AuthService
  product: ProductService
  user: UserService
  country: CountryService
  state: StateService
  branch: BranchService
  category: CategoryService
  presentation: PresentationService
  manufacturer: ManufacturerService
  inventory: InventoryService

  /**
   * @deprecated Use `PharmaTech.getInstance()` instead.
   */
  constructor(isDevMode: boolean, origin?: string) {
    this.client = new Client(isDevMode, origin)
    this.auth = new AuthService(this.client)
    this.product = new ProductService(this.client)
    this.user = new UserService(this.client)
    this.country = new CountryService(this.client)
    this.state = new StateService(this.client)
    this.branch = new BranchService(this.client)
    this.category = new CategoryService(this.client)
    this.presentation = new PresentationService(this.client)
    this.manufacturer = new ManufacturerService(this.client)
    this.inventory = new InventoryService(this.client)
  }

  static getInstance(isDevMode = false): PharmaTech {
    if (!PharmaTech.instance) {
      PharmaTech.instance = new PharmaTech(isDevMode)
    }
    return PharmaTech.instance
  }

  version(): string {
    return '0.3.1'
  }
}
