import Heap from '../Heap'

describe('Heap', () => {
  it('constructor', () => {
    expect(() => new Heap()).toThrow('`compareFn` param should be provided')

    const compareFnMock = () => {}
    expect(() => new Heap(compareFnMock)).toThrow('`Heap` instance should not be created directly, use subclass')
  })

  it('static methods', () => {
    expect(() => Heap.buildHeap([])).toThrow('static methods of `Heap` class should not be used directly, use subclass')
    expect(() => Heap.heapSort([])).toThrow('static methods of `Heap` class should not be used directly, use subclass')
  })
})
