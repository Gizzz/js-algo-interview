/**
 * Implemntation of counting sort.
 * Expects keys to be positive numbers.
 * Can sort objects with numeric keys if `getKeyFn` arg is provided.
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
  // clear the input array
  //
  // eslint-disable-next-line no-param-reassign
  arr.length = 0
  // eslint-disable-next-line no-restricted-syntax
  for (const subArr of aux) {
    if (subArr === undefined) {
      continue
    }
    arr.push(...subArr)
  }
}
