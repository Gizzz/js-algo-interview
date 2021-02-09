import Comparator from '../../../helpers/Comparator'

/**
 * Merges `left` and `right` arrays, saves result in `dest` array.
 */
const merge = (left, right, dest, compareFn) => {
  // disable eslint rule to save result in dest:
  /* eslint-disable no-param-reassign */
  const comparator = new Comparator(compareFn)
  let destIdx = 0
  let leftIdx = 0
  let rightIdx = 0
  while (leftIdx < left.length && rightIdx < right.length) {
    let nextItem
    if (comparator.lte(left[leftIdx], right[rightIdx])) {
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

export default function mergeSort(arr, compareFn) {
  if (arr.length < 2) {
    return
  }

  const midIdx = Math.floor(arr.length / 2)
  const leftPart = arr.slice(0, midIdx)
  const rightPart = arr.slice(midIdx)
  //
  mergeSort(leftPart, compareFn)
  mergeSort(rightPart, compareFn)
  merge(leftPart, rightPart, arr, compareFn)
}
