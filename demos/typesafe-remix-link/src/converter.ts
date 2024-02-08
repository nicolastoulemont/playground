import { Token, TokenType } from './tokenizer'

const SEGMENTS_PATTERNS = {
  INDEX_SEGMENTS: /_index/,
  DYNAMIC_SEGMENTS: /(?<!\()\$([a-zA-Z_][a-zA-Z0-9_]*)/,
  NESTED_SEGMENT_WITHOUT_LAYOUT_NESTING: /([a-zA-Z][a-zA-Z0-9_]*)_$/,
  PATHLESS_ROUTES: /_([a-zA-Z][a-zA-Z0-9_]*)/,
  OPTIONAL_SEGMENTS: /\(\$([a-zA-Z_][a-zA-Z0-9_]*)\)/,
  SPLAT_SEGMENTS: /(?<!\w)\$(?!\w)/,
} as const

export enum SegmentType {
  Basic = 'Basic',
  Index = 'Index',
  Dynamic = 'Dynamic',
  Nested_Without_Layout_Nesting = 'Nested_Without_Layout_Nesting',
  Pathless = 'Pathless',
  Optional = 'Optional',
  Splat = 'Splat',
  Escaped = 'Escaped',
}

export type Segment = {
  value: string
  param?: string
  segmentType: Exclude<SegmentType, SegmentType.Pathless>
}

export function converter(tokens: Token[]): Segment[] {
  const segments: Segment[] = []

  for (const { value, tokenType } of tokens) {
    if (tokenType === TokenType.Escaped) {
      segments.push({
        value: `/${value}`,
        segmentType: SegmentType.Escaped,
      })
      continue
    }

    if (SEGMENTS_PATTERNS.INDEX_SEGMENTS.test(value)) {
      /**
       * Docs: https://remix.run/docs/en/main/file-conventions/routes#basic-routes
       * Transforming "_index" segments into "/"
       */
      segments.push({
        value: '/',
        segmentType: SegmentType.Index,
      })
    } else if (SEGMENTS_PATTERNS.DYNAMIC_SEGMENTS.test(value)) {
      /**
       * Docs: https://remix.run/docs/en/main/file-conventions/routes#dynamic-segments
       * Transforming "$pattern" into "{pattern}"
       */
      segments.push({
        value: `/{${value.slice(1)}}`,
        param: value.slice(1),
        segmentType: SegmentType.Dynamic,
      })
    } else if (SEGMENTS_PATTERNS.NESTED_SEGMENT_WITHOUT_LAYOUT_NESTING.test(value)) {
      /**
       * Docs: https://remix.run/docs/en/main/file-conventions/routes#nested-urls-without-layout-nesting
       * Transforming "pattern_" into "pattern"
       */
      segments.push({
        value: `/${value.slice(0, -1)}`,
        segmentType: SegmentType.Nested_Without_Layout_Nesting,
      })
    } else if (SEGMENTS_PATTERNS.PATHLESS_ROUTES.test(value)) {
      /**
       * Docs: https://remix.run/docs/en/main/file-conventions/routes#nested-layouts-without-nested-urls
       * Not adding any pathless route tokens as they're irrelevant to the final path string
       */
      continue
    } else if (SEGMENTS_PATTERNS.OPTIONAL_SEGMENTS.test(value)) {
      /**
       * Docs: https://remix.run/docs/en/main/file-conventions/routes#optional-segments
       * Transforming "($pattern)" into an optional segment with "{pattern}" value
       */
      segments.push({
        value: `/{${value.slice(2, -1)}}`,
        param: value.slice(2, -1),
        segmentType: SegmentType.Optional,
      })
    } else if (SEGMENTS_PATTERNS.SPLAT_SEGMENTS.test(value)) {
      /**
       * Docs: https://remix.run/docs/en/main/file-conventions/routes#splat-routes
       * Transforming splat symbol into type literal string
       */
      segments.push({
        value: '/${string}',
        segmentType: SegmentType.Splat,
      })
    } else {
      segments.push({
        value: `/${value}`,
        segmentType: SegmentType.Basic,
      })
    }
  }

  return segments
}
