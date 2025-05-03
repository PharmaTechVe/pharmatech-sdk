import type { Client } from '../client'
import type {
  ReportQueryParams,
  DashboardResponse,
  OrdersByStatusResponse,
  SalesReportResponse,
} from '../types'

export class ReportService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getDashboard = this.getDashboard.bind(this)
    this.getOrdersByStatus = this.getOrdersByStatus.bind(this)
    this.getSalesReport = this.getSalesReport.bind(this)
  }

  async getDashboard(
    params: ReportQueryParams,
    jwt: string,
  ): Promise<DashboardResponse> {
    const response = await this.client.get({
      url: '/report/dashboard',
      params,
      jwt,
    })
    return response as unknown as DashboardResponse
  }

  async getOrdersByStatus(
    params: ReportQueryParams,
    jwt: string,
  ): Promise<OrdersByStatusResponse> {
    const response = await this.client.get({
      url: '/report/order',
      params,
      jwt,
    })
    return response as unknown as OrdersByStatusResponse
  }

  async getSalesReport(
    params: ReportQueryParams,
    jwt: string,
  ): Promise<SalesReportResponse> {
    const response = await this.client.get({
      url: '/report/sale',
      params,
      jwt,
    })
    return response as unknown as SalesReportResponse
  }
}
