import { describe, test, expect } from '~/utils'
import { getRouteManifestFilePaths, getRoutesFilePaths } from '../src/getRoutesPaths'
import { routeManifestExample } from '../assets/routeManifest.example'
import path from 'path'

describe('Router paths gathering fns', () => {
  test('Get file based paths', async () => {
    const filePaths = await getRoutesFilePaths(path.join(__dirname, '../assets/routes'))
    expect(filePaths).toEqual([
      '$.tsx',
      '($lang).$productId.tsx',
      '($lang)._index.tsx',
      '($lang).categories.tsx',
      '[[so-weird]].tsx',
      '[sitemap.xml].tsx',
      '_auth.login.tsx',
      '_index.tsx',
      'about.tsx',
      'concerts.$city.tsx',
      'concerts._index.tsx',
      'concerts.salt-lake-city.tsx',
      'concerts.trending.tsx',
      'concerts.tsx',
      'concerts_.mine.tsx',
      'dashboard/route.tsx',
      'dolla-bills-[$].tsx',
      'files.$.tsx',
      'sitemap[.]xml.tsx',
      'weird-url.[_index].tsx',
    ])
  })
  test('Get manifest based path', () => {
    const paths = getRouteManifestFilePaths(routeManifestExample)
    expect(paths).toEqual(['/some/path/*', 'some/:path', 'some/:path/relative/path'])
  })
})
