const merge = (leftArr, rightArr) => {
  let result = []
  let leftIdx = 0
  let rightIdx = 0
  while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
    let nextItem
    if (leftArr[leftIdx] <= rightArr[rightIdx]) {
      nextItem = leftArr[leftIdx]
      leftIdx += 1
    } else {
      nextItem = rightArr[rightIdx]
      rightIdx += 1
    }
    result.push(nextItem)
  }
  result = result.concat(leftArr.slice(leftIdx))
  result = result.concat(rightArr.slice(rightIdx))
  return result
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
  return merge(leftPartSorted, rightPartSorted)
}
