export default function binarySearchRecursive(arr, key, low, high) {
  let lowIdx = low !== undefined ? low : 0
  let highIdx = high !== undefined ? high : arr.length - 1

  if (lowIdx > highIdx) {
    return -1
  }

  const midIdx = Math.floor(lowIdx + (highIdx - lowIdx) / 2)
  /* eslint-disable no-else-return */
  if (arr[midIdx] === key) {
    return midIdx
  } else if (key > arr[midIdx]) {
    lowIdx = midIdx + 1
    return binarySearchRecursive(arr, key, lowIdx, highIdx)
  } else {
    // if (key < arr[midIdx])
    highIdx = midIdx - 1
    return binarySearchRecursive(arr, key, lowIdx, highIdx)
  }
  /* eslint-enable no-else-return */
}
