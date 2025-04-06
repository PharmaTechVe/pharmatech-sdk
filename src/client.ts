import axios, { type AxiosInstance } from 'axios'
import { BASE_URL, DEV_URL } from './settings'
import { APIError } from './errors'
import type { Pagination } from './types'

export type ClientConfig = {
  url: string
  jwt?: string
  data?: object
  params?: object
}

export class Client {
  private client: AxiosInstance
  jwt?: string

  constructor(isDevMode: boolean, origin?: string) {
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (origin) {
      headers['Origin'] = origin
    }
    this.client = axios.create({
      baseURL: isDevMode ? DEV_URL : BASE_URL,
      headers,
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
        let message = error.response?.data?.message
        if (typeof message === 'string') {
          message = [message]
        }
        throw new APIError(message, error.response?.status ?? 500)
      }
      throw new Error(error as string)
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

  setJWT(jwt: string) {
    this.jwt = jwt
  }

  removeJWT() {
    this.jwt = undefined
  }
}
