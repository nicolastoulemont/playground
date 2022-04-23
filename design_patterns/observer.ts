type Listener<Event> = (event: Event) => void

export function createObserver<Event>(): {
  subscribe: (listener: Listener<Event>) => () => void
  publish: (event: Event) => void
  listeners: Listener<Event>[]
} {
  const listeners: Listener<Event>[] = []
  return {
    subscribe: (listener: Listener<Event>) => {
      listeners.push(listener)
      return () => {
        listeners.splice(listeners.indexOf(listener), 1)
      }
    },
    publish: (event: Event) => {
      listeners.forEach((listener) => listener(event))
    },
    listeners: listeners,
  }
}
