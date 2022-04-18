export function bestSumTabulation(target: number, numbers: number[]): number[] | null {
  const table = Array(target + 1).fill(null)
  // Because if target is 0, we can always sum 0
  table[0] = []
  for (let i = 0; i <= target; i++) {
    if (table[i] !== null) {
      for (const num of numbers) {
        const combinaison = [...table[i], num]
        if (!table[i + num] || table[i + num].length > combinaison.length) {
          table[i + num] = combinaison
        }
      }
    }
  }
  return table[target]
}
