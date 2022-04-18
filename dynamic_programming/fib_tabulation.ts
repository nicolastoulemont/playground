export function fibTabulation(num: number): number {
  if (num <= 1) return num

  let fibs: number[] = [0, 1]
  for (let i = 2; i <= num; i++) {
    fibs[i] = fibs[i - 1] + fibs[i - 2]
  }
  return fibs[num]
}
