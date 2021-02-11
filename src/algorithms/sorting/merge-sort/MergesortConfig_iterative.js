/**
 * Iterative implementation of mergesort.
 */

import Comparator from '../../../helpers/Comparator'

export default class MergesortConfig {
  constructor(compareFn) {
    this._comparator = new Comparator(compareFn)
  }

  sort(arr) {
    this._mergesort(arr)
    return arr
  }

  _mergesort(arr) {
    // Index math:
    // - `sizeOfPart` in outer loop should be less than array length at least by one
    // to prevent other part from being empty
    // - `startIdx + sizeOfPart` in nested loop is the index of 1st item in right part,
    // so while it is in array - we keep iterating

    for (let sizeOfPart = 1; sizeOfPart < arr.length; sizeOfPart *= 2) {
      for (let startIdx = 0; startIdx + sizeOfPart < arr.length; startIdx += sizeOfPart * 2) {
        this._merge(arr, startIdx, sizeOfPart)
      }
    }
  }

  /**
   * Creates two subarrays(parts) from original array
   * and merges them back into array in sorted order.
   */
  _merge(arr, startIdx, sizeOfPart) {
    // disable eslint rule since sorting is in-place:
    /* eslint-disable no-param-reassign */

    // index of last item in right part
    const endIdx = Math.min(startIdx + sizeOfPart * 2 - 1, arr.length - 1)
    const left = arr.slice(startIdx, startIdx + sizeOfPart)
    const right = arr.slice(startIdx + sizeOfPart, endIdx + 1)
    let leftIdx = 0
    let rightIdx = 0
    let arrIdx = startIdx
    while (leftIdx < left.length && rightIdx < right.length) {
      let nextItem
      if (this._comparator.lte(left[leftIdx], right[rightIdx])) {
        nextItem = left[leftIdx]
        leftIdx += 1
      } else {
        nextItem = right[rightIdx]
        rightIdx += 1
      }
      arr[arrIdx] = nextItem
      arrIdx += 1
    }
    while (leftIdx < left.length) {
      arr[arrIdx] = left[leftIdx]
      leftIdx += 1
      arrIdx += 1
    }
    while (rightIdx < right.length) {
      arr[arrIdx] = right[rightIdx]
      rightIdx += 1
      arrIdx += 1
    }
    /* eslint-enable no-param-reassign */
  }
}
