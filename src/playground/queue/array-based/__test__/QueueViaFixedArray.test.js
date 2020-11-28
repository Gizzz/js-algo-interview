import QueueViaFixedArray from '../QueueViaFixedArray'

const queueSize = 4

describe('LinkedList', () => {
  it('should create empty LinkedList', () => {
    const queue = new QueueViaFixedArray()
    expect(queue).not.toBe(null)
    expect(queue.isEmpty()).toBe(true)
    expect(queue.toArray()).toEqual([])
  })

  it('enqueue', () => {
    const queue = new QueueViaFixedArray(queueSize)

    queue.enqueue(1)
    expect(queue.toArray()).toEqual([1])
    queue.enqueue(2)
    expect(queue.toArray()).toEqual([1, 2])
    queue.enqueue(3)
    expect(queue.toArray()).toEqual([1, 2, 3])
    queue.enqueue(4)
    expect(queue.toArray()).toEqual([1, 2, 3, 4])

    expect(() => queue.enqueue(5)).toThrow('queue is full')
  })

  it('dequeue', () => {
    const queue = new QueueViaFixedArray(queueSize)
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.enqueue(4)
    expect(queue.toArray()).toEqual([1, 2, 3, 4])

    const res1 = queue.dequeue()
    expect(res1).toBe(1)
    expect(queue.toArray()).toEqual([2, 3, 4])

    const res2 = queue.dequeue()
    expect(res2).toBe(2)
    expect(queue.toArray()).toEqual([3, 4])

    const res3 = queue.dequeue()
    expect(res3).toBe(3)
    expect(queue.toArray()).toEqual([4])

    const res4 = queue.dequeue()
    expect(res4).toBe(4)
    expect(queue.toArray()).toEqual([])

    expect(() => queue.dequeue()).toThrow('queue is empty')
  })

  it('isEmpty', () => {
    const queue = new QueueViaFixedArray(queueSize)
    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(1)
    expect(queue.isEmpty()).toBe(false)

    queue.dequeue()
    expect(queue.isEmpty()).toBe(true)
  })

  it('isFull', () => {
    const queue = new QueueViaFixedArray(queueSize)
    expect(queue.isEmpty()).toBe(true)
    expect(queue.isFull()).toBe(false)

    queue.enqueue(1)
    expect(queue.isEmpty()).toBe(false)
    expect(queue.isFull()).toBe(false)

    queue.enqueue(2)
    queue.enqueue(3)
    queue.enqueue(4)
    expect(queue.isFull()).toBe(true)

    queue.dequeue()
    expect(queue.isFull()).toBe(false)
  })

  it('circular addressing', () => {
    const queue = new QueueViaFixedArray(queueSize)
    expect(queue._readIdx).toBe(0)
    expect(queue._writeIdx).toBe(0)

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.enqueue(4)
    expect(queue._readIdx).toBe(0)
    expect(queue._writeIdx).toBe(4)
    expect(queue.isEmpty()).toBe(false)
    expect(queue.isFull()).toBe(true)

    queue.dequeue()
    queue.dequeue()
    queue.dequeue()
    queue.dequeue()
    expect(queue._readIdx).toBe(4)
    expect(queue._writeIdx).toBe(4)
    expect(queue.isEmpty()).toBe(true)
    expect(queue.isFull()).toBe(false)

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.enqueue(4)
    expect(queue._readIdx).toBe(4)
    expect(queue._writeIdx).toBe(3)
    expect(queue.isEmpty()).toBe(false)
    expect(queue.isFull()).toBe(true)

    queue.dequeue()
    queue.dequeue()
    queue.dequeue()
    queue.dequeue()
    expect(queue._readIdx).toBe(3)
    expect(queue._writeIdx).toBe(3)
    expect(queue.isEmpty()).toBe(true)
    expect(queue.isFull()).toBe(false)
  })
})
