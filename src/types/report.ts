export type ReportQueryParams = {
  startDate: string
  endDate: string
  branchId?: string
}

export type DashboardResponse = {
  openOrders: number
  completedOrders: number
  totalSales: number
  totalNewUsers: number
}

export type OrdersByStatusItem = {
  status: string
  count: number
}
export type OrdersByStatusResponse = OrdersByStatusItem[]

export type SalesReportItem = {
  productId: string
  productName: string
  subtotal: number
  discount: number
  total: number
}
export type SalesReportResponse = {
  items: SalesReportItem[]
  totals: {
    subtotal: number
    discount: number
    total: number
  }
}
