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
  orderId: string
  user: string
  date: string
  type: string
  quantity: number
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
