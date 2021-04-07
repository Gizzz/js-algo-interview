/**
 * NOTE: Base class for min/max Priority Queue.
 * Instances should NOT be created directly.
 *
 * Implementation of Priority Queue (Heap based).
 */

import { v4 as uuidv4 } from 'uuid'
import Heap from '../heap/Heap'

export default class PriorityQueue {
  constructor(HeapSubclass, compareFn) {
    if (HeapSubclass.prototype instanceof Heap === false) {
      throw new Error('`HeapSubclass` should be instance of `Heap`')
    }
    if (compareFn === undefined) {
      throw new Error('`compareFn` param should be provided')
    }
    if (new.target === PriorityQueue) {
      throw new Error('`PriorityQueue` instance should not be created directly, use subclass')
    }

    this._heap = new HeapSubclass(compareFn)
  }

  /**
   * Returns number of items soted in PQ.
   */
  getSize() {
    return this._heap.getSize()
  }

  /**
   * Returns TRUE if PQ contains no items.
   */
  isEmpty() {
    return this._heap.isEmpty()
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
    this._heap.insert(item)
    return item
  }

  /**
   * Returns highest priority item without removing it.
   */
  peekHighestPriorityItem() {
    const item = this._heap.peekTop()
    return item === null ? null : item.data
  }

  /**
   * Removes the item from the queue that has the highest priority and returns it.
   */
  extractHighestPriorityItem() {
    const item = this._heap.extractTop()
    return item === null ? null : item.data
  }

  /**
   * Changes priority of specified item.
   */
  changePriority(itemId, newPriority) {
    let itemIdx = -1
    const item = this._heap._array.find((entry, idx) => {
      if (entry.id === itemId) {
        itemIdx = idx
        return true
      }
      return false
    })
    if (item === undefined) {
      throw new Error('Item not found.')
    }

    const newItem = {
      ...item,
      priority: newPriority,
    }
    this._heap.changeValueByIdx(itemIdx, newItem)
  }
}
