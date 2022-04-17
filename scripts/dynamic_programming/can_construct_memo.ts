function canConstruct(target: string, words: string[], memo = new Map()): boolean {
  if (memo.has(target)) return memo.get(target)
  if (target === '') return true
  for (const word of words) {
    if (target.indexOf(word) === 0) {
      const remainder = target.slice(word.length)
      if (canConstruct(remainder, words, memo)) {
        memo.set(target, true)
        return true
      }
    }
  }
  memo.set(target, false)
  return false
}

export const can_construct_memo = {
  fn: () => {
    console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']))
    console.log(canConstruct('stakeboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']))
    console.log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']))
    console.log(
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
    )
  },
}
