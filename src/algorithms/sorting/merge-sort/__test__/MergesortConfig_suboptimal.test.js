import MergesortConfig from '../MergesortConfig_suboptimal'

describe('mergeSort', () => {
  it('basic sort', () => {
    const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const reverseArr = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    const notSortedArr = [15, 8, 5, 12, 10, 1, 16, 9, 11, 7, 20, 3, 2, 6, 17, 18, 4, 13, 14, 19]
    const equalArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    const negativeArr = [-1, 0, 5, -10, 20, 13, -7, 3, 2, -3]
    const negativeArrSorted = [-10, -7, -3, -1, 0, 2, 3, 5, 13, 20]

    const sorter = new MergesortConfig()
    expect(sorter.sort([])).toEqual([])
    expect(sorter.sort([1])).toEqual([1])
    expect(sorter.sort([1, 2])).toEqual([1, 2])
    expect(sorter.sort([2, 1])).toEqual([1, 2])
    expect(sorter.sort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2])).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4, 4])
    expect(sorter.sort(sortedArr)).toEqual(sortedArr)
    expect(sorter.sort(reverseArr)).toEqual(sortedArr)
    expect(sorter.sort(notSortedArr)).toEqual(sortedArr)
    expect(sorter.sort(equalArr)).toEqual(equalArr)
    expect(sorter.sort(negativeArr)).toEqual(negativeArrSorted)
  })

  it('custom comparator', () => {
    const compareFn = (a, b) => {
      if (a.length === b.length) {
        return 0
      }
      return a.length < b.length ? -1 : 1
    }

    const sorter = new MergesortConfig(compareFn)
    expect(sorter.sort([''])).toEqual([''])
    expect(sorter.sort(['a'])).toEqual(['a'])
    expect(sorter.sort(['aa', 'a'])).toEqual(['a', 'aa'])
    expect(sorter.sort(['aa', 'q', 'bbbb', 'ccc'])).toEqual(['q', 'aa', 'ccc', 'bbbb'])
    expect(sorter.sort(['aa', 'aa'])).toEqual(['aa', 'aa'])
  })

  it('stability', () => {
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

    const compareFn = (a, b) => {
      if (a.prop_1 === b.prop_1) {
        return 0
      }
      return a.prop_1 < b.prop_1 ? -1 : 1
    }
    const sorter = new MergesortConfig(compareFn)
    expect(sorter.sort(unsortedArr)).toEqual(sortedArr)
  })
})
