function bestSum(target: number, numbers: number[], memo = new Map()): number[] | null {
  if (memo.has(target)) return memo.get(target)
  if (target === 0) return []
  if (target < 0) return null
  let shortest = null
  for (const num of numbers) {
    const remainder = target - num
    const result = bestSum(remainder, numbers, memo)
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

export const best_sum_memo = {
  fn: () => {
    console.log(bestSum(7, [5, 3, 4, 7]))
    console.log(bestSum(8, [2, 3, 5]))
    console.log(bestSum(8, [1, 4, 5]))
    console.log(bestSum(100, [1, 2, 5, 25]))
  },
}
