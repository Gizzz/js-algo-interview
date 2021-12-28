/**
 * Implemntation of LSD radix sort.
 * Expects keys to be positive numbers.
 * Can sort objects with numeric keys if `getKeyFn` arg is provided.
 */

import countingSort from '../counting-sort/countingSort'

export default function radixSort(arr, getKeyFn) {
  let maxKey = -Infinity
  const getElemKey = (elem) => (getKeyFn === undefined ? elem : getKeyFn(elem))
  for (const elem of arr) {
    const elemKey = getElemKey(elem)
    if (elemKey > maxKey) {
      maxKey = elemKey
    }
  }

  for (let divider = 1; divider < maxKey; divider *= 10) {
    const currDevider = divider
    const getKeyFnForCountingSort = (elem) => Math.floor(getElemKey(elem) / currDevider) % 10
    countingSort(arr, getKeyFnForCountingSort)
  }
}
