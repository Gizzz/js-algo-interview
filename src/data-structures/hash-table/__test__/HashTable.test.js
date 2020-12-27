/* eslint-disable camelcase */
import HashTable, { initialTableSize } from '../HashTable'

describe('LinkedList', () => {
  it('should create empty HashTable', () => {
    const ht = new HashTable()
    expect(ht).toBeDefined()
    expect(Array.isArray(ht._table)).toBe(true)
    expect(ht._table.length).toBe(initialTableSize)
    expect(ht._tableSize).toBe(initialTableSize)
  })

  it('get', () => {
    // mostly tested in 'set' and 'remove'

    const ht = new HashTable()

    expect(() => ht.get('a')).toThrow('key is not found')
    ht.set('a', 1)
    expect(ht.get('a')).toBe(1)

    ht.remove('a')
    expect(() => ht.get('a')).toThrow('key is not found')
  })

  it('set', () => {
    const ht = new HashTable()

    expect(ht._countOfElements).toBe(0)
    expect(() => ht.get('a')).toThrow('key is not found')
    ht.set('a', 1)
    expect(ht._countOfElements).toBe(1)
    expect(ht.get('a')).toBe(1)

    ht.set('b', 2)
    ht.set('c', 3)
    ht.set('d', 4)
    ht.set('e', 5)
    ht.set('f', 6)
    ht.set('g', 7)
    ht.set('h', 8)
    expect(ht._countOfElements).toBe(8)

    ht.set('a', 111)
    expect(ht._countOfElements).toBe(8)
    expect(ht.get('a')).toBe(111)

    // check for collision resolving (all keys resolve to same hash)
    //
    const ht2 = new HashTable()
    expect(ht2._hash('a')).toBe(1)
    expect(ht2._hash('i')).toBe(1)
    expect(ht2._hash('q')).toBe(1)
    ht2.set('a', 1)
    ht2.set('i', 2)
    ht2.set('q', 3)
    expect(ht2._countOfElements).toBe(3)
    expect(ht2.get('a')).toBe(1)
    expect(ht2.get('i')).toBe(2)
    expect(ht2.get('q')).toBe(3)

    // check for index looping
    //
    const ht3 = new HashTable()
    ht3.set('g', 1)
    expect(ht3._table[7]).toEqual({ key: 'g', value: 1 })
    expect(ht3.get('g')).toBe(1)
    //
    ht3.set('h', 2)
    expect(ht3._table[0]).toEqual({ key: 'h', value: 2 })
    expect(ht3.get('h')).toBe(2)
  })

  it('remove', () => {
    const ht = new HashTable()
    expect(() => ht.remove('a')).toThrow('key is not found')

    ht.set('a', 1)
    expect(ht._countOfElements).toBe(1)
    ht.remove('a')
    expect(ht._countOfElements).toBe(0)
    expect(() => ht.remove('a')).toThrow('key is not found')

    // check for collision resolving (all keys resolve to same hash)
    //
    const ht2 = new HashTable()
    expect(ht2._hash('a')).toBe(1)
    expect(ht2._hash('i')).toBe(1)
    expect(ht2._hash('q')).toBe(1)
    ht2.set('a', 1)
    ht2.set('i', 2)
    ht2.set('q', 3)
    expect(ht2._countOfElements).toBe(3)
    expect(ht2.get('a')).toBe(1)
    expect(ht2.get('i')).toBe(2)
    expect(ht2.get('q')).toBe(3)
    //
    ht2.remove('a')
    expect(ht2.get('i')).toBe(2)
    expect(ht2.get('q')).toBe(3)
  })

  it('isKeyExists', () => {
    const ht = new HashTable()
    expect(ht.isKeyExists('a')).toBe(false)

    ht.set('a', 1)
    expect(ht.isKeyExists('a')).toBe(true)

    ht.remove('a')
    expect(ht.isKeyExists('a')).toBe(false)
  })

  it('_hash', () => {
    const ht = new HashTable()

    const key1 = 123
    expect(() => ht._hash(key1)).toThrow('key must be of type string')

    const key2 = ''
    expect(ht._hash(key2)).toBe(0)

    const key3_1 = 'abc'
    const key3_2 = 'abc'
    expect(ht._hash(key3_1)).toBe(ht._hash(key3_2))

    const key4_1 = 'abc'
    const key4_2 = 'xyz'
    expect(ht._hash(key4_1)).not.toBe(ht._hash(key4_2))
  })

  it('should grow and shrink the table', () => {
    const ht = new HashTable()
    expect(ht._countOfElements).toBe(0)
    expect(ht._tableSize).toBe(8)

    ht.set('a', 1)
    ht.set('b', 2)
    ht.set('c', 3)
    ht.set('d', 4)
    expect(ht._countOfElements).toBe(4)
    expect(ht._tableSize).toBe(16)
    ht.set('e', 5)
    ht.set('f', 6)
    ht.set('g', 7)
    ht.set('h', 8)
    expect(ht._countOfElements).toBe(8)
    expect(ht._tableSize).toBe(32)

    ht.remove('h')
    ht.remove('g')
    ht.remove('f')
    ht.remove('e')
    expect(ht._countOfElements).toBe(4)
    expect(ht._tableSize).toBe(16)
    ht.remove('d')
    ht.remove('c')
    ht.remove('b')
    ht.remove('a')
    expect(ht._countOfElements).toBe(0)
    expect(ht._tableSize).toBe(8)
  })
})
