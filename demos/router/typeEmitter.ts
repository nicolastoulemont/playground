import fs from 'fs/promises'
import path from 'path'
// import { parser } from './parser'
// import { getRouterTypes } from './computeType'

export async function typeEmitter(typeString: string) {
  // const routeConfigUnion = getRouterTypes(routesSegments)
  const currentDir = path.dirname(__dirname)

  await fs.writeFile(`${currentDir}/router/types/router.d.ts`, `${typeString}`)
}
