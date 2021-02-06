const swapItems = (arr, idxA, idxB) => {
  /* eslint-disable no-param-reassign */
  const temp = arr[idxA]
  arr[idxA] = arr[idxB]
  arr[idxB] = temp
  /* eslint-enable no-param-reassign */
}

export default function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j - 1] > arr[j]) {
        swapItems(arr, j - 1, j)
      } else {
        break
      }
    }
  }
}
