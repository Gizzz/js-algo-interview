import LinkedList from '../LinkedList'

describe('LinkedList', () => {
  it('should create empty LinkedList', () => {
    const list = new LinkedList()
    expect(list).not.toBe(null)
    expect(list.getSize()).toBe(0)
    expect(list.head).toBe(null)
  })

  it('getSize', () => {
    const list = new LinkedList()
    expect(list.getSize()).toBe(0)

    list.pushFront(1)
    expect(list.getSize()).toBe(1)

    list.pushFront(2)
    list.pushFront(3)
    expect(list.getSize()).toBe(3)
  })

  it('isEmpty', () => {
    const list = new LinkedList()
    expect(list.isEmpty()).toBe(true)

    list.pushFront(1)
    expect(list.isEmpty()).toBe(false)

    list.popFront()
    expect(list.isEmpty()).toBe(true)
  })

  it('valueAt', () => {
    const list = new LinkedList()
    expect(() => list.valueAt(0)).toThrow('list is empty')
    list.pushBack(1)
    list.pushBack(2)
    list.pushBack(3)
    expect(list.toArray()).toEqual([1, 2, 3])

    expect(() => list.valueAt(-1)).toThrow('index is out of bounds')
    expect(() => list.valueAt(3)).toThrow('index is out of bounds')

    expect(list.valueAt(0)).toBe(1)
    expect(list.valueAt(1)).toBe(2)
    expect(list.valueAt(2)).toBe(3)
  })

  it('pushFront', () => {
    const list = new LinkedList()
    expect(list.getSize()).toBe(0)

    list.pushFront(1)
    expect(list.getSize()).toBe(1)
    expect(list.toArray()).toEqual([1])

    list.pushFront(2)
    list.pushFront(3)
    expect(list.getSize()).toBe(3)
    expect(list.toArray()).toEqual([3, 2, 1])
  })

  it('popFront', () => {
    const list = new LinkedList()
    list.pushFront(1)
    list.pushFront(2)
    expect(list.getSize()).toBe(2)
    expect(list.toArray()).toEqual([2, 1])

    const res1 = list.popFront()
    expect(res1).toBe(2)
    expect(list.getSize()).toBe(1)
    expect(list.toArray()).toEqual([1])

    const res2 = list.popFront()
    expect(res2).toBe(1)
    expect(list.getSize()).toBe(0)
    expect(list.toArray()).toEqual([])

    expect(() => list.popFront()).toThrow('list is empty')
  })

  it('pushBack', () => {
    const list = new LinkedList()
    expect(list.getSize()).toBe(0)
    expect(list.toArray()).toEqual([])

    list.pushBack(1)
    expect(list.getSize()).toBe(1)
    expect(list.toArray()).toEqual([1])

    list.pushBack(2)
    list.pushBack(3)
    expect(list.getSize()).toBe(3)
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  it('popBack', () => {
    const list = new LinkedList()
    list.pushBack(1)
    list.pushBack(2)
    list.pushBack(3)
    expect(list.getSize()).toBe(3)
    expect(list.toArray()).toEqual([1, 2, 3])

    const res1 = list.popBack()
    expect(res1).toBe(3)
    expect(list.getSize()).toBe(2)
    expect(list.toArray()).toEqual([1, 2])

    const res2 = list.popBack()
    expect(res2).toBe(2)
    expect(list.getSize()).toBe(1)
    expect(list.toArray()).toEqual([1])

    const res3 = list.popBack()
    expect(res3).toBe(1)
    expect(list.getSize()).toBe(0)
    expect(list.toArray()).toEqual([])

    expect(() => list.popBack()).toThrow('list is empty')
  })

  it('peekFront', () => {
    const list = new LinkedList()
    expect(() => list.peekFront()).toThrow('list is empty')

    list.pushBack(1)
    list.pushBack(2)
    list.pushBack(3)
    expect(list.toArray()).toEqual([1, 2, 3])

    const res = list.peekFront()
    expect(res).toBe(1)
  })

  it('peekBack', () => {
    const list = new LinkedList()
    expect(() => list.peekFront()).toThrow('list is empty')

    list.pushBack(1)
    list.pushBack(2)
    list.pushBack(3)
    expect(list.toArray()).toEqual([1, 2, 3])

    const res = list.peekBack()
    expect(res).toBe(3)
  })

  it('insert', () => {
    const list = new LinkedList()
    list.pushBack(1)
    list.pushBack(2)
    expect(list.toArray()).toEqual([1, 2])
    expect(list.getSize()).toBe(2)

    expect(() => list.valueAt(-1)).toThrow('index is out of bounds')
    expect(() => list.valueAt(2)).toThrow('index is out of bounds')

    list.insert(0, 0.5)
    expect(list.toArray()).toEqual([0.5, 1, 2])
    expect(list.getSize()).toBe(3)

    list.insert(2, 1.5)
    expect(list.toArray()).toEqual([0.5, 1, 1.5, 2])
    expect(list.getSize()).toBe(4)

    list.insert(4, 2.5)
    expect(list.toArray()).toEqual([0.5, 1, 1.5, 2, 2.5])
    expect(list.getSize()).toBe(5)
  })

  it('erase', () => {
    const list = new LinkedList()
    expect(() => list.erase(0)).toThrow('list is empty')
    list.pushBack(1)
    list.pushBack(2)
    list.pushBack(3)
    expect(() => list.erase(-1)).toThrow('index is out of bounds')
    expect(() => list.erase(3)).toThrow('index is out of bounds')

    // erase from middle
    list.erase(1)
    expect(list.getSize()).toBe(2)
    expect(list.toArray()).toEqual([1, 3])

    // erase from back
    list.erase(1)
    expect(list.getSize()).toBe(1)
    expect(list.toArray()).toEqual([1])

    // erase only element
    list.erase(0)
    expect(list.getSize()).toBe(0)
    expect(list.toArray()).toEqual([])
    expect(list.head).toBe(null)

    list.pushBack(1)
    list.pushBack(2)
    // erase from front
    list.erase(0)
    expect(list.getSize()).toBe(1)
    expect(list.toArray()).toEqual([2])
  })

  it('valueNFromEnd', () => {
    const list = new LinkedList()
    expect(() => list.valueNFromEnd(0)).toThrow('list is empty')
    list.pushBack(1)
    list.pushBack(2)
    list.pushBack(3)
    expect(() => list.valueNFromEnd(-1)).toThrow('index is out of bounds')
    expect(() => list.valueNFromEnd(3)).toThrow('index is out of bounds')

    const res1 = list.valueNFromEnd(0)
    expect(res1).toBe(3)

    const res2 = list.valueNFromEnd(1)
    expect(res2).toBe(2)

    const res3 = list.valueNFromEnd(2)
    expect(res3).toBe(1)
  })

  it('reverse', () => {
    const list = new LinkedList()

    list.reverse()
    expect(list.toArray()).toEqual([])
    expect(list.getSize()).toBe(0)
    expect(list.head).toBe(null)

    list.pushBack(1)
    list.reverse()
    expect(list.toArray()).toEqual([1])
    expect(list.getSize()).toBe(1)

    list.pushBack(2)
    list.reverse()
    expect(list.toArray()).toEqual([2, 1])
    expect(list.getSize()).toBe(2)

    list.pushFront(3)
    expect(list.toArray()).toEqual([3, 2, 1])
    list.reverse()
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  it('removeValue', () => {
    const list = new LinkedList()
    list.pushBack(1)
    list.pushBack(2)
    list.pushBack(3)

    list.removeValue(4)
    expect(list.toArray()).toEqual([1, 2, 3])
    expect(list.getSize()).toBe(3)

    list.removeValue(2)
    expect(list.toArray()).toEqual([1, 3])
    expect(list.getSize()).toBe(2)

    list.removeValue(3)
    expect(list.toArray()).toEqual([1])
    expect(list.getSize()).toBe(1)

    list.removeValue(1)
    expect(list.toArray()).toEqual([])
    expect(list.getSize()).toBe(0)

    list.pushBack(1)
    list.pushBack(2)
    list.removeValue(1)
    expect(list.toArray()).toEqual([2])
    expect(list.getSize()).toBe(1)

    list.popBack()
    expect(list.toArray()).toEqual([])
    expect(list.getSize()).toBe(0)
    list.pushBack(1)
    list.pushBack(2)
    list.pushBack(10)
    list.pushBack(2)
    list.pushBack(100)
    list.pushBack(2)
    list.removeValue(2)
    expect(list.toArray()).toEqual([1, 10, 2, 100, 2])
    expect(list.getSize()).toBe(5)
  })

  it('findIndex', () => {
    const list = new LinkedList()
    const idx1 = list.findIndex(5)
    expect(idx1).toBe(-1)

    list.pushBack(1)
    list.pushBack(2)
    list.pushBack(10)
    list.pushBack(2)
    list.pushBack(100)
    list.pushBack(2)

    const idx2 = list.findIndex(2)
    expect(idx2).toBe(1)

    const idx3 = list.findIndex(3)
    expect(idx3).toBe(-1)
  })
})
