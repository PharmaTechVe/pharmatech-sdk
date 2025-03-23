import type { Client } from './client'
import type { BaseModel, Pagination, PaginationRequest } from './utils/models'

export type Presentation = {
  name: string
  description: string
  quantity: number
  measurementUnit: string
}

export type PresentationResponse = Presentation & BaseModel

export class PresentationService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string, jwt: string): Promise<PresentationResponse> {
    const response = await this.client.get({
      url: `/presentation/${id}`,
      jwt,
    })
    return response as unknown as PresentationResponse
  }

  async findAll(
    { page = 1, limit = 10 }: PaginationRequest,
    jwt: string,
  ): Promise<Pagination<PresentationResponse>> {
    const response = await this.client.get({
      url: '/presentation',
      params: { page, limit },
      jwt,
    })
    return response as Pagination<PresentationResponse>
  }

  async create(
    presentation: Presentation,
    jwt: string,
  ): Promise<PresentationResponse> {
    const response = await this.client.post({
      url: '/presentation',
      data: presentation,
      jwt,
    })
    return response as unknown as PresentationResponse
  }

  async update(
    id: string,
    partialPresentation: Partial<Presentation>,
    jwt: string,
  ): Promise<PresentationResponse> {
    const response = await this.client.patch({
      url: `/presentation/${id}`,
      data: partialPresentation,
      jwt,
    })
    return response as unknown as PresentationResponse
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/presentation/${id}`,
      jwt,
    })
  }
}
