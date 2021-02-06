/**
 * Implementation of insertion sort.
 * It uses shifting instead of swapping to reduce time cost.
 */

import Comparator from '../../../helpers/Comparator'

export default function insertionSort(arr, compareFn) {
  const comparator = new Comparator(compareFn)

  for (let i = 1; i < arr.length; i++) {
    if (comparator.lte(arr[i - 1], arr[i])) {
      continue
    }

    /* eslint-disable no-param-reassign */
    let idxToInsert = i
    const valueToInsert = arr[i]
    while (idxToInsert > 0 && comparator.gt(arr[idxToInsert - 1], valueToInsert)) {
      arr[idxToInsert] = arr[idxToInsert - 1]
      idxToInsert -= 1
    }
    arr[idxToInsert] = valueToInsert
    /* eslint-enable no-param-reassign */
  }
}
