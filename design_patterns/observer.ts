type Listener<T> = (T: T) => void

export function createObserver<T>(): {
  subscribe: (listener: Listener<T>) => [() => T | undefined, (T: T) => void, () => void]
  set: (T: T) => void
  get: () => T | undefined
  listeners: Set<Listener<T>>
} {
  let value: T | undefined = undefined
  const listeners: Set<Listener<T>> = new Set()
  return {
    subscribe(listener: Listener<T>) {
      listeners.add(listener)
      return [
        this.get,
        this.set,
        () => {
          listeners.delete(listener)
        },
      ]
    },
    set(T: T) {
      value = T
      listeners.forEach((listener) => listener(T))
    },
    get() {
      return value
    },
    listeners: listeners,
  }
}
