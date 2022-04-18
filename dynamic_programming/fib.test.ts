import { fibMemo } from './fib_memo'
import { fibTabulation } from './fib_tabulation'
import { describe, test, expect } from '~/utils'

describe('fib', () => {
  test('fib memo', () => {
    expect(fibMemo(6)).toBe(8)
    expect(fibMemo(7)).toBe(13)
    expect(fibMemo(8)).toBe(21)
    expect(fibMemo(50)).toBe(12586269025)
  })
  test('fib tabulation', () => {
    expect(fibTabulation(6)).toBe(8)
    expect(fibTabulation(7)).toBe(13)
    expect(fibTabulation(8)).toBe(21)
    expect(fibTabulation(50)).toBe(12586269025)
  })
})
