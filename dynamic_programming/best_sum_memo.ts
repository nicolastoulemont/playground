export function bestSumMemo(target: number, numbers: number[], memo = new Map()): number[] | null {
  if (memo.has(target)) return memo.get(target)
  if (target === 0) return []
  if (target < 0) return null
  let shortest = null
  for (const num of numbers) {
    const remainder = target - num
    const result = bestSumMemo(remainder, numbers, memo)
    if (result) {
      const resultWithNum = [num, ...result]
      memo.set(target, resultWithNum)
      if (!shortest || resultWithNum.length < shortest.length) {
        shortest = resultWithNum
      }
    }
  }
  memo.set(target, shortest)
  return shortest
}
