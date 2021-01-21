import BinarySearchTree, { BstNode } from '../AugmentedBinarySearchTree'

describe('BinarySearchTree', () => {
  // =========================================
  // Tests for Augmented BST
  // =========================================

  it('should update metadata of node at insert', () => {
    const bst = new BinarySearchTree()
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
    const bst1 = new BinarySearchTree()
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

    const bst2 = new BinarySearchTree()
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

    const bst3 = new BinarySearchTree()
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

    const bst4 = new BinarySearchTree()
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
    const bst1 = new BinarySearchTree()
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

  // =========================================
  // Tests for Vanilla BST
  // =========================================

  it('should create empty BinarySearchTree', () => {
    const bst = new BinarySearchTree()
    expect(bst.root).toBe(null)
    expect(bst.getNodeCount()).toBe(0)
  })

  it('getNodeCount', () => {
    const bst = new BinarySearchTree()
    expect(bst.getNodeCount()).toBe(0)

    bst.insert(1)
    expect(bst.getNodeCount()).toBe(1)

    bst.delete(1)
    expect(bst.getNodeCount()).toBe(0)
  })

  it('findNode', () => {
    const bst = new BinarySearchTree()
    expect(bst.findNode(1)).toBe(null)

    bst.insert(1)
    expect(bst.findNode(1).key).toBe(1)

    bst.delete(1)
    expect(bst.findNode(1)).toBe(null)
  })

  it('insert', () => {
    const bst = new BinarySearchTree()
    expect(bst.root).toBe(null)
    expect(bst.getNodeCount()).toBe(0)

    // should update root at 1st insert
    bst.insert(4)
    expect(bst.root).not.toBe(null)
    expect(bst.root.key).toBe(4)
    expect(bst.getNodeCount()).toBe(1)
    expect(bst.toString()).toBe('4')

    expect(() => bst.insert(4)).toThrow('no duplicate keys allowed')

    // should insert smaller key to left
    bst.insert(2)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 X'
    expect(bst.toString()).toBe(str1)
    bst.delete(2)

    // should insert larger key to right
    bst.insert(6)
    let str2 = ''
    str2 += '4\n'
    str2 += 'X 6'
    expect(bst.toString()).toBe(str2)
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
    const bst1 = new BinarySearchTree()
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
    const bst2 = new BinarySearchTree()
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

  it('nextLarger', () => {
    const bst = new BinarySearchTree()
    expect(() => bst.nextLarger(1)).toThrow('key do not exist')

    const bst1 = new BinarySearchTree()
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

    expect(() => bst1.nextLarger(0)).toThrow('key do not exist')
    expect(bst1.nextLarger(1).key).toBe(2)
    expect(bst1.nextLarger(2).key).toBe(3)
    expect(bst1.nextLarger(3).key).toBe(4)
    expect(bst1.nextLarger(4).key).toBe(5)
    expect(bst1.nextLarger(5).key).toBe(6)
    expect(bst1.nextLarger(6).key).toBe(7)
    expect(bst1.nextLarger(7)).toBe(null)
    expect(() => bst1.nextLarger(8)).toThrow('key do not exist')
  })

  it('nextSmaller', () => {
    const bst = new BinarySearchTree()
    expect(() => bst.nextSmaller(1)).toThrow('key do not exist')

    const bst1 = new BinarySearchTree()
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

    expect(() => bst1.nextSmaller(8)).toThrow('key do not exist')
    expect(bst1.nextSmaller(7).key).toBe(6)
    expect(bst1.nextSmaller(6).key).toBe(5)
    expect(bst1.nextSmaller(5).key).toBe(4)
    expect(bst1.nextSmaller(4).key).toBe(3)
    expect(bst1.nextSmaller(3).key).toBe(2)
    expect(bst1.nextSmaller(2).key).toBe(1)
    expect(bst1.nextSmaller(1)).toBe(null)
    expect(() => bst1.nextSmaller(0)).toThrow('key do not exist')
  })

  it('findMinNode', () => {
    const bst1 = new BinarySearchTree()
    expect(bst1.findMinNode(bst1.root)).toBe(null)

    bst1.insert(4)
    expect(bst1.findMinNode(bst1.root).key).toBe(4)

    bst1.insert(2)
    bst1.insert(6)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6'
    expect(bst1.toString()).toBe(str1)
    expect(bst1.findMinNode(bst1.root).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.left).key).toBe(2)
    expect(bst1.findMinNode(bst1.root.right).key).toBe(6)

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 7'
    expect(bst1.toString()).toBe(str2)
    expect(bst1.findMinNode(bst1.root).key).toBe(1)
    expect(bst1.findMinNode(bst1.root.left).key).toBe(1)
    expect(bst1.findMinNode(bst1.root.right).key).toBe(5)
  })

  it('findMaxNode', () => {
    const bst1 = new BinarySearchTree()
    expect(bst1.findMaxNode(bst1.root)).toBe(null)

    bst1.insert(4)
    expect(bst1.findMaxNode(bst1.root).key).toBe(4)

    bst1.insert(2)
    bst1.insert(6)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6'
    expect(bst1.toString()).toBe(str1)
    expect(bst1.findMaxNode(bst1.root).key).toBe(6)
    expect(bst1.findMaxNode(bst1.root.left).key).toBe(2)
    expect(bst1.findMaxNode(bst1.root.right).key).toBe(6)

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 7'
    expect(bst1.toString()).toBe(str2)
    expect(bst1.findMaxNode(bst1.root).key).toBe(7)
    expect(bst1.findMaxNode(bst1.root.left).key).toBe(3)
    expect(bst1.findMaxNode(bst1.root.right).key).toBe(7)
  })

  it('getNodesLevelOrder', () => {
    const bst1 = new BinarySearchTree()
    expect(bst1.getNodesLevelOrder()).toEqual([])

    bst1.insert(4)
    const keys1 = bst1.getNodesLevelOrder().map((node) => node.key)
    expect(keys1).toEqual([4])

    bst1.insert(2)
    bst1.insert(6)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6'
    expect(bst1.toString()).toBe(str1)
    const keys2 = bst1.getNodesLevelOrder().map((node) => node.key)
    expect(keys2).toEqual([4, 2, 6])

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 7'
    expect(bst1.toString()).toBe(str2)
    const keys3 = bst1.getNodesLevelOrder().map((node) => node.key)
    expect(keys3).toEqual([4, 2, 6, 1, 3, 5, 7])
  })

  it('traverseNodesLevelOrder', () => {
    const bst1 = new BinarySearchTree()
    const callback1 = jest.fn()
    bst1.traverseNodesLevelOrder(callback1)
    expect(callback1).not.toBeCalled()

    bst1.insert(4)
    const callback2 = jest.fn()
    bst1.traverseNodesLevelOrder(callback2)
    expect(callback2).toBeCalledTimes(1)
    const passedNode = callback2.mock.calls[0][0]
    expect(passedNode.key).toBe(4)

    bst1.insert(2)
    bst1.insert(6)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6'
    expect(bst1.toString()).toBe(str1)
    const callback3 = jest.fn()
    bst1.traverseNodesLevelOrder(callback3)
    const passedNodes1 = [
      callback3.mock.calls[0][0],
      callback3.mock.calls[1][0],
      callback3.mock.calls[2][0],
    ]
    const keys1 = passedNodes1.map((node) => node.key)
    expect(keys1).toEqual([4, 2, 6])

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 7'
    expect(bst1.toString()).toBe(str2)
    const callback4 = jest.fn()
    bst1.traverseNodesLevelOrder(callback4)
    const passedNodes2 = [
      callback4.mock.calls[0][0],
      callback4.mock.calls[1][0],
      callback4.mock.calls[2][0],
      callback4.mock.calls[3][0],
      callback4.mock.calls[4][0],
      callback4.mock.calls[5][0],
      callback4.mock.calls[6][0],
    ]
    const keys2 = passedNodes2.map((node) => node.key)
    expect(keys2).toEqual([4, 2, 6, 1, 3, 5, 7])
  })

  it('getNodesPreorder', () => {
    const bst1 = new BinarySearchTree()
    expect(bst1.getNodesPreorder()).toEqual([])

    bst1.insert(4)
    const keys1 = bst1.getNodesPreorder().map((node) => node.key)
    expect(keys1).toEqual([4])

    bst1.insert(2)
    bst1.insert(6)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6'
    expect(bst1.toString()).toBe(str1)
    const keys2 = bst1.getNodesPreorder().map((node) => node.key)
    expect(keys2).toEqual([4, 2, 6])

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 7'
    expect(bst1.toString()).toBe(str2)
    const keys3 = bst1.getNodesPreorder().map((node) => node.key)
    expect(keys3).toEqual([4, 2, 1, 3, 6, 5, 7])
  })

  it('getNodesPostorder', () => {
    const bst1 = new BinarySearchTree()
    expect(bst1.getNodesPostorder()).toEqual([])

    bst1.insert(4)
    const keys1 = bst1.getNodesPostorder().map((node) => node.key)
    expect(keys1).toEqual([4])

    bst1.insert(2)
    bst1.insert(6)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6'
    expect(bst1.toString()).toBe(str1)
    const keys2 = bst1.getNodesPostorder().map((node) => node.key)
    expect(keys2).toEqual([2, 6, 4])

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 7'
    expect(bst1.toString()).toBe(str2)
    const keys3 = bst1.getNodesPostorder().map((node) => node.key)
    expect(keys3).toEqual([1, 3, 2, 5, 7, 6, 4])
  })

  it('getNodesInorder', () => {
    const bst1 = new BinarySearchTree()
    expect(bst1.getNodesInorder()).toEqual([])

    bst1.insert(4)
    const keys1 = bst1.getNodesInorder().map((node) => node.key)
    expect(keys1).toEqual([4])

    bst1.insert(2)
    bst1.insert(6)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6'
    expect(bst1.toString()).toBe(str1)
    const keys2 = bst1.getNodesInorder().map((node) => node.key)
    expect(keys2).toEqual([2, 4, 6])

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 7'
    expect(bst1.toString()).toBe(str2)
    const keys3 = bst1.getNodesInorder().map((node) => node.key)
    expect(keys3).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('traverseNodesInorder', () => {
    const bst1 = new BinarySearchTree()
    const callback1 = jest.fn()
    bst1.traverseNodesInorder(callback1)
    expect(callback1).not.toBeCalled()

    bst1.insert(4)
    const callback2 = jest.fn()
    bst1.traverseNodesInorder(callback2)
    expect(callback2).toBeCalledTimes(1)
    const passedNode = callback2.mock.calls[0][0]
    expect(passedNode.key).toBe(4)

    bst1.insert(2)
    bst1.insert(6)
    let str1 = ''
    str1 += '4\n'
    str1 += '2 6'
    expect(bst1.toString()).toBe(str1)
    const callback3 = jest.fn()
    bst1.traverseNodesInorder(callback3)
    const passedNodes1 = [
      callback3.mock.calls[0][0],
      callback3.mock.calls[1][0],
      callback3.mock.calls[2][0],
    ]
    const keys1 = passedNodes1.map((node) => node.key)
    expect(keys1).toEqual([2, 4, 6])

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 7'
    expect(bst1.toString()).toBe(str2)
    const callback4 = jest.fn()
    bst1.traverseNodesInorder(callback4)
    const passedNodes2 = [
      callback4.mock.calls[0][0],
      callback4.mock.calls[1][0],
      callback4.mock.calls[2][0],
      callback4.mock.calls[3][0],
      callback4.mock.calls[4][0],
      callback4.mock.calls[5][0],
      callback4.mock.calls[6][0],
    ]
    const keys2 = passedNodes2.map((node) => node.key)
    expect(keys2).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('isValidBst', () => {
    // valid tree tests

    const bst1 = new BinarySearchTree()
    expect(bst1.isValidBst()).toEqual(true)

    bst1.insert(4)
    expect(bst1.isValidBst()).toEqual(true)

    bst1.insert(2)
    bst1.insert(6)
    let str1_1 = ''
    str1_1 += '4\n'
    str1_1 += '2 6'
    expect(bst1.toString()).toBe(str1_1)
    expect(bst1.isValidBst()).toEqual(true)

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    bst1.insert(7)
    let str1_2 = ''
    str1_2 += '4\n'
    str1_2 += '2 6\n'
    str1_2 += '1 3 5 7'
    expect(bst1.toString()).toBe(str1_2)
    expect(bst1.isValidBst()).toEqual(true)

    const bst2 = new BinarySearchTree()
    bst2.insert(1)
    bst2.insert(2)
    bst2.insert(3)
    let str2_1 = ''
    str2_1 += '1\n'
    str2_1 += 'X 2\n'
    str2_1 += 'X X X 3'
    expect(bst2.toString()).toBe(str2_1)
    expect(bst2.isValidBst()).toEqual(true)

    const bst3 = new BinarySearchTree()
    bst3.insert(3)
    bst3.insert(2)
    bst3.insert(1)
    let str3_1 = ''
    str3_1 += '3\n'
    str3_1 += '2 X\n'
    str3_1 += '1 X X X'
    expect(bst3.toString()).toBe(str3_1)
    expect(bst3.isValidBst()).toEqual(true)

    // invalid tree tests

    const bst4 = new BinarySearchTree()
    bst4.insert(1)
    bst4.root.left = new BstNode(2)
    let str4_1 = ''
    str4_1 += '1\n'
    str4_1 += '2 X'
    expect(bst4.toString()).toBe(str4_1)
    expect(bst4.isValidBst()).toEqual(false)

    const bst5 = new BinarySearchTree()
    bst5.insert(2)
    bst5.root.right = new BstNode(1)
    let str5_1 = ''
    str5_1 += '2\n'
    str5_1 += 'X 1'
    expect(bst5.toString()).toBe(str5_1)
    expect(bst5.isValidBst()).toEqual(false)

    const bst6 = new BinarySearchTree()
    bst6.insert(2)
    bst6.root.left = new BstNode(3)
    bst6.root.right = new BstNode(1)
    let str6_1 = ''
    str6_1 += '2\n'
    str6_1 += '3 1'
    expect(bst6.toString()).toBe(str6_1)
    expect(bst6.isValidBst()).toEqual(false)

    const bst7 = new BinarySearchTree()
    bst7.insert(1)
    bst7.root.right = new BstNode(1)
    let str7_1 = ''
    str7_1 += '1\n'
    str7_1 += 'X 1'
    expect(bst7.toString()).toBe(str7_1)
    expect(bst7.isValidBst()).toEqual(false)

    // deep violation test #1
    // node with key 55 is valid for its parent but invalid for grandparent
    // (it is greater then root, but everything on left side should be smaller)
    //
    const bst8 = new BinarySearchTree()
    bst8.insert(50)
    bst8.insert(25)
    bst8.insert(75)
    bst8.insert(10)
    bst8.root.left.right = new BstNode(55)
    bst8.insert(60)
    bst8.insert(80)
    let str8_1 = ''
    str8_1 += '50\n'
    str8_1 += '25 75\n'
    str8_1 += '10 55 60 80'
    expect(bst8.toString()).toBe(str8_1)
    expect(bst8.isValidBst()).toEqual(false)

    // deep violation test #2
    // node with key 40 is valid for its parent but invalid for grandparent
    // (it is smaller then root, but everything on right side should be greater)
    //
    const bst9 = new BinarySearchTree()
    bst9.insert(50)
    bst9.insert(25)
    bst9.insert(75)
    bst9.insert(10)
    bst9.insert(30)
    bst9.root.right.left = new BstNode(40)
    bst9.insert(80)
    let str9_1 = ''
    str9_1 += '50\n'
    str9_1 += '25 75\n'
    str9_1 += '10 30 40 80'
    expect(bst9.toString()).toBe(str9_1)
    expect(bst9.isValidBst()).toEqual(false)
  })

  it('calcSize', () => {
    const bst1 = new BinarySearchTree()
    expect(bst1.calcSize()).toBe(0)

    bst1.insert(4)
    expect(bst1.calcSize()).toBe(1)
    expect(bst1.calcSize(bst1.root.left)).toBe(0)
    expect(bst1.calcSize(bst1.root.right)).toBe(0)

    bst1.insert(2)
    bst1.insert(6)
    let str1_1 = ''
    str1_1 += '4\n'
    str1_1 += '2 6'
    expect(bst1.toString()).toBe(str1_1)
    expect(bst1.calcSize()).toBe(3)
    expect(bst1.calcSize(bst1.root.left)).toBe(1)
    expect(bst1.calcSize(bst1.root.right)).toBe(1)

    bst1.insert(1)
    bst1.insert(3)
    bst1.insert(5)
    let str1_2 = ''
    str1_2 += '4\n'
    str1_2 += '2 6\n'
    str1_2 += '1 3 5 X'
    expect(bst1.toString()).toBe(str1_2)
    expect(bst1.calcSize()).toBe(6)
    expect(bst1.calcSize(bst1.root.left)).toBe(3)
    expect(bst1.calcSize(bst1.root.right)).toBe(2)
    expect(bst1.calcSize(bst1.root.right.left)).toBe(1)
    expect(bst1.calcSize(bst1.root.right.right)).toBe(0)
  })

  it('calcHeight', () => {
    const bst1 = new BinarySearchTree()
    expect(bst1.calcHeight()).toBe(-1)

    bst1.insert(4)
    expect(bst1.calcHeight()).toBe(0)
    expect(bst1.calcHeight(bst1.root.left)).toBe(-1)
    expect(bst1.calcHeight(bst1.root.right)).toBe(-1)

    bst1.insert(2)
    let str1_1 = ''
    str1_1 += '4\n'
    str1_1 += '2 X'
    expect(bst1.toString()).toBe(str1_1)
    expect(bst1.calcHeight()).toBe(1)
    expect(bst1.calcHeight(bst1.root.left)).toBe(0)
    expect(bst1.calcHeight(bst1.root.right)).toBe(-1)

    bst1.insert(6)
    bst1.insert(1)
    let str1_2 = ''
    str1_2 += '4\n'
    str1_2 += '2 6\n'
    str1_2 += '1 X X X'
    expect(bst1.toString()).toBe(str1_2)
    expect(bst1.calcHeight()).toBe(2)
    expect(bst1.calcHeight(bst1.root.left)).toBe(1)
    expect(bst1.calcHeight(bst1.root.left.left)).toBe(0)
    expect(bst1.calcHeight(bst1.root.left.right)).toBe(-1)
    expect(bst1.calcHeight(bst1.root.right)).toBe(0)
    expect(bst1.calcHeight(bst1.root.right.left)).toBe(-1)
    expect(bst1.calcHeight(bst1.root.right.right)).toBe(-1)
  })
})
