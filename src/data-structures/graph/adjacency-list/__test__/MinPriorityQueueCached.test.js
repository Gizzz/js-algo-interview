import MinPriorityQueueCached from '../MinPriorityQueueCached'

describe('MinPriorityQueueCached', () => {
  it('should create empty queue', () => {
    const minPQ = new MinPriorityQueueCached()
    expect(minPQ._heapArray.length).toBe(0)
    expect(Object.keys(minPQ._itemToIdx).length).toBe(0)
  })

  it('insertWithPriority', () => {
    const minPQ = new MinPriorityQueueCached()
    const insertedItem_1 = minPQ.insertWithPriority('item 1', 30)
    expect(minPQ.peekHighestPriority()).toBe('item 1')
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(0)

    const insertedItem_2 = minPQ.insertWithPriority('item 2', 10)
    expect(minPQ.peekHighestPriority()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)

    const insertedItem_3 = minPQ.insertWithPriority('item 3', 20)
    expect(minPQ.peekHighestPriority()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)

    const insertedItem_4 = minPQ.insertWithPriority('item 4', 40)
    expect(minPQ.peekHighestPriority()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)
    expect(minPQ._itemToIdx.get(insertedItem_4)).toBe(3)
  })

  it('extractHighestPriority', () => {
    const minPQ = new MinPriorityQueueCached()
    expect(minPQ.extractHighestPriority()).toBe(null)

    const insertedItem_1 = minPQ.insertWithPriority('item 1', 30)
    const insertedItem_2 = minPQ.insertWithPriority('item 2', 20)
    const insertedItem_3 = minPQ.insertWithPriority('item 3', 10)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(2)

    const extractedItem1 = minPQ.extractHighestPriority()
    expect(extractedItem1).toBe('item 3')
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(undefined)
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)

    const extractedItem2 = minPQ.extractHighestPriority()
    expect(extractedItem2).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(undefined)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(0)

    const extractedItem3 = minPQ.extractHighestPriority()
    expect(extractedItem3).toBe('item 1')
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(undefined)
    expect(minPQ._itemToIdx.size).toBe(0)

    const extractedItem4 = minPQ.extractHighestPriority()
    expect(extractedItem4).toBe(null)
  })

  it('changePriority', () => {
    const minPQ = new MinPriorityQueueCached()
    const insertedItem_1 = minPQ.insertWithPriority('item 1', 30)
    const insertedItem_2 = minPQ.insertWithPriority('item 2', 20)
    const insertedItem_3 = minPQ.insertWithPriority('item 3', 10)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(2)
    expect(minPQ.peekHighestPriority()).toBe('item 3')

    minPQ.changePriority(insertedItem_2, 5)
    expect(minPQ.peekHighestPriority()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)

    const insertedItem_4 = minPQ.insertWithPriority('item 4', 3)
    expect(minPQ.peekHighestPriority()).toBe('item 4')
    expect(minPQ._itemToIdx.get(insertedItem_4)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(3)

    minPQ.changePriority(insertedItem_4, 40)
    expect(minPQ.peekHighestPriority()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)
    expect(minPQ._itemToIdx.get(insertedItem_4)).toBe(3)
  })
})
