export interface BaseRecord {
  id: string
}

export interface Database<T extends BaseRecord> {
  get(id: T['id']): T | null
  set(item: T): T
  delete(id: T['id']): boolean
}
