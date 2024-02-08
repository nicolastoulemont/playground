import { parser } from './parser'
import { PathSources, getRoutesPaths } from './getRoutesPaths'
import { typeEmitter } from './typeEmitter'
import { computeType } from './computeType'
import path from 'path'
import { routeManifestExample } from './routeManifest.example'

export async function main(pathSources: PathSources) {
  await typeEmitter(computeType(parser(await getRoutesPaths(pathSources))))
}

main({
  routesDirPath: path.join(__dirname, 'routes'),
  routeManifest: routeManifestExample,
})
