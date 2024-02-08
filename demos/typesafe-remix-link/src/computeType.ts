import { Segment, SegmentType } from './converter'
import { ParsedSegments } from './parser'

type TypeConfig = { path: string; params?: string[] }

const hasOptionalSegments = (segments: Segment[]) =>
  segments.filter(({ segmentType }) => segmentType === SegmentType.Optional).length > 0

const hasSplatSegments = (segments: Segment[]) =>
  segments.filter(({ segmentType }) => segmentType === SegmentType.Splat).length > 0

const hasParams = (segments: Segment[]) =>
  segments.filter(({ param }) => Boolean(param)).length > 0

const getParams = (segments: Segment[]) =>
  segments.filter(({ param }) => Boolean(param)).map(({ param }) => param as string)

const joinSegments = (segments: Segment[]) => segments.map(({ value }) => value).join('')

const configToTypeString = ({ path, params }: TypeConfig) => {
  if (!params) {
    return `{
      path: ${path}
    }`
  } else {
    return `{
      path: ${path},
      params: {
        ${params.map((param) => `${param}: string`)}
      }
    }`
  }
}

/**
 * The catch all path type will match any other paths types, making them a bit useless.
 * Assuming we never want to point out to it, but instead want to prevent errors while
 * pointing to others, removing it from the union allow us to enjoy the full union type safety
 */
const removeCatchAllType = ({ path }: TypeConfig) => path !== '`/${string}`'

const getRoutePathString = (segments: Segment[]) =>
  hasSplatSegments(segments)
    ? '`'.concat(joinSegments(segments)).concat('`')
    : `"${joinSegments(segments)}"`

export function computeType(routesSegments: ParsedSegments) {
  const routesTypeConfig: TypeConfig[] = []

  for (const routeSegments of routesSegments) {
    if (!hasOptionalSegments(routeSegments)) {
      const path = getRoutePathString(routeSegments)

      routesTypeConfig.push({
        path,
        ...(hasParams(routeSegments) && {
          params: getParams(routeSegments),
        }),
      })
    } else {
      const requiredRouteSegments = routeSegments.filter(
        ({ segmentType }) => segmentType !== SegmentType.Optional
      )

      const allSegmentsRoutePath = getRoutePathString(routeSegments)
      const noOptionalSegmentsRoutePath = getRoutePathString(requiredRouteSegments)

      routesTypeConfig.push({
        path: allSegmentsRoutePath,
        ...(hasParams(routeSegments) && {
          params: getParams(routeSegments),
        }),
      })

      routesTypeConfig.push({
        path: noOptionalSegmentsRoutePath,
        ...(hasParams(requiredRouteSegments) && {
          params: getParams(requiredRouteSegments),
        }),
      })
    }
  }
  const rawRouteConfigType = `export type RawRouteConfig = ${routesTypeConfig
    .map(configToTypeString)
    .join('|')}`

  const routeConfigType = `export type RouteConfig = ${routesTypeConfig
    .filter(removeCatchAllType)
    .map(configToTypeString)
    .join('|')}`

  return `${rawRouteConfigType} \n ${routeConfigType}`
}
