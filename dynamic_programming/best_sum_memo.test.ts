import { bestSum } from './best_sum_memo'
import { test, expect } from '~/utils'

test('bestSum', () => {
  expect(bestSum(7, [5, 3, 4, 7])).toStrictEqual([7])
  expect(bestSum(8, [2, 3, 5])).toStrictEqual([3, 5])
  expect(bestSum(8, [1, 4, 5])).toStrictEqual([4, 4])
  expect(bestSum(100, [1, 2, 5, 25])).toStrictEqual([25, 25, 25, 25])
})
