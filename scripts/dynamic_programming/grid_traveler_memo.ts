function gridTraveler(x: number, y: number, memo = new Map()): number {
  const key = `${x}-${y}`
  if (memo.has(key)) return memo.get(key)
  if (x === 0 || y === 0) return 0
  if (x === 1 && y === 1) return 1

  memo.set(key, gridTraveler(x - 1, y, memo) + gridTraveler(x, y - 1, memo))
  return memo.get(key)
}

export const grid_traveler_memo = {
  fn: () => {
    console.log(gridTraveler(1, 1))
    console.log(gridTraveler(2, 3))
    console.log(gridTraveler(3, 2))
    console.log(gridTraveler(3, 3))
    console.log(gridTraveler(18, 18))
  },
}
