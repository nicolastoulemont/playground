function canSum(target: number, numbers: number[], memo = new Map()): boolean {
  if (memo.has(target)) return memo.get(target)
  if (target === 0) return true
  if (target < 0) return false
  for (const num of numbers) {
    const remainder = target - num
    if (canSum(remainder, numbers, memo) === true) {
      memo.set(target, true)
      return true
    }
  }
  memo.set(target, false)
  return false
}

export const can_sum_memo = {
  fn: () => {
    console.log(canSum(7, [2, 3]))
    console.log(canSum(7, [5, 3, 4, 7]))
    console.log(canSum(7, [2, 4]))
    console.log(canSum(8, [2, 3, 5]))
    console.log(canSum(300, [7, 14]))
  },
}
