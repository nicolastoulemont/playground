import { converter } from './converter'
import { tokenizer } from './tokenizer'

export const parser = (routePaths: string[]) =>
  routePaths.map((routePath) => converter(tokenizer(routePath)))

export type ParsedSegments = ReturnType<typeof parser>
