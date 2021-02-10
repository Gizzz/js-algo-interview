/**
 * Optimized version of mergesort.
 * Has better constants for memory usage and running time.
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
    if (arr.length < 2) {
      return
    }

    const midIdx = Math.floor(arr.length / 2)
    const leftPart = arr.slice(0, midIdx)
    const rightPart = arr.slice(midIdx)
    //
    this._mergesort(leftPart)
    this._mergesort(rightPart)
    this._merge(leftPart, rightPart, arr)
  }

  /**
   * Merges `left` and `right` arrays, saves result in `dest` array.
   */
  _merge(left, right, dest) {
    // disable eslint rule to save result in dest:
    /* eslint-disable no-param-reassign */
    let destIdx = 0
    let leftIdx = 0
    let rightIdx = 0
    while (leftIdx < left.length && rightIdx < right.length) {
      let nextItem
      if (this._comparator.lte(left[leftIdx], right[rightIdx])) {
        nextItem = left[leftIdx]
        leftIdx += 1
      } else {
        nextItem = right[rightIdx]
        rightIdx += 1
      }
      dest[destIdx] = nextItem
      destIdx += 1
    }
    while (leftIdx < left.length) {
      dest[destIdx] = left[leftIdx]
      leftIdx += 1
      destIdx += 1
    }
    while (rightIdx < right.length) {
      dest[destIdx] = right[rightIdx]
      rightIdx += 1
      destIdx += 1
    }
    /* eslint-enable no-param-reassign */
  }
}
