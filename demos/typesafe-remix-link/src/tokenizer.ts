/**
 * Docs: https://remix.run/docs/en/main/file-conventions/routes#escaping-special-characters
 */
const ESCAPE_PATTERN = /\[\[?(.*?)\]\]?/

export enum TokenType {
  Regular = 'Regular',
  Escaped = 'Escaped',
}

export type Token = {
  value: string
  tokenType: TokenType
}

/**
 * Normalize paths to the Dot delimiter pattern
 * Docs:
 * - Folder org: https://remix.run/docs/en/main/file-conventions/routes#folders-for-organization
 * - Dot delimiter: https://remix.run/docs/en/main/file-conventions/routes#dot-delimiters
 *
 * Normalize React router path pattern (from the RouteManifest) to Remix file name pattern
 * Docs:
 * - Remix config routes definition: https://remix.run/docs/en/main/file-conventions/remix-config#routes
 *
 */
const normalizeFilePath = (filePath: string) =>
  filePath
    // Dot delimiter
    .replaceAll('/', '.')
    // Glob "*"" to splat character "$"
    .replaceAll('*', '$')
    // Dynamic param
    .replaceAll(':', '$')

/**
 * Docs: https://remix.run/docs/en/main/file-conventions/routes#folders-for-organization
 * Treat the "route.tsx" file name as of an index.
 */
const getPath = (filePath: string) => {
  if (filePath.includes('route.tsx')) return filePath.split('route.tsx')
  return filePath.split('.tsx')
}

const toTokens = (path: string): Token[] =>
  path
    .split('.')
    .filter((segment) => segment.length > 0)
    .map((value) => ({ value, tokenType: TokenType.Regular }))

/**
 * Docs: https://remix.run/docs/en/main/file-conventions/routes#dot-delimiters
 * Transform the route files name into path tokens based on the "dot delimiters" file name convention of Remix.
 */
export function tokenizer(rawFilePath: string): Token[] {
  const filePath = normalizeFilePath(rawFilePath)
  const [path] = getPath(filePath)

  if (!ESCAPE_PATTERN.test(path)) {
    return toTokens(path)
  }

  const matches = path.match(ESCAPE_PATTERN)
  if (!matches) {
    throw new Error('Invalid special character escape')
  }

  const [escapedSegment] = matches
  // Remove starting and trailing "[" & "]"
  const escapedValue = escapedSegment.substring(1, escapedSegment.length - 1)

  const [prefix, suffix] = path.split(escapedSegment)

  // No split required, simply replace the escaped segment by it's value
  if (!path.includes('.') || (!prefix.includes('.') && !suffix.includes('.'))) {
    return [
      { value: `${prefix}${escapedValue}${suffix}`.trim(), tokenType: TokenType.Escaped },
    ]
  }

  const tokens: Token[] = []

  if (!path.startsWith(escapedSegment)) {
    tokens.push(...toTokens(prefix))
  }

  tokens.push({ value: escapedValue, tokenType: TokenType.Escaped })

  if (!path.endsWith(escapedSegment)) {
    tokens.push(...toTokens(suffix))
  }

  return tokens
}
