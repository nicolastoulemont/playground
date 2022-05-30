import { describe, test, expect } from '~/utils'
import { createDatabase } from './create_database'
import { InMemoryDatabase } from './in_memory'

describe('Database implementations', () => {
  test('InMemoryDatabase', () => {
    const db = new InMemoryDatabase<{ id: string }>()
    const item = { id: '1' }
    db.set(item)
    expect(db.get('1')).toBe(item)
    db.delete('1')
    expect(db.get('1')).toBe(null)
  })
  test('createDatabase', () => {
    const db = createDatabase<{ id: string }>({ type: 'in-memory' })
    const item = { id: '1' }
    db.set(item)
    expect(db.get('1')).toBe(item)
    db.delete('1')
    expect(db.get('1')).toBe(null)
  })
})
