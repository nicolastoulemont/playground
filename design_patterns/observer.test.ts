import { createObserver } from './observer'
import { describe, test, expect } from '~/utils'

describe('Observer', () => {
  test('subscribe', () => {
    const observer = createObserver()
    observer.subscribe((e) => console.log(e))
    expect(observer.listeners.length).toBe(1)
  })
  test('unsubscribe', () => {
    const observer = createObserver()
    const unsubscribe = observer.subscribe((e) => console.log(e))
    expect(observer.listeners.length).toBe(1)
    unsubscribe()
    expect(observer.listeners.length).toBe(0)
  })
})
