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

    maxPQ.insertWithPriority(1, 'some data')
    expect(maxPQ.getSize()).toBe(1)

    maxPQ.extractHighestPriorityItem()
    expect(maxPQ.getSize()).toBe(0)
  })

  it('isEmpty', () => {
    const maxPQ = new MaxPriorityQueue()
    expect(maxPQ.isEmpty()).toBe(true)

    maxPQ.insertWithPriority(1, 'some data')
    expect(maxPQ.isEmpty()).toBe(false)

    maxPQ.extractHighestPriorityItem()
    expect(maxPQ.isEmpty()).toBe(true)
  })

  it('insertWithPriority', () => {
    const maxPQ = new MaxPriorityQueue()
    maxPQ.insertWithPriority(10, 'item 1')
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 1')

    maxPQ.insertWithPriority(20, 'item 2')
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 2')

    maxPQ.insertWithPriority(15, 'item 3')
    expect(maxPQ.peekHighestPriorityItem()).toBe('item 2')
  })

  it('peekHighestPriorityItem', () => {
    const maxPQ = new MaxPriorityQueue()
    expect(maxPQ.peekHighestPriorityItem()).toBe(null)

    maxPQ.insertWithPriority(10, 'item 1')
    maxPQ.insertWithPriority(20, 'item 2')
    maxPQ.insertWithPriority(30, 'item 3')
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

    maxPQ.insertWithPriority(10, 'item 1')
    maxPQ.insertWithPriority(20, 'item 2')
    maxPQ.insertWithPriority(30, 'item 3')
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
})
