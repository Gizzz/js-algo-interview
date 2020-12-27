export default function binarySearchIterative(arr, key) {
  let lowIdx = 0
  let highIdx = arr.length - 1

  while (lowIdx <= highIdx) {
    const midIdx = Math.floor(lowIdx + (highIdx - lowIdx) / 2)
    /* eslint-disable no-else-return */
    if (arr[midIdx] === key) {
      return midIdx
    } else if (key > arr[midIdx]) {
      lowIdx = midIdx + 1
    } else {
      // if (key < arr[midIdx])
      highIdx = midIdx - 1
    }
    /* eslint-enable no-else-return */
  }
  return -1
}
