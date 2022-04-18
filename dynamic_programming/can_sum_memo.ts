export function canSumMemo(target: number, numbers: number[], memo = new Map()): boolean {
  if (memo.has(target)) return memo.get(target)
  if (target === 0) return true
  if (target < 0) return false
  for (const num of numbers) {
    const remainder = target - num
    if (canSumMemo(remainder, numbers, memo) === true) {
      memo.set(target, true)
      return true
    }
  }
  memo.set(target, false)
  return false
}
