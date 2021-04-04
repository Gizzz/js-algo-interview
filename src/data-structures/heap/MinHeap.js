import Heap from './Heap'

const minHeapCompareFn = (a, b) => {
  if (a === b) {
    return 0
  }
  return a < b ? 1 : -1
}

export default class MinHeap extends Heap {
  constructor(compareFn = minHeapCompareFn) {
    super(compareFn)
  }
}
