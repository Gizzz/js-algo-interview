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

import { v4 as uuidv4 } from 'uuid'
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

  // insert_with_priority(priority, data) - adds an item to queue with an associated priority,
  // returns inserted item
  insertWithPriority(data, priority) {
    const item = {
      id: uuidv4(),
      data,
      priority,
    }
    this._maxHeap.insert(item)
    return item
  }

  // peek_highest_priority_item() - returns highest priority item without removing it
  peekHighestPriorityItem() {
    const item = this._maxHeap.peekMax()
    return item === null ? null : item.data
  }

  // extract_highest_priority_item() - removes the item from the queue
  //   that has the highest priority and return it
  extractHighestPriorityItem() {
    const item = this._maxHeap.extractMax()
    return item === null ? null : item.data
  }

  // change_priority(item_id, new_priority) - changes priority of specified item
  changePriority(itemId, newPriority) {
    let itemIdx = -1
    const item = this._maxHeap._array.find((entry, idx) => {
      if (entry.id === itemId) {
        itemIdx = idx
        return true
      }
      return false
    })
    if (item === undefined) {
      return
    }

    const newItem = {
      ...item,
      priority: newPriority,
    }
    this._maxHeap.changeValueByIdx(itemIdx, newItem)
  }
}
