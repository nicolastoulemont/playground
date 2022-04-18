import { howSum } from './how_sum_memo'
import { test, expect } from '~/utils'

test('howSum', () => {
  expect(howSum(7, [2, 3])).toStrictEqual([2, 2, 3])
  expect(howSum(8, [2, 3, 5])).toStrictEqual([2, 2, 2, 2])
  expect(howSum(7, [5, 3, 4, 7])).toStrictEqual([3, 4])
  expect(howSum(300, [7, 14])).toBe(null)
})
