import { InMemoryDatabase } from './in_memory'
import { BaseRecord } from './types'

interface CreateDatabaseOptions {
  type?: 'in-memory'
}

// Factory
export function createDatabase<T extends BaseRecord>({ type }: CreateDatabaseOptions) {
  switch (type) {
    case 'in-memory':
      return new InMemoryDatabase<T>()
    default:
      throw new Error(`Unknown database type: ${type}`)
  }
}
