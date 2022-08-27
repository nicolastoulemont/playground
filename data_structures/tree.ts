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

  private addToTree(parentNode: Node, node: Node, parentNodeName: string): void | null {
    if (!parentNode) return null
    if (parentNode.name === parentNodeName) {
      parentNode.children.push(node)
      return
    }
    if (parentNode.children.length === 0) return

    return parentNode.children.forEach((childNode) => this.addToTree(childNode, node, parentNodeName))
  }

  set(node: Node, parentNodeName?: string) {
    if (this.root === null) {
      this.root = new Node(node)
      return
    }

    if (this.root && !parentNodeName) {
      throw new Error('parentNodeName is required once the tree is initialized')
    }

    return this.addToTree(this.root as Node, node, parentNodeName as string)
  }

  private traverseTreeAndGetNode(node: Node, nodeName: string, results: Node[]): Node[] | null | void {
    if (node.name === nodeName) {
      results.push(node)
      return
    }
    if (node.children.length === 0) return

    return node.children.forEach((childNode) => this.traverseTreeAndGetNode(childNode, nodeName, results))
  }

  get(nodeName: string): Node[] | null {
    if (this.root === null) return null
    const results: Node[] = []
    this.traverseTreeAndGetNode(this.root, nodeName, results)
    return results
  }

  private traverseTreeAndUpdateNode(node: Node, nodeName: string, updatedNode: Partial<Node>, updated: boolean): void {
    if (node.name === nodeName) {
      Object.assign(node, updatedNode)
      updated = true
      return
    }

    if (node.children.length === 0) return
    return node.children.forEach((childNode) =>
      this.traverseTreeAndUpdateNode(childNode, nodeName, updatedNode, updated)
    )
  }

  update(nodeName: string, node: Partial<Node>) {
    if (this.root === null) return false
    let updated = false
    this.traverseTreeAndUpdateNode(this.root, nodeName, node, updated)
    return updated
  }

  private traverseTreeAndRemoveNode(node: Node, nodeName: string, removed: number): void {
    if (node.children.length === 0) return
    const foundChildNode = node.children.find(({ name }) => name === nodeName)
    if (foundChildNode) {
      node.children = node.children.filter(({ name }) => name !== nodeName)
      node.children.push(...foundChildNode.children)
      removed = removed++
      return
    } else {
      return node.children.forEach((childNode) => this.traverseTreeAndRemoveNode(childNode, nodeName, removed))
    }
  }

  remove(nodeName: string): { removed: boolean; numberOfNodeRemoved: number } {
    if (!this.root) return { removed: false, numberOfNodeRemoved: 0 }
    let removed: number = 0
    this.traverseTreeAndRemoveNode(this.root, nodeName, removed)
    return { removed: removed > 0, numberOfNodeRemoved: removed }
  }

  private traverseTree(node: Node): void {
    if (node.children.length === 0) return
    node.children.forEach((node) => this.traverseTree(node))
  }

  print() {
    if (!this.root) {
      console.log('Empty tree')
      return
    }
    console.log(JSON.stringify(this.root, null, 2))
  }
}
