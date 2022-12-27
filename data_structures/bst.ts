class Node<T> {
  value: T
  left: Node<T> | null
  right: Node<T> | null
  constructor(value: T, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

export class BST<T> {
  root: Node<T> | null
  constructor() {
    this.root = null
  }

  set(value: T) {
    if (this.root === null) {
      this.root = new Node(value)
      return
    }

    function insert(node: Node<T>, value: T): void | null {
      // Iterate left
      if (value < node.value) {
        if (node.left === null) {
          node.left = new Node(value)
          return
        }
        return insert(node.left, value)
      } else if (value > node.value) {
        // Iterate Right
        if (node.right === null) {
          node.right = new Node(value)
          return
        }
        return insert(node.right, value)
      } else {
        return null
      }
    }

    return insert(this.root as Node<T>, value)
  }

  getMin() {
    let current = this.root
    while (current?.left !== null) {
      current = current!.left
    }
    return current.value
  }
  getMax() {
    let current = this.root
    while (current?.right !== null) {
      current = current!.right
    }
    return current.value
  }

  find(value: T) {
    let current = this.root
    while (current) {
      if (value === current.value) return current
      current = value < current.value ? current.left : current.right
    }
    return null
  }

  contains(value: T) {
    let current = this.root
    while (current) {
      if (value === current.value) return true
      current = value < current.value ? current.left : current.right
    }
    return false
  }

  remove(value: T) {
    if (!this.root) {
      throw new Error('The tree is empty')
    }

    function findMin(root: Node<T>): Node<T> {
      return !root.left ? root : findMin(root.left)
    }

    function deleteNode(node: Node<T> | null, value: T) {
      if (!node) return null

      if (value < node.value) {
        node.left = deleteNode(node.left, value)
        return node
      } else if (value > node.value) {
        node.right = deleteNode(node.right, value)
        return node
      } else {
        // value === node.value
        // No children
        if (!node.left && !node.right) {
          node = null
          return node
        }
        // No left children
        if (!node.left) {
          node = node.right
          return node
        }
        // No right children
        if (!node.right) {
          node = node.left
          return node
        }
        // Node has two children
        if (node.right) {
          // Find min node on the right
          let minNode = findMin(node.right)
          // Replace node value with min node value
          node.value = minNode.value
          // Remove the min node
          node.right = deleteNode(node.right, minNode.value)
        }

        return node
      }
    }
    return deleteNode(this.root, value)
  }
}
