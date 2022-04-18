export function canSumTabulation(target: number, numbers: number[]): boolean {
  const table = Array(target + 1).fill(false)
  // Because if target is 0, we can always sum 0
  table[0] = true
  for (let i = 0; i <= target; i++) {
    if (table[i] === true) {
      for (const num of numbers) {
        table[i + num] = true
      }
    }
  }

  return table[target]
}
