/**
 * Straightforward implementation of mergesort.
 * Suboptimal - uses 3x extra memory.
 */

import Comparator from '../../../helpers/Comparator'

export default class MergesortConfig {
  constructor(compareFn) {
    this._comparator = new Comparator(compareFn)
  }

  sort(arr) {
    const result = this._mergesort(arr)
    return result
  }

  _mergesort(arr) {
    if (arr.length < 2) {
      return arr
    }

    const midIdx = Math.floor(arr.length / 2)
    const leftPart = arr.filter((_, idx) => idx < midIdx)
    const rightPart = arr.filter((_, idx) => idx >= midIdx)
    //
    const leftPartSorted = this._mergesort(leftPart)
    const rightPartSorted = this._mergesort(rightPart)
    return this._merge(leftPartSorted, rightPartSorted)
  }

  /**
   * Merges `left` and `right` arrays, returns new array (shallow copy of input arrays).
   */
  _merge(left, right) {
    let result = []
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
      result.push(nextItem)
    }
    result = result.concat(left.slice(leftIdx))
    result = result.concat(right.slice(rightIdx))
    return result
  }
}
