import binarySearchIterative from '../binarySearchIterative'

describe('binarySearch', () => {
  it('should return -1 for empty array', () => {
    const arr = []
    const key = 1
    expect(binarySearchIterative(arr, key)).toBe(-1)
  })

  it('should return -1 if key is not in array', () => {
    const arr = [1, 2, 3]
    const key = 4
    expect(binarySearchIterative(arr, key)).toBe(-1)
  })

  it('should return index if key is in array', () => {
    // search for first key
    const arr = [1, 2, 3]
    const key = 1
    expect(binarySearchIterative(arr, key)).toBe(0)

    // search for middle key
    const arr2 = [1, 2, 3]
    const key2 = 2
    expect(binarySearchIterative(arr2, key2)).toBe(1)

    // search for last key
    const arr3 = [1, 2, 3]
    const key3 = 3
    expect(binarySearchIterative(arr3, key3)).toBe(2)
  })
})
