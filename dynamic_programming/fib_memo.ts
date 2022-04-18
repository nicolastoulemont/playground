export function fibMemo(num: number, memo = new Map()): number {
  if (memo.has(num)) return memo.get(num)
  if (num <= 2) return 1
  memo.set(num, fibMemo(num - 1, memo) + fibMemo(num - 2, memo))
  return memo.get(num)
}
