import type { NotificationResponse } from '../types'
import type { Client } from '../client'

export class NotificationService {
  private client: Client

  constructor(client: Client) {
    this.client = client
    this.getNotifications = this.getNotifications.bind(this)
    this.markAsRead = this.markAsRead.bind(this)
  }

  async getNotifications(jwt: string): Promise<NotificationResponse> {
    const response = await this.client.get({
      url: '/notification',
      jwt,
    })
    return response as unknown as NotificationResponse
  }

  async markAsRead(orderId: string, jwt: string): Promise<void> {
    await this.client.post({
      url: `/notification/${orderId}/read`,
      jwt,
    })
  }
}
