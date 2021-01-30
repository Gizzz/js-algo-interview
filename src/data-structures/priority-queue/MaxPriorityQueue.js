/**
 * Implementation of Priority Queue (Heap based).
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

  /**
   * Returns number of items soted in PQ.
   */
  getSize() {
    return this._maxHeap.getSize()
  }

  /**
   * Returns TRUE if PQ contains no items.
   */
  isEmpty() {
    return this._maxHeap.isEmpty()
  }

  /**
   * Adds an item to queue with an associated priority.
   * @returns inserted item
   */
  insertWithPriority(data, priority) {
    const item = {
      id: uuidv4(),
      data,
      priority,
    }
    this._maxHeap.insert(item)
    return item
  }

  /**
   * Returns highest priority item without removing it.
   */
  peekHighestPriorityItem() {
    const item = this._maxHeap.peekTop()
    return item === null ? null : item.data
  }

  /**
   * Removes the item from the queue that has the highest priority and returns it.
   */
  extractHighestPriorityItem() {
    const item = this._maxHeap.extractTop()
    return item === null ? null : item.data
  }

  /**
   * Changes priority of specified item.
   */
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
