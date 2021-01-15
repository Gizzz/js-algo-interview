import BinarySearchTree from '../BinarySearchTree'

describe('BinarySearchTree', () => {
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
    bst1.delete(7)
    let str2 = ''
    str2 += '4\n'
    str2 += '2 6\n'
    str2 += '1 3 5 X'
    expect(bst1.toString()).toBe(str2)
    expect(bst1.getNodeCount()).toBe(6)

    // delete node with one child
    bst1.delete(6)
    let str3 = ''
    str3 += '4\n'
    str3 += '2 5\n'
    str3 += '1 3 X X'
    expect(bst1.toString()).toBe(str3)
    expect(bst1.getNodeCount()).toBe(5)

    // delete node with two children
    bst1.delete(2, true)
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
    bst2.delete(2)
    let str6 = ''
    str6 += '3\n'
    str6 += '1 X'
    expect(bst2.toString()).toBe(str6)
    expect(bst2.root.key).toBe(3)
    expect(bst2.getNodeCount()).toBe(2)
    //
    bst2.delete(3)
    let str7 = ''
    str7 += '1'
    expect(bst2.toString()).toBe(str7)
    expect(bst2.root.key).toBe(1)
    expect(bst2.getNodeCount()).toBe(1)
    //
    bst2.delete(1)
    expect(bst2.toString()).toBe('tree is empty')
    expect(bst2.root).toBe(null)
    expect(bst2.getNodeCount()).toBe(0)
  })
})
