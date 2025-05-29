import type { BranchResponse } from './branch'
import type { ProductPresentation } from './product'
import type { BaseModel, PaginationRequest } from './utils'

export type LotResponse = BaseModel & {
  quantity: number
  expirationDate: Date
  branch: BranchResponse
  productPresentation: ProductPresentation
}

export type LotPaginationRequest = PaginationRequest & {
  branchId?: string
  productPresentationId?: string
}
