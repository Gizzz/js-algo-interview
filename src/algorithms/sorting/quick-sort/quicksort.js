// Implementation of quicksort.
// Features:
// - randomized partitioning (pivot element choosed randomly) to handle 'already sorted' case
// - 3-way partitioning to handle duplicates efficiently

const swap = (arr, itemIdxA, itemIdxB) => {
  /* eslint-disable no-param-reassign */
  const temp = arr[itemIdxA]
  arr[itemIdxA] = arr[itemIdxB]
  arr[itemIdxB] = temp
  /* eslint-enable no-param-reassign */
}

const getRandomIdx = (minIdx, maxIdx) => {
  const range = maxIdx - minIdx + 1
  return Math.floor(Math.random() * range) + minIdx
}

const partition = (arr, loIdx, hiIdx) => {
  // array is sorted in-place, so disable eslint rule:
  /* eslint-disable no-param-reassign */
  const randomIdx = getRandomIdx(loIdx, hiIdx)
  const pivot = arr[randomIdx]
  let pivotLoIdx = loIdx
  let pivotHiIdx = hiIdx
  let currIdx = loIdx
  while (currIdx <= pivotHiIdx) {
    if (arr[currIdx] < pivot) {
      swap(arr, currIdx, pivotLoIdx)
      pivotLoIdx += 1
      currIdx += 1
    } else if (arr[currIdx] > pivot) {
      swap(arr, currIdx, pivotHiIdx)
      pivotHiIdx -= 1
    } else {
      currIdx += 1
    }
  }
  return [pivotLoIdx, pivotHiIdx]
  /* eslint-enable no-param-reassign */
}

export default function quicksort(arr, loIdxParam, hiIdxParam) {
  const loIdx = loIdxParam !== undefined ? loIdxParam : 0
  const hiIdx = hiIdxParam !== undefined ? hiIdxParam : arr.length - 1
  // if range is invalid or has only one item
  if (hiIdx <= loIdx) {
    return
  }

  const [pivotLoIdx, pivotHiIdx] = partition(arr, loIdx, hiIdx)
  quicksort(arr, loIdx, pivotLoIdx - 1)
  quicksort(arr, pivotHiIdx + 1, hiIdx)
}
