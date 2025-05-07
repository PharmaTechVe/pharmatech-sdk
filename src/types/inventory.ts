import type { BranchResponse } from './branch'
import type { ProductPresentation } from './product'
import type { BaseModel, PaginationRequest } from './utils'

export type Inventory = {
  stockQuantity: number
  branchId: string
  productPresentationId: string
}

export type InventoryResponse = BaseModel & {
  stockQuantity: number
  branch: BranchResponse
  productPresentation: ProductPresentation
}

export type InventoryPaginationRequest = PaginationRequest & {
  branchId?: string
  productPresentationId?: string
}

export type InventoryBulkDetail = {
  productPresentationId: string
  quantity: number
  expirationDate: Date
}

export type UpdateInventoryBulk = {
  inventories: InventoryBulkDetail[]
}
