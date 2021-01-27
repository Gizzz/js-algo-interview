import MaxHeap from '../MaxHeap'

describe('MaxHeap', () => {
  it('should create empty MaxHeap', () => {
    const maxHeap = new MaxHeap()
    expect(maxHeap._array).not.toBe(null)
    expect(maxHeap.getSize()).toBe(0)
    expect(maxHeap.isEmpty()).toBe(true)
  })

  it('getSize', () => {
    const maxHeap = new MaxHeap()
    expect(maxHeap.getSize()).toBe(0)

    maxHeap.insert(1)
    expect(maxHeap.getSize()).toBe(1)

    maxHeap.extractMax()
    expect(maxHeap.getSize()).toBe(0)
  })

  it('isEmpty', () => {
    const maxHeap = new MaxHeap()
    expect(maxHeap.isEmpty()).toBe(true)

    maxHeap.insert(1)
    expect(maxHeap.isEmpty()).toBe(false)

    maxHeap.extractMax()
    expect(maxHeap.isEmpty()).toBe(true)
  })

  it('insert', () => {
    const maxHeap = new MaxHeap()
    const insertedNodeIdx1 = maxHeap.insert(1)
    expect(insertedNodeIdx1).toBe(0)
    const str1 = '1\n'
    expect(maxHeap.toString()).toBe(str1)

    const insertedNodeIdx2 = maxHeap.insert(5)
    expect(insertedNodeIdx2).toBe(0)
    let str2 = ''
    str2 += '5\n'
    str2 += '1 X\n'
    expect(maxHeap.toString()).toBe(str2)

    const insertedNodeIdx3 = maxHeap.insert(3)
    expect(insertedNodeIdx3).toBe(2)
    let str3 = ''
    str3 += '5\n'
    str3 += '1 3\n'
    expect(maxHeap.toString()).toBe(str3)

    const insertedNodeIdx4 = maxHeap.insert(4)
    expect(insertedNodeIdx4).toBe(1)
    let str4 = ''
    str4 += '5\n'
    str4 += '4 3\n'
    str4 += '1 X X X\n'
    expect(maxHeap.toString()).toBe(str4)
  })

  it('peekMax', () => {
    const maxHeap = new MaxHeap()
    expect(maxHeap.peekMax()).toBe(null)

    maxHeap.insert(5)
    expect(maxHeap.peekMax()).toBe(5)

    maxHeap.insert(10)
    expect(maxHeap.peekMax()).toBe(10)

    maxHeap.insert(3)
    expect(maxHeap.peekMax()).toBe(10)

    maxHeap.extractMax()
    expect(maxHeap.peekMax()).toBe(5)
    maxHeap.extractMax()
    expect(maxHeap.peekMax()).toBe(3)
    maxHeap.extractMax()
    expect(maxHeap.peekMax()).toBe(null)
  })

  it('extractMax', () => {
    const maxHeap = new MaxHeap()
    expect(maxHeap.extractMax()).toBe(null)

    maxHeap.insert(5)
    expect(maxHeap.extractMax()).toBe(5)
    expect(maxHeap.extractMax()).toBe(null)

    maxHeap.insert(10)
    maxHeap.insert(15)
    maxHeap.insert(5)
    expect(maxHeap.extractMax()).toBe(15)
    expect(maxHeap.extractMax()).toBe(10)
    expect(maxHeap.extractMax()).toBe(5)
    expect(maxHeap.extractMax()).toBe(null)
  })

  it('remove', () => {
    const maxHeap = new MaxHeap()
    expect(() => maxHeap.remove(0)).toThrow('heap is empty')

    maxHeap.insert(10)
    expect(() => maxHeap.remove(-1)).toThrow('nodeIdx is out of bounds')
    expect(() => maxHeap.remove(1)).toThrow('nodeIdx is out of bounds')

    const removedValue1 = maxHeap.remove(0)
    expect(removedValue1).toBe(10)
    expect(maxHeap.getSize()).toBe(0)

    maxHeap.insert(10)
    maxHeap.insert(5)
    const removedValue2 = maxHeap.remove(0)
    expect(removedValue2).toBe(10)
    const str1 = '5\n'
    expect(maxHeap.toString()).toBe(str1)

    maxHeap.extractMax()
    expect(maxHeap.getSize()).toBe(0)
    //
    maxHeap.insert(10)
    maxHeap.insert(5)
    const removedValue3 = maxHeap.remove(1)
    expect(removedValue3).toBe(5)
    const str2 = '10\n'
    expect(maxHeap.toString()).toBe(str2)

    maxHeap.extractMax()
    expect(maxHeap.getSize()).toBe(0)
    //
    maxHeap.insert(15)
    maxHeap.insert(10)
    maxHeap.insert(5)
    const removedValue4 = maxHeap.remove(1)
    expect(removedValue4).toBe(10)
    let str3 = ''
    str3 += '15\n'
    str3 += '5 X\n'
    expect(maxHeap.toString()).toBe(str3)
  })

  it('changePriority', () => {
    const maxHeap = new MaxHeap()
    expect(() => maxHeap.changePriority(0)).toThrow('heap is empty')

    maxHeap.insert(10)
    expect(() => maxHeap.changePriority(-1)).toThrow('nodeIdx is out of bounds')
    expect(() => maxHeap.changePriority(1)).toThrow('nodeIdx is out of bounds')

    expect(maxHeap.peekMax()).toBe(10)
    maxHeap.changePriority(0, 10)
    expect(maxHeap.peekMax()).toBe(10)
    maxHeap.changePriority(0, 15)
    expect(maxHeap.peekMax()).toBe(15)

    const maxHeap2 = new MaxHeap()
    maxHeap2.insert(15)
    maxHeap2.insert(10)
    maxHeap2.insert(5)
    //
    maxHeap2.changePriority(0, 20)
    let str1 = ''
    str1 += '20\n'
    str1 += '10 5\n'
    expect(maxHeap2.toString()).toBe(str1)
    //
    maxHeap2.changePriority(1, 25)
    let str2 = ''
    str2 += '25\n'
    str2 += '20 5\n'
    expect(maxHeap2.toString()).toBe(str2)
    //
    maxHeap2.changePriority(2, 30)
    let str3 = ''
    str3 += '30\n'
    str3 += '20 25\n'
    expect(maxHeap2.toString()).toBe(str3)

    const maxHeap3 = new MaxHeap()
    maxHeap3.insert(15)
    maxHeap3.insert(10)
    maxHeap3.insert(5)
    //
    maxHeap3.changePriority(0, 3)
    let str4 = ''
    str4 += '10\n'
    str4 += '3 5\n'
    expect(maxHeap3.toString()).toBe(str4)
    //
    maxHeap3.changePriority(1, 2)
    let str5 = ''
    str5 += '10\n'
    str5 += '2 5\n'
    expect(maxHeap3.toString()).toBe(str5)
    //
    maxHeap3.changePriority(2, 1)
    let str6 = ''
    str6 += '10\n'
    str6 += '2 1\n'
    expect(maxHeap3.toString()).toBe(str6)
  })

  it('buildHeap', () => {
    const maxHeap = MaxHeap.buildHeap([])
    expect(maxHeap.getSize()).toBe(0)
    expect(maxHeap.toString()).toBe('heap is empty')

    const maxHeap2 = MaxHeap.buildHeap([1])
    expect(maxHeap2.getSize()).toBe(1)
    expect(maxHeap2.toString()).toBe('1\n')

    const maxHeap3 = MaxHeap.buildHeap([3, 2, 1])
    let str1 = ''
    str1 += '3\n'
    str1 += '2 1\n'
    expect(maxHeap3.toString()).toBe(str1)

    const maxHeap4 = MaxHeap.buildHeap([5, 4, 3, 2, 1])
    let str2 = ''
    str2 += '5\n'
    str2 += '4 3\n'
    str2 += '2 1 X X\n'
    expect(maxHeap4.toString()).toBe(str2)

    const maxHeap5 = MaxHeap.buildHeap([1, 4, 5, 2, 3])
    let str3 = ''
    str3 += '5\n'
    str3 += '4 1\n'
    str3 += '2 3 X X\n'
    expect(maxHeap5.toString()).toBe(str3)

    const maxHeap6 = MaxHeap.buildHeap([1, 4, 5, 2, 3, 6])
    let str4 = ''
    str4 += '6\n'
    str4 += '4 5\n'
    str4 += '2 3 1 X\n'
    expect(maxHeap6.toString()).toBe(str4)

    const maxHeap7 = MaxHeap.buildHeap([1, 4, 5, 2, 3, 7, 6])
    let str5 = ''
    str5 += '7\n'
    str5 += '4 6\n'
    str5 += '2 3 5 1\n'
    expect(maxHeap7.toString()).toBe(str5)
  })

  it('heapSort', () => {
    const arr1 = []
    MaxHeap.heapSort(arr1)
    expect(arr1).toEqual([])

    const arr2 = [1]
    MaxHeap.heapSort(arr2)
    expect(arr2).toEqual([1])

    const arr3 = [2, 1]
    MaxHeap.heapSort(arr3)
    expect(arr3).toEqual([1, 2])

    const arr4 = [3, 2, 1]
    MaxHeap.heapSort(arr4)
    expect(arr4).toEqual([1, 2, 3])

    const arr5 = [1, 3, 2]
    MaxHeap.heapSort(arr5)
    expect(arr5).toEqual([1, 2, 3])

    const arr6 = [3, 1, 2]
    MaxHeap.heapSort(arr6)
    expect(arr6).toEqual([1, 2, 3])

    const arr7 = [2, 2, 3, 1]
    MaxHeap.heapSort(arr7)
    expect(arr7).toEqual([1, 2, 2, 3])

    const arr8 = [1, 4, 5, 2, 3, 7, 6]
    MaxHeap.heapSort(arr8)
    expect(arr8).toEqual([1, 2, 3, 4, 5, 6, 7])
  })
})
