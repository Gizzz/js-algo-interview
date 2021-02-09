/**
 * Merges `left` and `right` arrays, saves result in `dest` array.
 */
const merge = (left, right, dest) => {
  // disable eslint rule to save result in dest:
  /* eslint-disable no-param-reassign */
  let destIdx = 0
  let leftIdx = 0
  let rightIdx = 0
  while (leftIdx < left.length && rightIdx < right.length) {
    let nextItem
    if (left[leftIdx] <= right[rightIdx]) {
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

export default function mergeSort(arr) {
  if (arr.length < 2) {
    return
  }

  const midIdx = Math.floor(arr.length / 2)
  const leftPart = arr.slice(0, midIdx)
  const rightPart = arr.slice(midIdx)
  //
  mergeSort(leftPart)
  mergeSort(rightPart)
  merge(leftPart, rightPart, arr)
}
