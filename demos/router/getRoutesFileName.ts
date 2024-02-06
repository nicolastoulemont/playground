import fs from 'fs/promises'
import path from 'path'

export async function getRoutesFileName(dirPath: string = '') {
  const currentDir = __dirname
  const results = await fs.readdir(path.join(currentDir, dirPath), {
    withFileTypes: true,
  })

  const routingRelevantFilesName = await Promise.all(
    results.map(async (result) => {
      if (result.isDirectory()) {
        const routeFile = (
          await fs.readdir(`${currentDir}/${dirPath}/${result.name}`)
        ).find((filePath) => filePath === 'route.tsx')
        if (routeFile) {
          return `${result.name}/route.tsx`
        }
      } else {
        return result.name
      }
    })
  )

  return routingRelevantFilesName.filter(Boolean) as string[]
}
