function fib(num: number, memo = new Map()): any {
  if (memo.has(num)) return memo.get(num)
  if (num <= 2) return 1
  memo.set(num, fib(num - 1, memo) + fib(num - 2, memo))
  return memo.get(num)
}

export const fib_memo = {
  fn: () => {
    console.log(fib(6))
    console.log(fib(7))
    console.log(fib(8))
    console.log(fib(50))
  },
}
