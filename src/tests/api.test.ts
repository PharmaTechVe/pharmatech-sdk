import { PharmaTech } from '../index'
import { test, expect, vi } from 'vitest'

vi.mock('../client', () => {
  return {
    Client: vi.fn().mockImplementation(() => {
      return {
        post: vi.fn().mockResolvedValue({
          accessToken: 'mockAccessToken',
        }),
        get: vi.fn().mockResolvedValue({
          results: [],
          count: 0,
          next: null,
          previous: null,
        }),
      }
    }),
  }
})

test('PharmaTech is running', async () => {
  const pharmaTech = new PharmaTech(true)
  expect(pharmaTech).toBeDefined()
  const version = pharmaTech.version()
  expect(version).toBe('0.1.0')
})

test('AuthService login', async () => {
  const pharmaTech = new PharmaTech(true)
  const loginResponse = await pharmaTech.auth.login({
    email: 'test@example.com',
    password: 'password123',
  })

  expect(loginResponse).toBeDefined()
  expect(loginResponse.accessToken).toBe('mockAccessToken')
})

test('ProductService getProducts', async () => {
  const pharmaTech = new PharmaTech(true)
  const products = await pharmaTech.product.getProducts({ page: 1, limit: 10 })

  expect(products).toBeDefined()
})

test('AuthService sign-up', async () => {
  const pharmaTech = new PharmaTech(true)

  const signUpData = {
    firstName: 'Jhony',
    lastName: 'Test',
    email: 'Jhony.test@example.com',
    password: 'securePassword123',
    documentId: '123456710423',
    phoneNumber: '1234567890',
  }

  const expectedSignUpResponse = {
    firstName: 'Jhony',
    lastName: 'Test',
    email: 'Jhony.test@example.com',
    documentId: '123456710423',
    phoneNumber: '1234567890',
  }

  ;(pharmaTech.auth as any).client.post.mockResolvedValue(
    expectedSignUpResponse,
  )

  const signUpResponse = await pharmaTech.auth.signUp(signUpData)

  expect(signUpResponse).toEqual(expectedSignUpResponse)
})
