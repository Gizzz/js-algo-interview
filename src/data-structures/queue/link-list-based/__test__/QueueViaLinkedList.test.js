import QueueViaLinkedList from '../QueueViaLinkedList'

describe('LinkedList', () => {
  it('should create empty LinkedList', () => {
    const queue = new QueueViaLinkedList()
    expect(queue).not.toBe(null)
    expect(queue.isEmpty()).toBe(true)
    expect(queue.toArray()).toEqual([])
  })

  it('isEmpty', () => {
    const queue = new QueueViaLinkedList()
    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(1)
    expect(queue.isEmpty()).toBe(false)

    queue.dequeue()
    expect(queue.isEmpty()).toBe(true)
  })

  it('enqueue', () => {
    const queue = new QueueViaLinkedList()
    expect(queue.toArray()).toEqual([])

    queue.enqueue(1)
    expect(queue.toArray()).toEqual([1])

    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.toArray()).toEqual([1, 2, 3])
  })

  it('dequeue', () => {
    const queue = new QueueViaLinkedList()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.toArray()).toEqual([1, 2])

    const res1 = queue.dequeue()
    expect(res1).toBe(1)
    expect(queue.toArray()).toEqual([2])

    const res2 = queue.dequeue()
    expect(res2).toBe(2)
    expect(queue.toArray()).toEqual([])

    expect(() => queue.dequeue()).toThrow('queue is empty')
  })
})
