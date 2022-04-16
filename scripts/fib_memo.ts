function fib(num: number): any {
  if (num <= 2) return 1
  return fib(num - 1) + fib(num - 2)
}

export const fib_memo = {
  fn: () => {
    console.log(fib(6))
    console.log(fib(7))
    console.log(fib(8))
    console.log(fib(50))
  },
}
