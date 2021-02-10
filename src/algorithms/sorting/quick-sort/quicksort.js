const swap = (arr, itemIdxA, itemIdxB) => {
  /* eslint-disable no-param-reassign */
  const temp = arr[itemIdxA]
  arr[itemIdxA] = arr[itemIdxB]
  arr[itemIdxB] = temp
  /* eslint-enable no-param-reassign */
}

const partition = (arr, loIdx, hiIdx) => {
  // array is sorted in-place, so disable eslint rule:
  /* eslint-disable no-param-reassign */
  const pivot = arr[hiIdx]
  let pivotIdx = loIdx
  for (let i = loIdx; i < hiIdx; i++) {
    if (arr[i] < pivot) {
      swap(arr, i, pivotIdx)
      pivotIdx += 1
    }
  }
  swap(arr, pivotIdx, hiIdx)
  return pivotIdx
  /* eslint-enable no-param-reassign */
}

export default function quicksort(arr, loIdxParam, hiIdxParam) {
  const loIdx = loIdxParam !== undefined ? loIdxParam : 0
  const hiIdx = hiIdxParam !== undefined ? hiIdxParam : arr.length - 1
  const isRangeInvalid = loIdx > hiIdx
  const isOneItem = loIdx === hiIdx
  if (isRangeInvalid || isOneItem) {
    return
  }

  const pivotIdx = partition(arr, loIdx, hiIdx)
  quicksort(arr, loIdx, pivotIdx - 1)
  quicksort(arr, pivotIdx + 1, hiIdx)
}
