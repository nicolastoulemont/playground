class Node {
  name: string
  children: Node[]
  constructor({ name, children }: { name: string; children: Node[] }) {
    this.name = name
    this.children = children
  }
}

export class Tree {
  root: Node | null
  constructor() {
    this.root = null
  }

  private *traverse(node = this.root): Iterable<Node> {
    if (!node) return
    yield node
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.traverse(child)
      }
    }
  }

  set(node: Node, parentNodeName?: string) {
    if (this.root === null) {
      this.root = new Node(node)
      return
    }

    if (this.root && !parentNodeName) {
      throw new Error('parentNodeName is required once the tree is initialized')
    }

    for (const treeNode of this.traverse()) {
      if (treeNode.name === parentNodeName) {
        treeNode.children.push(node)
        break
      }
    }
  }

  get(nodeName: string): Node[] | null {
    if (this.root === null) return null
    const results: Node[] = []
    for (const node of this.traverse()) {
      if (node.name === nodeName) {
        results.push(node)
      }
    }

    return results
  }

  update(nodeName: string, updatedNode: Partial<Node>) {
    if (this.root === null) return false
    let updated = false
    for (const node of this.traverse()) {
      if (node.name === nodeName) {
        Object.assign(node, updatedNode)
        updated = true
        break
      }
    }
    return updated
  }

  remove(nodeName: string): { removed: boolean; numberOfNodeRemoved: number } {
    if (!this.root) return { removed: false, numberOfNodeRemoved: 0 }
    let removed: number = 0
    for (const node of this.traverse()) {
      const foundChildNode = node.children.find(({ name }) => name === nodeName)
      if (foundChildNode) {
        node.children = node.children.filter(({ name }) => name !== nodeName)
        node.children.push(...foundChildNode.children)
        removed = removed++
      }
    }
    return { removed: removed > 0, numberOfNodeRemoved: removed }
  }

  print() {
    if (!this.root) {
      console.log('Empty tree')
      return
    }
    console.log(JSON.stringify(this.root, null, 2))
  }
}
