import { lowerBound } from './lowerbound'
import { test, expect } from '~/utils'

test('lowerbound', () => {
  const arr = [1, 2, 3, 5]
  const index = lowerBound(arr, 4, (a: number, b: number) => a - b)
  expect(index).toBe(3)
})
