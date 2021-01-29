/**
 * Interface:
 *
 * is_empty()
 * get_size()
 * insert_with_priority(priority, data) - add an item to the queue with an associated priority.
 * peek_highest_priority_item()
 * extract_highest_priority_item() - remove the item from the queue
 *   that has the highest priority and return it
 * change_priority(new_priority, item_id)
 */

import MaxHeap from '../heap/MaxHeap'

const customCompareFn = (a, b) => {
  if (a.priority === b.priority) {
    return 0
  }
  return a.priority > b.priority ? 1 : -1
}

export default class MaxPriorityQueue {
  constructor() {
    this._maxHeap = new MaxHeap(customCompareFn)
  }

  // get_size() - returns number of items soted in PQ
  getSize() {
    return this._maxHeap.getSize()
  }

  // is_empty() - returns true if PQ contains no items
  isEmpty() {
    return this._maxHeap.isEmpty()
  }

  // insert_with_priority(priority, data) - adds an item to queue with an associated priority
  insertWithPriority(priority, data) {
    const item = {
      priority,
      data,
    }
    this._maxHeap.insert(item)
  }

  // peek_highest_priority_item() - returns highest priority item without removing it
  peekHighestPriorityItem() {
    const item = this._maxHeap.peekMax()
    return item === null ? null : item.data
  }

  // extract_highest_priority_item() - remove the item from the queue
  //   that has the highest priority and return it
  extractHighestPriorityItem() {
    const item = this._maxHeap.extractMax()
    return item === null ? null : item.data
  }

  // change_priority(new_priority, item_id)
}
