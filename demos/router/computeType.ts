import { Segment, SegmentType } from './converter'
import { ParsedSegments } from './parser'

const hasOptionalSegments = (segments: Segment[]) =>
  segments.filter(({ segmentType }) => segmentType === SegmentType.Optional).length > 0

const hasSplatSegments = (segments: Segment[]) =>
  segments.filter(({ segmentType }) => segmentType === SegmentType.Splat).length > 0

const hasParams = (segments: Segment[]) =>
  segments.filter(({ param }) => Boolean(param)).length > 0

const getParams = (segments: Segment[]) =>
  segments.filter(({ param }) => Boolean(param)).map(({ param }) => param as string)

const joinSegments = (segments: Segment[]) => segments.map(({ value }) => value).join('')

const buildRoutePath = (segments: Segment[]) =>
  hasSplatSegments(segments)
    ? '`'.concat(joinSegments(segments)).concat('`')
    : `"${joinSegments(segments)}"`

export function computeType(routesSegments: ParsedSegments) {
  const routesConfig: { path: string; params?: string[] }[] = []

  for (const routeSegments of routesSegments) {
    if (!hasOptionalSegments(routeSegments)) {
      const path = buildRoutePath(routeSegments)

      if (hasParams(routeSegments)) {
        routesConfig.push({
          path,
          params: getParams(routeSegments),
        })
      } else {
        routesConfig.push({ path })
      }
    } else {
      const requiredRouteSegments = routeSegments.filter(
        ({ segmentType }) => segmentType !== SegmentType.Optional
      )

      const allSegmentsRoutePath = buildRoutePath(routeSegments)
      const noOptionalSegmentsRoutePath = buildRoutePath(requiredRouteSegments)

      if (hasParams(routeSegments)) {
        routesConfig.push({
          path: allSegmentsRoutePath,
          params: getParams(routeSegments),
        })
      }

      if (hasParams(requiredRouteSegments)) {
        routesConfig.push({
          path: noOptionalSegmentsRoutePath,
          params: getParams(requiredRouteSegments),
        })
      }

      if (!hasParams(routeSegments)) {
        routesConfig.push({ path: allSegmentsRoutePath })
      }

      if (!hasParams(requiredRouteSegments)) {
        routesConfig.push({ path: noOptionalSegmentsRoutePath })
      }
    }
  }

  return `export type RouteConfigUnion = ${routesConfig
    .map(({ path, params }) => {
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
    })
    .join('|')}`
}
