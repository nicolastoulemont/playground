class Node<T> {
  data: T
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

  getAt(index: number): Node<T> | null {
    let current = this.head
    let count = 0

    while (current) {
      if (count === index) {
        return current
      }
      count++
      current = current.next
    }
    return null
  }

  removeAt(index: number) {
    if (index > this.size || index < 0) {
      return
    }

    let current = this.head
    let previous
    let count = 0

    if (index === 0) {
      this.head = current?.next
    } else {
      while (count < index) {
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
    const recurseDelete = (data: Node<T> | null | undefined) => {
      if (data === null || data === undefined) {
        return
      } else {
        recurseDelete(data.next)
        data = null
        this.size--
      }
    }

    recurseDelete(this.head)

    if (this.size === 0) {
      return true
    } else {
      return false
    }
  }

  getListAsArray(): Array<T> {
    let current = this.head
    let arr: Array<T> = []
    while (current) {
      arr.push(current.data)
      current = current.next
    }
    return arr
  }

  printList() {
    let current = this.head
    while (current) {
      console.log(JSON.stringify(current.data, null, 2))
      current = current.next
    }
  }
}
