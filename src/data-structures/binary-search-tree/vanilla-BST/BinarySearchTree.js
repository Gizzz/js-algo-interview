/**
 * Implementation of BST with no duplicates and no parent pointer.
 * Iteration is preferred over recursion to prevent the stack growth.
 */

import Queue from '../../queue/link-list-based/QueueViaLinkedList'
import Stack from '../../stack/Stack'

export class BstNode {
  constructor(key, left = null, right = null) {
    this.key = key
    this.left = left
    this.right = right
  }
}

export default class BinarySearchTree {
  constructor() {
    this.root = null
    this._nodeCount = 0
  }

  getNodeCount() {
    return this._nodeCount
  }

  /**
   * returns node with specified key or NULL
   */
  findNode(key) {
    let curr = this.root
    while (curr !== null) {
      if (curr.key === key) {
        break
      } else if (key < curr.key) {
        curr = curr.left
      } else {
        curr = curr.right
      }
    }
    return curr
  }

  insert(key) {
    const node = new BstNode(key)
    if (this.root === null) {
      this.root = node
    } else {
      let curr = this.root
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (curr.key === key) {
          throw new Error('no duplicate keys allowed')
        } else if (key < curr.key) {
          if (curr.left === null) {
            curr.left = node
            break
          }
          curr = curr.left
        } else {
          if (curr.right === null) {
            curr.right = node
            break
          }
          curr = curr.right
        }
      }
    }

    this._nodeCount += 1
    return node
  }

  delete(key) {
    let node = this.root
    let parent = null
    while (node !== null) {
      if (key === node.key) {
        break
      } else if (key < node.key) {
        parent = node
        node = node.left
      } else {
        parent = node
        node = node.right
      }
    }

    if (node === null) {
      throw new Error('key do not exist')
    }

    const deletedNode = this._deleteByRef(node, parent)
    return deletedNode
  }

  /**
   * helper for 'delete' method
   */
  _deleteByRef(node, parent) {
    // below is needed to update parent's left and right props:
    /* eslint-disable no-param-reassign */

    if (node === this.root && parent !== null) {
      throw new Error('parent of root should be null')
    }
    if (node !== this.root && parent === null) {
      throw new Error('parent of non-root node is null')
    }

    let deletedNode = node
    const hasZeroChildren = node.left === null && node.right === null
    const hasOneChild = !hasZeroChildren && (node.left === null || node.right === null)
    const hasTwoChildren = node.left !== null && node.right !== null
    if (hasZeroChildren) {
      if (node === this.root) {
        this.root = null
      } else {
        if (parent.left === node) {
          parent.left = null
        } else if (parent.right === node) {
          parent.right = null
        } else {
          throw new Error('node should be left or right child')
        }
      }
    } else if (hasOneChild) {
      const child = node.left !== null ? node.left : node.right
      if (node === this.root) {
        this.root = child
      } else {
        if (parent.left === node) {
          parent.left = child
        } else {
          parent.right = child
        }
      }
    } else if (hasTwoChildren) {
      const [successor, parentOfSuccessor] = this._findMinNodeAndParent(node.right, node)
      const keyToDelete = node.key
      node.key = successor.key
      successor.key = keyToDelete
      deletedNode = this._deleteByRef(successor, parentOfSuccessor)
    } else {
      throw new Error('unexpected count of children')
    }

    if (!hasTwoChildren) {
      this._nodeCount -= 1
    }
    return deletedNode

    /* eslint-enable no-param-reassign */
  }

  /**
   * helper for '_deleteByRef' method
   * returns node with smallest key and its parent for specified subtree
   */
  _findMinNodeAndParent(subtreeRoot, subtreeParent) {
    if (subtreeRoot === null || subtreeParent === null) {
      throw new Error('precondition: subtreeRoot and subtreeParent should not be NULL')
    }

    let minNode = subtreeRoot
    let parent = subtreeParent
    while (minNode.left !== null) {
      parent = minNode
      minNode = minNode.left
    }
    return [minNode, parent]
  }

  /**
   * returns successor node or null if key is the largest one
   * throws if provided key do not exists in tree
   */
  nextLarger(key) {
    let node = this.root
    let closestLargerAncestor = null
    while (node !== null) {
      if (key === node.key) {
        break
      } else if (key < node.key) {
        closestLargerAncestor = node
        node = node.left
      } else {
        node = node.right
      }
    }

    if (node === null) {
      throw new Error('key do not exist')
    }

    if (node.right !== null) {
      const minNode = this.findMinNode(node.right)
      return minNode
    }
    return closestLargerAncestor
  }

  nextSmaller(key) {
    let node = this.root
    let closestSmallerAncestor = null
    while (node !== null) {
      if (key === node.key) {
        break
      } else if (key < node.key) {
        node = node.left
      } else {
        closestSmallerAncestor = node
        node = node.right
      }
    }

    if (node === null) {
      throw new Error('key do not exist')
    }

    if (node.left !== null) {
      const maxNode = this.findMaxNode(node.left)
      return maxNode
    }
    return closestSmallerAncestor
  }

  /**
   * returns min node in subtree or null
   */
  findMinNode(subtreeRoot) {
    if (subtreeRoot === null) {
      return null
    }

    let node = subtreeRoot
    while (node.left !== null) {
      node = node.left
    }
    return node
  }

  /**
   * returns max node in subtree or null
   */
  findMaxNode(subtreeRoot) {
    if (subtreeRoot === null) {
      return null
    }

    let node = subtreeRoot
    while (node.right !== null) {
      node = node.right
    }
    return node
  }

  getNodesLevelOrder() {
    if (this.root === null) {
      return []
    }

    const nodes = []
    const queue = new Queue()
    queue.enqueue(this.root)
    while (!queue.isEmpty()) {
      const node = queue.dequeue()
      nodes.push(node)
      if (node.left) {
        queue.enqueue(node.left)
      }
      if (node.right) {
        queue.enqueue(node.right)
      }
    }
    return nodes
  }

  traverseNodesLevelOrder(callback) {
    if (this.root === null) {
      return
    }

    const queue = new Queue()
    queue.enqueue(this.root)
    while (!queue.isEmpty()) {
      const node = queue.dequeue()
      callback(node)
      if (node.left) {
        queue.enqueue(node.left)
      }
      if (node.right) {
        queue.enqueue(node.right)
      }
    }
  }

  getNodesPreorder() {
    if (this.root === null) {
      return []
    }

    const nodes = []
    const stack = new Stack()
    stack.push(this.root)
    nodes.push(this.root)
    let lastPoppedNode = null
    while (!stack.isEmpty()) {
      const node = stack.peek()
      const shouldGoLeft = node.left !== null
        && lastPoppedNode !== node.left && lastPoppedNode !== node.right
      const shouldGoRight = node.right !== null && lastPoppedNode !== node.right
      if (shouldGoLeft) {
        stack.push(node.left)
        nodes.push(node.left)
      } else if (shouldGoRight) {
        stack.push(node.right)
        nodes.push(node.right)
      } else {
        lastPoppedNode = stack.pop()
      }
    }
    return nodes
  }

  getNodesPostorder() {
    if (this.root === null) {
      return []
    }

    const nodes = []
    const stack = new Stack()
    stack.push(this.root)
    let lastPoppedNode = null
    while (!stack.isEmpty()) {
      const node = stack.peek()
      const shouldGoLeft = node.left !== null
        && lastPoppedNode !== node.left && lastPoppedNode !== node.right
      const shouldGoRight = node.right !== null && lastPoppedNode !== node.right
      if (shouldGoLeft) {
        stack.push(node.left)
      } else if (shouldGoRight) {
        stack.push(node.right)
      } else {
        lastPoppedNode = stack.pop()
        nodes.push(lastPoppedNode)
      }
    }
    return nodes
  }

  getNodesInorder() {
    if (this.root === null) {
      return []
    }

    const nodes = []
    const stack = new Stack()
    stack.push(this.root)
    // symbol is used to prevent matching any existing node or NULL
    let lastPoppedNode = Symbol('unique value')
    while (!stack.isEmpty()) {
      const node = stack.peek()
      const shouldGoLeft = node.left !== null
        && lastPoppedNode !== node.left && lastPoppedNode !== node.right
      const shouldGoRight = node.right !== null && lastPoppedNode !== node.right
      if (shouldGoLeft) {
        stack.push(node.left)
      } else {
        const isBetweenLeftAndRight = (node.left === null || lastPoppedNode === node.left)
          && lastPoppedNode !== node.right
        if (isBetweenLeftAndRight) {
          nodes.push(node)
        }
        if (shouldGoRight) {
          stack.push(node.right)
        } else {
          lastPoppedNode = stack.pop()
        }
      }
    }
    return nodes
  }

  traverseNodesInorder(callback) {
    if (this.root === null) {
      return
    }

    const stack = new Stack()
    stack.push(this.root)
    // symbol is used to prevent matching any existing node or NULL
    let lastPoppedNode = Symbol('unique value')
    while (!stack.isEmpty()) {
      const node = stack.peek()
      const shouldGoLeft = node.left !== null
        && lastPoppedNode !== node.left && lastPoppedNode !== node.right
      const shouldGoRight = node.right !== null && lastPoppedNode !== node.right
      if (shouldGoLeft) {
        stack.push(node.left)
      } else {
        const isBetweenLeftAndRight = (node.left === null || lastPoppedNode === node.left)
          && lastPoppedNode !== node.right
        if (isBetweenLeftAndRight) {
          callback(node)
        }
        if (shouldGoRight) {
          stack.push(node.right)
        } else {
          lastPoppedNode = stack.pop()
        }
      }
    }
  }

  isValidBst() {
    const nodes = this.getNodesInorder()
    let isValid = true
    nodes.forEach((node, idx) => {
      if (idx === 0) {
        return
      }
      if (nodes[idx - 1].key >= node.key) {
        isValid = false
      }
    })
    return isValid
  }

  /**
   * alternative approach to check BST validity
   */
  // isValidBst(node = this.root, lo = -Infinity, hi = Infinity) {
  //   if (node === null) {
  //     return true
  //   }

  //   const isNodeValid = node.key > lo && node.key < hi
  //   const isLeftSubtreeValid = this.isValidBst(node.left, lo, node.key)
  //   const isRightSubtreeValid = this.isValidBst(node.right, node.key, hi)
  //   if (isNodeValid && isLeftSubtreeValid && isRightSubtreeValid) {
  //     return true
  //   }
  //   return false
  // }

  calcSize(subtreeRoot = this.root) {
    if (subtreeRoot === null) {
      return 0
    }
    const leftSubtreeSize = this.calcSize(subtreeRoot.left)
    const rightSubtreeSize = this.calcSize(subtreeRoot.right)
    return leftSubtreeSize + rightSubtreeSize + 1
  }

  calcHeight(subtreeRoot = this.root) {
    if (subtreeRoot === null) {
      return -1
    }
    const leftSubtreeHeight = this.calcHeight(subtreeRoot.left)
    const rightSubtreeHeight = this.calcHeight(subtreeRoot.right)
    return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1
  }

  // rank(x) - returns count of nodes with 'key <= x'
  // range(x, y) - returns count of nodes with 'key >= x && key <= y'
  // rankList(x) - returns list of nodes with 'key <= x'
  // rangeList(x, y) - - returns list of nodes with 'key >= x && key <= y'

  toString() {
    if (this.root === null) {
      return 'tree is empty'
    }

    let queue = new Queue()
    queue.enqueue(this.root)
    let resultStr = ''
    while (!queue.isEmpty()) {
      const nodesOnLevel = queue.toArray()
      if (nodesOnLevel.every((node) => node === null)) {
        break
      }

      let nodesOnLevelStr = ''
      nodesOnLevel.forEach((node) => {
        const nodeStr = node === null ? 'X' : String(node.key)
        if (nodesOnLevelStr !== '') {
          nodesOnLevelStr += ' '
        }
        nodesOnLevelStr += nodeStr
      })
      if (resultStr !== '') {
        resultStr += '\n'
      }
      resultStr += nodesOnLevelStr

      queue = new Queue()
      nodesOnLevel.forEach((node) => {
        queue.enqueue(node ? node.left : null)
        queue.enqueue(node ? node.right : null)
      })
    }
    return resultStr
  }
}
