class Queue<T> {
  queue: Array<T>

  constructor() {
    this.queue = []
  }

  enqueue(value: T) {
    this.queue.unshift(value)
  }

  dequeue() {
    if (this.queue.length <= 0) return null
    return this.queue.pop()
  }

  peek() {
    const lastIndex = this.queue.length - 1
    if (lastIndex < 0) return null
    return this.queue[lastIndex]
  }

  isEmpty() {
    return this.queue.length === 0
  }

  clear() {
    this.queue = []
  }

  print() {
    if (this.isEmpty()) {
      console.log('Empty Queue')
    } else {
      this.queue.forEach((item, index) => console.log(`${index} : ${JSON.stringify(item, undefined, 2)}`))
    }
  }

  reverse(queue: Queue<T>): Queue<T> {
    if (queue.isEmpty()) return queue
    const front = queue.peek()
    queue.dequeue()
    queue = this.reverse(queue)
    queue.enqueue(front as T)
    return queue
  }
}

function enqueueAndPeek() {
  console.log('enqueueAndPeek')
  const queue = new Queue()
  const item = 'item'
  queue.enqueue(item)
  console.log(queue.peek())
}

function dequeue() {
  console.log('dequeue')
  const queue = new Queue()
  const firstItem = 'firstItem'
  const secondItem = 'secondItem'
  queue.enqueue(firstItem)
  queue.enqueue(secondItem)
  console.log(queue.dequeue())
  console.log(queue.peek())
}

function clearQueue() {
  console.log('clearQueue')
  const queue = new Queue()
  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)
  queue.clear()
  console.log(queue.peek())
}

function reverseQueue() {
  console.log('reveseQueue')
  const queue = new Queue()
  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)
  queue.enqueue(4)
  console.log(queue.peek())
  queue.reverse(queue)
  console.log(queue.peek())
}

export const queue = {
  fn: () => {
    enqueueAndPeek()
    dequeue()
    clearQueue()
    reverseQueue()
  },
}
