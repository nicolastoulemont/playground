import { canConstruct } from './can_construct_memo'
import { test, expect } from '~/utils'

test('canConstruct', () => {
  expect(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])).toBe(true)
  expect(canConstruct('stakeboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])).toBe(false)
  expect(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])).toBe(true)
  expect(
    canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
      'e',
      'ee',
      'eee',
      'eeee',
      'eeeee',
      'eeeeee',
      'eeeeeee',
      'eeeeeeee',
      'eeeeeeeee',
      'eeeeeeeeee',
    ])
  ).toBe(false)
})
