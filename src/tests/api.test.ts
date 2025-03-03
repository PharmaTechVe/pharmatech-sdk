import { PharmaTech } from '../index'
import { test, expect, vi } from 'vitest'

vi.mock('../client', () => {
  return {
    Client: vi.fn().mockImplementation(() => {
      return {
        post: vi.fn().mockResolvedValue({
          accessToken: 'mockAccessToken',
        }),
      }
    }),
  }
})

test('PharmaTech is running', async () => {
  const pharmaTech = new PharmaTech()
  expect(pharmaTech).toBeDefined()
  const version = pharmaTech.version()
  expect(version).toBe('0.0.3')
})

test('AuthService login', async () => {
  const pharmaTech = new PharmaTech()
  const loginResponse = await pharmaTech.auth.login({
    email: 'test@example.com',
    password: 'password123',
  })

  expect(loginResponse).toBeDefined()
  expect(loginResponse.accessToken).toBe('mockAccessToken')
})
