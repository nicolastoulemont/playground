import { describe, test, expect } from '~/utils'
import { getRoutesFileName } from '../getRoutesFileName'

describe('Router file type generation: get files', () => {
  test('Get all files in the router/routes directory', async () => {
    const files = await getRoutesFileName('routes')
    expect(files).toEqual([
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
})
