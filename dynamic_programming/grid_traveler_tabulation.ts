export function gridTravelerTabulation(x: number, y: number): number {
  const grid = Array(x + 1)
    .fill(0)
    .map(() => Array(y + 1).fill(0))

  grid[1][1] = 1

  for (let i = 0; i <= x; i++) {
    for (let j = 0; j <= y; j++) {
      const current = grid[i][j]
      if (j + 1 <= y) grid[i][j + 1] += current
      if (i + 1 <= x) grid[i + 1][j] += current
    }
  }

  return grid[x][y]
}
