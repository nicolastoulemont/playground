import { createObserver } from './observer'
import { describe, test, expect } from '~/utils'

describe('Observer', () => {
  test('subscribe', () => {
    const observer = createObserver()
    observer.subscribe((e) => console.log(e))
    expect(observer.listeners.size).toBe(1)
  })
  test('unsubscribe', () => {
    const observer = createObserver()
    const [_, __, unsubscribe] = observer.subscribe((e) => console.log(e))
    expect(observer.listeners.size).toBe(1)
    unsubscribe()
    expect(observer.listeners.size).toBe(0)
  })
  test('set and get', () => {
    const observer = createObserver<number>()

    const [get, set] = observer.subscribe((v) => console.log(v))

    set(1)
    expect(get()).toBe(1)
    set(2)
    expect(get()).toBe(2)
  })
})
