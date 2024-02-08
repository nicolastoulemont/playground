import { parser } from './parser'
import { PathSources, getRoutesPaths } from './getRoutesPaths'
import { computeType } from './computeType'

export async function generateLinkTypes(pathSources: PathSources) {
  return computeType(parser(await getRoutesPaths(pathSources)))
}
