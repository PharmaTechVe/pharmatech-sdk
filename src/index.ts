import { Client } from './client'
import {
  AuthService,
  BranchService,
  CategoryService,
  CityService,
  CountryService,
  GenericProductService,
  InventoryService,
  ManufacturerService,
  PresentationService,
  ProductImageService,
  ProductPresentationService,
  ProductService,
  PromoService,
  StateService,
  UserAddressService,
  UserService,
  CouponService,
  PaymentInformationService,
  PaymentConfirmationService,
  NotificationService,
  ProfileDeliveryService,
  DeliveryService,
  OrderService,
  ProductCategoryService,
  CartService,
  BankService,
  ReportService,
  ActivePrincipleService,
  SalesPredictionService,
  LotService,
} from './services'

export class PharmaTech {
  private static instance: PharmaTech
  client: Client
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
  productCategory: ProductCategoryService
  coupon: CouponService
  paymentInformation: PaymentInformationService
  paymentConfirmation: PaymentConfirmationService
  notification: NotificationService
  deliveryService: DeliveryService
  order: OrderService
  cart: CartService
  bank: BankService
  profileDeliveryService: ProfileDeliveryService
  report: ReportService
  activePrinciple: ActivePrincipleService
  salesPrediction: SalesPredictionService
  lot: LotService

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
    this.coupon = new CouponService(this.client)
    this.paymentInformation = new PaymentInformationService(this.client)
    this.paymentConfirmation = new PaymentConfirmationService(this.client)
    this.notification = new NotificationService(this.client)
    this.profileDeliveryService = new ProfileDeliveryService(this.client)
    this.deliveryService = new DeliveryService(this.client)
    this.order = new OrderService(this.client)
    this.productCategory = new ProductCategoryService(this.client)
    this.cart = new CartService(this.client)
    this.bank = new BankService()
    this.report = new ReportService(this.client)
    this.activePrinciple = new ActivePrincipleService(this.client)
    this.salesPrediction = new SalesPredictionService(this.client)
    this.lot = new LotService(this.client)
  }

  static getInstance(isDevMode = false): PharmaTech {
    if (!PharmaTech.instance) {
      PharmaTech.instance = new PharmaTech(isDevMode)
    }
    return PharmaTech.instance
  }

  version(): string {
    return '0.4.22'
  }
}

export * from './types'
export * from './errors'
