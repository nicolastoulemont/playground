class Node {
  name: string
  children: Node[]
  constructor({ name, children }: { name: string; children: Node[] }) {
    this.name = name
    this.children = children
  }
}

type IOResult = Node[] | null | undefined

export class Tree {
  root: Node | null
  constructor() {
    this.root = null
  }

  *traverse(node = this.root): Iterable<Node> {
    if (!node) return
    yield node
    if (node.children.length) {
      for (const child of node.children) {
        yield* this.traverse(child)
      }
    }
  }

  set(newNode: Node, parentNodeName?: string): IOResult {
    if (this.root === null) {
      this.root = new Node(newNode)
      return [this.root]
    }

    if (this.root && !parentNodeName) {
      throw new Error('parentNodeName is required once the tree is initialized')
    }

    const inserted: Node[] = []
    for (const node of this.traverse()) {
      if (node.name === parentNodeName) {
        node.children.push(newNode)
        inserted.push(node)
      }
    }

    return inserted.length > 0 ? inserted : undefined
  }

  get(nodeName: string): IOResult {
    if (this.root === null) return null
    const results: Node[] = []

    for (const node of this.traverse()) {
      if (node.name === nodeName) {
        results.push(node)
      }
    }

    return results.length > 0 ? results : undefined
  }

  update(nodeName: string, updatedNode: Partial<Node>): IOResult {
    if (this.root === null) return null
    const updated: Node[] = []
    for (const node of this.traverse()) {
      if (node.name === nodeName) {
        Object.assign(node, updatedNode)
        updated.push(node)
      }
    }
    return updated.length > 0 ? updated : undefined
  }

  remove(nodeName: string): IOResult {
    if (!this.root) return null
    const removed: Node[] = []
    for (const node of this.traverse()) {
      const foundChildNode = node.children.find(({ name }) => name === nodeName)
      if (foundChildNode) {
        removed.push(foundChildNode)
        node.children = node.children.filter(({ name }) => name !== nodeName)
        node.children.push(...foundChildNode.children)
      }
    }
    return removed.length > 0 ? removed : undefined
  }
}
