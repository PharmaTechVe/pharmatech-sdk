import type { Client } from '../client'
import type {
  Pagination,
  Coupon,
  CouponResponse,
  CouponPaginationRequest,
  BulkUpdateCoupon,
  BulkDeleteCoupon,
} from '../types'

export class CouponService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getByCode = this.getByCode.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.bulkUpdate = this.bulkUpdate.bind(this)
    this.bulkDelete = this.bulkDelete.bind(this)
  }

  async getByCode(code: string, jwt: string): Promise<CouponResponse> {
    const response = await this.client.get({
      url: `/coupon/${code}`,
      jwt,
    })
    return response as unknown as CouponResponse
  }

  async findAll(
    { page = 1, limit = 10, q, expirationBetween }: CouponPaginationRequest,
    jwt: string,
  ): Promise<Pagination<CouponResponse>> {
    const params = {
      page,
      limit,
      q,
      expirationBetween: expirationBetween
        ? [expirationBetween.start, expirationBetween.end].join(',')
        : undefined,
    }
    const response = await this.client.get({
      url: '/coupon',
      params,
      jwt,
    })
    return response as Pagination<CouponResponse>
  }

  async create(coupon: Coupon, jwt: string): Promise<CouponResponse> {
    const response = await this.client.post({
      url: '/coupon',
      data: coupon,
      jwt,
    })
    return response as unknown as CouponResponse
  }

  async update(
    code: string,
    partialCoupon: Partial<Coupon>,
    jwt: string,
  ): Promise<CouponResponse> {
    const response = await this.client.patch({
      url: `/coupon/${code}`,
      data: partialCoupon,
      jwt,
    })
    return response as unknown as CouponResponse
  }

  async delete(code: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/coupon/${code}`,
      jwt,
    })
  }

  async bulkUpdate(data: BulkUpdateCoupon, jwt: string): Promise<void> {
    await this.client.patch({
      url: '/coupon/bulk',
      data,
      jwt,
    })
  }

  async bulkDelete(data: BulkDeleteCoupon, jwt: string): Promise<void> {
    await this.client.delete({
      url: '/coupon/bulk',
      data,
      jwt,
    })
  }
}
