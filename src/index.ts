import { AuthService } from './auth'
import { BranchService } from './branch'
import { CategoryService } from './category'
import { Client } from './client'
import { CountryService } from './country'
import { GenericProductService } from './generic-product'
import { InventoryService } from './inventory'
import { ManufacturerService } from './manufacturer'
import { PresentationService } from './presentation'
import { ProductService } from './product'
import { StateService } from './state'
import { UserService } from './user'
import { PromoService } from './promo'
import { CityService } from './city'
import { UserAddressService } from './user-address'
import { ProductPresentationService } from './product-presentation'
import { ProductImageService } from './product-image'

export class PharmaTech {
  private static instance: PharmaTech
  private client: Client
  auth: AuthService
  product: ProductService
  user: UserService
  country: CountryService
  state: StateService
  city: CityService
  branch: BranchService
  category: CategoryService
  presentation: PresentationService
  manufacturer: ManufacturerService
  genericProduct: GenericProductService
  inventory: InventoryService
  promo: PromoService
  userAdress: UserAddressService
  productPresentation: ProductPresentationService
  productImage: ProductImageService

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
    this.city = new CityService(this.client)
    this.branch = new BranchService(this.client)
    this.category = new CategoryService(this.client)
    this.presentation = new PresentationService(this.client)
    this.manufacturer = new ManufacturerService(this.client)
    this.genericProduct = new GenericProductService(this.client)
    this.inventory = new InventoryService(this.client)
    this.promo = new PromoService(this.client)
    this.userAdress = new UserAddressService(this.client)
    this.productPresentation = new ProductPresentationService(this.client)
    this.productImage = new ProductImageService(this.client)
  }

  static getInstance(isDevMode = false): PharmaTech {
    if (!PharmaTech.instance) {
      PharmaTech.instance = new PharmaTech(isDevMode)
    }
    return PharmaTech.instance
  }

  version(): string {
    return '0.3.6'
  }
}
