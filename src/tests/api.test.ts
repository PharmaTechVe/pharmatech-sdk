import { PharmaTech } from '../api'
import { test, expect } from 'vitest'

test('PharmaTech is running', () => {
  const pharmaTech = new PharmaTech()
  expect(pharmaTech).toBeDefined()
  const version = pharmaTech.version()
  expect(version).toBe('0.0.1')
})
