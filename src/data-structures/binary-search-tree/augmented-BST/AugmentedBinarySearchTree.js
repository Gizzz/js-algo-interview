/**
 * Implementation of augmented BST with parent pointer and without duplicates.
 * Iteration is preferred over recursion to prevent the stack growth.
 *
 * Augmented BST allows to perform queries like 'min', 'max', 'size', 'height'
 * for subtree root in constant time.
 * It also allows rank/range queries in O(log n) time for balanced tree.
 */

import BinarySearchTree from '../vanilla-BST/BinarySearchTree'

export class AugmentedBstNode {
  constructor(key, left = null, right = null, parent = null) {
    this.key = key
    this.left = left
    this.right = right
    this.parent = parent
    // subtree metadata like minNode, maxNode, size, height
    this.meta = {}
  }
}

export default class AugmentedBinarySearchTree extends BinarySearchTree {
  getNodeCount() {
    return this.root === null ? 0 : this.root.meta.size
  }

  insert(key) {
    const node = new AugmentedBstNode(key)
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
}
