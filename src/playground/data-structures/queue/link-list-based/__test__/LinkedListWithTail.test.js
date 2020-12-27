import LinkedListWithTail from '../LinkedListWithTail'

describe('LinkedList', () => {
  it('should create empty LinkedList', () => {
    const list = new LinkedListWithTail()
    expect(list).not.toBe(null)
    expect(list.head).toBe(null)
    expect(list.tail).toBe(null)
    expect(list.toArray()).toEqual([])
  })

  it('isEmpty', () => {
    const list = new LinkedListWithTail()
    expect(list.isEmpty()).toBe(true)

    list.pushBack(1)
    expect(list.isEmpty()).toBe(false)

    list.popFront()
    expect(list.isEmpty()).toBe(true)
  })

  it('popFront', () => {
    const list = new LinkedListWithTail()
    list.pushBack(1)
    list.pushBack(2)
    expect(list.toArray()).toEqual([1, 2])

    const res1 = list.popFront()
    expect(res1).toBe(1)
    expect(list.toArray()).toEqual([2])

    const res2 = list.popFront()
    expect(res2).toBe(2)
    expect(list.toArray()).toEqual([])

    expect(() => list.popFront()).toThrow('list is empty')
  })

  it('pushBack', () => {
    const list = new LinkedListWithTail()
    expect(list.toArray()).toEqual([])

    list.pushBack(1)
    expect(list.toArray()).toEqual([1])

    list.pushBack(2)
    list.pushBack(3)
    expect(list.toArray()).toEqual([1, 2, 3])
  })
})
