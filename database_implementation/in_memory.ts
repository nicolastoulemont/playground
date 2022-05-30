import { BaseRecord, Database } from './types'

export class InMemoryDatabase<T extends BaseRecord> implements Database<T> {
  private data: Map<string, T> = new Map()

  get(id: T['id']) {
    return this.data.get(id) || null
  }

  set(item: T) {
    this.data.set(item.id, item)
    return item
  }

  delete(id: T['id']) {
    return this.data.delete(id) !== undefined
  }
}
