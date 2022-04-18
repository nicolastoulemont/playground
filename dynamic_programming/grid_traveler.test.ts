import { gridTravelerMemo } from './grid_traveler_memo'
import { gridTravelerTabulation } from './grid_traveler_tabulation'
import { describe, test, expect } from '~/utils'

describe('grid_traveler', () => {
  test('grid_traveler memo', () => {
    expect(gridTravelerMemo(1, 1)).toBe(1)
    expect(gridTravelerMemo(2, 3)).toBe(3)
    expect(gridTravelerMemo(3, 2)).toBe(3)
    expect(gridTravelerMemo(3, 3)).toBe(6)
    expect(gridTravelerMemo(18, 18)).toBe(2333606220)
  })
  test('grid_traveler tabulation', () => {
    expect(gridTravelerTabulation(1, 1)).toBe(1)
    expect(gridTravelerTabulation(2, 3)).toBe(3)
    expect(gridTravelerTabulation(3, 2)).toBe(3)
    expect(gridTravelerTabulation(3, 3)).toBe(6)
    expect(gridTravelerTabulation(18, 18)).toBe(2333606220)
  })
})
