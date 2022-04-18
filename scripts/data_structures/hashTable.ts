function hashingFn(string: string, number: number) {
  let sum = 0
  for (let i = 0; i < string.length; i++) {
    sum += string.charCodeAt(i) * 3
  }
  return sum % number
}

class HashTable<T> {
  size: number
  storage: Array<Array<[string, T]>>
  constructor(size: number) {
    this.size = size
    this.storage = []
  }

  insert(key: string, value: T) {
    const index = hashingFn(key, this.size)

    if (!this.storage[index]) {
      this.storage[index] = []
    }
    this.storage[index].push([key, value])
  }

  get(key: string) {
    const index = hashingFn(key, this.size)
    let arrayAtIndex = this.storage[index]
    if (!arrayAtIndex) return null

    for (let i = 0; i < arrayAtIndex.length; i++) {
      if (arrayAtIndex[i] && arrayAtIndex[i][0] === key) {
        return arrayAtIndex[i][1]
      }
    }
    return null
  }

  remove(key: string) {
    const index = hashingFn(key, this.size)
    let arrayAtIndex = this.storage[index]
    if (arrayAtIndex) {
      for (let i = 0; i < arrayAtIndex.length; i++) {
        arrayAtIndex[i][0] === key && delete arrayAtIndex[i]
        break
      }
    }
  }
}

function get() {
  console.log('get')
  const myHashTable = new HashTable<number>(5)
  myHashTable.insert('Nicolas', 1)
  myHashTable.insert('Flora', 2)
  const val = myHashTable.get('Nicolas')
  const valTwo = myHashTable.get('Flora')
  console.log('val', val)
  console.log('valTwo', valTwo)
}

function remove() {
  console.log('remove')
  const myHashTable = new HashTable<number>(5)
  myHashTable.insert('Nicolas', 1)
  myHashTable.remove('Nicolas')
  const val = myHashTable.get('Nicolas')
  console.log('val', val)
}

export const hashTable = {
  fn: () => {
    get()
    remove()
  },
}
