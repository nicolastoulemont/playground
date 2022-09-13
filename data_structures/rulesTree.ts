class RuleNode {
  name: string
  rule: (...args: any[]) => any
  children: RuleNode[]
  constructor({ name, rule, children }: { name: string; rule: (...args: any[]) => any; children: RuleNode[] }) {
    this.name = name
    this.rule = rule
    this.children = children
  }
}

export class RulesTree {
  root: RuleNode | null
  constructor() {
    this.root = null
  }

  private addToTree(parentNode: RuleNode, node: RuleNode, parentNodeName: string): void | null {
    if (!parentNode) return null
    if (parentNode.name === parentNodeName) {
      parentNode.children.push(node)
      return
    }
    if (parentNode.children.length === 0) return

    return parentNode.children.forEach((childNode) => this.addToTree(childNode, node, parentNodeName))
  }

  add(node: RuleNode, parentNodeName?: string) {
    if (this.root === null) {
      this.root = new RuleNode(node)
      return
    }

    if (this.root && !parentNodeName) {
      throw new Error('parentNodeName is required once the tree is initialized')
    }

    return this.addToTree(this.root as RuleNode, node, parentNodeName as string)
  }

  private traverseTree(node: RuleNode): void {
    console.log(node.name)
    if (node.children.length === 0) return
    node.children.forEach((node) => this.traverseTree(node))
  }

  print() {
    if (!this.root) {
      console.log('Empty tree')
      return
    }

    this.traverseTree(this.root)
  }
}
