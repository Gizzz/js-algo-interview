/**
 * Hashtable implementation via open adressing (linear probing)
 */

/**
 * TODO:
 * + linear probing
 * - table resizing
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
    const {
      _table, _tableSize, _checkKeyForType, _countOfElements,
    } = this

    _checkKeyForType(key)
    if (!this.isKeyExists(key) && _countOfElements === _tableSize) {
      throw new Error('table is full')
    }

    let slotIdx = this._hash(key)
    let isFound = false
    for (let i = 0; i < _tableSize; i++) {
      const slotValue = _table[slotIdx]
      if (slotValue === undefined || slotValue.isDeleted === true || slotValue.key === key) {
        isFound = true
        break
      }
      slotIdx = (slotIdx + 1) % _tableSize
    }

    if (!isFound) {
      throw new Error('empty slot is not found')
    }

    if (!this.isKeyExists(key)) {
      this._countOfElements += 1
    }
    _table[slotIdx] = { key, value }
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
  }

  // exists(key)
  isKeyExists(key) {
    this._checkKeyForType(key)

    const slotIdx = this._searchKeyIdx(key)
    return slotIdx !== -1
  }

  /**
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
