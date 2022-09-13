class Node<T> {
  data: T | null
  next: Node<T> | null | undefined
  constructor(data: T, next: Node<T> | null = null) {
    this.data = data
    this.next = next
  }
}

const outOfBoundIndexError = <T>(data: T, index: number) => {
  throw new Error(
    `Cannot insert Node: ${JSON.stringify(
      data,
      undefined,
      2
    )} at location: ${index}. \n Reason: ${index} is out of bound.`
  )
}

export class LinkedList<T> {
  head: Node<T> | null | undefined
  size: number
  constructor() {
    this.head = null
    this.size = 0
  }

  insertFirst(data: T) {
    this.head = new Node(data, this.head)
    this.size++
  }

  insertLast(data: T) {
    const node = new Node(data)
    let current
    if (!this.head) {
      this.head = node
    } else {
      current = this.head

      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.size++
  }

  insertAt(data: T, index: number) {
    if (index > this.size || index < 0) {
      outOfBoundIndexError(data, index)
    }

    if (!this.head || index === 0) {
      this.insertFirst(data)
      return
    }

    let previous = this.getAt(index - 1)
    if (!previous) {
      outOfBoundIndexError(data, index)
    } else {
      let newNode = new Node(data)
      newNode.next = previous && previous.next
      previous.next = newNode
      this.size++
    }

    return this.head
  }

  private *traverse(node = this.head): Iterable<Node<T>> {
    if (!node) return
    yield node
    if (node.next) {
      yield* this.traverse(node.next)
    }
  }

  getAt(targetIndex: number): Node<T> | null {
    let index = 0
    for (const node of this.traverse()) {
      if (index === targetIndex) {
        return node
      }
      index++
    }
    return null
  }

  removeAt(targetIndex: number) {
    if (targetIndex > this.size || targetIndex < 0) {
      return
    }

    let current = this.head
    let previous
    let count = 0

    if (targetIndex === 0) {
      this.head = current?.next
    } else {
      while (count < targetIndex) {
        previous = current
        count++
        current = current?.next
      }

      if (previous) {
        previous.next = current?.next
      }
    }
    this.size--
  }

  clearList() {
    for (const node of this.traverse()) {
      node.data = null
      node.next = null
    }
    this.head = null
    this.size = 0
  }

  getListAsArray(): Array<T | null> {
    let arr: Array<T | null> = []
    let index = 0
    for (const node of this.traverse()) {
      arr[index] = node.data
      index++
    }
    return arr
  }

  printList() {
    for (const node of this.traverse()) {
      console.log(JSON.stringify(node, null, 2))
    }
  }
}
