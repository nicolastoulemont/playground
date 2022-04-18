import { BST } from './bst'
import { describe, test, expect } from '../../utils'

describe('Testing BinaryTree utils', () => {
  test('add', () => {
    const bst = new BST<number>()
    bst.add(2)
    bst.add(5)
    bst.add(3)
  })
  test('contains', () => {
    const bst = new BST<number>()
    bst.add(2)
    bst.add(5)
    expect(bst.contains(3)).toBe(false)
    bst.add(3)
    expect(bst.contains(3)).toBe(true)
  })
  test('Find', () => {
    const bst = new BST<number>()
    bst.add(3)
    expect(bst.find(4)).toBe(null)
    expect(bst.find(3)).not.toBe(null)
  })
  test('Get min', () => {
    const bst = new BST<number>()
    bst.add(2)
    bst.add(5)
    expect(bst.getMin()).toBe(2)
  })
  test('Get max', () => {
    const bst = new BST<number>()
    bst.add(2)
    bst.add(5)
    expect(bst.getMax()).toBe(5)
  })
  test('remove', () => {
    const bst = new BST<number>()
    bst.add(2)
    bst.add(1)
    bst.add(5)
    bst.add(3)
    bst.remove(5)
    expect(bst.contains(5)).toBe(false)
  })
})
