import { describe, test, expect } from '~/utils'
import { Segment, SegmentType, converter } from '../src/converter'
import { Token, TokenType } from '../src/tokenizer'

type TestCase = {
  tokens: Token[]
  expectedResults: Segment[]
}

const testCases: TestCase[] = [
  {
    tokens: [{ value: '$', tokenType: TokenType.Regular }],
    expectedResults: [{ value: '/${string}', segmentType: SegmentType.Splat }],
  },
  {
    tokens: [
      { value: '($lang)', tokenType: TokenType.Regular },
      { value: '$productId', tokenType: TokenType.Regular },
    ],
    expectedResults: [
      { value: '/{lang}', param: 'lang', segmentType: SegmentType.Optional },
      { value: '/{productId}', param: 'productId', segmentType: SegmentType.Dynamic },
    ],
  },
  {
    tokens: [
      { value: '($lang)', tokenType: TokenType.Regular },
      { value: '_index', tokenType: TokenType.Regular },
    ],
    expectedResults: [
      { value: '/{lang}', param: 'lang', segmentType: SegmentType.Optional },
      { value: '/', segmentType: SegmentType.Index },
    ],
  },
  {
    tokens: [
      { value: '($lang)', tokenType: TokenType.Regular },
      { value: 'categories', tokenType: TokenType.Regular },
    ],
    expectedResults: [
      { value: '/{lang}', param: 'lang', segmentType: SegmentType.Optional },
      { value: '/categories', segmentType: SegmentType.Basic },
    ],
  },
  {
    tokens: [{ value: '[so-weird]', tokenType: TokenType.Escaped }],
    expectedResults: [{ value: '/[so-weird]', segmentType: SegmentType.Escaped }],
  },
  {
    tokens: [{ value: 'sitemap.xml', tokenType: TokenType.Escaped }],
    expectedResults: [{ value: '/sitemap.xml', segmentType: SegmentType.Escaped }],
  },
  {
    tokens: [
      { value: '_auth', tokenType: TokenType.Regular },
      { value: 'login', tokenType: TokenType.Regular },
    ],
    expectedResults: [{ value: '/login', segmentType: SegmentType.Basic }],
  },
  {
    tokens: [{ value: '_index', tokenType: TokenType.Regular }],
    expectedResults: [{ value: '/', segmentType: SegmentType.Index }],
  },
  {
    tokens: [{ value: 'about', tokenType: TokenType.Regular }],
    expectedResults: [{ value: '/about', segmentType: SegmentType.Basic }],
  },
  {
    tokens: [
      { value: 'concerts', tokenType: TokenType.Regular },
      { value: '$city', tokenType: TokenType.Regular },
    ],
    expectedResults: [
      { value: '/concerts', segmentType: SegmentType.Basic },
      { value: '/{city}', param: 'city', segmentType: SegmentType.Dynamic },
    ],
  },
  {
    tokens: [
      { value: 'concerts', tokenType: TokenType.Regular },
      { value: '_index', tokenType: TokenType.Regular },
    ],
    expectedResults: [
      { value: '/concerts', segmentType: SegmentType.Basic },
      { value: '/', segmentType: SegmentType.Index },
    ],
  },
  {
    tokens: [
      { value: 'concerts', tokenType: TokenType.Regular },
      { value: 'salt-lake-city', tokenType: TokenType.Regular },
    ],
    expectedResults: [
      { value: '/concerts', segmentType: SegmentType.Basic },
      { value: '/salt-lake-city', segmentType: SegmentType.Basic },
    ],
  },
  {
    tokens: [
      { value: 'concerts', tokenType: TokenType.Regular },
      { value: 'trending', tokenType: TokenType.Regular },
    ],
    expectedResults: [
      { value: '/concerts', segmentType: SegmentType.Basic },
      { value: '/trending', segmentType: SegmentType.Basic },
    ],
  },
  {
    tokens: [{ value: 'concerts', tokenType: TokenType.Regular }],
    expectedResults: [{ value: '/concerts', segmentType: SegmentType.Basic }],
  },
  {
    tokens: [
      { value: 'concerts_', tokenType: TokenType.Regular },
      { value: 'mine', tokenType: TokenType.Regular },
    ],
    expectedResults: [
      { value: '/concerts', segmentType: SegmentType.Nested_Without_Layout_Nesting },
      { value: '/mine', segmentType: SegmentType.Basic },
    ],
  },
  {
    tokens: [{ value: 'dolla-bills-$', tokenType: TokenType.Escaped }],
    expectedResults: [{ value: '/dolla-bills-$', segmentType: SegmentType.Escaped }],
  },
  {
    tokens: [
      { value: 'files', tokenType: TokenType.Regular },
      { value: '$', tokenType: TokenType.Regular },
    ],
    expectedResults: [
      { value: '/files', segmentType: SegmentType.Basic },
      { value: '/${string}', segmentType: SegmentType.Splat },
    ],
  },
  {
    tokens: [
      { value: 'weird-url', tokenType: TokenType.Regular },
      { value: '_index', tokenType: TokenType.Escaped },
    ],
    expectedResults: [
      { value: '/weird-url', segmentType: SegmentType.Basic },
      { value: '/_index', segmentType: SegmentType.Escaped },
    ],
  },
]

describe('Router file type generation: converter', () => {
  for (const testCase of testCases) {
    test('convert tokens to path segments', () => {
      const segments = converter(testCase.tokens)
      expect(segments).toEqual(testCase.expectedResults)
    })
  }
})
