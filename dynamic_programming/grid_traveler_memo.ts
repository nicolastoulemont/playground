export function gridTravelerMemo(x: number, y: number, memo = new Map()): number {
  const key = `${x}-${y}`
  if (memo.has(key)) return memo.get(key)
  if (x === 0 || y === 0) return 0
  if (x === 1 && y === 1) return 1

  memo.set(key, gridTravelerMemo(x - 1, y, memo) + gridTravelerMemo(x, y - 1, memo))
  return memo.get(key)
}
