export function canConstruct(target: string, words: string[], memo = new Map()): boolean {
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
