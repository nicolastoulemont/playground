import { howSumMemo } from './how_sum_memo'
import { howSumTabulation } from './how_sum_tabulation'
import { describe, test, expect } from '~/utils'

describe('howSum', () => {
  test('howSum memo', () => {
    expect(howSumMemo(7, [2, 3])).toStrictEqual([2, 2, 3])
    expect(howSumMemo(8, [2, 3, 5])).toStrictEqual([2, 2, 2, 2])
    expect(howSumMemo(7, [5, 3, 4, 7])).toStrictEqual([3, 4])
    expect(howSumMemo(300, [7, 14])).toBe(null)
  })
  test('howSum tabulation', () => {
    expect(howSumTabulation(7, [2, 3])).toStrictEqual([2, 2, 3])
    expect(howSumTabulation(8, [2, 3, 5])).toStrictEqual([2, 2, 2, 2])
    expect(howSumTabulation(7, [5, 3, 4, 7])).toStrictEqual([3, 4])
    expect(howSumTabulation(300, [7, 14])).toBe(null)
  })
})
