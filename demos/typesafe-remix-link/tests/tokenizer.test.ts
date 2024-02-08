import { describe, test, expect } from '~/utils'
import { TokenType, tokenizer } from '../src/tokenizer'
import { getRoutesPaths } from '../src/getRoutesPaths'
import { routeManifestExample } from '../assets/routeManifest.example'

import path from 'path'

describe('Router file type generation: tokenize', () => {
  test('tokenize file paths', async () => {
    const filePaths = await getRoutesPaths({
      routesDirPath: path.join(__dirname, '../assets/routes'),
      routeManifest: routeManifestExample,
    })
    const tokens = filePaths.map(tokenizer)
    expect(tokens).toEqual([
      [{ value: '$', tokenType: TokenType.Regular }],
      [
        { value: '($lang)', tokenType: TokenType.Regular },
        { value: '$productId', tokenType: TokenType.Regular },
      ],
      [
        { value: '($lang)', tokenType: TokenType.Regular },
        { value: '_index', tokenType: TokenType.Regular },
      ],
      [
        { value: '($lang)', tokenType: TokenType.Regular },
        { value: 'categories', tokenType: TokenType.Regular },
      ],
      [{ value: '[so-weird]', tokenType: TokenType.Escaped }],
      [{ value: 'sitemap.xml', tokenType: TokenType.Escaped }],
      [
        { value: '_auth', tokenType: TokenType.Regular },
        { value: 'login', tokenType: TokenType.Regular },
      ],
      [{ value: '_index', tokenType: TokenType.Regular }],
      [{ value: 'about', tokenType: TokenType.Regular }],
      [
        { value: 'concerts', tokenType: TokenType.Regular },
        { value: '$city', tokenType: TokenType.Regular },
      ],
      [
        { value: 'concerts', tokenType: TokenType.Regular },
        { value: '_index', tokenType: TokenType.Regular },
      ],
      [
        { value: 'concerts', tokenType: TokenType.Regular },
        { value: 'salt-lake-city', tokenType: TokenType.Regular },
      ],
      [
        { value: 'concerts', tokenType: TokenType.Regular },
        { value: 'trending', tokenType: TokenType.Regular },
      ],
      [{ value: 'concerts', tokenType: TokenType.Regular }],
      [
        { value: 'concerts_', tokenType: TokenType.Regular },
        { value: 'mine', tokenType: TokenType.Regular },
      ],
      [{ value: 'dashboard', tokenType: TokenType.Regular }],
      [{ value: 'dolla-bills-$', tokenType: TokenType.Escaped }],
      [
        { value: 'files', tokenType: TokenType.Regular },
        { value: '$', tokenType: TokenType.Regular },
      ],
      [{ value: 'sitemap.xml', tokenType: TokenType.Escaped }],
      [
        { value: 'weird-url', tokenType: TokenType.Regular },
        { value: '_index', tokenType: TokenType.Escaped },
      ],
      [
        { value: 'some', tokenType: TokenType.Regular },
        { value: 'path', tokenType: TokenType.Regular },
        { value: '$', tokenType: TokenType.Regular },
      ],
      [
        { value: 'some', tokenType: TokenType.Regular },
        { value: '$path', tokenType: TokenType.Regular },
      ],
      [
        { value: 'some', tokenType: TokenType.Regular },
        { value: '$path', tokenType: TokenType.Regular },
        { value: 'relative', tokenType: TokenType.Regular },
        { value: 'path', tokenType: TokenType.Regular },
      ],
    ])
  })
})
