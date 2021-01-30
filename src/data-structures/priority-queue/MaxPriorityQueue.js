import MaxHeap from '../heap/MaxHeap'
import PriorityQueue from './PriorityQueue'

const maxPriorityQueue_compareFn = (a, b) => {
  if (a.priority === b.priority) {
    return 0
  }
  return a.priority > b.priority ? 1 : -1
}

export default class MaxPriorityQueue extends PriorityQueue {
  constructor() {
    super(MaxHeap, maxPriorityQueue_compareFn)
  }
}
