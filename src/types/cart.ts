import type { CartDetailProductPresentationResponse } from './product-presentation'

export type CreateCartDetail = {
  productPresentationId: string
  quantity: number
}

export type CreateCart = {
  items: CreateCartDetail[]
}

export type CartDetailResponse = {
  quantity: number
  id: string
  productPresentation: CartDetailProductPresentationResponse
}

export type CartDetailedResponse = {
  id: string
  items: CartDetailResponse[]
}
