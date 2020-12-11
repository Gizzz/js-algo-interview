/**
 * Hashtable implementation
 *
 * Collision resolution: open adressing (linear probing)
 * Supports table resizing
 */

export const initialTableSize = 8

export default class HashTable {
  constructor() {
    this._table = new Array(initialTableSize)
    this._tableSize = initialTableSize
    this._countOfElements = 0
  }

  // get(key)
  get(key) {
    this._checkKeyForType(key)

    const slotIdx = this._searchKeyIdx(key)
    if (slotIdx === -1) {
      throw new Error('key is not found')
    }
    return this._table[slotIdx].value
  }

  // set(key, value) - if key already exists, update value
  set(key, value) {
    this._checkKeyForType(key)

    let slotIdx = this._hash(key)
    let isFound = false
    for (let i = 0; i < this._tableSize; i++) {
      const slotValue = this._table[slotIdx]
      if (slotValue === undefined || slotValue.isDeleted === true || slotValue.key === key) {
        isFound = true
        break
      }
      slotIdx = (slotIdx + 1) % this._tableSize
    }

    if (!isFound) {
      throw new Error('empty slot is not found and value by key do not exist')
    }

    if (!this.isKeyExists(key)) {
      this._countOfElements += 1
    }
    this._table[slotIdx] = { key, value }

    if (this._countOfElements >= this._tableSize / 2) {
      this._resizeTable(this._tableSize * 2)
    }
  }

  // remove(key)
  remove(key) {
    this._checkKeyForType(key)

    const slotIdx = this._searchKeyIdx(key)
    if (slotIdx === -1) {
      throw new Error('key is not found')
    }
    this._table[slotIdx] = { ...this._table[slotIdx], isDeleted: true }
    this._countOfElements -= 1

    if (this._tableSize > initialTableSize && this._countOfElements <= this._tableSize / 8) {
      this._resizeTable(this._tableSize / 2)
    }
  }

  // exists(key)
  isKeyExists(key) {
    this._checkKeyForType(key)

    const slotIdx = this._searchKeyIdx(key)
    return slotIdx !== -1
  }

  /**
   * NOTE: this is simplified version of hash function, not for prod
   *
   * Hashes the key (both prehash & hash)
   *
   * @param {string} key - key to hash
   * @returns {number} - hash of key
   */
  _hash(key) {
    this._checkKeyForType(key)

    let h = 0
    key.split('').forEach((char) => {
      h += char.charCodeAt(0)
    })
    return h % this._tableSize
  }

  _resizeTable(newSize) {
    if (newSize < initialTableSize) {
      throw new Error('newSize is too small')
    }

    const newTable = new Array(newSize)
    this._table.forEach((entry) => {
      if (entry === undefined) {
        return
      }

      const { key, value } = entry
      const newHash = this._hash(key)
      newTable[newHash] = { key, value }
    })

    this._table = newTable
    this._tableSize = newSize
  }

  _searchKeyIdx(key) {
    let slotIdx = this._hash(key)
    let isFound = false
    for (let i = 0; i < this._tableSize; i++) {
      const slotValue = this._table[slotIdx]
      if (slotValue === undefined) {
        break
      }
      if (!slotValue.isDeleted && slotValue.key === key) {
        isFound = true
        break
      }
      slotIdx = (slotIdx + 1) % this._tableSize
    }

    if (!isFound) {
      return -1
    }
    return slotIdx
  }

  _checkKeyForType(key) {
    if (typeof key !== 'string') {
      throw new Error('key must be of type string')
    }
  }
}
