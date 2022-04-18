import { HashTable } from './hashTable'
import { describe, test, expect } from '../utils'

describe('Testing HashTable utils', () => {
  test('Insert', () => {
    const myHashTable = new HashTable<number>(5)
    myHashTable.insert('Nicolas', 1)
    myHashTable.insert('Flora', 2)
  })
  test('Get', () => {
    const myHashTable = new HashTable<number>(5)
    myHashTable.insert('Nicolas', 1)
    myHashTable.insert('Flora', 2)
    const val = myHashTable.get('Nicolas')
    const valTwo = myHashTable.get('Flora')
    expect(val).toStrictEqual(1)
    expect(valTwo).toStrictEqual(2)
  })
  test('Remove', () => {
    const myHashTable = new HashTable<number>(5)
    myHashTable.insert('Nicolas', 1)
    myHashTable.remove('Nicolas')
    const val = myHashTable.get('Nicolas')
    expect(val).toBe(null)
  })
})
