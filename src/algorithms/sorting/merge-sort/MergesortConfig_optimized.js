/**
 * Optimized version of mergesort.
 * Has better constants for memory usage(1x extra memory needed) and running time.
 */

import Comparator from '../../../helpers/Comparator'

export default class MergesortConfig {
  constructor(compareFn) {
    this._comparator = new Comparator(compareFn)
  }

  sort(arr) {
    const loIdx = 0
    const hiIdx = arr.length - 1
    this._mergesort(arr, loIdx, hiIdx)
    return arr
  }

  _mergesort(arr, loIdx, hiIdx) {
    if (loIdx >= hiIdx) {
      return
    }

    const midIdx = Math.floor((hiIdx - loIdx) / 2) + loIdx
    this._mergesort(arr, loIdx, midIdx)
    this._mergesort(arr, midIdx + 1, hiIdx)
    this._merge(arr, loIdx, midIdx, hiIdx)
  }

  /**
   * Creates `left` and `right` subarrays, saves merged result in original array.
   */
  _merge(arr, loIdx, midIdx, hiIdx) {
    // disable eslint rule since sorting is in-place:
    /* eslint-disable no-param-reassign */
    const left = arr.slice(loIdx, midIdx + 1)
    const right = arr.slice(midIdx + 1, hiIdx + 1)
    let leftIdx = 0
    let rightIdx = 0
    let arrIdx = loIdx
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
