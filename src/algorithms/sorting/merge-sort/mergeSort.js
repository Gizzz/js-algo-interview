const merge = (result, left, right) => {
  /* eslint-disable no-param-reassign */
  result = []
  while (left.length !== 0 && right.length !== 0) {
    const nextItem = left[0] <= right[0] ? left.shift() : right.shift()
    result.push(nextItem)
  }
  result = result.concat(left)
  result = result.concat(right)
  return result
  /* eslint-enable no-param-reassign */
}

export default function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }

  const midIdx = Math.floor(arr.length / 2)
  const leftPart = arr.filter((_, idx) => idx < midIdx)
  const rightPart = arr.filter((_, idx) => idx >= midIdx)
  //
  const leftPartSorted = mergeSort(leftPart)
  const rightPartSorted = mergeSort(rightPart)
  return merge(arr, leftPartSorted, rightPartSorted)
}
