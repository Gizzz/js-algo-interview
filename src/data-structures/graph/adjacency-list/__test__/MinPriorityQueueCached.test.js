import MinPriorityQueueCached from '../MinPriorityQueueCached'

describe('MinPriorityQueueCached', () => {
  it('should create empty queue', () => {
    const minPQ = new MinPriorityQueueCached()
    expect(minPQ._array.length).toBe(0)
    expect(Object.keys(minPQ._itemToIdx).length).toBe(0)
  })

  it('insertWithPriority', () => {
    const minPQ = new MinPriorityQueueCached()
    const insertedItem_1 = minPQ.insertWithPriority('item 1', 30)
    expect(minPQ.peekHighestPriorityItem()).toBe('item 1')
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(0)

    const insertedItem_2 = minPQ.insertWithPriority('item 2', 10)
    expect(minPQ.peekHighestPriorityItem()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)

    const insertedItem_3 = minPQ.insertWithPriority('item 3', 20)
    expect(minPQ.peekHighestPriorityItem()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)

    const insertedItem_4 = minPQ.insertWithPriority('item 4', 40)
    expect(minPQ.peekHighestPriorityItem()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)
    expect(minPQ._itemToIdx.get(insertedItem_4)).toBe(3)
  })

  it('extractHighestPriorityItem', () => {
    const minPQ = new MinPriorityQueueCached()
    expect(minPQ.extractHighestPriorityItem()).toBe(null)

    const insertedItem_1 = minPQ.insertWithPriority('item 1', 30)
    const insertedItem_2 = minPQ.insertWithPriority('item 2', 20)
    const insertedItem_3 = minPQ.insertWithPriority('item 3', 10)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(2)

    const extractedItem1 = minPQ.extractHighestPriorityItem()
    expect(extractedItem1).toBe('item 3')
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(undefined)
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)

    const extractedItem2 = minPQ.extractHighestPriorityItem()
    expect(extractedItem2).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(undefined)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(0)

    const extractedItem3 = minPQ.extractHighestPriorityItem()
    expect(extractedItem3).toBe('item 1')
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(undefined)
    expect(minPQ._itemToIdx.size).toBe(0)

    const extractedItem4 = minPQ.extractHighestPriorityItem()
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
    expect(minPQ.peekHighestPriorityItem()).toBe('item 3')

    minPQ.changePriority(insertedItem_2, 5)
    expect(minPQ.peekHighestPriorityItem()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)

    const insertedItem_4 = minPQ.insertWithPriority('item 4', 3)
    expect(minPQ.peekHighestPriorityItem()).toBe('item 4')
    expect(minPQ._itemToIdx.get(insertedItem_4)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(3)

    minPQ.changePriority(insertedItem_4, 40)
    expect(minPQ.peekHighestPriorityItem()).toBe('item 2')
    expect(minPQ._itemToIdx.get(insertedItem_2)).toBe(0)
    expect(minPQ._itemToIdx.get(insertedItem_1)).toBe(1)
    expect(minPQ._itemToIdx.get(insertedItem_3)).toBe(2)
    expect(minPQ._itemToIdx.get(insertedItem_4)).toBe(3)
  })
})
