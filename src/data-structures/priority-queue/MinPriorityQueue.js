import MinHeap from '../heap/MinHeap'
import PriorityQueue from './PriorityQueue'

const minPriorityQueue_compareFn = (a, b) => {
  if (a.priority === b.priority) {
    return 0
  }
  return a.priority < b.priority ? 1 : -1
}

export default class MinPriorityQueue extends PriorityQueue {
  constructor() {
    super(MinHeap, minPriorityQueue_compareFn)
  }
}
