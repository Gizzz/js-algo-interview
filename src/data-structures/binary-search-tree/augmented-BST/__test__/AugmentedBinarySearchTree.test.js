import AugmentedBinarySearchTree from '../AugmentedBinarySearchTree'

describe('AugmentedBinarySearchTree', () => {
  it('should create empty AugmentedBinarySearchTree', () => {
    const bst = new AugmentedBinarySearchTree()
    expect(bst.root).toBe(null)
    expect(bst.getNodeCount()).toBe(0)
  })

  it('getNodeCount', () => {
    const bst = new AugmentedBinarySearchTree()
    expect(bst.getNodeCount()).toBe(0)

    bst.insert(1)
    expect(bst.getNodeCount()).toBe(1)

    bst.delete(1)
    expect(bst.getNodeCount()).toBe(0)
  })

  it('insert', () => {
    const bst = new AugmentedBinarySearchTree()
    expect(bst.root).toBe(null)
    expect(bst.getNodeCount()).toBe(0)

    // should update root at 1st insert
    bst.insert(4)
    expect(bst.root).not.toBe(null)
    expect(bst.root.key).toBe(4)
    expect(bst.root.parent).toBe(null)
    expect(bst.getNodeCount()).toBe(1)
    expect(bst.toString()).toBe('4')

    expect(() => bst.insert(4)).toThrow('no duplicate keys allowed')

    // should insert smaller key to left
    const insertedNode1 = bst.insert(2)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 X'
    expect(bst.toString()).toBe(str1)
    expect(insertedNode1.key).toBe(2)
    expect(insertedNode1.parent.key).toBe(4)
    bst.delete(2)

    // should insert larger key to right
    const insertedNode2 = bst.insert(6)
    let str2 = ''
    str2 += '4\n'
    str2 += 'X 6'
    expect(bst.toString()).toBe(str2)
    expect(insertedNode2.key).toBe(6)
    expect(insertedNode2.parent.key).toBe(4)
    bst.delete(6)

    bst.insert(2)
    bst.insert(6)
    expect(bst.getNodeCount()).toBe(3)
    let str3 = ''
    str3 += '4\n'
    str3 += '2 6'
    expect(bst.toString()).toBe(str3)

    bst.insert(1)
    bst.insert(3)
    bst.insert(5)
    bst.insert(7)
    expect(bst.getNodeCount()).toBe(7)
    let str4 = ''
    str4 += '4\n'
    str4 += '2 6\n'
    str4 += '1 3 5 7'
    expect(bst.toString()).toBe(str4)
  })

  it('delete', () => {
    const bst1 = new AugmentedBinarySearchTree()
    bst1.insert(4)
    bst1.insert(2)
    bst1.insert(6)
    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6\n'
    str1 += '1 3 5 7'
    expect(bst1.toString()).toBe(str1)
    expect(bst1.getNodeCount()).toBe(7)

    // delete node with zero children
    const deletedNode1 = bst1.delete(7)
    expect(deletedNode1.key).toBe(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 X'
    expect(bst1.toString()).toBe(str2)
    expect(bst1.getNodeCount()).toBe(6)

    // delete node with one child
    const deletedNode2 = bst1.delete(6)
    expect(deletedNode2.key).toBe(6)
    const childOfdeletedNode2 = deletedNode2.left
    expect(childOfdeletedNode2.parent).toBe(deletedNode2.parent)
    let str3 = ''
    str3 += '4\n'
    str3 += '2 5\n'
    str3 += '1 3 X X'
    expect(bst1.toString()).toBe(str3)
    expect(bst1.getNodeCount()).toBe(5)

    // delete node with two children
    const deletedNode3 = bst1.delete(2)
    expect(deletedNode3.key).toBe(2)
    let str4 = ''
    str4 += '4\n'
    str4 += '3 5\n'
    str4 += '1 X X X'
    expect(bst1.toString()).toBe(str4)
    expect(bst1.getNodeCount()).toBe(4)

    // test root removal with 2/1/0 children
    //
    const bst2 = new AugmentedBinarySearchTree()
    bst2.insert(2)
    bst2.insert(1)
    bst2.insert(3)
    let str5 = ''
    str5 += '2\n'
    str5 += '1 3'
    expect(bst2.toString()).toBe(str5)
    expect(bst2.root.key).toBe(2)
    expect(bst2.getNodeCount()).toBe(3)
    //
    const deletedNode4 = bst2.delete(2)
    expect(deletedNode4.key).toBe(2)
    let str6 = ''
    str6 += '3\n'
    str6 += '1 X'
    expect(bst2.toString()).toBe(str6)
    expect(bst2.root.key).toBe(3)
    expect(bst2.getNodeCount()).toBe(2)
    //
    const deletedNode5 = bst2.delete(3)
    expect(deletedNode5.key).toBe(3)
    const childOfdeletedNode5 = deletedNode5.left
    expect(bst2.root).toBe(childOfdeletedNode5)
    expect(childOfdeletedNode5.parent).toBe(null)
    let str7 = ''
    str7 += '1'
    expect(bst2.toString()).toBe(str7)
    expect(bst2.root.key).toBe(1)
    expect(bst2.getNodeCount()).toBe(1)
    //
    const deletedNode6 = bst2.delete(1)
    expect(deletedNode6.key).toBe(1)
    expect(bst2.toString()).toBe('tree is empty')
    expect(bst2.root).toBe(null)
    expect(bst2.getNodeCount()).toBe(0)
  })

  it('should update metadata of node at insert', () => {
    const bst = new AugmentedBinarySearchTree()
    expect(bst.findMinNode()).toBe(null)
    expect(bst.findMaxNode()).toBe(null)
    expect(bst.calcSize()).toBe(0)
    expect(bst.calcHeight()).toBe(-1)

    bst.insert(4)
    expect(bst.findMinNode().key).toBe(4)
    expect(bst.findMaxNode().key).toBe(4)
    expect(bst.calcSize()).toBe(1)
    expect(bst.calcHeight()).toBe(0)

    bst.insert(2)
    bst.insert(6)
    let str3 = ''
    str3 += '4\n'
    str3 += '2 6'
    expect(bst.toString()).toBe(str3)
    expect(bst.findMinNode(bst.root).key).toBe(2)
    expect(bst.findMinNode(bst.root.left).key).toBe(2)
    expect(bst.findMinNode(bst.root.right).key).toBe(6)
    //
    expect(bst.findMaxNode(bst.root).key).toBe(6)
    expect(bst.findMaxNode(bst.root.left).key).toBe(2)
    expect(bst.findMaxNode(bst.root.right).key).toBe(6)
    //
    expect(bst.calcSize(bst.root)).toBe(3)
    expect(bst.calcSize(bst.root.left)).toBe(1)
    expect(bst.calcSize(bst.root.right)).toBe(1)
    //
    expect(bst.calcHeight(bst.root)).toBe(1)
    expect(bst.calcHeight(bst.root.left)).toBe(0)
    expect(bst.calcHeight(bst.root.right)).toBe(0)

    bst.insert(1)
    bst.insert(3)
    bst.insert(5)
    bst.insert(7)
    let str4 = ''
    str4 += '4\n'
    str4 += '2 6\n'
    str4 += '1 3 5 7'
    expect(bst.toString()).toBe(str4)
    expect(bst.findMinNode(bst.root).key).toBe(1)
    expect(bst.findMinNode(bst.root.left).key).toBe(1)
    expect(bst.findMinNode(bst.root.right).key).toBe(5)
    //
    expect(bst.findMaxNode(bst.root).key).toBe(7)
    expect(bst.findMaxNode(bst.root.left).key).toBe(3)
    expect(bst.findMaxNode(bst.root.right).key).toBe(7)
    //
    expect(bst.calcSize(bst.root)).toBe(7)
    expect(bst.calcSize(bst.root.left)).toBe(3)
    expect(bst.calcSize(bst.root.right)).toBe(3)
    //
    expect(bst.calcHeight(bst.root)).toBe(2)
    expect(bst.calcHeight(bst.root.left)).toBe(1)
    expect(bst.calcHeight(bst.root.right)).toBe(1)
  })

  it('should update metadata of node at delete', () => {
    const bst1 = new AugmentedBinarySearchTree()
    bst1.insert(4)
    bst1.insert(2)
    bst1.insert(6)
    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6\n'
    str1 += '1 3 5 7'
    expect(bst1.toString()).toBe(str1)
    expect(bst1.findMinNode(bst1.root).key).toBe(1)
    expect(bst1.findMinNode(bst1.root.left).key).toBe(1)
    expect(bst1.findMinNode(bst1.root.right).key).toBe(5)
    //
    expect(bst1.findMaxNode(bst1.root).key).toBe(7)
    expect(bst1.findMaxNode(bst1.root.left).key).toBe(3)
    expect(bst1.findMaxNode(bst1.root.right).key).toBe(7)
    //
    expect(bst1.calcSize(bst1.root)).toBe(7)
    expect(bst1.calcSize(bst1.root.left)).toBe(3)
    expect(bst1.calcSize(bst1.root.right)).toBe(3)
    //
    expect(bst1.calcHeight(bst1.root)).toBe(2)
    expect(bst1.calcHeight(bst1.root.left)).toBe(1)
    expect(bst1.calcHeight(bst1.root.right)).toBe(1)

    // delete node with zero children
    bst1.delete(1)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += 'X 3 5 7'
    expect(bst1.toString()).toBe(str2)
    expect(bst1.findMinNode(bst1.root).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.left).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.right).key).toBe(5)
    //
    expect(bst1.findMaxNode(bst1.root).key).toBe(7)
    expect(bst1.findMaxNode(bst1.root.left).key).toBe(3)
    expect(bst1.findMaxNode(bst1.root.right).key).toBe(7)
    //
    expect(bst1.calcSize(bst1.root)).toBe(6)
    expect(bst1.calcSize(bst1.root.left)).toBe(2)
    expect(bst1.calcSize(bst1.root.right)).toBe(3)
    //
    expect(bst1.calcHeight(bst1.root)).toBe(2)
    expect(bst1.calcHeight(bst1.root.left)).toBe(1)
    expect(bst1.calcHeight(bst1.root.right)).toBe(1)

    // delete node with zero children
    bst1.delete(3)
    let str3 = ''
    str3 += '4\n'
    str3 += '2 6\n'
    str3 += 'X X 5 7'
    expect(bst1.toString()).toBe(str3)
    expect(bst1.findMinNode(bst1.root).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.left).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.right).key).toBe(5)
    //
    expect(bst1.findMaxNode(bst1.root).key).toBe(7)
    expect(bst1.findMaxNode(bst1.root.left).key).toBe(2)
    expect(bst1.findMaxNode(bst1.root.right).key).toBe(7)
    //
    expect(bst1.calcSize(bst1.root)).toBe(5)
    expect(bst1.calcSize(bst1.root.left)).toBe(1)
    expect(bst1.calcSize(bst1.root.right)).toBe(3)
    //
    expect(bst1.calcHeight(bst1.root)).toBe(2)
    expect(bst1.calcHeight(bst1.root.left)).toBe(0)
    expect(bst1.calcHeight(bst1.root.right)).toBe(1)

    // delete node with two children
    bst1.delete(6)
    let str4 = ''
    str4 += '4\n'
    str4 += '2 7\n'
    str4 += 'X X 5 X'
    expect(bst1.toString()).toBe(str4)
    expect(bst1.findMinNode(bst1.root).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.left).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.right).key).toBe(5)
    //
    expect(bst1.findMaxNode(bst1.root).key).toBe(7)
    expect(bst1.findMaxNode(bst1.root.left).key).toBe(2)
    expect(bst1.findMaxNode(bst1.root.right).key).toBe(7)
    //
    expect(bst1.calcSize(bst1.root)).toBe(4)
    expect(bst1.calcSize(bst1.root.left)).toBe(1)
    expect(bst1.calcSize(bst1.root.right)).toBe(2)
    //
    expect(bst1.calcHeight(bst1.root)).toBe(2)
    expect(bst1.calcHeight(bst1.root.left)).toBe(0)
    expect(bst1.calcHeight(bst1.root.right)).toBe(1)

    // delete node with one child
    bst1.delete(7)
    let str5 = ''
    str5 += '4\n'
    str5 += '2 5'
    expect(bst1.toString()).toBe(str5)
    expect(bst1.findMinNode(bst1.root).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.left).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.right).key).toBe(5)
    //
    expect(bst1.findMaxNode(bst1.root).key).toBe(5)
    expect(bst1.findMaxNode(bst1.root.left).key).toBe(2)
    expect(bst1.findMaxNode(bst1.root.right).key).toBe(5)
    //
    expect(bst1.calcSize(bst1.root)).toBe(3)
    expect(bst1.calcSize(bst1.root.left)).toBe(1)
    expect(bst1.calcSize(bst1.root.right)).toBe(1)
    //
    expect(bst1.calcHeight(bst1.root)).toBe(1)
    expect(bst1.calcHeight(bst1.root.left)).toBe(0)
    expect(bst1.calcHeight(bst1.root.right)).toBe(0)

    // root removal tests (two/one/zero children)

    const bst2 = new AugmentedBinarySearchTree()
    bst2.insert(2)
    bst2.insert(1)
    bst2.insert(3)
    let str6 = ''
    str6 += '2\n'
    str6 += '1 3'
    expect(bst2.toString()).toBe(str6)
    bst2.delete(2)
    let str6_1 = ''
    str6_1 += '3\n'
    str6_1 += '1 X'
    expect(bst2.toString()).toBe(str6_1)
    expect(bst2.findMinNode(bst2.root).key).toBe(1)
    expect(bst2.findMinNode(bst2.root.left).key).toBe(1)
    expect(bst2.findMinNode(bst2.root.right)).toBe(null)
    //
    expect(bst2.findMaxNode(bst2.root).key).toBe(3)
    expect(bst2.findMaxNode(bst2.root.left).key).toBe(1)
    expect(bst2.findMaxNode(bst2.root.right)).toBe(null)
    //
    expect(bst2.calcSize(bst2.root)).toBe(2)
    expect(bst2.calcSize(bst2.root.left)).toBe(1)
    expect(bst2.calcSize(bst2.root.right)).toBe(0)
    //
    expect(bst2.calcHeight(bst2.root)).toBe(1)
    expect(bst2.calcHeight(bst2.root.left)).toBe(0)
    expect(bst2.calcHeight(bst2.root.right)).toBe(-1)

    const bst3 = new AugmentedBinarySearchTree()
    bst3.insert(1)
    bst3.insert(2)
    let str7 = ''
    str7 += '1\n'
    str7 += 'X 2'
    expect(bst3.toString()).toBe(str7)
    expect(bst3.findMinNode(bst3.root).key).toBe(1)
    expect(bst3.findMaxNode(bst3.root).key).toBe(2)
    expect(bst3.calcSize(bst3.root)).toBe(2)
    expect(bst3.calcHeight(bst3.root)).toBe(1)
    bst3.delete(1)
    expect(bst3.findMinNode(bst3.root).key).toBe(2)
    expect(bst3.findMaxNode(bst3.root).key).toBe(2)
    expect(bst3.calcSize(bst3.root)).toBe(1)
    expect(bst3.calcHeight(bst3.root)).toBe(0)
    //
    bst3.insert(1)
    let str8 = ''
    str8 += '2\n'
    str8 += '1 X'
    expect(bst3.toString()).toBe(str8)
    expect(bst3.findMinNode(bst3.root).key).toBe(1)
    expect(bst3.findMaxNode(bst3.root).key).toBe(2)
    expect(bst3.calcSize(bst3.root)).toBe(2)
    expect(bst3.calcHeight(bst3.root)).toBe(1)
    bst3.delete(2)
    expect(bst3.findMinNode(bst3.root).key).toBe(1)
    expect(bst3.findMaxNode(bst3.root).key).toBe(1)
    expect(bst3.calcSize(bst3.root)).toBe(1)
    expect(bst3.calcHeight(bst3.root)).toBe(0)

    const bst4 = new AugmentedBinarySearchTree()
    bst4.insert(1)
    expect(bst4.toString()).toBe('1')
    expect(bst4.findMinNode().key).toBe(1)
    expect(bst4.findMaxNode().key).toBe(1)
    expect(bst4.calcSize()).toBe(1)
    expect(bst4.calcHeight()).toBe(0)
    bst4.delete(1)
    expect(bst4.findMinNode()).toBe(null)
    expect(bst4.findMaxNode()).toBe(null)
    expect(bst4.calcSize()).toBe(0)
    expect(bst4.calcHeight()).toBe(-1)
  })

  it('rank', () => {
    const bst1 = new AugmentedBinarySearchTree()
    // for empty tree - rank on any key should be zero
    expect(bst1.rank(Number.MAX_VALUE)).toBe(0)

    bst1.insert(4)
    bst1.insert(2)
    bst1.insert(6)
    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6\n'
    str1 += '1 3 5 7'
    expect(bst1.toString()).toBe(str1)

    expect(bst1.rank(-1)).toBe(0)
    expect(bst1.rank(0)).toBe(0)
    expect(bst1.rank(0.5)).toBe(0)
    expect(bst1.rank(1)).toBe(1)
    expect(bst1.rank(1.5)).toBe(1)
    expect(bst1.rank(2)).toBe(2)
    expect(bst1.rank(2.5)).toBe(2)
    expect(bst1.rank(3)).toBe(3)
    expect(bst1.rank(3.5)).toBe(3)
    expect(bst1.rank(4)).toBe(4)
    expect(bst1.rank(4.5)).toBe(4)
    expect(bst1.rank(5)).toBe(5)
    expect(bst1.rank(5.5)).toBe(5)
    expect(bst1.rank(6)).toBe(6)
    expect(bst1.rank(6.5)).toBe(6)
    expect(bst1.rank(7)).toBe(7)
    expect(bst1.rank(7.5)).toBe(7)
    expect(bst1.rank(8)).toBe(7)
  })

  it('range', () => {
    const bst1 = new AugmentedBinarySearchTree()
    expect(() => bst1.range(2, 1)).toThrow('loKey should be less or equal to hiKey')
    // for empty tree - any valid range should be zero
    expect(bst1.range(Number.MIN_VALUE, Number.MAX_VALUE)).toBe(0)
    expect(bst1.range(0, 10)).toBe(0)
    expect(bst1.range(0, 0)).toBe(0)
    expect(bst1.range(1, 1)).toBe(0)

    bst1.insert(4)
    bst1.insert(2)
    bst1.insert(6)
    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6\n'
    str1 += '1 3 5 7'
    expect(bst1.toString()).toBe(str1)

    expect(bst1.range(0, 0)).toBe(0)
    expect(bst1.range(0, 1)).toBe(1)
    expect(bst1.range(1, 1)).toBe(1)
    expect(bst1.range(1, 2)).toBe(2)
    expect(bst1.range(1, 3)).toBe(3)
    expect(bst1.range(1, 4)).toBe(4)
    expect(bst1.range(1, 5)).toBe(5)
    expect(bst1.range(1, 6)).toBe(6)
    expect(bst1.range(1, 7)).toBe(7)
    expect(bst1.range(1, 8)).toBe(7)
    expect(bst1.range(2, 2)).toBe(1)
    expect(bst1.range(2, 3)).toBe(2)
    expect(bst1.range(2, 4)).toBe(3)
    expect(bst1.range(2, 5)).toBe(4)
    expect(bst1.range(2, 6)).toBe(5)
    expect(bst1.range(2, 7)).toBe(6)
    expect(bst1.range(2, 8)).toBe(6)

    expect(bst1.range(0, 10)).toBe(7)
    expect(bst1.range(3, 3)).toBe(1)
    expect(bst1.range(3, 4)).toBe(2)
  })
})
