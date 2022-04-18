import { canSumMemo } from './can_sum_memo'
import { canSumTabulation } from './can_sum_tabulation'
import { describe, test, expect } from '~/utils'

describe('canSum', () => {
  test('canSum memo', () => {
    expect(canSumMemo(7, [2, 3])).toBe(true)
    expect(canSumMemo(7, [5, 3, 4, 7])).toBe(true)
    expect(canSumMemo(7, [2, 4])).toBe(false)
    expect(canSumMemo(8, [2, 3, 5])).toBe(true)
    expect(canSumMemo(300, [7, 14])).toBe(false)
  })
  test('canSum tabulation', () => {
    expect(canSumTabulation(7, [2, 3])).toBe(true)
    expect(canSumTabulation(7, [5, 3, 4, 7])).toBe(true)
    expect(canSumTabulation(7, [2, 4])).toBe(false)
    expect(canSumTabulation(8, [2, 3, 5])).toBe(true)
    expect(canSumTabulation(300, [7, 14])).toBe(false)
  })
})
