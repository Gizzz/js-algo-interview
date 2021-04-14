import Comparator from '../../../helpers/Comparator'

const minPriorityQueue_compareFn = (a, b) => {
  if (a.priority === b.priority) {
    return 0
  }
  return a.priority < b.priority ? 1 : -1
}

export default class MinPriorityQueueCached {
  constructor() {
    this._heapArray = []
    this._itemToIdx = new Map()
    this._comparator = new Comparator(minPriorityQueue_compareFn)
  }

  /**
   * Returns number of items soted in PQ.
   */
  getSize() {
    return this._heapArray.length
  }

  /**
   * Returns TRUE if PQ contains no items.
   */
  isEmpty() {
    return this._heapArray.length === 0
  }

  // TODO: rename `data` to `value`
  /**
   * Wraps data with priority info (forms PQ item) and inserts it into PQ. Returns inserted item.
   */
  insertWithPriority(data, priority) {
    const item = { data, priority }
    this._insert(item)
    return item
  }

  /**
   * Puts node to heap.
   * Returns index of inserted node.
   */
  _insert(value) {
    this._heapArray.push(value)
    let insertedNodeIdx
    if (this.getSize() === 1) {
      insertedNodeIdx = 0
    } else {
      const lastNodeIdx = this.getSize() - 1
      insertedNodeIdx = this._bubbleUp(lastNodeIdx)
    }

    this._itemToIdx.set(value, insertedNodeIdx)
    return insertedNodeIdx
  }

  /**
   * Restores heap property upwards.
   * If node violates heap property -- swaps it with parent.
   * Returns index of node after bubbling.
   */
  _bubbleUp(nodeIdx) {
    if (this.isEmpty()) {
      throw new Error('heap is empty')
    }

    let currNodeIdx = nodeIdx
    while (currNodeIdx > 0) {
      const currNodeValue = this._heapArray[currNodeIdx]
      const parentNodeIdx = Math.floor((currNodeIdx - 1) / 2)
      const parentNodeValue = this._heapArray[parentNodeIdx]
      if (this._comparator.gt(currNodeValue, parentNodeValue)) {
        this._swapNodes(currNodeIdx, parentNodeIdx)
        currNodeIdx = parentNodeIdx
        continue
      } else {
        break
      }
    }
    return currNodeIdx
  }

  _swapNodes(nodeIdxA, nodeIdxB) {
    const nodeValA = this._heapArray[nodeIdxA]
    const nodeValB = this._heapArray[nodeIdxB]
    // swap values in heap array
    this._heapArray[nodeIdxA] = nodeValB
    this._heapArray[nodeIdxB] = nodeValA
    // swap indexes in cache map
    this._itemToIdx.set(nodeValA, nodeIdxB)
    this._itemToIdx.set(nodeValB, nodeIdxA)
  }

  /**
   * Returns highest priority item data without removing item from queue.
   */
  peekHighestPriority() {
    const item = this._peekTop()
    return item === null ? null : item.data
  }

  /**
   * Returns top node(root) or NULL if heap is empty.
   */
  _peekTop() {
    return this.isEmpty() ? null : this._heapArray[0]
  }

  /**
   * Removes the item from the queue that has the highest priority and returns its data.
   */
  extractHighestPriority() {
    const item = this._extractTop()
    return item === null ? null : item.data
  }

  /**
   * Pops top node(root) from the heap, returns NULL if heap is empty.
   */
  _extractTop() {
    if (this.isEmpty()) {
      return null
    }

    const rootNodeValue = this._heapArray[0]
    const lastNodeValue = this._heapArray.pop()
    if (!this.isEmpty()) {
      this._heapArray[0] = lastNodeValue
      this._itemToIdx.set(lastNodeValue, 0)
      this._bubbleDown(0)
    }
    this._itemToIdx.delete(rootNodeValue)
    return rootNodeValue
  }

  /**
   * Restores heap property downwards.
   * If node violates heap property -- swaps it with child.
   * Optional `heapSize` param is needed for heapsort
   * Returns index of node after bubbling.
   */
  _bubbleDown(nodeIdx, heapSize = null) {
    if (this.isEmpty()) {
      throw new Error('heap is empty')
    }

    let currNodeIdx = nodeIdx
    const lastNodeIdx = heapSize !== null ? heapSize - 1 : this._heapArray.length - 1
    while (currNodeIdx < lastNodeIdx) {
      const currNodeValue = this._heapArray[currNodeIdx]
      let leftChildIdx = currNodeIdx * 2 + 1
      let rightChildIdx = currNodeIdx * 2 + 2
      leftChildIdx = leftChildIdx <= lastNodeIdx ? leftChildIdx : -1
      rightChildIdx = rightChildIdx <= lastNodeIdx ? rightChildIdx : -1
      const leftChildValue = leftChildIdx === -1 ? null : this._heapArray[leftChildIdx]
      const rightChildValue = rightChildIdx === -1 ? null : this._heapArray[rightChildIdx]

      const shouldSwapWithLeftChild = leftChildValue !== null &&
        this._comparator.lt(currNodeValue, leftChildValue) &&
        (rightChildValue === null || this._comparator.gte(leftChildValue, rightChildValue))
      const shouldSwapWithRightChild =
        rightChildValue !== null && this._comparator.lt(currNodeValue, rightChildValue)
      if (shouldSwapWithLeftChild) {
        this._swapNodes(currNodeIdx, leftChildIdx)
        currNodeIdx = leftChildIdx
        continue
      } else if (shouldSwapWithRightChild) {
        this._swapNodes(currNodeIdx, rightChildIdx)
        currNodeIdx = rightChildIdx
        continue
      } else {
        break
      }
    }
    return currNodeIdx
  }

  /**
   * Changes priority of specified PQ item. Returns changed item.
   */
  changePriority(item, newPriority) {
    const oldItemState = { ...item }
    // eslint-disable-next-line no-param-reassign
    item.priority = newPriority
    const newItemIdx = this._changeNodeValue(oldItemState, item)
    return this._heapArray[newItemIdx]
  }

  _changeNodeValue(oldValue, newValue) {
    if (this.isEmpty()) {
      throw new Error('heap is empty')
    }

    let newNodeIdx = this._itemToIdx.get(newValue)
    if (this._comparator.gt(newValue, oldValue)) {
      newNodeIdx = this._bubbleUp(newNodeIdx)
    } else if (this._comparator.lt(newValue, oldValue)) {
      newNodeIdx = this._bubbleDown(newNodeIdx)
    }
    return newNodeIdx
  }
}
