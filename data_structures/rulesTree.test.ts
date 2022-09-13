import { RulesTree } from './rulesTree'
import { describe, test, expect } from '~/utils'

describe('Testing Tree', () => {
  test('initializing', () => {
    const tree = new RulesTree()
    tree.add({ name: 'root', rule: () => {}, children: [] })
    tree.print()
    expect(true)
  })
})
