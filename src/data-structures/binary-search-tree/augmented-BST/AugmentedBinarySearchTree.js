/**
 * Implementation of augmented BST with parent pointer and without duplicates.
 * Iteration is preferred over recursion to prevent the stack growth.
 *
 * Augmented BST allows to perform queries like 'min', 'max', 'size', 'height'
 * for subtree root in constant time.
 * It also allows rank/range queries in O(log n) time for balanced tree.
 */

// TODO:
//
// - augment tree so 'min', 'max', 'size', 'height' can be done in O(1) time for any node
//
// - add tests for parent update in 'insert', 'delete'
//
// - implement queries
//   - rank(x) - returns count of nodes with 'key <= x'
//   - range(x, y) - returns count of nodes with 'key >= x && key <= y'
//   - rankList(x) - returns list of nodes with 'key <= x'
//   - rangeList(x, y) - - returns list of nodes with 'key >= x && key <= y'
//
// ? rename BstNode to AugBstNode, BinarySearchTree to AugmentedBinarySearchTree

import Queue from '../../queue/link-list-based/QueueViaLinkedList'
import Stack from '../../stack/Stack'

export class BstNode {
  constructor(key, left = null, right = null, parent = null) {
    this.key = key
    this.left = left
    this.right = right
    this.parent = parent
    // subtree metadata like minNode, maxNode, size, height
    this.meta = {}
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
            node.parent = curr
            break
          }
          curr = curr.left
        } else {
          if (curr.right === null) {
            curr.right = node
            node.parent = curr
            break
          }
          curr = curr.right
        }
      }
    }

    let curr = node
    while (curr !== null) {
      const minNode = curr.left !== null ? curr.left.meta.minNode : curr
      curr.meta.minNode = minNode
      curr = curr.parent
    }

    this._nodeCount += 1
    return node
  }

  delete(key) {
    const node = this.findNode(key)
    if (node === null) {
      throw new Error('key do not exist')
    }

    const deletedNode = this._deleteByRef(node)
    return deletedNode
  }

  /**
   * helper for 'delete' method
   */
  _deleteByRef(node) {
    // below is needed to update props of 'node' param:
    /* eslint-disable no-param-reassign */

    const nodeParent = node.parent
    if (node === this.root && nodeParent !== null) {
      throw new Error('parent of root should be null')
    }
    if (node !== this.root && nodeParent === null) {
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
        if (node === nodeParent.left) {
          nodeParent.left = null
        } else if (node === nodeParent.right) {
          nodeParent.right = null
        } else {
          throw new Error('node should be left or right child')
        }
      }
    } else if (hasOneChild) {
      const child = node.left !== null ? node.left : node.right
      if (node === this.root) {
        this.root = child
        child.parent = null
      } else {
        if (node === nodeParent.left) {
          nodeParent.left = child
          child.parent = nodeParent
        } else {
          nodeParent.right = child
          child.parent = nodeParent
        }
      }
    } else if (hasTwoChildren) {
      const successor = this.findMinNode(node.right)
      const keyToDelete = node.key
      node.key = successor.key
      successor.key = keyToDelete
      deletedNode = this._deleteByRef(successor)
    } else {
      throw new Error('unexpected count of children')
    }

    if (!hasTwoChildren) {
      this._nodeCount -= 1

      let curr = deletedNode
      while (curr !== null) {
        const minNode = curr.left !== null ? curr.left.meta.minNode : curr
        curr.meta.minNode = minNode
        curr = curr.parent
      }
    }
    return deletedNode

    /* eslint-enable no-param-reassign */
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
  findMinNode(subtreeRoot = this.root) {
    return subtreeRoot === null ? null : subtreeRoot.meta.minNode
  }

  /**
   * returns max node in subtree or null
   */
  findMaxNode(subtreeRoot = this.root) {
    if (subtreeRoot === null) {
      return null
    }

    let node = subtreeRoot
    while (node.right !== null) {
      node = node.right
    }
    return node
  }

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
