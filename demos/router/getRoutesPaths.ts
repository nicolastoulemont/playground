import fs from 'fs/promises'

// Types def from https://github.com/remix-run/remix/blob/e5a4e745cffb9d31640addcf4e7db4b1488886e8/packages/remix-dev/config/routes.ts

/**
 * A route that was created using `defineRoutes` or created conventionally from
 * looking at the files on the filesystem.
 */
export interface ConfigRoute {
  /**
   * The path this route uses to match on the URL pathname.
   */
  path?: string
  /**
   * Should be `true` if it is an index route. This disallows child routes.
   */
  index?: boolean
  /**
   * Should be `true` if the `path` is case-sensitive. Defaults to `false`.
   */
  caseSensitive?: boolean
  /**
   * The unique id for this route, named like its `file` but without the
   * extension. So `app/routes/gists/$username.tsx` will have an `id` of
   * `routes/gists/$username`.
   */
  id: string
  /**
   * The unique `id` for this route's parent route, if there is one.
   */
  parentId?: string
  /**
   * The path to the entry point for this route, relative to
   * `config.appDirectory`.
   */
  file: string
}
export interface RouteManifest {
  [routeId: string]: ConfigRoute
}

export async function getRoutesFilePaths(routesDirPath: string) {
  const results = await fs.readdir(routesDirPath, {
    withFileTypes: true,
  })

  const routingRelevantFilesPaths = await Promise.all(
    results.map(async (result) => {
      if (result.isDirectory()) {
        const routeFile = (await fs.readdir(`${result.path}/${result.name}`)).find(
          (filePath) => filePath === 'route.tsx'
        )
        if (routeFile) {
          return `${result.name}/${routeFile}`
        }
      } else {
        return result.name
      }
    })
  )

  return routingRelevantFilesPaths.filter(Boolean) as string[]
}

export function getRouteManifestFilePaths(routeManifest: RouteManifest | undefined) {
  if (!routeManifest) return []

  return Object.values(routeManifest)
    .map(({ parentId, path }) => {
      if (parentId === 'root' || !parentId) return path
      return `${routeManifest[parentId].path}/${path}`
    })
    .filter(Boolean) as string[]
}

export type PathSources = {
  routesDirPath: string
  routeManifest?: RouteManifest
}

export async function getRoutesPaths({ routesDirPath, routeManifest }: PathSources) {
  return Array.from(
    new Set([
      ...(await getRoutesFilePaths(routesDirPath)),
      ...getRouteManifestFilePaths(routeManifest),
    ])
  )
}
