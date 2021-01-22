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
// - add tests for parent update in 'insert', 'delete'
//
// - inherit codebase from BST class and override when needed
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
  }

  getNodeCount() {
    return this.root === null ? 0 : this.root.meta.size
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

    this._updateMetadataUpwards(node)
    return node
  }

  /**
   * traverses upwards from specified node to root and updates metadata for each node on path
   */
  _updateMetadataUpwards(node) {
    let curr = node
    while (curr !== null) {
      const minNode = curr.left !== null ? curr.left.meta.minNode : curr
      curr.meta.minNode = minNode

      const maxNode = curr.right !== null ? curr.right.meta.maxNode : curr
      curr.meta.maxNode = maxNode

      const leftSubtreeSize = curr.left !== null ? curr.left.meta.size : 0
      const rightSubtreeSize = curr.right !== null ? curr.right.meta.size : 0
      curr.meta.size = leftSubtreeSize + rightSubtreeSize + 1

      const leftSubtreeHeight = curr.left !== null ? curr.left.meta.height : -1
      const rightSubtreeHeight = curr.right !== null ? curr.right.meta.height : -1
      curr.meta.height = Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1

      curr = curr.parent
    }
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
      // eslint-disable-next-line no-param-reassign
      node.key = successor.key
      successor.key = keyToDelete
      deletedNode = this._deleteByRef(successor)
    } else {
      throw new Error('unexpected count of children')
    }

    if (!hasTwoChildren) {
      this._updateMetadataUpwards(deletedNode.parent)
    }
    return deletedNode
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
   * returns min node in subtree or null if subtree is empty
   */
  findMinNode(subtreeRoot = this.root) {
    return subtreeRoot === null ? null : subtreeRoot.meta.minNode
  }

  /**
   * returns max node in subtree or null if subtree is empty
   */
  findMaxNode(subtreeRoot = this.root) {
    return subtreeRoot === null ? null : subtreeRoot.meta.maxNode
  }

  calcSize(subtreeRoot = this.root) {
    return subtreeRoot === null ? 0 : subtreeRoot.meta.size
  }

  calcHeight(subtreeRoot = this.root) {
    return subtreeRoot === null ? -1 : subtreeRoot.meta.height
  }

  // returns count of nodes with key that is less or equal to specified
  rank(key) {
    if (this.root === null) {
      return 0
    }

    let curr = this.findNode(key)
    let isKeyExisted = true
    if (curr === null) {
      isKeyExisted = false
      curr = this.insert(key)
    }

    let count = 0
    while (curr !== null) {
      if (curr.key === key) {
        // count current node (+1) and its left subtree size
        count += 1
        count += this.calcSize(curr.left)
      }

      if (curr.parent !== null && curr === curr.parent.right) {
        // count parent (+1) and its left subtree size
        count += 1
        count += this.calcSize(curr.parent.left)
      }

      curr = curr.parent
    }

    if (!isKeyExisted) {
      count -= 1
      this.delete(key)
    }
    return count
  }

  // returns count of nodes with key between 'loKey' and 'hiKey' inclusive
  range(loKey, hiKey) {
    if (loKey > hiKey) {
      throw new Error('loKey should be less or equal to hiKey')
    }

    const hiKeyRank = this.rank(hiKey)
    if (hiKeyRank === 0) {
      return 0
    }
    const loKeyRank = this.rank(loKey)
    if (loKeyRank === 0) {
      return hiKeyRank
    }

    return hiKeyRank - loKeyRank + 1
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
