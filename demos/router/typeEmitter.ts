import fs from 'fs/promises'
import path from 'path'

export async function typeEmitter(typeString: string) {
  const currentDir = path.dirname(__dirname)
  await fs.writeFile(`${currentDir}/router/types/router.d.ts`, `${typeString}`)
}
