function fib(num: number): number {
  if (num <= 1) return num

  let fibs: number[] = [0, 1]
  for (let i = 2; i <= num; i++) {
    fibs[i] = fibs[i - 1] + fibs[i - 2]
  }
  return fibs[num]
}

export const fib_tabulation = {
  fn: () => {
    console.log(fib(6))
    console.log(fib(7))
    console.log(fib(8))
    console.log(fib(50))
  },
}
