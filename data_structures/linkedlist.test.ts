import { LinkedList } from './linkedlist'
import { describe, test, expect } from '~/utils'

describe('LinkedList', () => {
  test('List insert and get', () => {
    const list = new LinkedList<string>()
    const itemOne = 'itemOne'
    list.insertFirst(itemOne)
    const item = list.getAt(0)
    expect(item?.data).toStrictEqual(itemOne)
  })
  test('List insertFirst', () => {
    const list = new LinkedList<string>()
    const itemOne = 'itemOne'
    const itemTwo = 'itemTwo'
    list.insertFirst(itemOne)
    list.insertFirst(itemTwo)
    const item = list.getAt(0)
    expect(list.size).toBe(2)
    expect(item?.data).toStrictEqual(itemTwo)
  })
  test('List insertAt', () => {
    const list = new LinkedList<string>()
    const itemOne = 'itemOne'
    const itemTwo = 'itemTwo'
    list.insertAt(itemOne, 0)
    list.insertAt(itemTwo, 1)
    const item = list.getAt(1)
    expect(list.size).toBe(2)
    expect(item?.data).toStrictEqual(itemTwo)
  })
  test('List insertLast', () => {
    const list = new LinkedList<string>()
    const itemOne = 'itemOne'
    const itemTwo = 'itemTwo'
    list.insertFirst(itemOne)
    list.insertLast(itemTwo)
    const item = list.getAt(0)
    expect(list.size).toBe(2)
    expect(item?.data).toStrictEqual(itemOne)
  })
  test('List removeAt', () => {
    const list = new LinkedList<string>()
    const itemThree = 'itemThree'
    list.insertFirst('itemOne')
    list.insertFirst('itemTwo')
    list.insertFirst(itemThree)
    list.removeAt(1)
    const item = list.getAt(0)
    expect(list.size).toBe(2)
    expect(item?.data).toStrictEqual(itemThree)
  })
  test('List clearList', () => {
    const list = new LinkedList()
    const itemOne = 'itemOne'
    const itemTwo = 'itemTwo'
    list.insertFirst(itemOne)
    list.insertFirst(itemTwo)
    list.clearList()
    const first = list.getAt(0)
    const second = list.getAt(1)
    expect(first).toBe(null)
    expect(second).toBe(null)
    expect(list.size).toBe(0)
  })
  test('List getListAsArray', () => {
    const list = new LinkedList<string>()
    const itemOne = 'itemOne'
    const itemTwo = 'itemTwo'
    list.insertFirst(itemOne)
    list.insertFirst(itemTwo)
    const arr = list.getListAsArray()
    expect(arr).toStrictEqual(['itemTwo', 'itemOne'])
  })
  test.skip('printList', () => {
    const list = new LinkedList()
    const itemOne = 'itemOne'
    const itemTwo = 'itemTwo'
    list.insertFirst(itemOne)
    list.insertFirst(itemTwo)
    list.printList()
  })
})
