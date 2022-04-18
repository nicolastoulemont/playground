export function howSumMemo(target: number, numbers: number[], memo = new Map()): number[] | null {
  if (memo.has(target)) return memo.get(target)
  if (target === 0) return []
  if (target < 0) return null
  for (const num of numbers) {
    const remainder = target - num
    const result = howSumMemo(remainder, numbers, memo)
    if (result) {
      memo.set(target, [num, ...result])
      return [num, ...result]
    }
  }
  memo.set(target, null)
  return null
}
