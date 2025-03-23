import axios, { type AxiosInstance } from 'axios'
import { BASE_URL, DEV_URL } from './settings'
import type { Pagination } from './utils/models'
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  type APIError,
} from './errors'

export type ClientConfig = {
  url: string
  jwt?: string
  data?: object
  params?: object
}

export class Client {
  private client: AxiosInstance

  constructor(isDevMode: boolean) {
    this.client = axios.create({
      baseURL: isDevMode ? DEV_URL : BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async call(method: string, config: ClientConfig): Promise<Response> {
    if (config.jwt) {
      this.client.interceptors.request.use((axiosConfig) => {
        if (axiosConfig.headers) {
          axiosConfig.headers['Authorization'] = `Bearer ${config.jwt}`
        }
        return axiosConfig
      })
    }
    try {
      const response = await this.client.request({
        method: method,
        url: config.url,
        data: config.data,
        params: config.params,
      })
      return response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as APIError
        switch (axiosError.status) {
          case 400:
            throw new BadRequestError(axiosError.response?.data.message)
          case 401:
            throw new UnauthorizedError()
          case 403:
            throw new ForbiddenError()
          case 404:
            throw new NotFoundError(axiosError.response?.data.message[0])
          default:
            throw new InternalServerError(axiosError.response?.data.message[0])
        }
      }
      throw new Error('Something went wrong with the request')
    }
  }

  async get(config: ClientConfig) {
    const isPaginated = config.params && 'page' in config.params
    if (isPaginated) {
      const response = await this.call('get', config)
      if ('results' in response) {
        const data: Pagination<any> = response as unknown as Pagination<any>
        return {
          results: data.results,
          count: data.count,
          next: data.next,
          previous: data.previous,
        }
      }
      throw new Error('Expected Pagination response')
    } else {
      const data = await this.call('get', config)
      return data
    }
  }

  async post(config: ClientConfig) {
    const data = await this.call('post', config)
    return data
  }

  async put(config: ClientConfig) {
    const data = await this.call('put', config)
    return data
  }

  async patch(config: ClientConfig) {
    const data = await this.call('patch', config)
    return data
  }

  async delete(config: ClientConfig) {
    const data = await this.call('delete', config)
    return data
  }
}
