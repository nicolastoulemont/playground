import { Queue } from './queue'
import { describe, test, expect } from '~/utils'

describe('Queue', () => {
  test('Queue enqueue and peek', () => {
    const queue = new Queue()
    const item = 'item'
    queue.enqueue(item)
    expect(queue.peek()).toStrictEqual(item)
  })
  test('Queue dequeue', () => {
    const queue = new Queue()
    const firstItem = 'firstItem'
    const secondItem = 'secondItem'
    queue.enqueue(firstItem)
    queue.enqueue(secondItem)
    expect(queue.dequeue()).toStrictEqual(firstItem)
    expect(queue.peek()).toStrictEqual(secondItem)
  })
  test('Queue is Empty', () => {
    const queue = new Queue()
    expect(queue.isEmpty()).toBe(true)
    queue.enqueue('item')
    expect(queue.isEmpty()).toBe(false)
  })
  test('Clear Queue', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.clear()
    expect(queue.peek()).toBe(null)
  })
  test('Reverse Queue', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.enqueue(4)
    expect(queue.peek()).toBe(1)
    queue.reverse(queue)
    expect(queue.peek()).toBe(4)
  })
})
