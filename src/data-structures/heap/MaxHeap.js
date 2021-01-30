import Heap from './Heap'

const maxHeapCompareFn = (a, b) => {
  if (a === b) {
    return 0
  }
  return a > b ? 1 : -1
}

export default class MaxHeap extends Heap {
  constructor(compareFn = maxHeapCompareFn) {
    super(compareFn)
  }
}
