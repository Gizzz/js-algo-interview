/**
 * Implemntation of counting sort.
 * Can sort objects if `getKeyFn` arg is provided.
 */

export default function countingSort(arr, getKeyFn) {
  // contains sub-arrays with elements of same key
  const aux = []
  // eslint-disable-next-line no-restricted-syntax
  for (const elem of arr) {
    const key = getKeyFn === undefined ? elem : getKeyFn(elem)
    if (aux[key] === undefined) {
      aux[key] = [elem]
    } else {
      aux[key].push(elem)
    }
  }
  const sortedArr = []
  // eslint-disable-next-line no-restricted-syntax
  for (const subArr of aux) {
    if (subArr === undefined) {
      continue
    }
    sortedArr.push(...subArr)
  }
  return sortedArr
}
