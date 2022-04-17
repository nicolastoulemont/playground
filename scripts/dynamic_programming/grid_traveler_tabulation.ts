function gridTraveler(x: number, y: number): number {
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

export const grid_traveler_tabulation = {
  fn: () => {
    console.log(gridTraveler(1, 1))
    console.log(gridTraveler(2, 3))
    console.log(gridTraveler(3, 2))
    console.log(gridTraveler(3, 3))
    console.log(gridTraveler(18, 18))
  },
}
