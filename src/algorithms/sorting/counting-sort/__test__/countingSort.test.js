import countingSort from '../countingSort'

const createSortAdapter = (sortFn, getKeyFn) => {
  return {
    sort: (inputArr) => {
      sortFn(inputArr, getKeyFn)
      return inputArr
    },
  }
}

describe('countingSort', () => {
  it('basic sort', () => {
    const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const reverseArr = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    const notSortedArr = [15, 8, 5, 12, 10, 1, 16, 9, 11, 7, 20, 3, 2, 6, 17, 18, 4, 13, 14, 19]
    const equalArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    const sorter = createSortAdapter(countingSort)
    expect(sorter.sort([])).toEqual([])
    expect(sorter.sort([1])).toEqual([1])
    expect(sorter.sort([1, 2])).toEqual([1, 2])
    expect(sorter.sort([2, 1])).toEqual([1, 2])
    expect(sorter.sort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2])).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4, 4])
    expect(sorter.sort(sortedArr)).toEqual(sortedArr)
    expect(sorter.sort(reverseArr)).toEqual(sortedArr)
    expect(sorter.sort(notSortedArr)).toEqual(sortedArr)
    expect(sorter.sort(equalArr)).toEqual(equalArr)
  })

  it('stability', () => {
    const sortedArr = [
      {
        prop_1: 1,
        prop_2: 1,
      },
      {
        prop_1: 2,
        prop_2: 1,
      },
      {
        prop_1: 2,
        prop_2: 2,
      },
      {
        prop_1: 2,
        prop_2: 3,
      },
      {
        prop_1: 3,
        prop_2: 1,
      },
      {
        prop_1: 4,
        prop_2: 1,
      },
    ]

    const unsortedArr = [
      {
        prop_1: 3,
        prop_2: 1,
      },
      {
        prop_1: 2,
        prop_2: 1,
      },
      {
        prop_1: 1,
        prop_2: 1,
      },
      {
        prop_1: 2,
        prop_2: 2,
      },
      {
        prop_1: 4,
        prop_2: 1,
      },
      {
        prop_1: 2,
        prop_2: 3,
      },
    ]

    const getKeyFn = (obj) => {
      return obj.prop_1
    }
    const sorter = createSortAdapter(countingSort, getKeyFn)
    expect(sorter.sort(unsortedArr)).toEqual(sortedArr)
  })
})
