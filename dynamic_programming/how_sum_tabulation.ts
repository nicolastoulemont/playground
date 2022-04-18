export function howSumTabulation(target: number, numbers: number[]): number[] | null {
  const table = Array(target + 1).fill(null)
  // Because if target is 0, we can always sum 0
  table[0] = []
  for (let i = 0; i <= target; i++) {
    if (table[i] !== null) {
      for (const num of numbers) {
        table[i + num] = [num, ...table[i]]
      }
    }
  }

  return table[target]
}
