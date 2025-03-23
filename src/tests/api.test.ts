import { UserGender } from '../auth'
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
        patch: vi.fn().mockResolvedValue(undefined),
      }
    }),
  }
})

test('PharmaTech is running', async () => {
  const pharmaTech = new PharmaTech(true)
  expect(pharmaTech).toBeDefined()
  const version = pharmaTech.version()
  expect(version).toBe('0.2.1')
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
    phoneNumber: null,
    birthDate: '2000-01-01',
    gender: null,
  }

  const expectedSignUpResponse = {
    firstName: 'Jhony',
    lastName: 'Test',
    email: 'Jhony.test@example.com',
    documentId: '123456710423',
    phoneNumber: null,
  }

  ;(pharmaTech.auth as any).client.post.mockResolvedValue(
    expectedSignUpResponse,
  )

  const signUpResponse = await pharmaTech.auth.signUp(signUpData)

  expect(signUpResponse).toEqual(expectedSignUpResponse)
})

test('Update password', async () => {
  const pharmaTech = new PharmaTech(true)
  const token = await pharmaTech.auth.login({
    email: 'andres15alvarez@gmail.com',
    password: 'pharmatech',
  })
  ;(pharmaTech.auth as any).client.patch.mockResolvedValue(undefined)
  const response = await pharmaTech.auth.updatePassword(
    'pharmatech',
    token.accessToken,
  )
  expect(response).toBeUndefined()
})

test('UserService getProfile', async () => {
  const pharmaTech = new PharmaTech(true)

  const ProfileResponse = {
    firstName: 'Jhony',
    lastName: 'Test',
    email: 'Jhony.test2@example.com',
    documentId: '2',
    phoneNumber: null,
    birthDate: '2025-03-02',
    gender: null,
    profilePicture: null,
    role: 'customer',
  }

  ;(pharmaTech.user as any).client.get.mockResolvedValueOnce(ProfileResponse)

  const profile = await pharmaTech.user.getProfile(
    '3efe4c87-6029-431b-8250-b3c695ec9397',
  )
  expect(profile).toEqual(ProfileResponse)
})

test('UserService findAll', async () => {
  const pharmaTech = new PharmaTech(true)
  const users = await pharmaTech.user.findAll({ page: 1, limit: 10 })

  expect(users).toBeDefined()
})
