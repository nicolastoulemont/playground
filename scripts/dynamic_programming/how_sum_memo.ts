function howSum(target: number, numbers: number[], memo = new Map()): number[] | null {
  if (memo.has(target)) return memo.get(target)
  if (target === 0) return []
  if (target < 0) return null
  for (const num of numbers) {
    const remainder = target - num
    if (remainder === 0) return [num]

    const result = howSum(remainder, numbers, memo)
    if (result && result.length > 0) {
      memo.set(target, [num, ...result])
      return [num, ...result]
    }
  }
  memo.set(target, null)
  return null
}

export const how_sum_memo = {
  fn: () => {
    console.log(howSum(7, [2, 3]))
    console.log(howSum(8, [2, 3, 5]))
    console.log(howSum(7, [5, 3, 4, 7]))
    console.log(howSum(300, [7, 14]))
  },
}
