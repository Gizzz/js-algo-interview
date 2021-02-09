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
  let leftPart = arr.slice(0, midIdx)
  let rightPart = arr.slice(midIdx)
  //
  leftPart = mergeSort(leftPart)
  rightPart = mergeSort(rightPart)
  return merge(leftPart, rightPart)
}
