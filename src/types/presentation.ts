import type { BaseModel } from './utils'

export type Presentation = {
  name: string
  description: string
  quantity: number
  measurementUnit: string
}

export type PresentationResponse = Presentation & BaseModel
