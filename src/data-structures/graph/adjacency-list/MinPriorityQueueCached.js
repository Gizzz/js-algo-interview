import Comparator from '../../../helpers/Comparator'

const minPriorityQueue_compareFn = (a, b) => {
  if (a.priority === b.priority) {
    return 0
  }
  return a.priority < b.priority ? 1 : -1
}

export default class MinPriorityQueueCached {
  constructor() {
    this._array = []
    this._itemToIdx = new Map()
    this._comparator = new Comparator(minPriorityQueue_compareFn)
  }

  /**
   * Returns number of items soted in PQ.
   */
  getSize() {
    return this._array.length
  }

  /**
   * Returns TRUE if PQ contains no items.
   */
  isEmpty() {
    return this._array.length === 0
  }

  // TODO: rename `data` to `value`
  /**
   * Wraps data with priority info (PQ item) and inserts it into PQ. Returns inserted item.
   */
  insertWithPriority(data, priority) {
    const item = { data, priority }
    const insertedItemIdx = this._insert(item)
    this._itemToIdx.set(item, insertedItemIdx)
    return item
  }

  /**
   * Puts node to heap.
   * Returns index of inserted node.
   */
  _insert(value) {
    this._array.push(value)
    if (this.getSize() === 1) {
      return 0
    }

    const lastNodeIdx = this.getSize() - 1
    const insertedNodeIdx = this._bubbleUp(lastNodeIdx)
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
      const currNodeValue = this._array[currNodeIdx]
      const parentNodeIdx = Math.floor((currNodeIdx - 1) / 2)
      const parentNodeValue = this._array[parentNodeIdx]
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
    const nodeValA = this._array[nodeIdxA]
    const nodeValB = this._array[nodeIdxB]
    // swap values in heap array
    this._array[nodeIdxA] = nodeValB
    this._array[nodeIdxB] = nodeValA
    // swap indexes in cache map
    this._itemToIdx.set(nodeValA, nodeIdxB)
    this._itemToIdx.set(nodeValB, nodeIdxA)
  }

  /**
   * Returns highest priority item without removing it.
   */
  peekHighestPriorityItem() {
    const item = this._peekTop()
    return item === null ? null : item.data
  }

  /**
   * Returns top node(root) or NULL if heap is empty.
   */
  _peekTop() {
    return this.isEmpty() ? null : this._array[0]
  }

  /**
   * Removes the item from the queue that has the highest priority and returns it.
   */
  extractHighestPriorityItem() {
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

    const rootNodeValue = this._array[0]
    const lastNodeValue = this._array.pop()
    if (!this.isEmpty()) {
      this._array[0] = lastNodeValue
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
    const lastNodeIdx = heapSize !== null ? heapSize - 1 : this._array.length - 1
    while (currNodeIdx < lastNodeIdx) {
      const currNodeValue = this._array[currNodeIdx]
      let leftChildIdx = currNodeIdx * 2 + 1
      let rightChildIdx = currNodeIdx * 2 + 2
      leftChildIdx = leftChildIdx <= lastNodeIdx ? leftChildIdx : -1
      rightChildIdx = rightChildIdx <= lastNodeIdx ? rightChildIdx : -1
      const leftChildValue = leftChildIdx === -1 ? null : this._array[leftChildIdx]
      const rightChildValue = rightChildIdx === -1 ? null : this._array[rightChildIdx]

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
   * Changes priority of specified item. Returns changed item.
   */
  changePriority(item, newPriority) {
    const oldItemState = { ...item }
    const newItemState = { ...item, priority: newPriority }
    // eslint-disable-next-line no-param-reassign
    item.priority = newPriority
    let newItemIdx = this._itemToIdx.get(item)
    if (this._comparator.gt(newItemState, oldItemState)) {
      newItemIdx = this._bubbleUp(newItemIdx)
    } else if (this._comparator.lt(newItemState, oldItemState)) {
      newItemIdx = this._bubbleDown(newItemIdx)
    }
    return this._array[newItemIdx]
  }
}
