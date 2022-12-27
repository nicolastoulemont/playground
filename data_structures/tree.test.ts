import { Tree } from './tree'
import { describe, test, expect } from '~/utils'

describe('Tree', () => {
  const tree = new Tree()
  tree.set({ name: 'root', children: [] })
  tree.set(
    {
      name: '1',
      children: [
        { name: '1-1', children: [{ name: '1-1-1', children: [] }] },
        { name: '1-2', children: [] },
      ],
    },
    'root'
  )
  tree.set({ name: '2', children: [{ name: '2-1', children: [] }] }, 'root')
  test('get', () => {
    const result = tree.get('1-1-1')
    expect(result).toStrictEqual([{ name: '1-1-1', children: [] }])
  })
  test('update', () => {
    tree.update('2-1', { children: [{ name: '2-1-1', children: [] }] })
    const result = tree.get('2-1')
    expect(result).toStrictEqual([{ name: '2-1', children: [{ name: '2-1-1', children: [] }] }])
  })
  test('remove', () => {
    tree.remove('1-1')
    const result = tree.get('1')
    expect(result).toEqual([
      {
        name: '1',
        children: [
          { name: '1-2', children: [] },
          { name: '1-1-1', children: [] },
        ],
      },
    ])
  }),
    test.skip('traverse', () => {
      for (const node of tree.traverse()) {
        console.log(JSON.stringify(node, null, 2))
      }
    })
})
