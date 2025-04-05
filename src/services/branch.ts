import type { Client } from '../client'
import type {
  Branch,
  BranchResponse,
  CreateBranchRequest,
  Pagination,
  PaginationRequest,
} from '../types'

export class BranchService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getById = this.getById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getById(id: string, jwt: string): Promise<BranchResponse> {
    const response = await this.client.get({
      url: `/branch/${id}`,
      jwt,
    })
    return response as unknown as BranchResponse
  }

  async findAll(
    { page = 1, limit = 10 }: PaginationRequest,
    jwt: string,
  ): Promise<Pagination<BranchResponse>> {
    const response = await this.client.get({
      url: '/branch',
      params: { page, limit },
      jwt,
    })
    return response as Pagination<BranchResponse>
  }

  async create(
    branch: CreateBranchRequest,
    jwt: string,
  ): Promise<BranchResponse> {
    const response = await this.client.post({
      url: '/branch',
      data: branch,
      jwt,
    })
    return response as unknown as BranchResponse
  }

  async update(
    id: string,
    partialBranch: Partial<Branch>,
    jwt: string,
  ): Promise<BranchResponse> {
    const response = await this.client.patch({
      url: `/branch/${id}`,
      data: partialBranch,
      jwt,
    })
    return response as unknown as BranchResponse
  }

  async delete(id: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/branch/${id}`,
      jwt,
    })
  }
}
