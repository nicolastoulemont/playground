/**
 * Docs: https://remix.run/docs/en/main/file-conventions/remix-config#routes
 * Generated from the routes config example
 */
export const routeManifestExample = {
  catchall: {
    path: '/some/path/*',
    id: 'catchall',
    parentId: 'root',
    file: 'catchall.tsx',
  },
  'some/route/file': {
    path: 'some/:path',
    id: 'some/route/file',
    parentId: 'root',
    file: 'some/route/file.js',
  },
  'some/other/file': {
    path: 'relative/path',
    id: 'some/other/file',
    parentId: 'some/route/file',
    file: 'some/other/file',
  },
}
