import MaxPriorityQueue from '../MaxPriorityQueue'

describe('MaxPriorityQueue', () => {
  it('should create empty MaxPriorityQueue', () => {
    const maxPQ = new MaxPriorityQueue()
    expect(maxPQ).toBeDefined()
    expect(maxPQ._maxHeap).toBeDefined()
  })

  it('getSize', () => {
    const maxPQ = new MaxPriorityQueue()
    expect(maxPQ.getSize()).toBe(0)

    maxPQ.insertWithPriority('some data', 1)
    expect(maxPQ.getSize()).toBe(1)

    maxPQ.extractHighestPriorityItem()
    expect(maxPQ.getSize()).toBe(0)
  })

  it('isEmpty', () => {
    const maxPQ = new MaxPriorityQueue()
    expect(maxPQ.isEmpty()).toBe(true)

    maxPQ.insertWithPriority('some data', 1)
    expect(maxPQ.isEmpty()).toBe(false)

    maxPQ.extractHighestPriorityItem()
    expect(maxPQ.isEmpty()).toBe(true)
  })

  it('insertWithPriority', () => {
    const maxPQ = new MaxPriorityQueue()
    maxPQ.insertWithPriority('item 1', 10)
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 1')

    maxPQ.insertWithPriority('item 2', 20)
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 2')

    maxPQ.insertWithPriority('item 3', 15)
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 2')
  })

  it('peekHighestPriorityItem', () => {
    const maxPQ = new MaxPriorityQueue()
    expect(maxPQ.peekHighestPriorityItem()).toBe(null)

    maxPQ.insertWithPriority('item 1', 10)
    maxPQ.insertWithPriority('item 2', 20)
    maxPQ.insertWithPriority('item 3', 30)
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 3')
    //
    maxPQ.extractHighestPriorityItem()
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 2')
    maxPQ.extractHighestPriorityItem()
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 1')
    maxPQ.extractHighestPriorityItem()
    expect(maxPQ.peekHighestPriorityItem()).toBe(null)
  })

  it('extractHighestPriorityItem', () => {
    const maxPQ = new MaxPriorityQueue()
    expect(maxPQ.extractHighestPriorityItem()).toBe(null)

    maxPQ.insertWithPriority('item 1', 10)
    maxPQ.insertWithPriority('item 2', 20)
    maxPQ.insertWithPriority('item 3', 30)
    //
    const extractedItem1 = maxPQ.extractHighestPriorityItem()
    expect(extractedItem1).toBe('item 3')
    const extractedItem2 = maxPQ.extractHighestPriorityItem()
    expect(extractedItem2).toBe('item 2')
    const extractedItem3 = maxPQ.extractHighestPriorityItem()
    expect(extractedItem3).toBe('item 1')
    const extractedItem4 = maxPQ.extractHighestPriorityItem()
    expect(extractedItem4).toBe(null)
  })

  it('changePriority', () => {
    const maxPQ = new MaxPriorityQueue()
    maxPQ.insertWithPriority('item 1', 10)
    const insertedItem1 = maxPQ.insertWithPriority('item 2', 20)
    maxPQ.insertWithPriority('item 3', 30)

    expect(maxPQ.peekHighestPriorityItem()).toBe('item 3')
    maxPQ.changePriority(insertedItem1.id, 40)
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 2')

    const insertedItem2 = maxPQ.insertWithPriority('item 4', 50)
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 4')
    maxPQ.changePriority(insertedItem2.id, 5)
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 2')
  })
})
