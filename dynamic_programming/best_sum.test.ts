import { bestSumMemo } from './best_sum_memo'
import { bestSumTabulation } from './best_sum_tabulation'
import { test, expect, describe } from '~/utils'

describe('bestSum', () => {
  test('bestSum memo', () => {
    expect(bestSumMemo(7, [5, 3, 4, 7])).toStrictEqual([7])
    expect(bestSumMemo(8, [2, 3, 5])).toStrictEqual([3, 5])
    expect(bestSumMemo(8, [1, 4, 5])).toStrictEqual([4, 4])
    expect(bestSumMemo(100, [1, 2, 5, 25])).toStrictEqual([25, 25, 25, 25])
  })
  test('bestSum tabulation', () => {
    expect(bestSumTabulation(7, [5, 3, 4, 7])).toStrictEqual([7])
    expect(bestSumTabulation(8, [2, 3, 5])).toStrictEqual([3, 5])
    expect(bestSumTabulation(8, [1, 4, 5])).toStrictEqual([4, 4])
    expect(bestSumTabulation(100, [1, 2, 5, 25])).toStrictEqual([25, 25, 25, 25])
  })
})
