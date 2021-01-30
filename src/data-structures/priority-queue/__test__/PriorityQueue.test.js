import PriorityQueue from '../PriorityQueue'
import MaxHeap from '../../heap/MaxHeap'

describe('PriorityQueue', () => {
  it('constructor', () => {
    expect(() => new PriorityQueue(Object)).toThrow('`HeapSubclass` should be instance of `Heap`')
    expect(() => new PriorityQueue(MaxHeap)).toThrow('`compareFn` param should be provided')
    const compareFnMock = () => {}
    expect(() => new PriorityQueue(MaxHeap, compareFnMock)).toThrow('`PriorityQueue` instance should not be created directly, use subclass')
  })
})
