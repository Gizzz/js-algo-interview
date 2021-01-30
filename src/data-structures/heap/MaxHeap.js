/**
 * Max heap implementation with zero-based indexing.
 * This data structure can be used for implementing Priority Queue ADT.
 *
 * Index math:
 *   left child:  2i + 1
 *   right child: 2i + 2
 *   parent:      Math.floor((i - 1) / 2)
 */

import Comparator from './Comparator'

export default class MaxHeap {
  constructor(compareFn) {
    this._array = []
    this._comparator = new Comparator(compareFn)
  }

  // build_heap(array) - produces a max-heap from an unsorted array
  static buildHeap(srcArray) {
    const maxHeap = new MaxHeap()
    maxHeap._array = srcArray
    if (maxHeap.isEmpty()) {
      return maxHeap
    }

    const lastParentNodeIdx = Math.floor(maxHeap.getSize() / 2) - 1
    for (let i = lastParentNodeIdx; i >= 0; i--) {
      maxHeap._bubbleDown(i)
    }
    return maxHeap
  }

  // heap_sort(array) - sorts array in-place (ASC order for max heap)
  static heapSort(srcArray) {
    const maxHeap = MaxHeap.buildHeap(srcArray)
    for (let currHeapSize = srcArray.length; currHeapSize > 1; currHeapSize--) {
      const lastNodeIdx = currHeapSize - 1
      maxHeap._swapNodes(0, lastNodeIdx)
      // ignore last element because it is sorted
      maxHeap._bubbleDown(0, currHeapSize - 1)
    }
  }

  // get_size() - returns number of nodes stored in heap
  getSize() {
    return this._array.length
  }

  // is_empty() - returns true if heap contains no nodes
  isEmpty() {
    return this._array.length === 0
  }

  // insert - puts node to heap,
  // returns index of inserted node
  insert(value) {
    this._array.push(value)
    if (this.getSize() === 1) {
      return 0
    }

    const insertedNodeIdx = this.getSize() - 1
    return this._bubbleUp(insertedNodeIdx)
  }

  // peek_max - return node with max priority or NULL if heap is empty
  peekMax() {
    return this.isEmpty() ? null : this._array[0]
  }

  // extract_max - pops max priority node from the heap, returns NULL if heap is empty
  extractMax() {
    if (this.isEmpty()) {
      return null
    }

    const maxNodeValue = this._array[0]
    const lastNodeValue = this._array.pop()
    if (!this.isEmpty()) {
      this._array[0] = lastNodeValue
      this._bubbleDown(0)
    }
    return maxNodeValue
  }

  // removeByIdx(node_idx) - removes node by index, returns removed value
  removeByIdx(nodeIdx) {
    if (this.isEmpty()) {
      throw new Error('heap is empty')
    }
    if (nodeIdx < 0 || nodeIdx + 1 > this.getSize()) {
      throw new Error('nodeIdx is out of bounds')
    }

    const oldValue = this._array[nodeIdx]
    const newValue = this._array.pop()
    if (this.isEmpty() || nodeIdx === this.getSize()) {
      return oldValue
    }
    this._array[nodeIdx] = newValue
    if (this._comparator.gt(newValue, oldValue)) {
      this._bubbleUp(nodeIdx)
    } else if (this._comparator.lt(newValue, oldValue)) {
      this._bubbleDown(nodeIdx)
    }
    return oldValue
  }

  // changeValueByIdx(nodeIdx, newValue) - changes value of node by index
  changeValueByIdx(nodeIdx, newValue) {
    if (this.isEmpty()) {
      throw new Error('heap is empty')
    }
    if (nodeIdx < 0 || nodeIdx + 1 > this.getSize()) {
      throw new Error('nodeIdx is out of bounds')
    }

    const oldValue = this._array[nodeIdx]
    this._array[nodeIdx] = newValue
    if (this._comparator.gt(newValue, oldValue)) {
      this._bubbleUp(nodeIdx)
    } else if (this._comparator.lt(newValue, oldValue)) {
      this._bubbleDown(nodeIdx)
    }
  }

  // _bubble_up(node_idx) - if node violates heap property -- swaps it with parent,
  // returns index of node after bubbling
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

  // _bubble_down(node_idx, lastNodeIdx) - if node violates heap property -- swaps it with child;
  // optional `heapSize` param is needed for heapsort;
  // returns index of node after bubbling
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

  _swapNodes(nodeIdxA, nodeIdxB) {
    const temp = this._array[nodeIdxA]
    this._array[nodeIdxA] = this._array[nodeIdxB]
    this._array[nodeIdxB] = temp
  }

  toString() {
    if (this.getSize() === 0) {
      return 'heap is empty'
    }

    let currLevel = 0
    let resultStr = ''
    // loop over all nodes in heap
    for (let i = 0; i < this.getSize();) {
      let levelStr = ''
      const levelSize = 2 ** currLevel
      // loop over nodes on level
      for (let j = 0; j < levelSize; j++) {
        const nodeValue = this._array[i + j] !== undefined ? this._array[i + j] : 'X'
        levelStr += levelStr === '' ? nodeValue : ' ' + nodeValue
      }
      resultStr += levelStr + '\n'
      i += levelSize
      currLevel += 1
    }
    return resultStr
  }
}
